import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import Context from '../Context/Context.js';
import Sym from '../Context/Symbol.js';
import { Vector } from '../Statements/Vector.js';

export default class VarLookUpExpr implements Expression {
    private identifier: string;
    location: TokenLocation;

    constructor(identifier: string, location: TokenLocation) {
        this.identifier = identifier;
        this.location = location;
    }

    interpret(ctx: Context) {
        const symbol = ctx.get(this.identifier, this.location);
        if (symbol === undefined) {
            throw new Error(`Symbol not found for identifier: ${this.identifier}`);
        }

        // Check if the symbol is a Vector or Function first
        if (symbol instanceof Vector || symbol instanceof Function) {
            return symbol;
        }

        // Check if it's a Sym type and has a value
        if (typeof symbol === 'object' && symbol !== null && 'value' in symbol) {
            return (symbol as Sym).value;
        }
        
        throw new Error(`Symbol is not of type Sym for identifier: ${this.identifier}`);
    }
}