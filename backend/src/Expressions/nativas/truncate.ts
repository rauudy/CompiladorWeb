import Context from "../../Context/Context";
import NativeFunctionExpr from "../Natives";

class TruncateExpr extends NativeFunctionExpr {
    interpret(ctx: Context) {
        const result = this.expression.interpret(ctx);
        if (typeof result !== 'number') {
            throw new Error(`Type error: Expected a NUMBER at ${this.location.first_line}:${this.location.first_column}`);
        }
        return Math.trunc(result);
    }
}

export default TruncateExpr;