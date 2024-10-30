import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getComparison(
    left: any,
    operator: string,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;

    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number' && Number.isInteger(right)) return compare(left, operator, right); // Entero y Entero
        if (rightType === 'number' && !Number.isInteger(right)) return compare(left, operator, right); // Entero y Decimal
        if (rightType === 'boolean') throwTypeError(leftType, rightType, location); // Entero y Boolean -> Error
        if (rightType === 'string' && right.length === 1) return compare(left, operator, right.charCodeAt(0)); // Entero y Carácter
        if (rightType === 'string') throwTypeError(leftType, rightType, location); // Entero y Cadena -> Error
        if (right === null) return compare(left, operator, 0); // Entero y Nulo -> Comparar con 0
    }

    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') return compare(left, operator, right); // Decimal y Entero/Decimal
        if (rightType === 'boolean') throwTypeError(leftType, rightType, location); // Decimal y Boolean -> Error
        if (rightType === 'string' && right.length === 1) return compare(left, operator, right.charCodeAt(0)); // Decimal y Carácter
        if (rightType === 'string') throwTypeError(leftType, rightType, location); // Decimal y Cadena -> Error
        if (right === null) return compare(left, operator, 0); // Decimal y Nulo -> Comparar con 0
    }

    // Boolean
    if (leftType === 'boolean') {
        if (rightType === 'number') throwTypeError(leftType, rightType, location); // Boolean y Entero/Decimal -> Error
        if (rightType === 'boolean') return compare(left ? 1 : 0, operator, right ? 1 : 0); // Boolean y Boolean
        if (rightType === 'string') throwTypeError(leftType, rightType, location); // Boolean y Cadena/Carácter -> Error
        if (right === null) return compare(left ? 1 : 0, operator, 0); // Boolean y Nulo
    }

    // Carácter (asumiendo que un carácter es una string de longitud 1)
    if (leftType === 'string' && left.length === 1) {
        if (rightType === 'number') return compare(left.charCodeAt(0), operator, right); // Carácter y Entero/Decimal
        if (rightType === 'boolean') throwTypeError(leftType, rightType, location); // Carácter y Boolean -> Error
        if (rightType === 'string' && right.length === 1) return compare(left.charCodeAt(0), operator, right.charCodeAt(0)); // Carácter y Carácter
        if (rightType === 'string') throwTypeError(leftType, rightType, location); // Carácter y Cadena -> Error
        if (right === null) return compare(left.charCodeAt(0), operator, 0); // Carácter y Nulo -> Comparar con 0
    }

    // Cadena
    if (leftType === 'string') {
        if (rightType === 'number' || rightType === 'boolean') throwTypeError(leftType, rightType, location); // Cadena y Entero/Decimal/Boolean -> Error
        if (rightType === 'string') return compare(left, operator, right); // Cadena y Cadena
        if (right === null) return compare(left, operator, ""); // Cadena y Nulo -> Comparar con cadena vacía
    }

    // Nulo
    if (left === null) {
        if (rightType === 'number') return compare(0, operator, right); // Nulo y Entero/Decimal
        if (rightType === 'boolean') return compare(0, operator, right ? 1 : 0); // Nulo y Boolean
        if (rightType === 'string') return compare("", operator, right); // Nulo y Cadena
        if (right === null) return compare(0, operator, 0); // Nulo y Nulo
    }

    throw new RuntimeError(
        `Comparison is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0,
        location?.first_column ?? 0
    );
}

// Helper function to perform the comparison
function compare(left: any, operator: string, right: any): boolean {
    switch (operator) {
        case '==': return left == right;
        case '!=': return left != right;
        case '<': return left < right;
        case '>': return left > right;
        case '<=': return left <= right;
        case '>=': return left >= right;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

// Helper function to throw a type error
function throwTypeError(leftType: string, rightType: string, location?: TokenLocation) {
    throw new RuntimeError(
        `Comparison is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0,
        location?.first_column ?? 0
    );
}
