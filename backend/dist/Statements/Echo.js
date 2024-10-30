"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EchoStatement {
    constructor(expr, location) {
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const expr = this.expr.interpret(ctx);
        let result = expr.toString(); // Convierte el resultado a string
        result = result.replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t');
        console.log(result); // Esto seguirá imprimiendo en consola
        return result; // Devuelve el resultado para acumularlo
    }
}
exports.default = EchoStatement;
//# sourceMappingURL=Echo.js.map