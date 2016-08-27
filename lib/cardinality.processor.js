'use strict';

// 📝
var CardinalityProcessor = {};


/**
* Reads string from start_index and returns any cardinality elements.
* Elements include:
* * - Zero or more ZOM
* + - One or more  OOM
* ? - Zero or one  ZOO
* {N} - Exactly N
* {N,} - N or more
* {N,M} - Between N and M
* @method getCardinality
* @param str String to parse for cardinality
* @param start_index Index to start parsing from
*/ 
function getCardinality(str, start_index) {

	if (!str || typeof str != 'string') {
		throw new Error("String value expected, got " + typeof str);
	}

	start_index = start_index || 0;
	var next_index = start_index + 1;

	if(!str[next_index]){
		throw new Error("Index not readable");
	}

	var cardinality = {
		type : 'none',
		start : 1,
		stop : 1,
		next_index : next_index
	};

	if(str[next_index] == '*')
	{
		cardinality.type = "ZOM";
		cardinality.start = 0;
		cardinality.stop = 1000;
		cardinality.next_index = next_index + 1; 
	}

	if(str[next_index] == '+')
	{
		cardinality.type = "OOM";
		cardinality.start = 1;
		cardinality.stop = 1000;
		cardinality.next_index = next_index + 1; 
	}

	if(str[next_index] == '?')
	{
		cardinality.type = "ZOO";
		cardinality.start = 0;
		cardinality.stop = 1;
		cardinality.next_index = next_index + 1; 
	}

	if(str[next_index] == '{')
	{
		var bound_parser = require('./bound.parser.js');
		var card_pattern = /^\s*([0-9]\d?)(,?)([1-9]\d?)?\s*$/;
		var bound        = bound_parser.parse(str, '}', next_index);

		if (bound.bound) {
			var match = bound.bound.match(card_pattern);
			if(match){
				cardinality.start = match[1] * 1; 

				if(match[2] && match[2] == ','){
					cardinality.type = 'CRC';
					cardinality.stop = 1000;
					if(match[3]){
						cardinality.stop = match[3] * 1;
					}
					
					cardinality.next_index = bound.next_index;
				}
				else{
					cardinality.type = 'CRC';
					cardinality.stop = match[1] * 1;
					cardinality.next_index = bound.next_index;
				}
					
			}
			else{
				cardinality.next_index = start_index + 1;
				return cardinality;
			} 
		}
		else {
			cardinality.next_index = start_index + 1;
		}
		
		//Fill in when rules engine is complete
		return cardinality;
	}

	
	return cardinality;
}
CardinalityProcessor.getCardinality = getCardinality;

module.exports = CardinalityProcessor;