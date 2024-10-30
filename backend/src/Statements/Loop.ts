import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import { LoopBreakSignal, LoopContinueSignal, LoopReturnSignal } from './LoopControlStatements.js';

class LoopStmt implements Statement {
    private body: Statement;
    location: TokenLocation;

    constructor(body: Statement, location: TokenLocation) {
        this.body = body;
        this.location = location;
    }

    interpret(ctx: Context) {
        let output = '';
        
        while (true) {
            try {
                // Execute body
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
        }

        return output;
    }
}

export default LoopStmt;