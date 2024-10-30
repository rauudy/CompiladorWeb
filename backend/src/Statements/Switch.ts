import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Expression from '../Expressions/Expression.js';
import Context from '../Context/Context.js';

class SwitchStmt implements Statement {
    private expression: Expression;
    private cases: CaseStmt[];
    private defaultCase: DefaultStmt | null;
    location: TokenLocation;

    constructor(expression: Expression, cases: CaseStmt[], defaultCase: DefaultStmt | null, location: TokenLocation) {
        this.expression = expression;
        this.cases = cases;
        this.defaultCase = defaultCase;
        this.location = location;
    }

    interpret(ctx: Context) {
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

class CaseStmt implements Statement {
    value: Expression;
    statements: Statement[];
    hasBreak: boolean;
    location: TokenLocation;

    constructor(value: Expression, statements: Statement[], location: TokenLocation) {
        this.value = value;
        this.statements = statements;
        this.hasBreak = false;
        this.location = location;
    }

    interpret(ctx: Context) {
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

class DefaultStmt implements Statement {
    statements: Statement[];
    location: TokenLocation;

    constructor(statements: Statement[], location: TokenLocation) {
        this.statements = statements;
        this.location = location;
    }

    interpret(ctx: Context) {
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

class BreakStmt implements Statement {
    location: TokenLocation;

    constructor(location: TokenLocation) {
        this.location = location;
    }

    interpret(ctx: Context) {
        // Break doesn't produce output, it's handled in the switch and case statements
        return '';
    }
}

export { SwitchStmt, CaseStmt, DefaultStmt, BreakStmt };