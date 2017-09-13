function City()
{
	this.x;
	this.y;

	//Creates a city with random coordinates
	this.x = floor(random(0, 640));
	this.y = floor(random(0, 360));

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}

	this.getDistance = function(city)
	{
		return sqrt(pow(this.x - city.x, 2) + pow(this.y - city.y, 2));
	}

}