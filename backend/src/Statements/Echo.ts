import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

export default class EchoStatement implements Statement {
    private expr: Expression;
    location: TokenLocation;

    constructor(expr: Expression, location: TokenLocation) {
        this.expr = expr;
        this.location = location;
    }

    interpret(ctx: Context) {
        const expr = this.expr.interpret(ctx);
        let result = expr.toString(); // Convierte el resultado a string
        
        result = result.replace(/\\n/g, '\n')
                   .replace(/\\t/g, '\t');

        console.log(result); // Esto seguirá imprimiendo en consola
        return result; // Devuelve el resultado para acumularlo
    }
    
}
