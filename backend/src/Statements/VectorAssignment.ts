import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';

export class VectorAssignmentStmt implements Statement {
    private identifier: string;
    private indices: Expression[];
    private expr: Expression;
    location: TokenLocation;

    constructor(identifier: string, indices: Expression[], expr: Expression, location: TokenLocation) {
        this.identifier = identifier;
        this.indices = indices;
        this.expr = expr;
        this.location = location;
    }

    interpret(ctx: Context) {
        const indices = this.indices.map(index => index.interpret(ctx));
        const value = this.expr.interpret(ctx);
        ctx.setVector(this.identifier, indices, value, this.location);
    }
}