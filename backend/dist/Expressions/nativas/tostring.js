"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
class ToStringExpr extends Natives_1.default {
    interpret(ctx) {
        const result = this.expression.interpret(ctx);
        return String(result); // Convierte el valor a string
    }
}
exports.default = ToStringExpr;
//# sourceMappingURL=tostring.js.map