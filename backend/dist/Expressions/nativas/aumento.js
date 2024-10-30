"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementExpr = void 0;
class IncrementExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    interpret(ctx) {
        const symbol = ctx.get(this.identifier, this.location);
        if (!symbol) {
            throw new Error(`Variable ${this.identifier} is not defined`);
        }
        // Incrementa el valor de la variable
        const newValue = symbol.value + 1;
        ctx.set(this.identifier, newValue, this.location);
        return newValue; // Devuelve el nuevo valor
    }
}
exports.IncrementExpr = IncrementExpr;
//# sourceMappingURL=aumento.js.map