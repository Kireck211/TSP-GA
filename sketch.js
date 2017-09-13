// Author D.S.

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population 
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection 
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function, 
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it 
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//  
//   # Rinse and repeat
var citiesmax;
var cities;
var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;
var canvas;


function setup() {
  canvas = createCanvas(640, 360);
  canvas.parent('sketch-holder');
  
  fill(color(255,255,255));
  stroke(255);
  frameRate(90);
  //popmax = 2;
  mutationRate = 0.01;
  citiesmax = 5;
  popmax = parseInt(citiesmax / 2);

  //Creates array of cities
  cities = new Cities(citiesmax);

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
}

function draw() {
  background(color(0,0,0));
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  var answer = population.getBest();
  
  $('span.numberCities').html(answer.length);
  
  $('span.bestDistance').html(population.record);
  $('span.generations').html(population.getGenerations());
  $('span.averageFitness').html(population.getAverageFitness()*100);
  $('span.totalPopulation').html(popmax);
  $('span.mutuation').html(floor(mutationRate * 100));

  for (var i = 0; i < answer.length; i++)
    ellipse(answer[i].x, answer[i].y, 5,5);

  var len = answer.length
  for (var i = 0; i < len + 1; i++) {
    var from = answer[i%len];
    var dest = answer[(i + 1) % len];
    line(from.x, from.y, dest.x, dest.y);
  }
}

function printR(population) {
  console.log(population.genes.route);
}

function printPopu(allPopu) {
  for (var i = 0; i < allPopu.population.length; i++) {
    printR(allPopu.population[i]);
  }
}