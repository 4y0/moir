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

	if (!str) {
		throw new Error("String value expected, got " + typeof str);
	}

	start_index = start_index || 0;
	var next_index = start_index + 1;

	var cardinality = {
		type : null,
		start : null,
		stop : null,
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
		//Fill in when rules engine is complete
	}

	
	return cardinality;
}
CardinalityProcessor.getCardinality = getCardinality;

module.exports = CardinalityProcessor;