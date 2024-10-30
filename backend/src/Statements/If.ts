import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

class IfStmt implements Statement {
    private condition: Expression;
    private thenBranch: Statement;
    private elseBranch: Statement | null;
    location: TokenLocation;

    constructor(condition: Expression, thenBranch: Statement, elseBranch: Statement | null, location: TokenLocation) {
        this.condition = condition;
        this.thenBranch = thenBranch;
        this.elseBranch = elseBranch;
        this.location = location;
    }

    interpret(ctx: Context) {
        const conditionValue = this.condition.interpret(ctx);
        let output = '';
    
        if (conditionValue) {
            output = this.thenBranch.interpret(ctx); // Almacena el resultado de la rama "then"
        } else if (this.elseBranch !== null) {
            output = this.elseBranch.interpret(ctx); // Almacena el resultado de la rama "else"
        }
    
        return output; // Retorna el output acumulado, que puede ser una cadena vacía si no hay nada
    }
}

export default IfStmt;