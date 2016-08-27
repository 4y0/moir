# Moir.js V1.0.0.0

Moir.js is a simple random value generation util. It uses a simple RegEx-like dialect to generate random values. 

## How to use

`npm install moir`

```
var moir = require('moir');
var random_id = moir('[a-z]{30,40}');
console.log(random_id); // szuwmlukrdfcipxlaoivazjvqeqrjlenrhezsu
```

## Moir syntax v1

Moir uses a syntax similar to Javascript's Regex with subtle differences
* Characters not in [] are treated as literals and printed as is i.e `ABC` => ABC
* Empty [] are treated as literals and returned as part of the generated string i.e `ABC{2}[]` => 'ABCC[]'
* [ABC] => A OR B OR C
* [A-Z] => Any character between A and Z
* [0-9] => Any number between 0 and 9
* Moir's cardinality operators include: 
  * \* (zero or more) `[abc]*` => '' OR 'aabbccaaaaabbbaa'  
  * \+ (one or more)  `[ABC]+` => 'A' OR 'B' OR 'C' OR 'AABBABABBACC'
  * ? (zero or one) `A?` => '' OR 'A'
  * {N} (Exactly N) `9{3}` => 999
  * {N,M} (Between N and M) `@{3,4}` => '@@@' OR '@@@@'
  * {N,} (At least N) `u{4}` => 'uuuu' OR 'uuuuuuuuuuu' 
 
  
## More examples

```
var moir = require('moir');
var random_phone = moir('+[0-9]{3}-[0-9]{4}-[0-9]{3}');
console.log(random_phone); // +537-8190-597

var random_date = moir('19[0-9]{2}-[0-1][1-2]-[1-3][0-1]');
console.log(random_date); //1990-02-10


var random_gmail = moir('[a-z]{3}[aeiou]{1,2}[a-z]{4}_?[0-9]{0,2}@gmail.com');
console.log(random_gmail); //obeeeryxa_06@gmail.com
```
