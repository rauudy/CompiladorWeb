"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jison_example_1 = require("../analyzers/ts-jison-example");
const parser = (req, res) => {
    const { text } = req.body;
    // console.log(req.body["text"]); 
    const jisonParser = new ts_jison_example_1.TsJisonExampleParser();
    jisonParser.parseError = (_err, hash) => {
        const msg = "No se esperaba el token: " + hash.token + " Se esperaba " + hash.expected;
        console.log(msg);
        res.status(400).send(msg);
    };
    jisonParser.parse(text);
    res.status(200).send();
};
exports.default = parser;
//# sourceMappingURL=parser.controler.js.map