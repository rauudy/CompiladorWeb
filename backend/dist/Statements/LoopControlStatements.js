"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopReturnSignal = exports.LoopContinueSignal = exports.LoopBreakSignal = exports.LoopReturn = exports.LoopContinue = exports.LoopBreak = void 0;
class LoopBreak {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw new LoopBreakSignal();
    }
}
exports.LoopBreak = LoopBreak;
class LoopContinue {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw new LoopContinueSignal();
    }
}
exports.LoopContinue = LoopContinue;
class LoopReturn {
    constructor(expression, location) {
        this.expression = expression;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.expression ? this.expression.interpret(ctx) : null;
        throw new LoopReturnSignal(value);
    }
}
exports.LoopReturn = LoopReturn;
class LoopBreakSignal extends Error {
    constructor() {
        super('LoopBreak');
        this.name = 'LoopBreakSignal';
    }
}
exports.LoopBreakSignal = LoopBreakSignal;
class LoopContinueSignal extends Error {
    constructor() {
        super('LoopContinue');
        this.name = 'LoopContinueSignal';
    }
}
exports.LoopContinueSignal = LoopContinueSignal;
class LoopReturnSignal extends Error {
    constructor(value) {
        super('LoopReturn');
        this.name = 'LoopReturnSignal';
        this.value = value;
    }
}
exports.LoopReturnSignal = LoopReturnSignal;
//# sourceMappingURL=LoopControlStatements.js.map