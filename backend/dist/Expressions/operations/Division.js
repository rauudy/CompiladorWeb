"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDivision;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getDivision(left, right, location) {
    var _a, _b;
    const leftType = typeof left;
    const rightType = typeof right;
    // Función auxiliar para verificar división por cero
    const checkZeroDivision = (value) => {
        var _a, _b;
        if (value === 0) {
            throw new Runtime_js_1.default(`Division by zero`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
        }
    };
    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left / right; // Entero / Entero o Decimal (siempre devuelve Decimal)
        }
        if (rightType === 'string' && right.length === 1) {
            const charCode = right.charCodeAt(0);
            checkZeroDivision(charCode);
            return left / right.charCodeAt(0); // Entero / Carácter
        }
    }
    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left / right; // Decimal / Entero o Decimal
        }
        if (rightType === 'string' && right.length === 1) {
            const charCode = right.charCodeAt(0);
            checkZeroDivision(charCode);
            return left / right.charCodeAt(0); // Decimal / Carácter
        }
    }
    // Carácter
    if (leftType === 'string' && left.length === 1) {
        const leftCharCode = left.charCodeAt(0);
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left.charCodeAt(0) / right; // Carácter / Entero o Decimal
        }
    }
    throw new Runtime_js_1.default(`Division is undefined for types ${leftType} and ${rightType}`, (_a = location === null || location === void 0 ? void 0 : location.first_line) !== null && _a !== void 0 ? _a : 0, (_b = location === null || location === void 0 ? void 0 : location.first_column) !== null && _b !== void 0 ? _b : 0);
}
//# sourceMappingURL=Division.js.map