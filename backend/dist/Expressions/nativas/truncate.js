"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
class TruncateExpr extends Natives_1.default {
    interpret(ctx) {
        const result = this.expression.interpret(ctx);
        if (typeof result !== 'number') {
            throw new Error(`Type error: Expected a NUMBER at ${this.location.first_line}:${this.location.first_column}`);
        }
        return Math.trunc(result);
    }
}
exports.default = TruncateExpr;
//# sourceMappingURL=truncate.js.map