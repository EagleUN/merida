"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var Config_1 = __importDefault(require("./utils/Config"));
var Logger_1 = __importDefault(require("./utils/Logger"));
var log = Logger_1.default("Server");
var port = Config_1.default.get("APP_PORT");
App_1.default.listen(port, function () {
    log.logInfo("Merida is listening on port: " + port);
});
