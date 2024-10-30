"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNegation;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getNegation(expr, location) {
    const exprType = typeof expr;
    if (exprType === 'number') {
        return expr * -1;
    }
    throw new Runtime_js_1.default('Negation is undefined for type ' + exprType, location.first_line, location.first_column);
}
//# sourceMappingURL=Negation.js.map