'use strict';

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

interface RegexParts {
    leftBrace: '(' | ']' | '[',
    fromValue?: string,
    delimeter?: ',',
    toValue?: string,
    rightBrace: ')' | ']' | '['
}

const patternParts = {
	value: '[-+]?(?:Infinity|[[0-9]*\\.?\\d*(?:[eE][-+]?\\d+)?)',
	leftBrace: '[\\(\\]\\[]',
	delimeter: ',',
	rightBrace: '[\\)\\]\\[]',
};

const PATTERN = new RegExp(
	`(${patternParts.leftBrace})` +
	`(${patternParts.value})?` +
	`(${patternParts.delimeter})?` +
	`(${patternParts.value})?` +
	`(${patternParts.rightBrace})`
);

function execPattern(str: string): RegexParts | null {
	const match = PATTERN.exec(str);

	if (!match) {
		return null;
	}

	const [_, leftBrace, fromValue, delimeter, toValue, rightBrace] = match;

	return {
		leftBrace,
		fromValue,
		delimeter,
		toValue,
		rightBrace,
	} as RegexParts;
}

function parse(str: string): (MathInterval | null) {
    const match = execPattern(str) as RegexParts;
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

function check(interval: MathInterval): boolean {

    if (interval.from.value === interval.to.value) {
        return interval.from.included && interval.to.included;
    }

    return Math.min(interval.from.value, interval.to.value) === interval.from.value;
}

export default function entry(str: string): (MathInterval | null) {
    const interval = parse(str);
    if (!interval || !check(interval)) {
        return null;
    }

    return interval;
}
