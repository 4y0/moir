'use strict';


//📟
var SQBProcessor = {};

/**
* Process and parse content of a square bracket
*
* @method process_sqb
* @param str
* @param start_index
*/ 

function process_sqb (str, start_index) {

	if (!str || typeof str != 'string') {
		throw new Error("String expected, got " + typeof str);
	}

	start_index = start_index || 0;
	var next_index = start_index + 1;

	if (!str[start_index] || !str[next_index]) { 
		throw new Error("Index not readable");
	}

	var cardinality_processor = require('./cardinality.processor');
	var bound_parser          = require('./bound.parser');
	var randomizer            = require('./randomizer');

	var bound       = bound_parser.parse(str, ']', start_index);
	var cardinality = cardinality_processor.getCardinality(str, bound.next_index - 1);
	var ret_str     = '';

	next_index = cardinality.next_index;

	if(bound.bound){
		if(cardinality.type) {

			var start = cardinality.start;
			var stop  = cardinality.stop;
			var how_many = randomizer.between(start, stop);

			var bound_pattern       = /([a-zA-Z0-9])-([a-zA-Z0-9])/;
			var bound_pattern_match = bound.bound.match(bound_pattern);
			//Extract character bounds so we can do A-Z / f-j e.t.c.
			if(bound_pattern_match){
				var char_range_lower = bound_pattern_match[1].charCodeAt(0);
				var char_range_upper = bound_pattern_match[2].charCodeAt(0);
				for(var i = 1; i <= how_many; i++){
					ret_str += String.fromCharCode(randomizer.between(char_range_lower, char_range_upper));
				}
			}
			else{
				for(var i = 1; i <= how_many; i++){
					ret_str += randomizer.fromArray(bound.bound);
				}
			}

		}
		else {
			ret_str = randomizer.fromArray(bound.bound);
		}
	}
	else {
		//If no bound found, return character as is
		ret_str = str[start_index];
	}


	return {
		str:ret_str,
		next_index:next_index
	}


	console.log(bound, cardinality);
}
SQBProcessor.process = process_sqb;

module.exports = SQBProcessor;