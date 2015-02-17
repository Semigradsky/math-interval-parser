# Math interval parser [![Build Status](https://travis-ci.org/Semigradsky/math-interval-parser.svg)](https://travis-ci.org/Semigradsky/math-interval-parser)

> Parse math interval. Notation is accepted as part of [ISO 31-11](http://en.wikipedia.org/wiki/ISO_31-11).


## Install

```sh
$ npm install --save math-interval-parser
```


## Usage

```js
var intervalParse = require('math-interval-parser');

intervalParse('(-10,20.2]'); // or intervalParse(']-10,20.2]');
//=> {
//=>     from: {
//=>         value: -10,
//=>         included: false,
//=>     },
//=>     to: {
//=>         value: 20.2,
//=>         included: true
//=>     }
//=>}

intervalParse('[1e3,)'); // or intervalParse('[1e3,Infinity)');
//=> {
//=>     from: {
//=>         value: 1000,
//=>         included: true,
//=>     },
//=>     to: {
//=>         value: Infinity,
//=>         included: false
//=>     }
//=>}
```

See tests for more details.


## License

MIT © Dmitry Semigradsky
