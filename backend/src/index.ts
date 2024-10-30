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


import express, {Express} from "express";
import cors from "cors";
import router from "./routes/parser.route";
import bodyParser from "body-parser";
import symbolTableEndpoint from './controllers/symbolTableEndpoint';


const app: Express = express();

const port = 3000 || process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false, limit: "100mb"}));
app.use(bodyParser.json({limit: "100mb"}));

app.use('', router);

app.listen(port, ()=> {
    console.log("Servidor online en puerto: " + port)
});

app.get('/symbol-table', symbolTableEndpoint);
