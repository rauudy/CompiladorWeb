import Context from "../../Context/Context";
import { TokenLocation } from '@ts-jison/common';
import Expression from "../Expression";
import NativeFunctionExpr from "../Natives";

class IsExpr extends NativeFunctionExpr {
    private type: string;

    constructor(expression: Expression, type: string, location: TokenLocation) {
        super(expression, location);
        this.type = type.toUpperCase();
    }

    interpret(ctx: Context) {
        const result = this.expression.interpret(ctx);
        const resultType = typeof result;

        // Ajuste para verificar los tipos
        switch (this.type) {
            case 'INT':
                return resultType === 'number' && Number.isInteger(result); // Verifica que sea un número y entero
            case 'DOUBLE':
                return resultType === 'number' && !Number.isInteger(result); // Verifica que sea un número y no entero
            case 'CHAR':
                return resultType === 'string' && result.length === 1; // Verifica que sea una cadena de longitud
            case 'STRING':
                return resultType === 'string'; // Verifica que sea una cadena
            case 'BOOL':
                return resultType === 'boolean'; // Verifica que sea booleano
            default:
                return false; // Tipo no reconocido
        } 
    }
}

export default IsExpr;
