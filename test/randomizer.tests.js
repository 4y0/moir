'use strict';

var expect     = require('chai').expect;
var randomizer = require('../lib/randomizer');

describe('#RandomizerTests', function(){


	it('Should return a number between 0 and 1', function (){

		var random_number = randomizer.rand();
		expect(random_number >= 0 && random_number <= 1).to.equal(true);
		
	});


	it('Should return a number between 0 and 1000', function (){

		var random_number = randomizer.between();
		expect(random_number >= 0 && random_number <= 1000).to.equal(true);
		
	});

	it('Should return a number between 999 and 1000', function (){

		var random_number = randomizer.between(999);
		expect(random_number >= 999 && random_number <= 1000).to.equal(true);
		
	});

	it('Should return a number between 1 and 5', function (){

		var random_number = randomizer.between(1,5);
		expect(random_number >= 1 && random_number <= 5).to.equal(true);

	});


	it('Should throw a "Start value cannot be greater than stop value" error', function (){

		var error = "Start value cannot be greater than stop value";
		function errorThrowTest() {
			var random_number = randomizer.between(51,5);
		}
		expect(errorThrowTest).to.throw(error);

	});

	it('Should return false', function (){

		var random_element = randomizer.fromArray();
		expect(random_element).to.equal(false);
		
	});


	it('Should return a random value from the array [1,2,3,4]', function (){

		var array_element  = [1,2,3,4];
		var random_element = randomizer.fromArray(array_element);
		expect(array_element.indexOf(random_element) != -1).to.equal(true);
		
	});


	it('Should return a random charcter from the string "AEIOU"', function (){
		var string_element = "AEIOU";
		var random_element = randomizer.fromArray(string_element);
		expect(string_element.indexOf(random_element) != -1).to.equal(true);
		
	});



});