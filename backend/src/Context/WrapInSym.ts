import { Type } from '../Expressions/Types.js';
import Sym from './Symbol.js';
import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../Exceptions/Runtime.js';
import { Vector, VectorType } from '../Statements/Vector.js';

export default function wrapInSym(
    type: Type | VectorType,
    value: any,
    location: TokenLocation,
    isConstant: boolean = false
): Sym | Vector {
    if (typeof type === 'object' && 'baseType' in type) {
        // It's a vector type
        if (!(value instanceof Array)) {
            throw new RuntimeError(
                `Expected array for vector, got ${typeof value}`,
                location.first_line,
                location.first_column
            );
        }
        return new Vector(type, value);
    } else {
        // It's a scalar type
        const symbol: Sym = {
            value: value,
            type: type as Type,
            isConstant: isConstant
        };

        switch ((type as Type).toUpperCase()) {
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
        throw new RuntimeError(
            `Invalid value for type ${type}: (${typeof value}) ${value}`,
            location.first_line,
            location.first_column
        );
    }
}