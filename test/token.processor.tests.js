'use strict';

var expect         = require('chai').expect;
var TokenProcessor = require('../lib/token.processor');

describe("#TokenProcessorTests", function () {

	it('Should return {str:,next_index:1} for " " starting from 0', function () {
		var token = TokenProcessor.process("  ", 0);
		expect(token).to.have.property('str').to.equal(' ');
		expect(token).to.have.property('next_index').to.equal(1);
	});


	it('Should return {str:a,next_index:1} for abc starting from 0', function () {
		var token = TokenProcessor.process("abc", 0);
		expect(token).to.have.property('str').to.equal('a');
		expect(token).to.have.property('next_index').to.equal(1);
	});


	it('Should return {str:aaa,next_index:4} for a{3}bcd starting from 0', function () {
		var token = TokenProcessor.process("a{3}bcd", 0);
		expect(token).to.have.property('str').to.equal('aaa');
		expect(token).to.have.property('next_index').to.equal(4);
	});


	it('Should return {str:b,next_index:6} for a{3}b+ starting from 4', function () {
		var token = TokenProcessor.process("a{3}b+", 4);
		expect(token).to.have.property('str')
		expect(token.str.length >= 1 && token.str.length <= 1000).to.equal(true);
		expect(token).to.have.property('next_index').to.equal(6);
	});


	it('Should throw "String expected, got undefined"', function () {
		var error = "String expected, got undefined";
		function errorThrowTest(){
			TokenProcessor.process();
		}
		expect(errorThrowTest).to.throw(error);
	});


	it('Should throw "String expected, got object"', function () {
		var error = "String expected, got object";
		function errorThrowTest(){
			TokenProcessor.process({});
		}
		expect(errorThrowTest).to.throw(error);
	});


	it('Should throw "Index not readable"', function () {
		var error = "Index not readable";
		function errorThrowTest(){
			TokenProcessor.process('222',90);
		}
		expect(errorThrowTest).to.throw(error);
	});
});