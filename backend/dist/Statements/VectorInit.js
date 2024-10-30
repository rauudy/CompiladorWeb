"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorInitExpr = void 0;
class VectorInitExpr {
    constructor(baseType, sizes, location) {
        this.baseType = baseType;
        this.sizes = sizes;
        this.location = location;
    }
    interpret(ctx) {
        const dimensions = this.sizes.map(size => size.interpret(ctx));
        return this.createVector(dimensions);
    }
    createVector(dimensions) {
        if (dimensions.length === 1) {
            return new Array(dimensions[0]).fill(null);
        }
        else {
            return new Array(dimensions[0]).fill(null).map(() => this.createVector(dimensions.slice(1)));
        }
    }
}
exports.VectorInitExpr = VectorInitExpr;
//# sourceMappingURL=VectorInit.js.map