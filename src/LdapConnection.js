function LdapConnection(ldapUrl)
{
	var self = this;
	var assert = require('assert');
	var ldap = require('ldapjs');
	var client = ldap.createClient({
			url: ldapUrl
	});
	
	self.connectUser = function (username,password)
	{
		var dn = "uid=" +username+ ",ou=People,dc=fortech,dc=ro";	
		var ok = true;
			client.bind(dn,password,function(err)	
			{
				if (err == null)
				{
					console.log('Connection Succesfull');
					ok = true;
				}
				else
				{
					console.log('Authentification failed');
					ok = false;
				}
			});
			if (ok == true)
			{
				client.unbind(function(err) 
				{
					assert.ifError(err);
				});
			}
	}
}
module.exports = LdapConnection;