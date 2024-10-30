"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getModulo;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getModulo(left, right, location) {
    var _a, _b;
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType === 'number') {
        if (rightType === 'number') {
            return left % right;
        }
    }
    throw new Runtime_js_1.default(`Root is undefined for types ${leftType} and ${rightType}`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
}
//# sourceMappingURL=Modulo.js.map