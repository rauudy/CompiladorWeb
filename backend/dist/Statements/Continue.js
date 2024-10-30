"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueStmt = void 0;
class ContinueStmt {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw { type: 'continue' };
    }
}
exports.ContinueStmt = ContinueStmt;
//# sourceMappingURL=Continue.js.map