"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorDeclarationStmt = void 0;
class VectorDeclarationStmt {
    constructor(identifier, vectorType, initializer, location) {
        this.identifier = identifier;
        this.vectorType = vectorType;
        this.initializer = initializer;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.initializer.interpret(ctx);
        ctx.declareVector(this.identifier, this.vectorType, value, this.location);
    }
}
exports.VectorDeclarationStmt = VectorDeclarationStmt;
//# sourceMappingURL=VectorDeclaration.js.map