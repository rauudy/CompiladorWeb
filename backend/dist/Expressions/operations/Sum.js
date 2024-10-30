"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSum;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getSum(left, right, location) {
    var _a, _b, _c, _d, _e, _f;
    const leftType = typeof left;
    const rightType = typeof right;
    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right))
            return left + right; // Entero + Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left + right; // Entero + Decimal
        if (rightType === 'boolean')
            return left + (right ? 1 : 0); // Entero + Boolean
        if (rightType === 'string' && right.length === 1)
            return left + right.charCodeAt(0); // Entero + Carácter = entero
        if (rightType === 'string')
            return left + right; // Entero + Cadena
    }
    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number')
            return left + right; // Decimal + Entero/Decimal
        if (rightType === 'boolean')
            return left + (right ? 1 : 0); // Decimal + Boolean
        if (rightType === 'string' && right.length === 1)
            return left + right.charCodeAt(0); // decimal + Carácter = decimal
        if (rightType === 'string')
            return left + right; // Entero + Cadena
    }
    // Boolean
    if (leftType === 'boolean') {
        if (rightType === 'number')
            return (left ? 1 : 0) + right; // Boolean + Entero/Decimal
        if (rightType === 'string' && right.length === 1) {
            throw new Runtime_js_1.default(`Sum is undefined for types boolean and single character string`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
        } // no se puede, mandar a error
        if (rightType === 'string')
            return left + right; // Boolean + Cadena
    }
    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right))
            return left.charCodeAt(0) + right; // Carácter + Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left.charCodeAt(0) + right; // Carácter + Decimal
        if (rightType === 'boolean') {
            throw new Runtime_js_1.default(`Sum is undefined for types boolean and single character string`, (_c = location === null || location === void 0 ? void 0 : location.first_line) !== null && _c !== void 0 ? _c : 0, (_d = location === null || location === void 0 ? void 0 : location.first_column) !== null && _d !== void 0 ? _d : 0);
        } // no se puede, mandar a error
        if (rightType === 'string')
            return left + right; // Carácter + Cadena/Carácter
    }
    // Cadena
    if (leftType === 'string') {
        if (rightType === 'number' && Number.isInteger(right))
            return left + right; // Entero + Entero
        if (rightType === 'number' && !Number.isInteger(right))
            return left + right; // Entero + Decimal
        if (rightType === 'boolean')
            return left + right; // Entero + Boolean
        if (rightType === 'string')
            return left + right; // Entero + Cadena
    }
    throw new Runtime_js_1.default(`Sum is undefined for types ${leftType} and ${rightType}`, (_e = location === null || location === void 0 ? void 0 : location.first_line) !== null && _e !== void 0 ? _e : 0, (_f = location === null || location === void 0 ? void 0 : location.first_column) !== null && _f !== void 0 ? _f : 0);
}
//# sourceMappingURL=Sum.js.map