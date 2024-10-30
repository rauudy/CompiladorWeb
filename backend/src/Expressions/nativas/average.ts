import VectorOperationExpr from "./VectorOperation";
import Context from "../../Context/Context";
import { Vector } from "../../Statements/Vector";

class AverageExpr extends VectorOperationExpr {
    protected getVector(ctx: Context): any[] {
        const vector = ctx.get(this.identifier, this.location);
        if (!vector || !(vector instanceof Vector)) {
            throw new Error(`${this.identifier} is not a vector`);
        }
        return vector.getValues();
    }

    interpret(ctx: Context) {
        const vector = this.getVector(ctx);
        if (vector.length === 0) {
            throw new Error(`Cannot calculate average of an empty vector`);
        }

        const type = this.inferVectorType(vector);
        switch (type) {
            case 'int':
            case 'double':
                return vector.reduce((sum, current) => sum + current, 0) / vector.length;
            case 'char':
                return vector.reduce((sum, current) => sum + current.charCodeAt(0), 0) / vector.length;
            case 'bool':
                return vector.filter(Boolean).length / vector.length;
            case 'string':
                throw new Error(`Cannot calculate average of string vector`);
            default:
                throw new Error(`Unsupported vector type for average operation: ${type}`);
        }
    }
}


export default AverageExpr;