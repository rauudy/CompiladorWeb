import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';
import { LoopBreakSignal, LoopContinueSignal, LoopReturnSignal } from './LoopControlStatements.js';

class WhileStmt implements Statement {
    private condition: Expression;
    private body: Statement;
    location: TokenLocation;

    constructor(condition: Expression, body: Statement, location: TokenLocation) {
        this.condition = condition;
        this.body = body;
        this.location = location;
    }

    interpret(ctx: Context) {
        let output = '';
        let breakLoop = false;
        
        while (!breakLoop && this.condition.interpret(ctx)) {
            try {
                const result = this.body.interpret(ctx);
                if (result) {
                    output += result;
                }
            } catch (e) {
                if (e instanceof LoopBreakSignal) {
                    breakLoop = true;
                } else if (e instanceof LoopContinueSignal) {
                    // Solo continúa al siguiente ciclo
                    continue;
                } else if (e instanceof LoopReturnSignal) {
                    return e.value;
                } else {
                    throw e;
                }
            }

            if (breakLoop) {
                break;
            }
        }

        return output;
    }
}

export default WhileStmt;