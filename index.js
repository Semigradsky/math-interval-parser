'use strict';

var XRegExp = require('xregexp').XRegExp;

var value = '[-+]?(?:Infinity|[[0-9]*\\.?\\d*(?:[eE][-+]?\\d+)?)';

var mathInterval = XRegExp('(?<leftBrace>  [\\(\\]\\[]   )  \
                            (?<fromValue>  ' + value + ' )? \
                            (?<delimeter>  ,             )? \
                            (?<toValue>    ' + value + ' )? \
                            (?<rightBrace> [\\)\\]\\[]   )', 'x');

function parse(str) {
	var match = XRegExp.exec(str, mathInterval);
	if (!match) {
		return null;
	}

	return {
		from: {
			value: match.fromValue !== undefined ?
			       +match.fromValue :
			       -Infinity,
			included: match.leftBrace === '['
		},
		to: {
			value: match.toValue !== undefined ?
			       +match.toValue :
			       (match.delimeter ?
			          +Infinity :
			          +match.fromValue),
			included: match.rightBrace === ']'
		}
	};
}

function check(interval) {
	if (!interval) {
		return false;
	}

	if (interval.from.value === interval.to.value) {
		return interval.from.included && interval.to.included;
	}

	return Math.min(interval.from.value, interval.to.value) === interval.from.value;
}

module.exports = function (str) {
	var interval = parse(str);
	if (!check(interval)) {
		return null;
	}

	return interval;
};
