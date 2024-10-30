"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
class LowerExpr extends Natives_1.default {
    interpret(ctx) {
        const result = this.expression.interpret(ctx);
        if (typeof result !== 'string') {
            throw new Error(`Type error: Expected a STRING at ${this.location.first_line}:${this.location.first_column}`);
        }
        return result.toLowerCase();
    }
}
exports.default = LowerExpr;
//# sourceMappingURL=lower.js.map