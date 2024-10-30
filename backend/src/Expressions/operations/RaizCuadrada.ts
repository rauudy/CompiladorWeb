import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getRooot(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType === 'number') {
        if (rightType === 'number') {
            return Math.pow(left, 1/right);
        }
    }
    throw new RuntimeError(
        `Root is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0, 
        location?.first_column ?? 0
    );
}