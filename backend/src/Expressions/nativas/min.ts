import VectorOperationExpr from "./VectorOperation";
import Context from "../../Context/Context";
import { Vector } from "../../Statements/Vector";

class MinExpr extends VectorOperationExpr {
    protected getVector(ctx: Context): any[] {
        // Get the vector's raw values
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues(); // Assuming Vector class has a values property
    }

    interpret(ctx: Context) {
        const vector = this.getVector(ctx);
        const type = this.inferVectorType(vector);
        
        switch (type) {
            case 'int':
            case 'double':
                return Math.min(...vector);
            case 'char':
            case 'string':
                return vector.reduce((min, current) => current < min ? current : min);
            case 'bool':
                return !vector.includes(true);
            default:
                throw new Error(`Unsupported vector type for min operation: ${type}`);
        }
    }
}

export default MinExpr;