"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SintaxError extends Error {
    constructor(token, location) {
        super(`Syntax error at ${location.first_line}, ${location.first_column}: ${token}`);
    }
}
exports.default = SintaxError;
//# sourceMappingURL=Syntax.js.map