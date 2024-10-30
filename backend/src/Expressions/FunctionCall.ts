import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import Context from '../Context/Context.js';
import RuntimeError from '../Exceptions/Runtime.js';
import Function from '../Context/Function.js';

export default class FunctionCallExpr implements Expression {
    private name: string;
    private arguments: Expression[];
    location: TokenLocation;

    constructor(name: string, args: Expression[], location: TokenLocation) {
        this.name = name;
        this.arguments = args;
        this.location = location;
    }

    interpret(ctx: Context) {
        const func = ctx.get(this.name, this.location);
        if (!(func instanceof Function)) {
            throw new RuntimeError(`${this.name} is not a function`, this.location.first_line, this.location.first_column);
        }

        // Evaluate each argument expression
        const evaluatedArgs = this.arguments.map(arg => arg.interpret(ctx));

        return func.call(evaluatedArgs, ctx, this.location);
    }
}