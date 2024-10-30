import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';

export class LoopBreak implements Statement {
    location: TokenLocation;

    constructor(location: TokenLocation) {
        this.location = location;
    }

    interpret(ctx: Context) {
        throw new LoopBreakSignal();
    }
}

export class LoopContinue implements Statement {
    location: TokenLocation;

    constructor(location: TokenLocation) {
        this.location = location;
    }

    interpret(ctx: Context) {
        throw new LoopContinueSignal();
    }
}

export class LoopReturn implements Statement {
    private expression: Expression | null;
    location: TokenLocation;

    constructor(expression: Expression | null, location: TokenLocation) {
        this.expression = expression;
        this.location = location;
    }

    interpret(ctx: Context) {
        const value = this.expression ? this.expression.interpret(ctx) : null;
        throw new LoopReturnSignal(value);
    }
}

export class LoopBreakSignal extends Error {
    constructor() {
        super('LoopBreak');
        this.name = 'LoopBreakSignal';
    }
}

export class LoopContinueSignal extends Error {
    constructor() {
        super('LoopContinue');
        this.name = 'LoopContinueSignal';
    }
}

export class LoopReturnSignal extends Error {
    value: any;

    constructor(value: any) {
        super('LoopReturn');
        this.name = 'LoopReturnSignal';
        this.value = value;
    }
}