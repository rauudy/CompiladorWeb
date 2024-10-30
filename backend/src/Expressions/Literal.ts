import { Type } from './Types.js';
import Expression from './Expression.js';
import { TokenLocation } from '@ts-jison/common';
import Context from '../Context/Context.js';

export default class LiteralExpr implements Expression {
    private literal: any;
    private t: Type;
    location: TokenLocation;

    constructor(literal: any, t: Type, location: TokenLocation) {
        this.literal = literal;
        this.t = t;
        this.location = location;
    }

    interpret(ctx: Context) {
        switch (this.t.toUpperCase()) {
            case 'INT':
                if (parseFloat(this.literal) % 1 !== 0) { // Validación de decimal
                    throw new Error(`Type error: Cannot assign a decimal value to an INT variable at ${this.location.first_line}:${this.location.first_column}`);
                }
                return Number(this.literal);
            case 'DOUBLE':
                return parseFloat(this.literal);
            case 'BOOL':
                if (this.literal.toUpperCase() === 'TRUE') {
                    return true;  // Convertir 'true' a booleano
                } else if (this.literal.toUpperCase() === 'FALSE') {
                    return false; // Convertir 'false' a booleano
                } else {
                    throw new Error(`Type error: Expected a boolean literal at ${this.location.first_line}:${this.location.first_column}`);
                }
            case 'STRING':
                return this.literal.replaceAll('"', '');
            case 'NULL':
                return null;
        }
    }
}