"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WrapInSym_js_1 = __importDefault(require("../Context/WrapInSym.js"));
class ConstDeclarationStmt {
    constructor(identifier, type, expr, location) {
        this.identifier = identifier;
        this.type = type;
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.expr.interpret(ctx);
        const symbol = (0, WrapInSym_js_1.default)(this.type, value, this.location, true);
        ctx.declare(this.identifier, symbol, this.location, true);
    }
}
exports.default = ConstDeclarationStmt;
//# sourceMappingURL=ConstDeclaration.js.map