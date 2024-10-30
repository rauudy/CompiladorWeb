"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakStmt = void 0;
class BreakStmt {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw { type: 'break' };
    }
}
exports.BreakStmt = BreakStmt;
//# sourceMappingURL=Break.js.map