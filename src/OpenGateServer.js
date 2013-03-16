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
	 var fs = require('fs') , filename = 'server.txt';
	 var data = "";
	 fs.readFile(filename, 'utf8', function(err, data) {
		if (err) {
			console.log("Error at reading connection file: " + err);
			response.writeHead(500, {'Content-Type': 'text/plain'}); 
			response.write("Auth server not available for: " + userName + "\n");
		}
		console.log('OK: ' + filename);
		console.log(data)
    });
	 
	 var ldapConnection = new LdapConnection(data);
	 ldapConnection.connectUser(userName, password, function(canEnter){
		console.log("ldap state:" + canEnter);
		if (canEnter) {
			gate.flip();
			setTimeout(3000);
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