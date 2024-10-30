"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
const Echo_js_1 = __importDefault(require("./Echo.js"));
class BlockStmt {
    constructor(stmts, location) {
        this.stmts = stmts;
        this.location = location;
    }
    interpret(ctx) {
        const blockContext = new Context_js_1.default();
        blockContext.prev = ctx;
        let output = '';
        for (const stmt of this.stmts) {
            if (stmt instanceof Echo_js_1.default) {
                output += stmt.interpret(blockContext) + '\n';
            }
            else {
                stmt.interpret(blockContext);
            }
        }
        return output;
    }
}
exports.default = BlockStmt;
//# sourceMappingURL=Block.js.map