"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_js_1 = require("../Statements/Vector.js");
class VarLookUpExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    interpret(ctx) {
        const symbol = ctx.get(this.identifier, this.location);
        if (symbol === undefined) {
            throw new Error(`Symbol not found for identifier: ${this.identifier}`);
        }
        // Check if the symbol is a Vector or Function first
        if (symbol instanceof Vector_js_1.Vector || symbol instanceof Function) {
            return symbol;
        }
        // Check if it's a Sym type and has a value
        if (typeof symbol === 'object' && symbol !== null && 'value' in symbol) {
            return symbol.value;
        }
        throw new Error(`Symbol is not of type Sym for identifier: ${this.identifier}`);
    }
}
exports.default = VarLookUpExpr;
//# sourceMappingURL=VarLookUp.js.map