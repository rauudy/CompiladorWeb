import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import BlockStmt from './Block.js';
import Function from '../Context/Function.js';
import { Type } from '../Expressions/Types.js';

export default class FunctionDeclarationStmt implements Statement {
    public returnType: string;
    public name: string;
    private parameters: Array<{ name: string, type: Type, defaultValue?: any }>;
    public body: BlockStmt;
    location: TokenLocation;

    constructor(returnType: string, name: string, parameters: Array<{ name: string, type: Type, defaultValue?: any }>, body: BlockStmt, location: TokenLocation) {
        this.returnType = returnType;
        this.name = name;
        this.parameters = parameters;
        this.body = body;
        this.location = location;
    }

    interpret(ctx: Context) {
        const func = new Function(this.returnType, this.parameters, this.body);
        ctx.declare(this.name, func, this.location);
    }
}