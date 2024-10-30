"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getProduct;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getProduct(left, right, location) {
    var _a, _b;
    const leftType = typeof left;
    const rightType = typeof right;
    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right))
            return left * right; // Entero - Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left * right; // Entero - Decimal
        if (rightType === 'string' && right.length === 1)
            return left * right.charCodeAt(0); // Entero - Carácter
    }
    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number')
            return left * right; // Decimal - Entero/Decimal
        if (rightType === 'string' && right.length === 1)
            return left * right.charCodeAt(0); // Decimal - Carácter
    }
    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right))
            return right * left.charCodeAt(0); // Carácter - Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return right * left.charCodeAt(0); // Carácter - Decimal
    }
    throw new Runtime_js_1.default(`Multiplicate is undefined for types ${leftType} and ${rightType}`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
}
//# sourceMappingURL=Multiplication.js.map