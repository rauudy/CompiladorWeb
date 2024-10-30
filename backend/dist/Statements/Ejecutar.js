"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const Function_js_1 = __importDefault(require("../Context/Function.js"));
class EjecutarStmt {
    constructor(functionName, params, location) {
        this.functionName = functionName;
        this.params = params;
        this.location = location;
    }
    interpret(ctx) {
        const func = ctx.get(this.functionName, this.location);
        if (!(func instanceof Function_js_1.default)) {
            throw new Runtime_js_1.default(`${this.functionName} is not a function`, this.location.first_line, this.location.first_column);
        }
        if (func.returnType !== 'void') {
            throw new Runtime_js_1.default(`EJECUTAR can only be used with void functions`, this.location.first_line, this.location.first_column);
        }
        // Evaluar cada parámetro
        const evaluatedParams = this.params.map(param => param.interpret(ctx));
        // Llamar a la función
        func.call(evaluatedParams, ctx, this.location);
    }
}
exports.default = EjecutarStmt;
//# sourceMappingURL=Ejecutar.js.map