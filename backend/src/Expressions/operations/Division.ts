import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getDivision(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;

    // Función auxiliar para verificar división por cero
    const checkZeroDivision = (value: number) => {
        if (value === 0) {
            throw new RuntimeError(
                `Division by zero`,
                location?.first_line ?? 0, 
                location?.first_column ?? 0
            );
        }
    };

    // Entero
    if (leftType === 'number' && Number.isInteger(left)) {
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left / right; // Entero / Entero o Decimal (siempre devuelve Decimal)
        }
        if (rightType === 'string' && right.length === 1) {
            const charCode = right.charCodeAt(0);
            checkZeroDivision(charCode);
            return left / right.charCodeAt(0); // Entero / Carácter
        }
    }

    // Decimal
    if (leftType === 'number' && !Number.isInteger(left)) {
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left / right; // Decimal / Entero o Decimal
        }
        if (rightType === 'string' && right.length === 1) {
            const charCode = right.charCodeAt(0);
            checkZeroDivision(charCode);
            return left / right.charCodeAt(0); // Decimal / Carácter
        }
    }

    // Carácter
    if (leftType === 'string' && left.length === 1) {
        const leftCharCode = left.charCodeAt(0);
        if (rightType === 'number') {
            checkZeroDivision(right);
            return left.charCodeAt(0) / right; // Carácter / Entero o Decimal
        }
    }

    throw new RuntimeError(
        `Division is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0, 
        location?.first_column ?? 0
    );
}