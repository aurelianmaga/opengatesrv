var Relay = require('./Relay');
var LdapConnection = require('./LdapConnection');


var r = new Relay({
  port: 0,
  RelayOnValue: 1,
  RelayOffValue: 0,
  write: function(state, port) {
    console.log("relay port:"+port + " state: "+state)
  }
});

var sample = new LdapConnection('ldapurl');
sample.connectUser('user','pswd', function(state){
	console.log("ldap state:" + state);
});


r.flip();

r.flip();