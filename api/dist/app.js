"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const metrics_1 = require("./metrics");
const index_1 = __importDefault(require("./routes/index"));
const logs_1 = __importDefault(require("./routes/logs"));
const latency_1 = __importDefault(require("./routes/latency"));
const errors_1 = __importDefault(require("./routes/errors"));
const app = (0, express_1.default)();
app.use(metrics_1.metricsMiddleware); // Use the custom metrics middleware
app.use(express_1.default.json());
app.use("/logs", logs_1.default);
app.use("/latency", latency_1.default);
app.use("/errors", errors_1.default);
app.use(metrics_1.metricsRouter); // Use the metrics route
app.use("/", index_1.default);
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
exports.default = app;
