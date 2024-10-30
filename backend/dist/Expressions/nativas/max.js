"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VectorOperation_1 = __importDefault(require("./VectorOperation"));
const Vector_1 = require("../../Statements/Vector");
class MaxExpr extends VectorOperation_1.default {
    getVector(ctx) {
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector_1.Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues();
    }
    interpret(ctx) {
        const vector = this.getVector(ctx);
        const type = this.inferVectorType(vector);
        switch (type) {
            case 'int':
            case 'double':
                return Math.max(...vector);
            case 'char':
            case 'string':
                return vector.reduce((max, current) => current > max ? current : max);
            case 'bool':
                return vector.includes(true);
            default:
                throw new Error(`Unsupported vector type for max operation: ${type}`);
        }
    }
}
exports.default = MaxExpr;
//# sourceMappingURL=max.js.map