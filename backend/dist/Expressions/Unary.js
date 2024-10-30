"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Negation_js_1 = __importDefault(require("./operations/Negation.js"));
const LogicalNot_js_1 = __importDefault(require("./operations/LogicalNot.js"));
class UnaryExpr {
    constructor(operator, expr, location) {
        this.operator = operator;
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const expr = this.expr.interpret(ctx);
        switch (this.operator) {
            case '-':
                return (0, Negation_js_1.default)(expr, this.location);
            case '!':
                return (0, LogicalNot_js_1.default)(expr, this.location);
        }
    }
}
exports.default = UnaryExpr;
//# sourceMappingURL=Unary.js.map