import Sym from './Symbol.js';
import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../Exceptions/Runtime.js';
import wrapInSym from './WrapInSym.js';
import Function from './Function.js';
import { Vector, VectorType } from '../Statements/Vector.js';

export default class Context {
    symbols: Map<string, Sym | Function | Vector>;
    prev: Context | null;
    globalContext: Context | null;

    constructor(isGlobal: boolean = false) {
        this.prev = null;
        this.symbols = new Map();
        this.globalContext = isGlobal ? this : null;
    }

    get(key: string, location: TokenLocation): Sym | Function | Vector | undefined {
        let symbol = this.symbols.get(key);
        if (!symbol) {
            if (this.globalContext && this !== this.globalContext) {
                symbol = this.globalContext.get(key, location);
            } else if (this.prev) {
                symbol = this.prev.get(key, location);
            }
        }
        return symbol;
    }

    declare(key: string, value: Sym | Function | Vector, location: TokenLocation) {
        if (this.symbols.has(key)) {
            throw new RuntimeError(`${key} already exists`, location.first_line, location.first_column);
        }
        this.symbols.set(key, value);
    }

    set(key: string, value: any, location: TokenLocation): void {
        let symbol = this.symbols.get(key);
        
        if (!symbol) {
            if (this.globalContext && this !== this.globalContext) {
                return this.globalContext.set(key, value, location);
            } else if (this.prev) {
                return this.prev.set(key, value, location);
            } else {
                // Si no existe y estamos en el contexto global, la declaramos
                this.declare(
                    key,
                    wrapInSym({ baseType: 'ANY', dimensions: 1 }, value, location, false),
                    location
                );
                return;
            }
        }

        if (symbol instanceof Function) {
            throw new RuntimeError(
                `Cannot reassign function ${key}`,
                location.first_line,
                location.first_column
            );
        }

        if (symbol instanceof Vector) {
            throw new RuntimeError(
                `Use setVector to modify vector ${key}`,
                location.first_line,
                location.first_column
            );
        }

        if ('isConstant' in symbol && symbol.isConstant) {
            // throw new RuntimeError(
            //     `Cannot reassign constant ${key}`,
            //     location.first_line,
            //     location.first_column
            // );
            value = symbol.value;
        }

        const newSymbol = wrapInSym(symbol.type, value, location, symbol.isConstant);
        this.symbols.set(key, newSymbol);
    }


    getVector(key: string, indices: number[], location: TokenLocation): any {
        const symbol = this.get(key, location);
        
        if (!symbol) {
            throw new RuntimeError(
                `Vector ${key} does not exist`,
                location.first_line,
                location.first_column
            );
        }
        
        if (!(symbol instanceof Vector)) {
            throw new RuntimeError(
                `${key} is not a vector`,
                location.first_line,
                location.first_column
            );
        }

        try {
            return symbol.get(indices);
        } catch (error) {
            throw new RuntimeError(
                `Error accessing vector ${key}: ${(error as Error).message}`,
                location.first_line,
                location.first_column
            );
        }
    }



    setVector(key: string, indices: number[], value: any, location: TokenLocation) {
        const symbol = this.get(key, location);
        
        if (!symbol) {
            throw new RuntimeError(
                `Vector ${key} does not exist`,
                location.first_line,
                location.first_column
            );
        }
        
        if (!(symbol instanceof Vector)) {
            throw new RuntimeError(
                `${key} is not a vector`,
                location.first_line,
                location.first_column
            );
        }

        try {
            symbol.set(indices, value);
        } catch (error) {
            throw new RuntimeError(
                `Error modifying vector ${key}: ${(error as Error).message}`,
                location.first_line,
                location.first_column
            );
        }
    }


    declareVector(key: string, type: VectorType, values: any[], location: TokenLocation): void {
        try {
            // Si estamos en un contexto local y existe un contexto global
            if (this.globalContext && this !== this.globalContext) {
                // Declarar el vector en el contexto global
                return this.globalContext.declareVector(key, type, values, location);
            }

            if (this.symbols.has(key)) {
                throw new RuntimeError(`${key} already exists`, location.first_line, location.first_column);
            }

            const vector = new Vector(type, values);
            this.symbols.set(key, vector);
        } catch (error) {
            throw new RuntimeError(
                `Error declaring vector ${key}: ${(error as Error).message}`,
                location.first_line,
                location.first_column
            );
        }
    }

    // Método auxiliar para verificar si un símbolo es un vector
    isVector(key: string, location: TokenLocation): boolean {
        const symbol = this.get(key, location);
        return symbol instanceof Vector;
    }
}