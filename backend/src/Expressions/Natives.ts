import Expression from './Expression.js';
import Context from '../Context/Context.js';
import { TokenLocation } from '@ts-jison/common';

export default abstract class NativeFunctionExpr implements Expression {
    location: TokenLocation;
    protected expression: Expression;

    constructor(expression: Expression, location: TokenLocation) {
        this.expression = expression;
        this.location = location;
    }

    abstract interpret(ctx: Context): any;
}
