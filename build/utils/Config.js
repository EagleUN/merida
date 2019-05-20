"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nconf_1 = __importDefault(require("nconf"));
var path_1 = __importDefault(require("path"));
nconf_1.default
    .argv()
    .env()
    .file({
    file: path_1.default.resolve("./config.json"),
});
nconf_1.default.defaults({});
exports.default = nconf_1.default;
