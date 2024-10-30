"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoopControlStatements_js_1 = require("./LoopControlStatements.js");
class DoUntilStmt {
    constructor(body, condition, location) {
        this.body = body;
        this.condition = condition;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        do {
            try {
                output += this.body.interpret(ctx);
            }
            catch (e) {
                if (e instanceof LoopControlStatements_js_1.LoopBreakSignal) {
                    break;
                }
                else if (e instanceof LoopControlStatements_js_1.LoopContinueSignal) {
                    continue;
                }
                else if (e instanceof LoopControlStatements_js_1.LoopReturnSignal) {
                    return e.value;
                }
                else {
                    throw e;
                }
            }
        } while (this.condition.interpret(ctx));
        return output;
    }
}
exports.default = DoUntilStmt;
//# sourceMappingURL=DoUntil.js.map