'use strict'


//📜
var TokenProcessor = {};


/**
* Process single string token 
*
* @method process
* @param str string from which to process token
* @param start_index
*/ 
function process_token(str, start_index) {

	if(!str || typeof str != 'string'){
		throw new Error('String expected, got ' + typeof str);
	}

	var next_index = start_index + 1;

	if(!str[next_index]){
		throw new Error('Index not readable');
	}

	var CardinalityProcessor = require('./cardinality.processor');

	var token_str   = str[start_index];
	var cardinality = CardinalityProcessor.getCardinality(str,start_index);
	if (cardinality.type) {
		var start = cardinality.start;
		var stop  = cardinality.stop; 
		var how_many = require('./randomizer').between(start, stop);
		var t = token_str; 
		token_str = '';
		for(var i = 1; i <= how_many; i++){
			token_str += t;
		}
	}
	next_index = cardinality.next_index;
	return {
		str: token_str,
		next_index: next_index
	};

}
TokenProcessor.process = process_token;

module.exports = TokenProcessor;