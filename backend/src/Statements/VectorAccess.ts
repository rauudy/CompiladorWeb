import { TokenLocation } from '@ts-jison/common';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

export class VectorAccessExpr implements Expression {
    private identifier: string;
    private indices: Expression[];
    location: TokenLocation;

    constructor(identifier: string, indices: Expression[], location: TokenLocation) {
        this.identifier = identifier;
        this.indices = indices;
        this.location = location;
    }

    interpret(ctx: Context) {
        const indices = this.indices.map(index => index.interpret(ctx));
        //validar que los indices sean enteros, positivos desde 0, si llega un -1 retronar un null
        if (indices.some(index => !Number.isInteger(index) || index < 0)) {
            return null;
        }
        return ctx.getVector(this.identifier, indices, this.location);
    }
}
