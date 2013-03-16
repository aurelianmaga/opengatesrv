function LdapConnection(ldapUrl)
{
	var self = this;
	var assert = require('assert');
	var ldap = require('ldapjs');
	var client = ldap.createClient({
			url: ldapUrl
	});
	
	self.connectUser = function (username,password, callback)
	{
		var dn = "uid=" +username+ ",ou=People,dc=fortech,dc=ro";	
		var bindVar = true;
		var unbindVar = true;
		client.bind(dn,password,function(err)	
		{
			client.unbind(function(error){});
			
			if (err !== null) {
				callback && callback(false);
			}else{
				callback && callback(true);
			}
		});
	}
}
module.exports = LdapConnection;