import { TokenLocation } from '@ts-jison/common';
import Context from './Context.js';
import BlockStmt from '../Statements/Block.js';
import RuntimeError from '../Exceptions/Runtime.js';
import wrapInSym from './WrapInSym.js';
import { Type } from '../Expressions/Types.js';
import { Vector } from '../Statements/Vector.js';

export default class Function {
    public returnType: string;
    private parameters: Array<{ name: string, type: Type, defaultValue?: any }>;
    private body: BlockStmt;

    constructor(returnType: string, parameters: Array<{ name: string, type: Type, defaultValue?: any }>, body: BlockStmt) {
        this.returnType = returnType;
        this.parameters = parameters;
        this.body = body;
    }

    call(args: any[], ctx: Context, location: TokenLocation) {
        const localCtx = new Context();
        localCtx.prev = ctx;

        // Bind arguments to parameters
        for (let i = 0; i < this.parameters.length; i++) {
            const param = this.parameters[i];
            let value = args[i];
            if (value === undefined && 'defaultValue' in param) {
                value = param.defaultValue;
            }
            if (value === undefined) {
                throw new RuntimeError(`Missing argument for parameter ${param.name}`, location.first_line, location.first_column);
            }
            const wrappedValue = wrapInSym(param.type, value, location);
            if (wrappedValue instanceof Vector) {
                throw new RuntimeError(`Vector type not allowed for parameter ${param.name}`, location.first_line, location.first_column);
            }
            localCtx.declare(param.name, wrappedValue, location);
        }

        try {
            const result = this.body.interpret(localCtx);
            
            if (this.returnType === 'void') {
                // Para funciones void, retornamos el resultado del bloque para mantener la salida
                return result;
            }
            
            if (result === undefined) {
                throw new RuntimeError(`Function should return a ${this.returnType} value`, location.first_line, location.first_column);
            }
            return result;
        } catch (e) {
            if (e && typeof e === 'object' && 'type' in e && (e as any).type === 'return') {
                if (this.returnType === 'void' && (e as any).value !== undefined) {
                    throw new RuntimeError('Void function should not return a value', location.first_line, location.first_column);
                }
                if (this.returnType !== 'void' && (e as any).value === undefined) {
                    throw new RuntimeError(`Function should return a ${this.returnType} value`, location.first_line, location.first_column);
                }
                return (e as any).value;
            }
            throw e;
        }
    }
}