"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorLiteralExpr = void 0;
class VectorLiteralExpr {
    constructor(values, location) {
        this.values = values;
        this.location = location;
    }
    interpret(ctx) {
        return this.values.map(value => value.interpret(ctx));
    }
}
exports.VectorLiteralExpr = VectorLiteralExpr;
//# sourceMappingURL=VectorLiteral.js.map