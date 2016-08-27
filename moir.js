
var token_processor = require('./lib/token.processor');
var sqb_processor   = require('./lib/sqb.processor');

function moir(str){

	//Pad with single string. Hack for err on processors
	str = str + ' ';
	var strlen = str.length;
	var processed = [];
	//strlen -1 quick fix for err on processors
	for(var x = 0; x < strlen - 1; x++)
	{
		var token = str[x]; 
		if(token == '['){
			var pToken = sqb_processor.process(str, x);
			processed.push( pToken );
			x = pToken.next_index - 1;
			continue;
		}
		else{
			var pToken = token_processor.process(str, x);
			processed.push( pToken );
			x = pToken.next_index - 1;
			continue;
		}
	}
	var generated_string = '';
	processed.forEach( function (p){
		generated_string += p.str;
	});

	console.log(generated_string);
}
module.exports = moir; 