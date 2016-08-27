'use strict';

var expect       = require('chai').expect;
var SQBProcessor = require('../lib/sqb.processor');


describe("#SQBProcessorTests", function () {

	it('Should return a with next_index:3 for [a]bc', function(){ 

		var sqb = SQBProcessor.process('[a]bc');
		expect(sqb).to.have.property('str').to.equal('a');
		expect(sqb).to.have.property('next_index').to.equal(3);

	});

	it('Should return a or b or c with next_index:8 for [abc]{6}defgh', function(){ 

		var sqb = SQBProcessor.process('[abc]{6}defgh');
		expect(sqb).to.have.property('str');
		expect(/[abc]{6}/.test(sqb.str)).to.equal(true);
		expect(sqb).to.have.property('next_index').to.equal(8);

	});

	it('Should return any character between g and l with next_index:8 for [g-l]mnop', function(){ 

		var sqb = SQBProcessor.process('[g-l]{9}mnop');
		expect(sqb).to.have.property('str');
		expect(/[g-l]{9}/.test(sqb.str)).to.equal(true);
		expect(sqb).to.have.property('next_index').to.equal(8);

	});


	it('Should not allow l-g and throw error', function () {

		var error = "Start value cannot be greater than stop value";
		function errorThrowTest() {
			SQBProcessor.process('[l-g]{9}mnop');
		}
		expect(errorThrowTest).to.throw(error);

	});


	it('Should throw "String expected, got undefined"', function () {

		var error = "String expected, got undefined";
		function errorThrowTest() {
			SQBProcessor.process();
		}
		expect(errorThrowTest).to.throw(error);

	});


	it('Should throw "String expected, got object"', function () {

		var error = "String expected, got object";
		function errorThrowTest() {
			SQBProcessor.process({});
		}
		expect(errorThrowTest).to.throw(error);

	});


	it('Should throw "Index not readable"', function () {

		var error = "Index not readable";
		function errorThrowTest() {
			SQBProcessor.process('a',9);
		}
		expect(errorThrowTest).to.throw(error);

	});
});