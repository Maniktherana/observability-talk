"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/fast", (req, res) => {
    res.send("Fast response");
});
router.get("/medium", (req, res) => {
    setTimeout(() => {
        res.send("Medium response");
    }, 1000);
});
router.get("/slow", (req, res) => {
    setTimeout(() => {
        res.send("Slow response");
    }, 3000);
});
exports.default = router;
