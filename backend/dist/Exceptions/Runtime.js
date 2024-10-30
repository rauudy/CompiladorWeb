"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LexicalError extends Error {
    constructor(lexeme, row, col) {
        super(`Invalid token at ${row}, ${col}: ${lexeme}`);
    }
}
exports.default = LexicalError;
//# sourceMappingURL=Runtime.js.map