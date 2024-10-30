"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("./Context.js"));
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const WrapInSym_js_1 = __importDefault(require("./WrapInSym.js"));
const Vector_js_1 = require("../Statements/Vector.js");
class Function {
    constructor(returnType, parameters, body) {
        this.returnType = returnType;
        this.parameters = parameters;
        this.body = body;
    }
    call(args, ctx, location) {
        const localCtx = new Context_js_1.default();
        localCtx.prev = ctx;
        // Bind arguments to parameters
        for (let i = 0; i < this.parameters.length; i++) {
            const param = this.parameters[i];
            let value = args[i];
            if (value === undefined && 'defaultValue' in param) {
                value = param.defaultValue;
            }
            if (value === undefined) {
                throw new Runtime_js_1.default(`Missing argument for parameter ${param.name}`, location.first_line, location.first_column);
            }
            const wrappedValue = (0, WrapInSym_js_1.default)(param.type, value, location);
            if (wrappedValue instanceof Vector_js_1.Vector) {
                throw new Runtime_js_1.default(`Vector type not allowed for parameter ${param.name}`, location.first_line, location.first_column);
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
                throw new Runtime_js_1.default(`Function should return a ${this.returnType} value`, location.first_line, location.first_column);
            }
            return result;
        }
        catch (e) {
            if (e && typeof e === 'object' && 'type' in e && e.type === 'return') {
                if (this.returnType === 'void' && e.value !== undefined) {
                    throw new Runtime_js_1.default('Void function should not return a value', location.first_line, location.first_column);
                }
                if (this.returnType !== 'void' && e.value === undefined) {
                    throw new Runtime_js_1.default(`Function should return a ${this.returnType} value`, location.first_line, location.first_column);
                }
                return e.value;
            }
            throw e;
        }
    }
}
exports.default = Function;
//# sourceMappingURL=Function.js.map