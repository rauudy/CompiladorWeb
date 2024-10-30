"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VectorOperation_1 = __importDefault(require("./VectorOperation"));
const Vector_1 = require("../../Statements/Vector");
class MinExpr extends VectorOperation_1.default {
    getVector(ctx) {
        // Get the vector's raw values
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector_1.Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues(); // Assuming Vector class has a values property
    }
    interpret(ctx) {
        const vector = this.getVector(ctx);
        const type = this.inferVectorType(vector);
        switch (type) {
            case 'int':
            case 'double':
                return Math.min(...vector);
            case 'char':
            case 'string':
                return vector.reduce((min, current) => current < min ? current : min);
            case 'bool':
                return !vector.includes(true);
            default:
                throw new Error(`Unsupported vector type for min operation: ${type}`);
        }
    }
}
exports.default = MinExpr;
//# sourceMappingURL=min.js.map