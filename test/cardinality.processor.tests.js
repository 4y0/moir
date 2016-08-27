'use strict';

var expect               = require('chai').expect;
var CardinalityProcessor = require('../lib/cardinality.processor');

describe("#CardinalityProcessorTests", function () {


	it('Should return {type:null,start:null,stop:null,next_index:1} for abcde', function() {

		var cardinality = CardinalityProcessor.getCardinality('abcde');
		expect(cardinality).to.have.property('type').to.equal(null);
		expect(cardinality).to.have.property('next_index').to.equal(1);

	});

	it('Should return {type:null,start:null,stop:null,next_index:1} for a{2,3bcde', function() {

		var cardinality = CardinalityProcessor.getCardinality('a{2,3bcde');
		expect(cardinality).to.have.property('type').to.equal(null);
		expect(cardinality).to.have.property('next_index').to.equal(1);

	});

	it('Should return {type:ZOM,start:0,stop:1000,next_index:6} for a{2,3*bcde', function() {

		var cardinality = CardinalityProcessor.getCardinality('a{2,3*bcde', 4);
		expect(cardinality).to.have.property('type').to.equal('ZOM');
		expect(cardinality).to.have.property('start').to.equal(0);
		expect(cardinality).to.have.property('stop').to.equal(1000);
		expect(cardinality).to.have.property('next_index').to.equal(6);

	});

	it('Should return {type:ZOO,start:0,stop:1,next_index:2} for a?bcde', function() {

		var cardinality = CardinalityProcessor.getCardinality('a?bcde');
		expect(cardinality).to.have.property('type').to.equal('ZOO');
		expect(cardinality).to.have.property('start').to.equal(0);
		expect(cardinality).to.have.property('stop').to.equal(1);
		expect(cardinality).to.have.property('next_index').to.equal(2);

	});


	it('Should return {type:ZOM,start:0,stop:1000,next_index:2} for a*bcde', function() {

		var cardinality = CardinalityProcessor.getCardinality('a*bcde');
		expect(cardinality).to.have.property('type').to.equal('ZOM');
		expect(cardinality).to.have.property('start').to.equal(0);
		expect(cardinality).to.have.property('stop').to.equal(1000);
		expect(cardinality).to.have.property('next_index').to.equal(2);

	});


	it('Should return {type:OOM,start:1,stop:1000,next_index:2}', function() {

		var cardinality = CardinalityProcessor.getCardinality('a+bcde');
		expect(cardinality).to.have.property('type').to.equal('OOM');
		expect(cardinality).to.have.property('start').to.equal(1);
		expect(cardinality).to.have.property('stop').to.equal(1000);
		expect(cardinality).to.have.property('next_index').to.equal(2);

	});


	it('Should return {type:CRC,start:3,stop:5,next_index:6}', function() {

		var cardinality = CardinalityProcessor.getCardinality('a{3,5}bcde');
		expect(cardinality).to.have.property('type').to.equal('CRC');
		expect(cardinality).to.have.property('start').to.equal(3);
		expect(cardinality).to.have.property('stop').to.equal(5);
		expect(cardinality).to.have.property('next_index').to.equal(6);

	});


	it('Should return {type:CRC,start:3,stop:3,next_index:4}', function() {

		var cardinality = CardinalityProcessor.getCardinality('a{3}bcde');
		expect(cardinality).to.have.property('type').to.equal('CRC');
		expect(cardinality).to.have.property('start').to.equal(3);
		expect(cardinality).to.have.property('stop').to.equal(3);
		expect(cardinality).to.have.property('next_index').to.equal(4);

	});


	it('Should return {type:CRC,start:3,stop:1000,next_index:5}', function() {

		var cardinality = CardinalityProcessor.getCardinality('a{3,}bcde');
		expect(cardinality).to.have.property('type').to.equal('CRC');
		expect(cardinality).to.have.property('start').to.equal(3);
		expect(cardinality).to.have.property('stop').to.equal(1000);
		expect(cardinality).to.have.property('next_index').to.equal(5);

	});


	it('Should throw "String value expected, got undefined"', function() {

		function errorThrowTest(){
			var cardinality = CardinalityProcessor.getCardinality();
		}
		expect(errorThrowTest).to.throw("String value expected, got undefined");
	});

	it('Should throw "Index not readable"', function() {

		function errorThrowTest(){
			var cardinality = CardinalityProcessor.getCardinality('sss',9);
		}
		expect(errorThrowTest).to.throw("Index not readable");
	});


	it('Should throw "String value expected, got object"', function() {

		function errorThrowTest(){
			var cardinality = CardinalityProcessor.getCardinality({});
		}
		expect(errorThrowTest).to.throw("String value expected, got object");
	});


});