import { TokenLocation } from '@ts-jison/common';
import Expression from './Expression.js';
import Context from '../Context/Context.js';

class DecrementExpr implements Expression {
    private identifier: string;
    location: TokenLocation;

    constructor(identifier: string, location: TokenLocation) {
        this.identifier = identifier;
        this.location = location;
    }

    interpret(ctx: Context) {
        const curValue = ctx.get(this.identifier, this.location);
        let currentValue: number;

        if (typeof curValue === 'object' && curValue !== null) {
            // Si es un objeto, intentamos obtener su valor numérico
            if ('value' in curValue && typeof curValue.value === 'number') {
                currentValue = curValue.value;
            } else {
                throw new Error(`Cannot decrement non-numeric value: ${this.identifier} is of type ${typeof curValue}`);
            }
        } else if (typeof curValue === 'number') {
            currentValue = curValue;
        } else {
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

export default DecrementExpr;