import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getDifference(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;

    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right)) return left - right; // Entero - Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left - right; // Entero - Decimal
        if (rightType === 'boolean') return left - (right ? 1 : 0); // Entero - Boolean
        if (rightType === 'string' && right.length === 1) return left - right.charCodeAt(0); // Entero - Carácter
    }

    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') return left - right; // Decimal - Entero/Decimal
        if (rightType === 'boolean') return left - (right ? 1 : 0); // Decimal - Boolean
        // if (rightType === 'string' && right.length === 1) return leftz; // Decimal - Carácter
        if (rightType === 'string' && right.length === 1) return left - right.charCodeAt(0); // Decimal - Carácter
    }

    // Boolean
    if (leftType === 'boolean') {
        if (rightType === 'number' && Number.isInteger(right)) return (left ? 1 : 0) - right; // Boolean - Entero
        if (rightType === 'number' && !Number.isInteger(right)) return (left ? 1 : 0) - right; // Boolean - Decimal
    }

    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right)) return left.charCodeAt(0) - right; // Carácter - Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left.charCodeAt(0) - right; // Carácter - Decimal
    }

    throw new RuntimeError(
        `Difference is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0, 
        location?.first_column ?? 0
    );
}