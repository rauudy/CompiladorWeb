"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
class IsExpr extends Natives_1.default {
    constructor(expression, type, location) {
        super(expression, location);
        this.type = type.toUpperCase();
    }
    interpret(ctx) {
        const result = this.expression.interpret(ctx);
        const resultType = typeof result;
        // Ajuste para verificar los tipos
        switch (this.type) {
            case 'INT':
                return resultType === 'number' && Number.isInteger(result); // Verifica que sea un número y entero
            case 'DOUBLE':
                return resultType === 'number' && !Number.isInteger(result); // Verifica que sea un número y no entero
            case 'CHAR':
                return resultType === 'string' && result.length === 1; // Verifica que sea una cadena de longitud
            case 'STRING':
                return resultType === 'string'; // Verifica que sea una cadena
            case 'BOOL':
                return resultType === 'boolean'; // Verifica que sea booleano
            default:
                return false; // Tipo no reconocido
        }
    }
}
exports.default = IsExpr;
//# sourceMappingURL=is.js.map