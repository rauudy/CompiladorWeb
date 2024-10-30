"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CastExpr {
    constructor(expr, targetType, location) {
        this.expr = expr;
        this.targetType = targetType;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.expr.interpret(ctx);
        switch (this.targetType) {
            case 'int':
                if (typeof value === 'string' && value.length === 1) {
                    return value.charCodeAt(0);
                }
                return Math.floor(Number(value));
            case 'double':
                if (typeof value === 'string' && value.length === 1) {
                    return value.charCodeAt(0) * 1.0;
                }
                return Number(value);
            case 'string':
                return String(value);
            case 'char':
                if (typeof value === 'number') {
                    return String.fromCharCode(Math.floor(value));
                }
                return String(value).charAt(0);
            default:
                throw new Error(`Tipo de casteo no soportado: ${this.targetType}`);
        }
    }
}
exports.default = CastExpr;
//# sourceMappingURL=Casteo.js.map