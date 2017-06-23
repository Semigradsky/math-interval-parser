'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var XRegExp = require("xregexp");
var value = '[-+]?(?:Infinity|[[0-9]*\\.?\\d*(?:[eE][-+]?\\d+)?)';
var mathInterval = XRegExp("(?<leftBrace>  [\\(\\]\\[] )                                (?<fromValue>  " + value + "    )?                               (?<delimeter>  ,           )?                               (?<toValue>    " + value + "    )?                               (?<rightBrace> [\\)\\]\\[] )", 'x');
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
                    match.fromValue !== undefined ?
                        +match.fromValue :
                        NaN),
            included: match.rightBrace === ']'
        }
    };
}
function check(interval) {
    if (interval.from.value === interval.to.value) {
        return interval.from.included && interval.to.included;
    }
    return Math.min(interval.from.value, interval.to.value) === interval.from.value;
}
function entry(str) {
    var interval = parse(str);
    if (!interval || !check(interval)) {
        return null;
    }
    return interval;
}
exports.default = entry;
