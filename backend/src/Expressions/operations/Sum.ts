import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getSum(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;

    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right)) return left + right; // Entero + Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left + right; // Entero + Decimal
        if (rightType === 'boolean') return left + (right ? 1 : 0); // Entero + Boolean
        if (rightType === 'string' && right.length === 1) return left + right.charCodeAt(0); // Entero + Carácter = entero
        if (rightType === 'string') return left + right; // Entero + Cadena
    }

    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') return left + right; // Decimal + Entero/Decimal
        if (rightType === 'boolean') return left + (right ? 1 : 0); // Decimal + Boolean
        if (rightType === 'string' && right.length === 1) return left + right.charCodeAt(0);// decimal + Carácter = decimal
        if (rightType === 'string') return left + right; // Entero + Cadena
    }

    // Boolean
    if (leftType === 'boolean') {
        if (rightType === 'number') return (left ? 1 : 0) + right; // Boolean + Entero/Decimal
        if (rightType === 'string' && right.length === 1) {
            throw new RuntimeError(
                `Sum is undefined for types boolean and single character string`,
                location?.first_line ?? 0,
                location?.first_column ?? 0
            );
        } // no se puede, mandar a error
        if (rightType === 'string') return left + right; // Boolean + Cadena
    }

    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number' && Number.isInteger(right)) return left.charCodeAt(0) + right; // Carácter + Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left.charCodeAt(0) + right; // Carácter + Decimal
        if (rightType === 'boolean') {
            throw new RuntimeError(
                `Sum is undefined for types boolean and single character string`,
                location?.first_line ?? 0,
                location?.first_column ?? 0
            );
        } // no se puede, mandar a error
        if (rightType === 'string') return left + right; // Carácter + Cadena/Carácter
    }

    // Cadena
    if (leftType === 'string') {
        if (rightType === 'number' && Number.isInteger(right)) return left + right; // Entero + Entero
        if (rightType === 'number' && !Number.isInteger(right)) return left + right; // Entero + Decimal
        if (rightType === 'boolean') return left + right; // Entero + Boolean
        if (rightType === 'string') return left + right; // Entero + Cadena
    }

    throw new RuntimeError(
        `Sum is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0,
        location?.first_column ?? 0
    );
}