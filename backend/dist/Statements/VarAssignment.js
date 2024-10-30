"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VarAssignmentStmt {
    constructor(identifier, expr, location) {
        this.identifier = identifier;
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.expr.interpret(ctx);
        ctx.set(this.identifier, value, this.location);
    }
}
exports.default = VarAssignmentStmt;
//# sourceMappingURL=VarAssignment.js.map