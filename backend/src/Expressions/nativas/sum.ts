import VectorOperationExpr from "./VectorOperation";
import Context from "../../Context/Context";
import { Vector } from "../../Statements/Vector";

class SumExpr extends VectorOperationExpr {
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
                return vector.reduce((sum, current) => sum + current, 0);
            case 'char':
                return vector.reduce((sum, current) => sum + current.charCodeAt(0), 0);
            case 'bool':
                return vector.filter(Boolean).length;
            case 'string':
                return vector.join('');
            default:
                throw new Error(`Unsupported vector type for sum operation: ${type}`);
        }
    }
}


export default SumExpr;