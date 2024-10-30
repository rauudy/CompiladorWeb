import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';
import { VectorType } from './Vector.js';

export class VectorDeclarationStmt implements Statement {
    public identifier: string;
    public vectorType: VectorType;
    public initializer: Expression;
    location: TokenLocation;

    constructor(identifier: string, vectorType: VectorType, initializer: Expression, location: TokenLocation) {
        this.identifier = identifier;
        this.vectorType = vectorType;
        this.initializer = initializer;
        this.location = location;
    }

    interpret(ctx: Context) {
        const value = this.initializer.interpret(ctx);
        ctx.declareVector(this.identifier, this.vectorType, value, this.location);
    }
}
