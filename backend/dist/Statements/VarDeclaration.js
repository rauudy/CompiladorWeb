"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const WrapInSym_js_1 = __importDefault(require("../Context/WrapInSym.js"));
const Vector_js_1 = require("./Vector.js");
class VarDeclarationStmt {
    constructor(identifier, type, expr, location, isConstant = false) {
        this.identifier = identifier;
        this.type = type;
        this.expr = expr;
        this.location = location;
        this.isConstant = isConstant;
    }
    interpret(ctx) {
        let value = this.expr ? this.expr.interpret(ctx) : null;
        // Validar y asignar valores por defecto dependiendo del tipo
        switch (this.type.toUpperCase()) {
            case 'INT':
                if (value === null) {
                    value = 0;
                }
                else if (typeof value === 'number') {
                    value = Math.floor(value); // Convertir a entero
                }
                else {
                    throw new Error(`Type mismatch: expected INT but received ${typeof value}`);
                }
                break;
            case 'DOUBLE':
                if (value === null) {
                    value = 0.0;
                }
                else if (typeof value === 'number') {
                    // No se requiere conversión
                }
                else {
                    throw new Error(`Type mismatch: expected DOUBLE but received ${typeof value}`);
                }
                break;
            case 'BOOL':
                if (value === null) {
                    value = true; // Asignar valor por defecto
                }
                else if (typeof value === 'boolean') {
                    // No se requiere conversión
                }
                else {
                    throw new Error(`Type mismatch: expected BOOL but received ${typeof value}`);
                }
                break;
            case 'CHAR':
                if (value === null) {
                    value = '\u0000'; // Asignar valor por defecto
                }
                else if (typeof value === 'string' && value.length === 1) {
                    // No se requiere conversión
                }
                else {
                    throw new Error(`Type mismatch: expected CHAR but received ${typeof value}`);
                }
                break;
            case 'STRING':
                if (value === null) {
                    value = ''; // Asignar valor por defecto
                }
                else if (typeof value === 'string') {
                    // No se requiere conversión
                }
                else {
                    throw new Error(`Type mismatch: expected STRING but received ${typeof value}`);
                }
                break;
            case 'NULL':
                value = null; // No se necesita cambiar nada
                break;
            default:
                throw new Error(`Unknown type: ${this.type}`);
        }
        const symbol = (0, WrapInSym_js_1.default)(this.type, value, this.location, this.isConstant);
        if (symbol instanceof Vector_js_1.Vector) {
            throw new Runtime_js_1.default(`Vector type not allowed for variable ${this.identifier}`, this.location.first_line, this.location.first_column);
        }
        ctx.declare(this.identifier, symbol, this.location);
    }
}
exports.default = VarDeclarationStmt;
//# sourceMappingURL=VarDeclaration.js.map