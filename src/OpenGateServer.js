var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var cafPiFace = require('caf_piface')
var Relay = require('./Relay');
var LdapConnection = require('./LdapConnection');

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
 
    console.log('request starting...'+request.url);
     
     var full_url = url.parse( request.url, true ); 
	 var pathname = full_url.pathname; 
	 var q_params = full_url.query;
	 
	 var userName = q_params.u;
	 var password = q_params.p;
	 
	 if(userName == undefined || password === undefined)
	 {
			response.writeHead(500, {'Content-Type': 'text/plain'}); 
			response.write("Not OK auth for : " + userName + "\n");
			response.end();
		return;
	 }
	 
	 console.log('Console ' + userName + "--" + password);	 
	  
	 // Compute distance
	 
	 // LDAP
	 
	 var ldapConnection = new LdapConnection('url');
	 ldapConnection.connectUser(userName, password, function(canEnter){
		console.log("ldap state:" + canEnter);
		if (canEnter) {
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
	 
}
).listen(8125);
 
console.log('Server running at http://127.0.0.1:8125/');