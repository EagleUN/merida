"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var verror_1 = __importDefault(require("verror"));
var winston_1 = require("winston");
var Config_1 = __importDefault(require("./Config"));
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
var level = Config_1.default.get("log_level") || "debug";
var disableLog = Config_1.default.get("DISABLE_LOG") || "false";
var myFormat = printf(function (info) {
    return info.timestamp + " [" + info.label + "][" + process.pid + "] " + info.level + ": " + info.message + "\n";
});
var logger = function (tag) {
    var log = winston_1.createLogger({
        format: combine(winston_1.format.splat(), label({ label: tag }), timestamp(), myFormat),
        level: level,
        transports: [new winston_1.transports.Console()],
    });
    log.logError = function (message, data, err) {
        var errorData = {
            data: data,
            message: message,
            stacktrace: verror_1.default.fullStack(err),
        };
        log.error(message + " " + JSON.stringify(errorData));
    };
    log.logInfo = function (message, data) {
        var infoData = {
            data: data,
            message: message,
        };
        log.info(message + " " + JSON.stringify(infoData));
    };
    if (disableLog === "true") {
        log.transports.forEach(function (t) { return (t.silent = true); });
    }
    return log;
};
exports.default = logger;
