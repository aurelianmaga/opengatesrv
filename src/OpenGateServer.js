var http = require('http');
const crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var cafPiFace = require('caf_piface')
var Relay = require('./Relay');
var LdapConnection = require('./LdapConnection');
var geoLib = require('geolib');
var config = require('./config');

var gate = new Relay({
  port: 0,
  RelayOnValue: 1,
  RelayOffValue: 0,
  write: function(state, port) {
    piFaceBoard = new cafPiFace.PiFace();
    piFaceBoard.init();
    piFaceBoard.write(state, port);
    piFaceBoard.shutdown()
  }
});


var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

var server = http.createServer(options, function (request, response) {

	 if (request.url != undefined){
		console.log('Request starting...' + request.url);
     }
     var full_url = url.parse(request.url, true ); 
	 var pathname = full_url.pathname; 
	 var q_params = full_url.query;
	 
	 var userName = q_params.u;
	 var password = q_params.p;
	 var la = q_params.lat;
	 var lo = q_params.lng;
	 console.log('Console ' + userName + "--" + password);	 
	  
	 if(userName == undefined || password === undefined)
	 {
		response.writeHead(500, {'Content-Type': 'text/plain'}); 
		response.write("Not OK auth for : " + userName + "\n");
		response.end();
		return;
	 } 

     // get the distance between garage (Meteor 19) door and us
	 var distance = geoLib.getDistance({"latitude": config.Gate.latitude, "longitude": config.Gate.longitude}, {latitude: la, longitude: lo}, 10);
	 console.log ("Distance is: " + distance);
	 
	 if (distance < config.minDistance) {
		 // LDAP	 	 
		 var ldapConnection = new LdapConnection(config.ldapUrl);	   
		 ldapConnection.connectUser(userName, password, function(canEnter){
			console.log("ldap state:" + canEnter);
			if (canEnter) {
				gate.flip();
				response.writeHead(200, {'Content-Type': 'text/plain'}); 
				response.write("Success: " + userName + "\n");	
				response.end();
				setTimeout((function() {
					console.log('After timeout!');			
				
					// close the door now, it was open for a few seconds
					gate.flip();			
				}), config.gateOpenTime);	
				return;	
			}
			else {
				response.writeHead(500, {'Content-Type': 'text/plain'}); 
				response.write("Not OK auth for: " + userName + "\n");
				response.end();
			}		
		 }); 
		
	 } else{
		response.writeHead(500, {'Content-Type': 'text/plain'}); 
		response.write("You are too far: " + userName + "\n");
		response.end();
		return;
	}
}
).setSecure(credentials);
server.listen(8125);

console.log('Server running at http://127.0.0.1:8125/');
