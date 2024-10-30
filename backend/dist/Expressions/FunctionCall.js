"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const Function_js_1 = __importDefault(require("../Context/Function.js"));
class FunctionCallExpr {
    constructor(name, args, location) {
        this.name = name;
        this.arguments = args;
        this.location = location;
    }
    interpret(ctx) {
        const func = ctx.get(this.name, this.location);
        if (!(func instanceof Function_js_1.default)) {
            throw new Runtime_js_1.default(`${this.name} is not a function`, this.location.first_line, this.location.first_column);
        }
        // Evaluate each argument expression
        const evaluatedArgs = this.arguments.map(arg => arg.interpret(ctx));
        return func.call(evaluatedArgs, ctx, this.location);
    }
}
exports.default = FunctionCallExpr;
//# sourceMappingURL=FunctionCall.js.map