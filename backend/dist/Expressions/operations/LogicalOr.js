"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLogicalOr;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getLogicalOr(left, right, location) {
    var _a, _b;
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType === 'boolean' && rightType === 'boolean') {
        return left || right;
    }
    throw new Runtime_js_1.default(`Logical OR is undefined for types ${leftType} and ${rightType}`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
}
//# sourceMappingURL=LogicalOr.js.map