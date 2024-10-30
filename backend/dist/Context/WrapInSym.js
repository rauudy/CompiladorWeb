"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapInSym;
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const Vector_js_1 = require("../Statements/Vector.js");
function wrapInSym(type, value, location, isConstant = false) {
    if (typeof type === 'object' && 'baseType' in type) {
        // It's a vector type
        if (!(value instanceof Array)) {
            throw new Runtime_js_1.default(`Expected array for vector, got ${typeof value}`, location.first_line, location.first_column);
        }
        return new Vector_js_1.Vector(type, value);
    }
    else {
        // It's a scalar type
        const symbol = {
            value: value,
            type: type,
            isConstant: isConstant
        };
        switch (type.toUpperCase()) {
            case 'INT':
                if (typeof value === 'number' && Number.isInteger(value)) {
                    return symbol;
                }
                break;
            case 'DOUBLE':
                if (typeof value === 'number') {
                    return symbol;
                }
                break;
            case 'BOOL':
                if (typeof value === 'boolean') {
                    return symbol;
                }
                break;
            case 'CHAR':
                if (typeof value === 'string' && value.length === 1) {
                    return symbol;
                }
                break;
            case 'STRING':
                if (typeof value === 'string') {
                    return symbol;
                }
                break;
            case 'NULL':
                if (value === null) {
                    return symbol;
                }
                break;
        }
        throw new Runtime_js_1.default(`Invalid value for type ${type}: (${typeof value}) ${value}`, location.first_line, location.first_column);
    }
}
//# sourceMappingURL=WrapInSym.js.map