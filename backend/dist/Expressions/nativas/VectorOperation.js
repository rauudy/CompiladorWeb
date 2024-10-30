"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VectorOperationExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    getVector(ctx) {
        const vector = ctx.getVector(this.identifier, [], this.location);
        if (!Array.isArray(vector)) {
            throw new Error(`Type error: Expected a vector at ${this.location.first_line}:${this.location.first_column}`);
        }
        return vector;
    }
    inferVectorType(vector) {
        if (vector.length === 0) {
            throw new Error(`Cannot infer type of an empty vector`);
        }
        const firstElement = vector[0];
        if (typeof firstElement === 'number') {
            return Number.isInteger(firstElement) ? 'int' : 'double';
        }
        if (typeof firstElement === 'boolean')
            return 'bool';
        if (typeof firstElement === 'string') {
            return firstElement.length === 1 ? 'char' : 'string';
        }
        throw new Error(`Unsupported vector type`);
    }
}
exports.default = VectorOperationExpr;
//# sourceMappingURL=VectorOperation.js.map