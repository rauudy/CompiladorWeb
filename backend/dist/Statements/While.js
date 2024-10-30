"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoopControlStatements_js_1 = require("./LoopControlStatements.js");
class WhileStmt {
    constructor(condition, body, location) {
        this.condition = condition;
        this.body = body;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        let breakLoop = false;
        while (!breakLoop && this.condition.interpret(ctx)) {
            try {
                const result = this.body.interpret(ctx);
                if (result) {
                    output += result;
                }
            }
            catch (e) {
                if (e instanceof LoopControlStatements_js_1.LoopBreakSignal) {
                    breakLoop = true;
                }
                else if (e instanceof LoopControlStatements_js_1.LoopContinueSignal) {
                    // Solo continúa al siguiente ciclo
                    continue;
                }
                else if (e instanceof LoopControlStatements_js_1.LoopReturnSignal) {
                    return e.value;
                }
                else {
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
exports.default = WhileStmt;
//# sourceMappingURL=While.js.map