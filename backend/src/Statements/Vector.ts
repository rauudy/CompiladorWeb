import { TokenLocation } from '@ts-jison/common';
import RuntimeError from '../Exceptions/Runtime.js';

export type VectorType = {
    baseType: string;
    dimensions: number;
};

export class Vector {
    
    private values: any[];
    private type: VectorType;

    constructor(type: VectorType, values: any[]) {
        this.type = type;
        this.values = this.validateAndInitializeValues(values, type);
    }

    private validateAndInitializeValues(values: any[], type: VectorType): any[] {
        // Validar que los valores coincidan con las dimensiones esperadas
        const dimensions = this.countDimensions(values);
        if (dimensions !== type.dimensions) {
            throw new Error(
                `Vector dimensions mismatch. Expected ${type.dimensions}, got ${dimensions}`
            );
        }

        // Para vectores vacíos, inicializar con null
        if (values.length === 0) {
            return this.createEmptyVector(type.dimensions, []);
        }

        // Validar tipos de datos recursivamente
        this.validateTypes(values, type.baseType);
        return values;
    }

    private countDimensions(arr: any[]): number {
        if (!Array.isArray(arr)) return 0;
        if (arr.length === 0) return 1;
        return 1 + this.countDimensions(arr[0]);
    }

    private validateTypes(values: any[], baseType: string) {
        for (let value of values) {
            if (Array.isArray(value)) {
                this.validateTypes(value, baseType);
            } else if (value !== null) {
                this.validateType(value, baseType);
            }
        }
    }

    private validateType(value: any, baseType: string) {
        switch (baseType.toUpperCase()) {
            case 'INT':
                if (typeof value !== 'number' || !Number.isInteger(value)) {
                    throw new Error(`Expected integer, got ${typeof value}: ${value}`);
                }
                break;
            case 'DOUBLE':
                if (typeof value !== 'number') {
                    throw new Error(`Expected double, got ${typeof value}: ${value}`);
                }
                break;
            case 'CHAR':
                if (typeof value !== 'string' || value.length !== 1) {
                    throw new Error(`Expected char, got ${typeof value}: ${value}`);
                }
                break;
            case 'STRING':
                if (typeof value !== 'string') {
                    throw new Error(`Expected string, got ${typeof value}: ${value}`);
                }
                break;
            case 'BOOL':
                if (typeof value !== 'boolean') {
                    throw new Error(`Expected boolean, got ${typeof value}: ${value}`);
                }
                break;
        }
    }

    private createEmptyVector(dimensions: number, sizes: number[]): any[] {
        if (dimensions === 0) return [];
        const size = sizes[0] || 0;
        if (dimensions === 1) {
            return new Array(size).fill(null);
        }
        return new Array(size).fill(null).map(() => 
            this.createEmptyVector(dimensions - 1, sizes.slice(1))
        );
    }

    get(indices: number[]): any {
        // Validar que el número de índices coincida con las dimensiones
        if (indices.length !== this.type.dimensions) {
            throw new Error(
                `Invalid number of indices. Expected ${this.type.dimensions}, got ${indices.length}`
            );
        }

        try {
            return indices.reduce((acc, index) => {
                if (index < 0 || index >= acc.length) {
                    throw new Error(`Index out of bounds: ${index}`);
                }
                return acc[index];
            }, this.values);
        } catch (error) {
            if ((error as Error).message.includes('Cannot read property')) {
                throw new Error(`Index out of bounds`);
            }
            throw error;
        }
    }

    set(indices: number[], value: any): void {
        // Validar que el número de índices coincida con las dimensiones
        if (indices.length !== this.type.dimensions) {
            throw new Error(
                `Invalid number of indices. Expected ${this.type.dimensions}, got ${indices.length}`
            );
        }

        // Validar el tipo del nuevo valor
        if (value !== null) {
            this.validateType(value, this.type.baseType);
        }

        try {
            const lastIndex = indices.pop()!;
            const target = indices.reduce((acc, index) => {
                if (index < 0 || index >= acc.length) {
                    throw new Error(`Index out of bounds: ${index}`);
                }
                return acc[index];
            }, this.values);

            if (lastIndex < 0 || lastIndex >= target.length) {
                throw new Error(`Index out of bounds: ${lastIndex}`);
            }

            target[lastIndex] = value;
        } catch (error) {
            if ((error as Error).message.includes('Cannot read property')) {
                throw new Error(`Index out of bounds`);
            }
            throw error;
        }
    }

    getType(): VectorType {
        return this.type;
    }

    length(): number {
        return this.values.length;
    }

    getValues(): any[] {
        return this.values;
    }

}