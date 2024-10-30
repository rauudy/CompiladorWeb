"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("../../Statements/Vector");
class ReverseExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    interpret(ctx) {
        const vectorObj = ctx.get(this.identifier, this.location);
        if (!vectorObj || !(vectorObj instanceof Vector_1.Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        const vector = vectorObj.getValues();
        const length = vector.length;
        // Crear un vector revertido basado en el tipo de datos
        const reversedVector = new Array(length);
        for (let i = 0; i < length; i++) {
            const currentElement = vector[i];
            const reversedIndex = length - 1 - i;
            switch (typeof currentElement) {
                case 'number':
                    // Para int y double, solo invertimos el orden
                    reversedVector[reversedIndex] = currentElement;
                    break;
                case 'boolean':
                    // Para bool, invertimos el valor
                    reversedVector[reversedIndex] = currentElement;
                    break;
                case 'string':
                    // Para string, solo invertimos el orden, no el contenido
                    reversedVector[reversedIndex] = currentElement;
                    break;
                default:
                    throw new Error(`Unsupported vector element type: ${typeof currentElement}`);
            }
        }
        // Usar un índice para cada elemento, ya que setVector requiere índices
        for (let i = 0; i < length; i++) {
            ctx.setVector(this.identifier, [i], reversedVector[i], this.location);
        }
    }
}
exports.default = ReverseExpr;
//# sourceMappingURL=reverse.js.map