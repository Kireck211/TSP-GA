// Author D.S.

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA



// Constructor (makes a random DNA)
function DNA(num) {
  // The genetic sequence
  this.genes = new Route(num);
  this.fitness = 0;

  //Initializes genes with a random solution
  this.genes.randomRoute(num);

  // Fitness function 
  this.calcFitness = function(max) {
     this.fitness = 1 - this.genes.calcDistance() / max;
  }

  // Crossover
  this.crossover = function(partner) {
    // A new child
    var child = new DNA(this.genes.route.length);
    
    var midpoint = floor(random(this.genes.route.length)); // Pick a midpoint
    
    // Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes.route[i] = this.genes.route[i];
      else              child.genes.route[i] = partner.genes.route[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  this.mutate = function(mutationRate) {
    var indexes = []
    for (var i = 0; i < this.genes.length && indexes.length < 2; i++) {
      if (random(1) < mutationRate) {
        indexes.push(i);
      }
    }
    var temp = this.genes.route[indexes[0]];
    this.genes.route[indexes[0]] = this.genes.route[indexes[1]];
    this.genes.route[indexes[1]] = temp;
  }
}