'use strict';

//🎲
var Randomizer = {};

/**
* Returns a random value between 0 and max
*
* @method rand
* @param max
*/ 
function rand( max ) {

	//Init default value
	max = max || 1;

	return Math.floor( Math.random() * max);
}
Randomizer.rand = rand;

/**
* Generates a random number between start and stop
*
* @method between
* @param start (optional) 
* @param stop  (optional)
*/ 
function between(start, stop) {

	//Init defaults
	start = start || 0;
	stop  = stop  || 1000;

	if (start > stop) {
		throw new Error('Start value cannot be greater than stop value');
	}

	var random = Randomizer.rand(stop - start + 1) + start;
	return random;
}
Randomizer.between = between;


/**
* Selects and returns a random value from an array-like element
*
* @method fromArray
* @param  array_element
*/ 
function fromArray(array_element) {

	if (array_element && array_element.length) {

		var random_index = Randomizer.rand(array_element.length); 
		return array_element[random_index];

	}
	return false;
}
Randomizer.fromArray = fromArray;

module.exports = Randomizer;