import Context from "../../Context/Context";
import Expression from "../Expression";
import { TokenLocation } from '@ts-jison/common';

abstract class VectorOperationExpr implements Expression {
    protected identifier: string;
    location: TokenLocation;

    constructor(identifier: string, location: TokenLocation) {
        this.identifier = identifier;
        this.location = location;
    }

    abstract interpret(ctx: Context): any;

    protected getVector(ctx: Context): any[] {
        const vector = ctx.getVector(this.identifier, [], this.location);
        
        if (!Array.isArray(vector)) {
            throw new Error(`Type error: Expected a vector at ${this.location.first_line}:${this.location.first_column}`);
        }

        return vector;
    }

    protected inferVectorType(vector: any[]): string {
        if (vector.length === 0) {
            throw new Error(`Cannot infer type of an empty vector`);
        }
        const firstElement = vector[0];
        if (typeof firstElement === 'number') {
            return Number.isInteger(firstElement) ? 'int' : 'double';
        }
        if (typeof firstElement === 'boolean') return 'bool';
        if (typeof firstElement === 'string') {
            return firstElement.length === 1 ? 'char' : 'string';
        }
        throw new Error(`Unsupported vector type`);
    }
}

export default VectorOperationExpr;