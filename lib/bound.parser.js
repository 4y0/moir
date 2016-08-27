'use strict';

//📇
var BoundParser = {};



/**
* Parse a moir bound - Essentially anything between open and end starting from index
*
* @method parse
* @param str - String to bound parse 
* @param end - character to mark the bound end
* @param index - Index to start bound parsing from
*/ 

function parse(str, end, index){

	if (!str || typeof str != 'string') {
		throw new Error("String expected, got " + typeof str);
	}

	if (!end || typeof end != 'string') {
		throw new Error("End char expected, got " + typeof end);
	}

	index          = index || 0;
	var next_index = index + 1;

	if (!str[next_index]) {
		throw new Error("Index not parseable");
	}

	var strlen     = str.length;
	var bound_str  = '';
	var found_end  = false;

	for(var i = next_index; i < strlen; i++){

		if (str[i] != end) {
			bound_str += str[i];
		}
		else {
			found_end = true;
			break;
		}
	}

	//If closing char is found, seek to index after the char else return next_index as is
	if (found_end) {
		next_index = i + 1;
	} 
	else {
		bound_str = null;
	} 

	return {
		bound : bound_str,
		next_index : next_index
	}

	
}
BoundParser.parse = parse;


module.exports = BoundParser;