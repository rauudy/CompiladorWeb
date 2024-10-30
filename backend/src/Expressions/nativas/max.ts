import VectorOperationExpr from "./VectorOperation";
import Context from "../../Context/Context";
import { Vector } from "../../Statements/Vector";

class MaxExpr extends VectorOperationExpr {
    protected getVector(ctx: Context): any[] {
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues();
    }

    interpret(ctx: Context) {
        const vector = this.getVector(ctx);
        const type = this.inferVectorType(vector);
        
        switch (type) {
            case 'int':
            case 'double':
                return Math.max(...vector);
            case 'char':
            case 'string':
                return vector.reduce((max, current) => current > max ? current : max);
            case 'bool':
                return vector.includes(true);
            default:
                throw new Error(`Unsupported vector type for max operation: ${type}`);
        }
    }
}

export default MaxExpr;