/// <reference path="../typings/tsd.d.ts" />
'use strict';

import { XRegExp } from 'xregexp';

export interface MathInterval {
    from: {
        value: number,
        included: boolean
    },
    to: {
        value: number,
        included: boolean
    }
}



const value = '[-+]?(?:Infinity|[[0-9]*\\.?\\d*(?:[eE][-+]?\\d+)?)';

const mathInterval = XRegExp(`(?<leftBrace>  [\\(\\]\\[] )  \
                              (?<fromValue>  ${value}    )? \
                              (?<delimeter>  ,           )? \
                              (?<toValue>    ${value}    )? \
                              (?<rightBrace> [\\)\\]\\[] )`, 'x');

function parse(str: string): MathInterval {
    const match: any = XRegExp.exec(str, mathInterval);
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

function check(interval: MathInterval): boolean {
    if (!interval) {
        return false;
    }

    if (interval.from.value === interval.to.value) {
        return interval.from.included && interval.to.included;
    }

    return Math.min(interval.from.value, interval.to.value) === interval.from.value;
}

export default function entry(str: string): MathInterval {
    const interval = parse(str);
    if (!check(interval)) {
        return null;
    }

    return interval;
};
