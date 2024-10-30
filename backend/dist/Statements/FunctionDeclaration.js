"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Function_js_1 = __importDefault(require("../Context/Function.js"));
class FunctionDeclarationStmt {
    constructor(returnType, name, parameters, body, location) {
        this.returnType = returnType;
        this.name = name;
        this.parameters = parameters;
        this.body = body;
        this.location = location;
    }
    interpret(ctx) {
        const func = new Function_js_1.default(this.returnType, this.parameters, this.body);
        ctx.declare(this.name, func, this.location);
    }
}
exports.default = FunctionDeclarationStmt;
//# sourceMappingURL=FunctionDeclaration.js.map