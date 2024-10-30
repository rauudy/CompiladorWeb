"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakStmt = exports.DefaultStmt = exports.CaseStmt = exports.SwitchStmt = void 0;
class SwitchStmt {
    constructor(expression, cases, defaultCase, location) {
        this.expression = expression;
        this.cases = cases;
        this.defaultCase = defaultCase;
        this.location = location;
    }
    interpret(ctx) {
        const switchValue = this.expression.interpret(ctx);
        let output = '';
        let matched = false;
        for (const caseStmt of this.cases) {
            if (matched || switchValue === caseStmt.value.interpret(ctx)) {
                matched = true;
                output += caseStmt.interpret(ctx);
                if (caseStmt.hasBreak) {
                    break;
                }
            }
        }
        if (!matched && this.defaultCase) {
            output += this.defaultCase.interpret(ctx);
        }
        return output;
    }
}
exports.SwitchStmt = SwitchStmt;
class CaseStmt {
    constructor(value, statements, location) {
        this.value = value;
        this.statements = statements;
        this.hasBreak = false;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        for (const stmt of this.statements) {
            if (stmt instanceof BreakStmt) {
                this.hasBreak = true;
                break;
            }
            output += stmt.interpret(ctx);
        }
        return output;
    }
}
exports.CaseStmt = CaseStmt;
class DefaultStmt {
    constructor(statements, location) {
        this.statements = statements;
        this.location = location;
    }
    interpret(ctx) {
        let output = '';
        for (const stmt of this.statements) {
            if (stmt instanceof BreakStmt) {
                break;
            }
            output += stmt.interpret(ctx);
        }
        return output;
    }
}
exports.DefaultStmt = DefaultStmt;
class BreakStmt {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        // Break doesn't produce output, it's handled in the switch and case statements
        return '';
    }
}
exports.BreakStmt = BreakStmt;
//# sourceMappingURL=Switch.js.map