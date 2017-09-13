function Route(num)
{
	this.route = [];
	this.distance = 0;

	this.randomRoute = function(num)
	{
	  var res = [];
	  while(res.length < num)
	  {
	    var rand = floor(random(0,num));
	    if(res.indexOf(rand) > -1) continue;
	    res.push(rand);
	  }

	  this.route = res;
	}

	this.calcDistance = function()
	{
		var distance = 0;
		for(var i = 0; i < this.route.length -1; i++)
		{
			distance += cities.cities[this.route[i]].getDistance(cities.cities[this.route[i+1]]);
		}
		this.distance = distance;
		return this.distance;
	}



}