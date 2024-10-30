"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IfStmt {
    constructor(condition, thenBranch, elseBranch, location) {
        this.condition = condition;
        this.thenBranch = thenBranch;
        this.elseBranch = elseBranch;
        this.location = location;
    }
    interpret(ctx) {
        const conditionValue = this.condition.interpret(ctx);
        let output = '';
        if (conditionValue) {
            output = this.thenBranch.interpret(ctx); // Almacena el resultado de la rama "then"
        }
        else if (this.elseBranch !== null) {
            output = this.elseBranch.interpret(ctx); // Almacena el resultado de la rama "else"
        }
        return output; // Retorna el output acumulado, que puede ser una cadena vacía si no hay nada
    }
}
exports.default = IfStmt;
//# sourceMappingURL=If.js.map