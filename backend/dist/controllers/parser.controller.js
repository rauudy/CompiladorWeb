"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function transformarVector(obj) {
    var _a;
    // Si no hay values, retornar array vacío
    if (!obj.values)
        return [];
    // Verificar si es un vector bidimensional
    if ((_a = obj.values[0]) === null || _a === void 0 ? void 0 : _a.values) {
        // Procesar cada subarray
        return obj.values.map((subArray) => subArray.values.map((item) => Number(item.literal)));
    }
    else {
        // Vector unidimensional
        return obj.values.map((item) => Number(item.literal));
    }
}
function formatTipoArray(obj) {
    return `${obj.baseType}${'[]'.repeat(obj.dimensions)}`;
}
const ts_jison_example_1 = require("../analyzers/ts-jison-example");
const ts_jison_example_2 = require("../analyzers/ts-jison-example");
const Context_js_1 = __importDefault(require("../Context/Context.js"));
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const VarDeclaration_1 = __importDefault(require("../Statements/VarDeclaration"));
const FunctionDeclaration_1 = __importDefault(require("../Statements/FunctionDeclaration"));
const VectorDeclaration_1 = require("../Statements/VectorDeclaration");
const parser = (req, res) => {
    const { text } = req.body;
    const lexer = new ts_jison_example_1.TsJisonExampleLexer();
    const jisonParser = new ts_jison_example_2.TsJisonExampleParser(lexer);
    const globalCtx = new Context_js_1.default(true); // Creamos un contexto global
    let output = '';
    let symbolTable = []; // Array para almacenar los símbolos
    // Capture console.log output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalConsoleLog(...args);
    };
    jisonParser.parseError = (_err, hash) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        return res.status(400).send(msg);
    };
    try {
        const { errors, ast } = jisonParser.parse(text);
        if (errors.length !== 0) {
            return res.status(400).send(errors.map((err) => err.message));
        }
        else {
            // First pass: Populate symbol table
            for (const stmt of ast) {
                if (stmt instanceof VarDeclaration_1.default || stmt instanceof FunctionDeclaration_1.default) {
                    stmt.interpret(globalCtx);
                    // Populate symbol table for variables
                    if (stmt instanceof VarDeclaration_1.default) {
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
                if (stmt instanceof VectorDeclaration_1.VectorDeclarationStmt) {
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
                const localCtx = new Context_js_1.default();
                localCtx.globalContext = globalCtx; // Asignamos el contexto global
                stmt.interpret(localCtx);
            }
            return res.status(200).send({ message: 'Ejecución exitosa', output });
        }
    }
    catch (err) {
        if (err instanceof Runtime_js_1.default) {
            return res.status(500).send(err.message);
        }
        else {
            return res.status(500).send("Error al parsear: " + err);
        }
    }
    finally {
        // Restore original console.log
        console.log = originalConsoleLog;
    }
};
exports.default = parser;
//# sourceMappingURL=parser.controller.js.map