"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const WrapInSym_js_1 = __importDefault(require("./WrapInSym.js"));
const Function_js_1 = __importDefault(require("./Function.js"));
const Vector_js_1 = require("../Statements/Vector.js");
class Context {
    constructor(isGlobal = false) {
        this.prev = null;
        this.symbols = new Map();
        this.globalContext = isGlobal ? this : null;
    }
    get(key, location) {
        let symbol = this.symbols.get(key);
        if (!symbol) {
            if (this.globalContext && this !== this.globalContext) {
                symbol = this.globalContext.get(key, location);
            }
            else if (this.prev) {
                symbol = this.prev.get(key, location);
            }
        }
        return symbol;
    }
    declare(key, value, location) {
        if (this.symbols.has(key)) {
            throw new Runtime_js_1.default(`${key} already exists`, location.first_line, location.first_column);
        }
        this.symbols.set(key, value);
    }
    set(key, value, location) {
        let symbol = this.symbols.get(key);
        if (!symbol) {
            if (this.globalContext && this !== this.globalContext) {
                return this.globalContext.set(key, value, location);
            }
            else if (this.prev) {
                return this.prev.set(key, value, location);
            }
            else {
                // Si no existe y estamos en el contexto global, la declaramos
                this.declare(key, (0, WrapInSym_js_1.default)({ baseType: 'ANY', dimensions: 1 }, value, location, false), location);
                return;
            }
        }
        if (symbol instanceof Function_js_1.default) {
            throw new Runtime_js_1.default(`Cannot reassign function ${key}`, location.first_line, location.first_column);
        }
        if (symbol instanceof Vector_js_1.Vector) {
            throw new Runtime_js_1.default(`Use setVector to modify vector ${key}`, location.first_line, location.first_column);
        }
        if ('isConstant' in symbol && symbol.isConstant) {
            // throw new RuntimeError(
            //     `Cannot reassign constant ${key}`,
            //     location.first_line,
            //     location.first_column
            // );
            value = symbol.value;
        }
        const newSymbol = (0, WrapInSym_js_1.default)(symbol.type, value, location, symbol.isConstant);
        this.symbols.set(key, newSymbol);
    }
    getVector(key, indices, location) {
        const symbol = this.get(key, location);
        if (!symbol) {
            throw new Runtime_js_1.default(`Vector ${key} does not exist`, location.first_line, location.first_column);
        }
        if (!(symbol instanceof Vector_js_1.Vector)) {
            throw new Runtime_js_1.default(`${key} is not a vector`, location.first_line, location.first_column);
        }
        try {
            return symbol.get(indices);
        }
        catch (error) {
            throw new Runtime_js_1.default(`Error accessing vector ${key}: ${error.message}`, location.first_line, location.first_column);
        }
    }
    setVector(key, indices, value, location) {
        const symbol = this.get(key, location);
        if (!symbol) {
            throw new Runtime_js_1.default(`Vector ${key} does not exist`, location.first_line, location.first_column);
        }
        if (!(symbol instanceof Vector_js_1.Vector)) {
            throw new Runtime_js_1.default(`${key} is not a vector`, location.first_line, location.first_column);
        }
        try {
            symbol.set(indices, value);
        }
        catch (error) {
            throw new Runtime_js_1.default(`Error modifying vector ${key}: ${error.message}`, location.first_line, location.first_column);
        }
    }
    declareVector(key, type, values, location) {
        try {
            // Si estamos en un contexto local y existe un contexto global
            if (this.globalContext && this !== this.globalContext) {
                // Declarar el vector en el contexto global
                return this.globalContext.declareVector(key, type, values, location);
            }
            if (this.symbols.has(key)) {
                throw new Runtime_js_1.default(`${key} already exists`, location.first_line, location.first_column);
            }
            const vector = new Vector_js_1.Vector(type, values);
            this.symbols.set(key, vector);
        }
        catch (error) {
            throw new Runtime_js_1.default(`Error declaring vector ${key}: ${error.message}`, location.first_line, location.first_column);
        }
    }
    // Método auxiliar para verificar si un símbolo es un vector
    isVector(key, location) {
        const symbol = this.get(key, location);
        return symbol instanceof Vector_js_1.Vector;
    }
}
exports.default = Context;
//# sourceMappingURL=Context.js.map