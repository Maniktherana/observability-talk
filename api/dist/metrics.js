"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsRouter = exports.metricsMiddleware = exports.httpRequestDuration = exports.register = void 0;
const prom_client_1 = require("prom-client");
const express_1 = __importDefault(require("express"));
const register = new prom_client_1.Registry();
exports.register = register;
(0, prom_client_1.collectDefaultMetrics)({ register });
const httpRequestDuration = new prom_client_1.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    registers: [register],
});
exports.httpRequestDuration = httpRequestDuration;
const metricsMiddleware = (req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on("finish", () => {
        var _a;
        end({
            method: req.method,
            route: ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.path,
            status_code: res.statusCode,
        });
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
const metricsRouter = express_1.default.Router();
exports.metricsRouter = metricsRouter;
metricsRouter.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", register.contentType);
    res.end(yield register.metrics());
}));
