import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';

export default class ReturnStmt implements Statement {
    private expression: Expression | null;
    location: TokenLocation;

    constructor(expression: Expression | null, location: TokenLocation) {
        this.expression = expression;
        this.location = location;
    }

    interpret(ctx: Context) {
        const value = this.expression ? this.expression.interpret(ctx) : null;
        throw { type: 'return', value };
    }
}