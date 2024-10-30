import { TokenLocation } from '@ts-jison/common';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

export class VectorInitExpr implements Expression {
    private baseType: string;
    private sizes: Expression[];
    location: TokenLocation;

    constructor(baseType: string, sizes: Expression[], location: TokenLocation) {
        this.baseType = baseType;
        this.sizes = sizes;
        this.location = location;
    }

    interpret(ctx: Context) {
        const dimensions = this.sizes.map(size => size.interpret(ctx));
        return this.createVector(dimensions);
    }

    private createVector(dimensions: number[]): any {
        if (dimensions.length === 1) {
            return new Array(dimensions[0]).fill(null);
        } else {
            return new Array(dimensions[0]).fill(null).map(() => this.createVector(dimensions.slice(1)));
        }
    }
}
