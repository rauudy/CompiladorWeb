"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLogicalNot;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getLogicalNot(expr, location) {
    const exprType = typeof expr;
    if (exprType === 'boolean') {
        return !expr;
    }
    throw new Runtime_js_1.default('Logical NOT is undefined for type ' + exprType, location.first_line, location.first_column);
}
//# sourceMappingURL=LogicalNot.js.map