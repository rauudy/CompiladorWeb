"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorAssignmentStmt = void 0;
class VectorAssignmentStmt {
    constructor(identifier, indices, expr, location) {
        this.identifier = identifier;
        this.indices = indices;
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const indices = this.indices.map(index => index.interpret(ctx));
        const value = this.expr.interpret(ctx);
        ctx.setVector(this.identifier, indices, value, this.location);
    }
}
exports.VectorAssignmentStmt = VectorAssignmentStmt;
//# sourceMappingURL=VectorAssignment.js.map