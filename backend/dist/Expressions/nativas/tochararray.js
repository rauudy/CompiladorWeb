"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Natives_1 = __importDefault(require("../Natives"));
const Literal_1 = __importDefault(require("../Literal"));
class ToCharArrayExpr extends Natives_1.default {
    constructor(expression, location) {
        super(expression, location);
    }
    interpret(ctx) {
        // Obtener el valor de la expresión (la cadena)
        const value = this.expression.interpret(ctx);
        // Asegurarse de que sea una cadena y quitar las comillas si las tiene
        let stringValue = String(value);
        if (stringValue.startsWith('"') && stringValue.endsWith('"')) {
            stringValue = stringValue.slice(1, -1);
        }
        // Convertir la cadena en un array de caracteres
        const charArray = stringValue.split('').map(char => {
            // Crear un literal para cada carácter
            return new Literal_1.default(`'${char}'`, 'CHAR', this.location);
        });
        // Crear el tipo de vector para char[]
        const vectorType = {
            baseType: 'CHAR',
            dimensions: 1
        };
        // Retornar la estructura correcta para el vector
        return {
            type: vectorType,
            values: charArray,
            size: charArray.length,
            dimensions: [charArray.length], // Añadimos las dimensiones explícitamente
            isVector: true,
            getElement: function (indices) {
                if (indices.length !== 1)
                    throw new Error("Invalid number of dimensions");
                return this.values[indices[0]];
            }
        };
    }
}
exports.default = ToCharArrayExpr;
//# sourceMappingURL=tochararray.js.map