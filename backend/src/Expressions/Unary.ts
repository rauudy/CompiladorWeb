import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import getNegation from './operations/Negation.js';
import Context from '../Context/Context.js';
import getLogicalNot from './operations/LogicalNot.js';

export default class UnaryExpr implements Expression {
    private operator: string;
    private expr: Expression;
    location: TokenLocation;

    constructor(operator: string, expr: Expression, location: TokenLocation) {
        this.operator = operator;
        this.expr = expr;
        this.location = location;
    }

    interpret(ctx: Context) {
        const expr = this.expr.interpret(ctx);
        switch (this.operator) {
            case '-':
                return getNegation(expr, this.location);
            case '!':
                return getLogicalNot(expr, this.location);
        }
    }
}