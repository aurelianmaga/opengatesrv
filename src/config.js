var config = {}

config.ldapUrl = 'ldaps://ldap.fortech.ro:636';
config.minDistance = 400;
config.Gate = {latitude: 46.75429, longitude: 23.59};
config.gateOpenTime = 5000;

config.privateKeyFile = 'privatekey.pem';
config.certificateFile = 'certificate.pem';
module.exports = config;