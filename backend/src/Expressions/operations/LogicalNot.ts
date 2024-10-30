import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../../Exceptions/Runtime.js';

export default function getLogicalNot(expr: any, location: TokenLocation) {
    const exprType = typeof expr;
    
    if (exprType === 'boolean') {
        return !expr;
    }
    
    throw new RuntimeError(
        'Logical NOT is undefined for type ' + exprType,
        location.first_line,
        location.first_column
    );
}
