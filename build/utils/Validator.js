"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var check_1 = require("express-validator/check");
var validation = function (req, res, next) {
    var errors = check_1.validationResult(req);
    if (errors.isEmpty()) {
        next();
    }
    else {
        res.status(422).json({ errors: errors.array() });
    }
};
exports.default = validation;
