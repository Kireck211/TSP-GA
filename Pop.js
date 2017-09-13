// Author D.S.


// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

function Population(m, num) {

  this.population;                   // Array to hold the current population
  this.matingPool;                   // ArrayList which we will use for our "mating pool"
  this.generations = 0;              // Number of generations
  this.finished = false;             // Are we finished evolving?
  this.mutationRate = m;             // Mutation rate
  this.lastWorldRecord = 0;
  this.distances = [];
  this.iterations = 0;
  this.record = 0;

  this.best = [];

  this.population = [];
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(citiesmax);
  }
  this.matingPool = [];

  // Fill our fitness array with a value for every member of the population
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(cities.MAX);
    }
  }
  this.calcFitness();

  // Generate a mating pool
  this.naturalSelection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      
      var fitness = map(this.population[i].fitness,0,maxFitness,0,1);
      var n = floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
      for (var j = 0; j < n; j++) {              // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Create a new generation
  this.generate = function() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }


  this.getBest = function() {
    return this.best.map(function (i) {
      return cities.cities[i];
    });
  }

  // Compute the current "most fit" member of the population
  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].genes.route;
    this.record = worldrecord;
    this.distances.push(worldrecord);
    if (this.iterations > (1000 * this.best.length) -2) {
      this.finished = true;
    }
    else
      this.iterations++;
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  // Compute average fitness for the population
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }
}