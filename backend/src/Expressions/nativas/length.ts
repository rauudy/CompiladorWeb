import Context from "../../Context/Context";
import NativeFunctionExpr from "../Natives";
import { Vector } from '../../Statements/Vector.js';
import RuntimeError from '../../Exceptions/Runtime.js';

class LengthExpr extends NativeFunctionExpr {
  interpret(ctx: Context) {
    const value = this.expression.interpret(ctx);
    
    if (typeof value === 'string') {
      return value.length;
    } 
    
    if (value instanceof Vector) {
      return value.length();
    }
    
    if (Array.isArray(value)) {
      return value.length;
    }

    throw new RuntimeError(
      `Type error: Expected a STRING or VECTOR at ${this.location.first_line}:${this.location.first_column}`,
      this.location.first_line,
      this.location.first_column
    );
  }
}

export default LengthExpr;