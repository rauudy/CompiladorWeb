// En un nuevo archivo, por ejemplo 'Statements/Ejecutar.ts'
import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import Expression from '../Expressions/Expression.js';
import RuntimeError from '../Exceptions/Runtime.js';
import Function from '../Context/Function.js';

export default class EjecutarStmt implements Statement {
    private functionName: string;
    private params: Expression[];
    location: TokenLocation;

    constructor(functionName: string, params: Expression[], location: TokenLocation) {
        this.functionName = functionName;
        this.params = params;
        this.location = location;
    }

    interpret(ctx: Context) {
        const func = ctx.get(this.functionName, this.location);
        if (!(func instanceof Function)) {
            throw new RuntimeError(`${this.functionName} is not a function`, this.location.first_line, this.location.first_column);
        }

        if (func.returnType !== 'void') {
            throw new RuntimeError(`EJECUTAR can only be used with void functions`, this.location.first_line, this.location.first_column);
        }

        // Evaluar cada parámetro
        const evaluatedParams = this.params.map(param => param.interpret(ctx));

        // Llamar a la función
        func.call(evaluatedParams, ctx, this.location);
    }
}