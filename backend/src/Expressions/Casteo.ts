import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import Context from '../Context/Context.js';

export default class CastExpr implements Expression {
    private expr: Expression;
    private targetType: string;
    location: TokenLocation;

    constructor(expr: Expression, targetType: string, location: TokenLocation) {
        this.expr = expr;
        this.targetType = targetType;
        this.location = location;
    }

    interpret(ctx: Context) {
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