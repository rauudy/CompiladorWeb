import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import Context from '../Context/Context.js';

export default class TernaryExpr implements Expression {
    private condition: Expression;
    private trueExpr: Expression;
    private falseExpr: Expression;
    location: TokenLocation;

    constructor(condition: Expression, trueExpr: Expression, falseExpr: Expression, location: TokenLocation) {
        this.condition = condition; // La condición que se evalúa
        this.trueExpr = trueExpr;   // Expresión si la condición es verdadera
        this.falseExpr = falseExpr;  // Expresión si la condición es falsa
        this.location = location;     // Ubicación en el código para manejo de errores
    }

    interpret(ctx: Context) {
        // Evalúa la condición
        const condValue = this.condition.interpret(ctx);
        
        // Retorna el valor correspondiente según la evaluación de la condición
        return condValue ? this.trueExpr.interpret(ctx) : this.falseExpr.interpret(ctx);
    }
}
