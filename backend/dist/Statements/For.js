"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
const LoopControlStatements_js_1 = require("./LoopControlStatements.js");
class ForStmt {
    constructor(init, condition, update, body, location) {
        this.init = init;
        this.condition = condition;
        this.update = update;
        this.body = body;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        // Crear un nuevo contexto para el ciclo for
        const forContext = new Context_js_1.default();
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
            }
            catch (e) {
                if (e instanceof LoopControlStatements_js_1.LoopBreakSignal) {
                    break;
                }
                else if (e instanceof LoopControlStatements_js_1.LoopContinueSignal) {
                    if (this.update) {
                        this.update.interpret(forContext);
                    }
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
exports.default = ForStmt;
//# sourceMappingURL=For.js.map