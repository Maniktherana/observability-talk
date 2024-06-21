"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logStream = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const logFormat = winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), logFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.DailyRotateFile({
            dirname: "logs",
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
        }),
    ],
});
exports.logger = logger;
const logStream = {
    write: (message) => {
        logger.info(message.trim());
    },
};
exports.logStream = logStream;
