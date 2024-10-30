"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDifference;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getDifference(left, right, location) {
    var _a, _b;
    const leftType = typeof left;
    const rightType = typeof right;
    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right))
            return left - right; // Entero - Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left - right; // Entero - Decimal
        if (rightType === 'boolean')
            return left - (right ? 1 : 0); // Entero - Boolean
        if (rightType === 'string' && right.length === 1)
            return left - right.charCodeAt(0); // Entero - Carácter
    }
    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number')
            return left - right; // Decimal - Entero/Decimal
        if (rightType === 'boolean')
            return left - (right ? 1 : 0); // Decimal - Boolean
        // if (rightType === 'string' && right.length === 1) return leftz; // Decimal - Carácter
        if (rightType === 'string' && right.length === 1)
            return left - right.charCodeAt(0); // Decimal - Carácter
    }
    // Boolean
    if (leftType === 'boolean') {
        if (rightType === 'number' && Number.isInteger(right))
            return (left ? 1 : 0) - right; // Boolean - Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return (left ? 1 : 0) - right; // Boolean - Decimal
    }
    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right))
            return left.charCodeAt(0) - right; // Carácter - Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left.charCodeAt(0) - right; // Carácter - Decimal
    }
    throw new Runtime_js_1.default(`Difference is undefined for types ${leftType} and ${rightType}`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
}
//# sourceMappingURL=Substraction.js.map