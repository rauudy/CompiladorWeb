import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import getDifference from './operations/Substraction.js';
import getSum from './operations/Sum.js';
import getComparison from './operations/Relational.js';
import Context from '../Context/Context.js';
import getProduct from './operations/Multiplication.js';
import getDivision from './operations/Division.js';
import getPower from './operations/Potencia.js';
import getRooot from './operations/RaizCuadrada.js';
import getModulo from './operations/Modulo.js';
import getLogicalOr from './operations/LogicalOr.js';
import getLogicalAnd from './operations/LogicalAnd.js';

export default class BinaryExpr implements Expression {
    private left: Expression;
    private right: Expression;
    private operator: string;
    location: TokenLocation;

    constructor(
        left: Expression,
        operator: string,
        right: Expression,
        location: TokenLocation
    ) {
        this.left = left;
        this.right = right;
        this.operator = operator;
        this.location = location;
    }

    interpret(ctx: Context) {
        const left = this.left.interpret(ctx);
        const right = this.right.interpret(ctx);

        switch (this.operator) {
            case '+':
                return getSum(left, right, this.location);
            case '-':
                return getDifference(left, right, this.location);
            case '*':
                return getProduct(left, right, this.location);
            case '/':
                return getDivision(left, right, this.location);
            case '^':
                return getPower(left, right, this.location);
            case '$':
                return getRooot(left, right, this.location);
            case '%':
                return getModulo(left, right, this.location);
            case '==':
                return getComparison(left, this.operator, right, this.location);
            case '!=':
                return getComparison(left, this.operator, right, this.location);
            case '<':
                return getComparison(left, this.operator, right, this.location);
            case '<=':
                return getComparison(left, this.operator, right, this.location);
            case '>':
                return getComparison(left, this.operator, right, this.location);
            case '>=':
                return getComparison(left, this.operator, right, this.location);
            case '||':
                return getLogicalOr(left, right, this.location);
            case '&&':
                //que valores llegan a la funcion
                //console.log("izquierda"+left);
                //console.log("derecha"+right);
                return getLogicalAnd(left, right, this.location);
        }
    }
}