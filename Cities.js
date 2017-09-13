function Cities(num)
{
	this.cities = [];
	this.MAX;
	this.MIN;

	this.setCities = function(num){
	  for(var i = 0; i < num; i++)
	    this.cities.push(new City());
	}

	this.setCities(num);

	this.setMAX = function(num){
		var maxEdge = -1;
		var minEdge = 1000000000000000000;
		var average;

		for(var i = 0; i < num; i ++)
		{
			for(var j = 0; j < num; j++)
			{
				var distance = this.cities[i].getDistance(this.cities[j]);
				if (i == j)
					continue;
				maxEdge = max(maxEdge, distance);
				minEdge = min(minEdge, distance);
			}
			if (average == undefined)
				average = distance;
			else
				average += distance;
		}
		this.MAX = maxEdge * num;
		this.MIN = minEdge * num;
		console.log("Max (distance): " + this.MAX);
		console.log("Ave (distance): " + average);
		console.log("Min (distance): " + this.MIN);
		console.log("Max (fitness): " + (1 - this.MAX / this.MAX));
		console.log("Ave (fitness): " + (1 - average / this.MAX));
		console.log("Min (fitness): " + (1 - this.MIN / this.MAX));
	}

	this.setMAX(num);
}