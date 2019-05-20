"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var Test_1 = __importDefault(require("../controllers/routes/Test"));
var router = express_1.default.Router();
var logFormat = ":date[iso] :remote-addr :remote-user :method :url " +
    "HTTP/:http-version :status :res[content-length] - :response-time ms \n";
var healthCheck = function (_, res) {
    res.status(200).json({ status: "Merida is healthy" });
};
router.use(morgan_1.default(logFormat));
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: false }));
router.use("/test", Test_1.default);
router.get("/", healthCheck);
router.use(function (_, res, __) {
    res.status(404).json({
        error: "Not found",
    });
});
exports.default = router;
