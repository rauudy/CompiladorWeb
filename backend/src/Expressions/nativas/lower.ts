import Context from "../../Context/Context";
import NativeFunctionExpr from "../Natives";

class LowerExpr extends NativeFunctionExpr {
    interpret(ctx: Context) {
        const result = this.expression.interpret(ctx);
        if (typeof result !== 'string') {
            throw new Error(`Type error: Expected a STRING at ${this.location.first_line}:${this.location.first_column}`);
        }
        return result.toLowerCase();
    }
}

export default LowerExpr;