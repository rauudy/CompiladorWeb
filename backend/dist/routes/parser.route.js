"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parser_controller_1 = __importDefault(require("../controllers/parser.controller"));
const router = (0, express_1.Router)();
router.post("/parse", parser_controller_1.default);
exports.default = router;
//# sourceMappingURL=parser.route.js.map