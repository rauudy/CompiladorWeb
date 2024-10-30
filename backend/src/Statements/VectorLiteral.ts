import { TokenLocation } from '@ts-jison/common';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

export class VectorLiteralExpr implements Expression {
    private values: Expression[];
    location: TokenLocation;

    constructor(values: Expression[], location: TokenLocation) {
        this.values = values;
        this.location = location;
    }

    interpret(ctx: Context) {
        return this.values.map(value => value.interpret(ctx));
    }
}
