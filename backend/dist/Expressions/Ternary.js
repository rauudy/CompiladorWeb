"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TernaryExpr {
    constructor(condition, trueExpr, falseExpr, location) {
        this.condition = condition; // La condición que se evalúa
        this.trueExpr = trueExpr; // Expresión si la condición es verdadera
        this.falseExpr = falseExpr; // Expresión si la condición es falsa
        this.location = location; // Ubicación en el código para manejo de errores
    }
    interpret(ctx) {
        // Evalúa la condición
        const condValue = this.condition.interpret(ctx);
        // Retorna el valor correspondiente según la evaluación de la condición
        return condValue ? this.trueExpr.interpret(ctx) : this.falseExpr.interpret(ctx);
    }
}
exports.default = TernaryExpr;
//# sourceMappingURL=Ternary.js.map