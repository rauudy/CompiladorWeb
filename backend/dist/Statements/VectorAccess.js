"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorAccessExpr = void 0;
class VectorAccessExpr {
    constructor(identifier, indices, location) {
        this.identifier = identifier;
        this.indices = indices;
        this.location = location;
    }
    interpret(ctx) {
        const indices = this.indices.map(index => index.interpret(ctx));
        //validar que los indices sean enteros, positivos desde 0, si llega un -1 retronar un null
        if (indices.some(index => !Number.isInteger(index) || index < 0)) {
            return null;
        }
        return ctx.getVector(this.identifier, indices, this.location);
    }
}
exports.VectorAccessExpr = VectorAccessExpr;
//# sourceMappingURL=VectorAccess.js.map