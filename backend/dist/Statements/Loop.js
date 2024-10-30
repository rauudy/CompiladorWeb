"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoopControlStatements_js_1 = require("./LoopControlStatements.js");
class LoopStmt {
    constructor(body, location) {
        this.body = body;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        while (true) {
            try {
                // Execute body
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
        }
        return output;
    }
}
exports.default = LoopStmt;
//# sourceMappingURL=Loop.js.map