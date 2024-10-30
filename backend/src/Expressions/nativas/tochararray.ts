import Context from "../../Context/Context";
import NativeFunctionExpr from "../Natives";
import { VectorType } from "../../Statements/Vector";
import { TokenLocation } from "@ts-jison/common";
import Expression from "../Expression";
import LiteralExpr from "../Literal";

class ToCharArrayExpr extends NativeFunctionExpr {
  constructor(expression: Expression, location: TokenLocation) {
    super(expression, location);
  }

  interpret(ctx: Context) {
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
      return new LiteralExpr(`'${char}'`, 'CHAR', this.location);
    });
    
    // Crear el tipo de vector para char[]
    const vectorType: VectorType = {
      baseType: 'CHAR',
      dimensions: 1
    };
    
    // Retornar la estructura correcta para el vector
    return {
      type: vectorType,
      values: charArray,
      size: charArray.length,
      dimensions: [charArray.length],  // Añadimos las dimensiones explícitamente
      isVector: true,
      getElement: function(indices: string | any[]) {  // Función para acceder a elementos
        if (indices.length !== 1) throw new Error("Invalid number of dimensions");
        return this.values[indices[0]];
      }
    };
  }
}

export default ToCharArrayExpr;