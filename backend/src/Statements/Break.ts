import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';

export class BreakStmt implements Statement {
    location: TokenLocation;

    constructor(location: TokenLocation) {
        this.location = location;
    }

    interpret(ctx: Context) {
        throw { type: 'break' };
    }
}