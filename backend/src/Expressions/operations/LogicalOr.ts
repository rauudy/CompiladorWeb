import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getLogicalOr(
    left: any,
    right: any,
    location?: TokenLocation
) {
    const leftType = typeof left;
    const rightType = typeof right;
    
    if (leftType === 'boolean' && rightType === 'boolean') {
        return left || right;
    }
    
    throw new RuntimeError(
        `Logical OR is undefined for types ${leftType} and ${rightType}`,
        location?.first_line ?? 0, 
        location?.first_column ?? 0
    );
}
