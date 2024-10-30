"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VectorOperation_1 = __importDefault(require("./VectorOperation"));
const Vector_1 = require("../../Statements/Vector");
class AverageExpr extends VectorOperation_1.default {
    getVector(ctx) {
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector_1.Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues();
    }
    interpret(ctx) {
        const vector = this.getVector(ctx);
        if (vector.length === 0) {
            throw new Error(`Cannot calculate average of an empty vector`);
        }
        const type = this.inferVectorType(vector);
        switch (type) {
            case 'int':
            case 'double':
                return vector.reduce((sum, current) => sum + current, 0) / vector.length;
            case 'char':
                return vector.reduce((sum, current) => sum + current.charCodeAt(0), 0) / vector.length;
            case 'bool':
                return vector.filter(Boolean).length / vector.length;
            case 'string':
                throw new Error(`Cannot calculate average of string vector`);
            default:
                throw new Error(`Unsupported vector type for average operation: ${type}`);
        }
    }
}
exports.default = AverageExpr;
//# sourceMappingURL=average.js.map