"use strict";
/*
import Context from './Context/Context.js';
import RuntimeError from './Exceptions/Runtime.js';
import { TsJisonExampleLexer } from './analyzers/ts-jison-example.js';
import Statement from './Statements/Statement.js';
import { TsJisonExampleParser } from './analyzers/ts-jison-example.js'; // Add this line to import the parser

const globalCtx = new Context(); // Initialize globalCtx

const input = `
    echo 1 + 1 - 2;
    echo 3 + 1 == 4;
    echo -3 + 2;
    echo -(-3 + 2);
    let hello: string = "Hello";
    let world: string = "World";
    echo hello + ", " + world + "!";
    let foo: string = "Foo afuera de bloque";
    let bar: string = "Bar afuera de bloque";
    {
        let foo:string = "Foo dentro del bloque";
        echo foo;
        echo bar;
    };
    echo foo;
    foo = "Nuevo foo";
    echo foo;
    `;

const lexer = new TsJisonExampleLexer();
const parser = new TsJisonExampleParser(lexer);

try {
    const { errors, ast } = parser.parse(input);
    if (errors.length !== 0) {
        for (const err of errors) {
            console.error(err.message);
        }
    } else {
        for (const stmt of ast) {
            stmt.interpret(globalCtx);
        }
    }
} catch (err) {
    if (err instanceof RuntimeError) {
        console.error(err.message);
    } else {
        console.error("Error al parsear:", err);
    }
}
    */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const parser_route_1 = __importDefault(require("./routes/parser.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const symbolTableEndpoint_1 = __importDefault(require("./controllers/symbolTableEndpoint"));
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "100mb" }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use('', parser_route_1.default);
app.listen(port, () => {
    console.log("Servidor online en puerto: " + port);
});
app.get('/symbol-table', symbolTableEndpoint_1.default);
//# sourceMappingURL=index.js.map