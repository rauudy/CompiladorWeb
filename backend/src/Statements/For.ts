import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';
import { LoopBreakSignal, LoopContinueSignal, LoopReturnSignal } from './LoopControlStatements.js';

class ForStmt implements Statement {
    private init: Statement | null;
    private condition: Expression;
    private update: Statement | null;
    private body: Statement;
    location: TokenLocation;

    constructor(init: Statement | null, condition: Expression, update: Statement | null, body: Statement, location: TokenLocation) {
        this.init = init;
        this.condition = condition;
        this.update = update;
        this.body = body;
        this.location = location;
    }

    interpret(ctx: Context) {
        let output = '';
        
        // Crear un nuevo contexto para el ciclo for
        const forContext = new Context();
        forContext.prev = ctx;
        forContext.globalContext = ctx.globalContext;

        // Initialize en el nuevo contexto
        if (this.init) {
            this.init.interpret(forContext);
        }

        // Loop
        while (this.condition.interpret(forContext)) {
            try {
                // Execute body
                output += this.body.interpret(forContext);
                // Update
                if (this.update) {
                    this.update.interpret(forContext);
                }
            } catch (e) {
                if (e instanceof LoopBreakSignal) {
                    break;
                } else if (e instanceof LoopContinueSignal) {
                    if (this.update) {
                        this.update.interpret(forContext);
                    }
                    continue;
                } else if (e instanceof LoopReturnSignal) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        }
        return output;
    }
}

export default ForStmt;