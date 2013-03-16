var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var cafPiFace = require('caf_piface')
var Relay = require('./Relay');
var LdapConnection = require('./LdapConnection');
var geoLib = require('geolib');

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

http.createServer(function (request, response) {

//var DistanceCalculator = require('./DistanceCalculator');
return geoLib.getDistance({"latitude": 46.75436, "longitude": 23.59012}, {"latitude": 46.754495, "longitude": 23.59474}, 10);
  
// http.createServer(function (request, response) {

	 // LDAP	 
	 var fs = require('fs') , filename = 'server.txt';
	 var data = "";
	 fs.readFile(filename, 'utf8', function(err, data) {
		if (err) {
			console.log("Error at reading connection file: " + err);
			response.writeHead(500, {'Content-Type': 'text/plain'}); 
			response.write("Auth server not available for: " + userName + "\n");
			response.end();
		}
		console.log('OK: ' + filename);
		console.log(data);
    
	 
	 var ldapConnection = new LdapConnection(data);
	 ldapConnection.connectUser(userName, password, function(canEnter){
		console.log("ldap state:" + canEnter);
		if (canEnter) {
			gate.flip();
			var start = Date.now();
			console.log("start: " + start);
			// expecting something close to 500
			setTimeout(function(){ console.log(Date.now() - start); }, 3000);
			var end = Date.now();
			console.log("End: " + end);
			
			// close the door now, it was open for a few seconds
			gate.flip();
			response.writeHead(200, {'Content-Type': 'text/plain'}); 
			response.write("Success: " + userName + "\n");		
		}
		else {
			response.writeHead(500, {'Content-Type': 'text/plain'}); 
			response.write("Not OK auth for : " + userName + "\n");
		}	 
		response.end();
		}); 
		
	});	
}
).listen(8125);

 
 console.log("Entered");
 var d = new DistanceCalculator();
console.log(d.getDistance());
console.log('Server running at http://127.0.0.1:8125/');
