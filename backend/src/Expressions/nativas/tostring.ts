import Context from "../../Context/Context";
import NativeFunctionExpr from "../Natives";

class ToStringExpr extends NativeFunctionExpr {
    interpret(ctx: Context) {
        const result = this.expression.interpret(ctx);
        return String(result); // Convierte el valor a string
    }
}

export default ToStringExpr;