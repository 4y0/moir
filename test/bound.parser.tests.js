'use strict';

var expect      = require('chai').expect;
var BoundParser = require('../lib/bound.parser');

describe("#BoundParserTests", function (){

	it('Should return {bound:abc,next_index:5}', function () {

		var bound = BoundParser.parse('[abc]qst',']');
		expect(bound).to.have.property('bound').to.equal('abc');
		expect(bound).to.have.property('next_index').to.equal(5);

	});


	it('Should return {bound:3,,next_index:12}', function () {

		var bound = BoundParser.parse('[abc]qst{3,}pop','}',8);
		expect(bound).to.have.property('bound').to.equal('3,');
		expect(bound).to.have.property('next_index').to.equal(12);

	});


	it('Should return {bound:,next_index:1}', function () {

		var bound = BoundParser.parse('[abcqst',']');
		expect(bound).to.have.property('bound').to.equal(null);
		expect(bound).to.have.property('next_index').to.equal(1);

	});




	it('Should throw "String value expected, got undefined"', function () {

		var error = "";
		function errorThrowTest(){

			var bound = BoundParser.parse(); 
		}
		expect(errorThrowTest).to.throw(error);

	}); 


	it('Should throw "String value expected, got object"', function () {

		var error = "";
		function errorThrowTest(){

			var bound = BoundParser.parse({}); 
		}
		expect(errorThrowTest).to.throw(error);

	});


	it('Should throw "End char expected, got undefined"', function () {

		var error = "End char expected, got undefined";
		function errorThrowTest(){
			var bound = BoundParser.parse('abc'); 
		}
		expect(errorThrowTest).to.throw(error);

	});

	it('Should throw "Index not parsable"', function () {

		var error = "Index not parseable";
		function errorThrowTest(){
			var bound = BoundParser.parse('abc','[',9); 
		}
		expect(errorThrowTest).to.throw(error);

	});

});