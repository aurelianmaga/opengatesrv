var geoLib = require('geolib');

function DistanceCalculator()
{
	var self = this;
	self.getDistance = function()
	{
		//coordinates for Meteor 78 
		return geoLib.getDistance({"latitude": 46.75436, "longitude": 23.59012}, {"latitude": 46.754495, "longitude": 23.59474}, 10);
	}
}
module.exports = DistanceCalculator;