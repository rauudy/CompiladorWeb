import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getProduct(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;
    
    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right)) return left * right; // Entero - Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left * right; // Entero - Decimal
        if (rightType === 'string' && right.length === 1) return left * right.charCodeAt(0); // Entero - Carácter
    }

    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') return left * right; // Decimal - Entero/Decimal
        if (rightType === 'string' && right.length === 1) return left * right.charCodeAt(0); // Decimal - Carácter
    }

    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right)) return right * left.charCodeAt(0); // Carácter - Entero
        if (rightType === 'number' && !Number.isInteger(right)) return right * left.charCodeAt(0); // Carácter - Decimal
    }

    throw new RuntimeError(
        `Multiplicate is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0, 
        location?.first_column ?? 0
    );
}