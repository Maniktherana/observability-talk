"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../logger");
const router = (0, express_1.Router)();
router.get("/info", (req, res) => {
    logger_1.logger.info("This is an info log");
    res.send("Info log recorded");
});
router.get("/warn", (req, res) => {
    logger_1.logger.warn("This is a warning log");
    res.send("Warning log recorded");
});
router.get("/error", (req, res) => {
    logger_1.logger.error("This is an error log");
    res.send("Error log recorded");
});
exports.default = router;
