import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';
import { LoopBreakSignal, LoopContinueSignal, LoopReturnSignal } from './LoopControlStatements.js';

class DoUntilStmt implements Statement {
    private body: Statement;
    private condition: Expression;
    location: TokenLocation;

    constructor(body: Statement, condition: Expression, location: TokenLocation) {
        this.body = body;
        this.condition = condition;
        this.location = location;
    }

    interpret(ctx: Context) {
        let output = '';
        
        do {
            try {
                output += this.body.interpret(ctx);
            } catch (e) {
                if (e instanceof LoopBreakSignal) {
                    break;
                } else if (e instanceof LoopContinueSignal) {
                    continue;
                } else if (e instanceof LoopReturnSignal) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        } while (this.condition.interpret(ctx));

        return output;
    }
}

export default DoUntilStmt;