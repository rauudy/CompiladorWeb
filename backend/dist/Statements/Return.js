"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnStmt {
    constructor(expression, location) {
        this.expression = expression;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.expression ? this.expression.interpret(ctx) : null;
        throw { type: 'return', value };
    }
}
exports.default = ReturnStmt;
//# sourceMappingURL=Return.js.map