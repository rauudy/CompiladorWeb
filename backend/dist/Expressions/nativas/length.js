"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
const Vector_js_1 = require("../../Statements/Vector.js");
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
class LengthExpr extends Natives_1.default {
    interpret(ctx) {
        const value = this.expression.interpret(ctx);
        if (typeof value === 'string') {
            return value.length;
        }
        if (value instanceof Vector_js_1.Vector) {
            return value.length();
        }
        if (Array.isArray(value)) {
            return value.length;
        }
        throw new Runtime_js_1.default(`Type error: Expected a STRING or VECTOR at ${this.location.first_line}:${this.location.first_column}`, this.location.first_line, this.location.first_column);
    }
}
exports.default = LengthExpr;
//# sourceMappingURL=length.js.map