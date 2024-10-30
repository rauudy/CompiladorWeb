import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import RuntimeError from '../Exceptions/Runtime.js';
import { Type } from '../Expressions/Types.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';
import wrapInSym from '../Context/WrapInSym.js';
import { Vector } from './Vector.js';

export default class VarDeclarationStmt implements Statement {
    public identifier: string;
    public type: Type;
    public expr: Expression | null;
    public isConstant: boolean;
    location: TokenLocation;

    constructor(
        identifier: string,
        type: Type,
        expr: Expression | null,
        location: TokenLocation,
        isConstant: boolean = false
    ) {
        this.identifier = identifier;
        this.type = type;
        this.expr = expr;
        this.location = location;
        this.isConstant = isConstant;
    }

    interpret(ctx: Context) {
        let value = this.expr ? this.expr.interpret(ctx) : null;
    
        // Validar y asignar valores por defecto dependiendo del tipo
        switch (this.type.toUpperCase()) {
            case 'INT':
                if (value === null) {
                    value = 0;
                } else if (typeof value === 'number') {
                    value = Math.floor(value); // Convertir a entero
                } else {
                    throw new Error(`Type mismatch: expected INT but received ${typeof value}`);
                }
                break;
    
            case 'DOUBLE':
                if (value === null) {
                    value = 0.0;
                } else if (typeof value === 'number') {
                    // No se requiere conversión
                } else {
                    throw new Error(`Type mismatch: expected DOUBLE but received ${typeof value}`);
                }
                break;
    
            case 'BOOL':
                if (value === null) {
                    value = true; // Asignar valor por defecto
                } else if (typeof value === 'boolean') {
                    // No se requiere conversión
                } else {
                    throw new Error(`Type mismatch: expected BOOL but received ${typeof value}`);
                }
                break;
    
            case 'CHAR':
                if (value === null) {
                    value = '\u0000'; // Asignar valor por defecto
                } else if (typeof value === 'string' && value.length === 1) {
                    // No se requiere conversión
                } else {
                    throw new Error(`Type mismatch: expected CHAR but received ${typeof value}`);
                }
                break;
    
            case 'STRING':
                if (value === null) {
                    value = ''; // Asignar valor por defecto
                } else if (typeof value === 'string') {
                    // No se requiere conversión
                } else {
                    throw new Error(`Type mismatch: expected STRING but received ${typeof value}`);
                }
                break;
    
            case 'NULL':
                value = null; // No se necesita cambiar nada
                break;
    
            default:
                throw new Error(`Unknown type: ${this.type}`);
        }
    
        const symbol = wrapInSym(this.type, value, this.location, this.isConstant);
        if (symbol instanceof Vector) {
            throw new RuntimeError(`Vector type not allowed for variable ${this.identifier}`, this.location.first_line, this.location.first_column);
        }
        ctx.declare(this.identifier, symbol, this.location);
    }
    
}