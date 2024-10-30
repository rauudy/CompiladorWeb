/*
import { Request, Response } from 'express';
import { TsJisonExampleLexer } from '../analyzers/ts-jison-example';
import { TsJisonExampleParser } from '../analyzers/ts-jison-example';
import Context from '../Context/Context.js';
import RuntimeError from '../Exceptions/Runtime.js';

const parser = (req: Request, res: Response) => {
    const { text } = req.body;

    const lexer = new TsJisonExampleLexer();
    const jisonParser = new TsJisonExampleParser(lexer);
    const globalCtx = new Context(); // Inicializar el contexto global

    jisonParser.parseError = (_err: string, hash: any) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        console.log(msg);
        return res.status(400).send(msg);
    };

    try {
        const { errors, ast } = jisonParser.parse(text);
        
        if (errors.length !== 0) {
            for (const err of errors) {
                console.error(err.message);
            }
            return res.status(400).send(errors.map((err: { message: string }) => err.message));
        } else {
            for (const stmt of ast) {
                stmt.interpret(globalCtx);
            }
            return res.status(200).send({ message: 'Ejecución exitosa' });
        }
    } catch (err) {
        if (err instanceof RuntimeError) {
            console.error(err.message);
            return res.status(500).send(err.message);
        } else {
            console.error("Error al parsear:", err);
            return res.status(500).send("Error al parsear: " + err);
        }
    }
};

export default parser;
*/
/*
import { Request, Response } from 'express';
import { TsJisonExampleLexer } from '../analyzers/ts-jison-example';
import { TsJisonExampleParser } from '../analyzers/ts-jison-example';
import Context from '../Context/Context.js';
import RuntimeError from '../Exceptions/Runtime.js';

const parser = (req: Request, res: Response) => {
    const { text } = req.body;

    const lexer = new TsJisonExampleLexer();
    const jisonParser = new TsJisonExampleParser(lexer);
    const globalCtx = new Context();
    let output = '';

    jisonParser.parseError = (_err: string, hash: any) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        return res.status(400).send(msg);
    };

    try {
        const { errors, ast } = jisonParser.parse(text);
        
        if (errors.length !== 0) {
            return res.status(400).send(errors.map((err: { message: string }) => err.message));
        } else {
            for (const stmt of ast) {
                const result = stmt.interpret(globalCtx); // Interpreta y almacena el resultado
                if (result !== undefined) {
                    output += result + '\n'; // Solo acumula si hay un resultado
                }
            }
            return res.status(200).send({ message: 'Ejecución exitosa', output });
        }
    } catch (err) {
        if (err instanceof RuntimeError) {
            return res.status(500).send(err.message);
        } else {
            return res.status(500).send("Error al parsear: " + err);
        }
    }
    

};

export default parser;
*/
/*
import { Request, Response } from 'express';
import { TsJisonExampleLexer } from '../analyzers/ts-jison-example';
import { TsJisonExampleParser } from '../analyzers/ts-jison-example';
import Context from '../Context/Context.js';
import RuntimeError from '../Exceptions/Runtime.js';

const parser = (req: Request, res: Response) => {
    const { text } = req.body;
    const lexer = new TsJisonExampleLexer();
    const jisonParser = new TsJisonExampleParser(lexer);
    const globalCtx = new Context();
    let output = '';

    // Capture console.log output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalConsoleLog(...args);
    };

    jisonParser.parseError = (_err: string, hash: any) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        return res.status(400).send(msg);
    };

    try {
        const { errors, ast } = jisonParser.parse(text);
        
        if (errors.length !== 0) {
            return res.status(400).send(errors.map((err: { message: string }) => err.message));
        } else {
            for (const stmt of ast) {
                stmt.interpret(globalCtx);
            }
            return res.status(200).send({ message: 'Ejecución exitosa', output });
        }
    } catch (err) {
        if (err instanceof RuntimeError) {
            return res.status(500).send(err.message);
        } else {
            return res.status(500).send("Error al parsear: " + err);
        }
    } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
    }
};

export default parser;
*/
function transformarVector(obj: any): any[] {
    // Si no hay values, retornar array vacío
    if (!obj.values) return [];
    
    // Verificar si es un vector bidimensional
    if (obj.values[0]?.values) {
        // Procesar cada subarray
        return obj.values.map((subArray: any) => 
            subArray.values.map((item: any) => Number(item.literal))
        );
    } else {
        // Vector unidimensional
        return obj.values.map((item: any) => Number(item.literal));
    }
}

function formatTipoArray(obj: any): string {
    return `${obj.baseType}${'[]'.repeat(obj.dimensions)}`;
}

import { Request, Response } from 'express';
import { TsJisonExampleLexer } from '../analyzers/ts-jison-example';
import { TsJisonExampleParser } from '../analyzers/ts-jison-example';
import Context from '../Context/Context.js';
import RuntimeError from '../Exceptions/Runtime.js';
import VarDeclarationStmt from '../Statements/VarDeclaration';
import FunctionDeclaration from '../Statements/FunctionDeclaration';
import { VectorDeclarationStmt } from '../Statements/VectorDeclaration';

const parser = (req: Request, res: Response) => {
    const { text } = req.body;
    const lexer = new TsJisonExampleLexer();
    const jisonParser = new TsJisonExampleParser(lexer);
    const globalCtx = new Context(true);  // Creamos un contexto global
    let output = '';
    let symbolTable = []; // Array para almacenar los símbolos

    // Capture console.log output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalConsoleLog(...args);
    };

    jisonParser.parseError = (_err: string, hash: any) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        return res.status(400).send(msg);
    };

    try {
        const { errors, ast } = jisonParser.parse(text);
        if (errors.length !== 0) {
            return res.status(400).send(errors.map((err: { message: string }) => err.message));
        } else {
            // First pass: Populate symbol table
            for (const stmt of ast) {
                if (stmt instanceof VarDeclarationStmt || stmt instanceof FunctionDeclaration) {
                    stmt.interpret(globalCtx);
                    // Populate symbol table for variables
                    if (stmt instanceof VarDeclarationStmt) {
                        symbolTable.push({
                            id: stmt.identifier,
                            varType: stmt instanceof Array ? 'Vector' : 'Variable',
                            dataType: stmt.type,
                            environment: 'Global',
                            value: stmt.expr ? stmt.expr.interpret(globalCtx) : null,
                            line: stmt.location.first_line,
                            column: stmt.location.first_column
                        });
                    }
                    
                }
                // Populate symbol table for vectors
                if (stmt instanceof VectorDeclarationStmt) {
                    symbolTable.push({
                        id: stmt.identifier,
                        varType: stmt instanceof Array ? 'Vector' : 'Variable',
                        dataType: formatTipoArray(stmt.vectorType),
                        environment: 'Global',
                        value: transformarVector(stmt.initializer),
                        line: stmt.location.first_line,
                        column: stmt.location.first_column
                    });
                }
            }
            // Save symbol table in app.locals
            req.app.locals.symbolTable = symbolTable;

            // Second pass: Execute all code
            for (const stmt of ast) {
                const localCtx = new Context();
                localCtx.globalContext = globalCtx;  // Asignamos el contexto global
                stmt.interpret(localCtx);
            }
            return res.status(200).send({ message: 'Ejecución exitosa', output });
        }
    } catch (err) {
        if (err instanceof RuntimeError) {
            return res.status(500).send(err.message);
        } else {
            return res.status(500).send("Error al parsear: " + err);
        }
    } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
    }
};

export default parser;
