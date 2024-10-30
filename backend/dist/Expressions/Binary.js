"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Substraction_js_1 = __importDefault(require("./operations/Substraction.js"));
const Sum_js_1 = __importDefault(require("./operations/Sum.js"));
const Relational_js_1 = __importDefault(require("./operations/Relational.js"));
const Multiplication_js_1 = __importDefault(require("./operations/Multiplication.js"));
const Division_js_1 = __importDefault(require("./operations/Division.js"));
const Potencia_js_1 = __importDefault(require("./operations/Potencia.js"));
const RaizCuadrada_js_1 = __importDefault(require("./operations/RaizCuadrada.js"));
const Modulo_js_1 = __importDefault(require("./operations/Modulo.js"));
const LogicalOr_js_1 = __importDefault(require("./operations/LogicalOr.js"));
const LogicalAnd_js_1 = __importDefault(require("./operations/LogicalAnd.js"));
class BinaryExpr {
    constructor(left, operator, right, location) {
        this.left = left;
        this.right = right;
        this.operator = operator;
        this.location = location;
    }
    interpret(ctx) {
        const left = this.left.interpret(ctx);
        const right = this.right.interpret(ctx);
        switch (this.operator) {
            case '+':
                return (0, Sum_js_1.default)(left, right, this.location);
            case '-':
                return (0, Substraction_js_1.default)(left, right, this.location);
            case '*':
                return (0, Multiplication_js_1.default)(left, right, this.location);
            case '/':
                return (0, Division_js_1.default)(left, right, this.location);
            case '^':
                return (0, Potencia_js_1.default)(left, right, this.location);
            case '$':
                return (0, RaizCuadrada_js_1.default)(left, right, this.location);
            case '%':
                return (0, Modulo_js_1.default)(left, right, this.location);
            case '==':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '!=':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '<':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '<=':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '>':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '>=':
                return (0, Relational_js_1.default)(left, this.operator, right, this.location);
            case '||':
                return (0, LogicalOr_js_1.default)(left, right, this.location);
            case '&&':
                //que valores llegan a la funcion
                //console.log("izquierda"+left);
                //console.log("derecha"+right);
                return (0, LogicalAnd_js_1.default)(left, right, this.location);
        }
    }
}
exports.default = BinaryExpr;
//# sourceMappingURL=Binary.js.map