"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecrementExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    interpret(ctx) {
        const curValue = ctx.get(this.identifier, this.location);
        let currentValue;
        if (typeof curValue === 'object' && curValue !== null) {
            // Si es un objeto, intentamos obtener su valor numérico
            if ('value' in curValue && typeof curValue.value === 'number') {
                currentValue = curValue.value;
            }
            else {
                throw new Error(`Cannot decrement non-numeric value: ${this.identifier} is of type ${typeof curValue}`);
            }
        }
        else if (typeof curValue === 'number') {
            currentValue = curValue;
        }
        else {
            // Intentamos convertir a número como último recurso
            currentValue = Number(curValue);
        }
        if (isNaN(currentValue)) {
            throw new Error(`Cannot decrement non-numeric value: ${this.identifier} is not a valid number`);
        }
        const newValue = currentValue - 1;
        ctx.set(this.identifier, newValue, this.location);
        return newValue;
    }
}
exports.default = DecrementExpr;
//# sourceMappingURL=Decrement.js.map