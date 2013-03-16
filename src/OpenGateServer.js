var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
 
http.createServer(function (request, response) {
 
    console.log('request starting...'+request.url);
     
     var full_url = url.parse( request.url, true ); 
	 var pathname = full_url.pathname; 
	 var q_params = full_url.query;
	 
	 var userName = q_params.u;
	 var password = q_params.p;
	 
	 console.log('Console ' + userName + "--" + password);	 
	 
	 var canEnter = true;
	 // Authenticate user - LDAP
	 // ldap = new LdapConnection("https://fortech.ro");
	 // ldap.connectUser(userName, password);
	 
	 // Compute distance
	 
	 if (canEnter) {
		response.writeHead(200, {'Content-Type': 'text/plain'}); 
		response.write("Success: " + userName + "\n");
	 }
	 else {
		response.writeHead(500, {'Content-Type': 'text/plain'}); 
		response.write("Not OK auth for : " + userName + "\n");
	 }
	 
	 response.end();
}
).listen(8125);
 
console.log('Server running at http://127.0.0.1:8125/');