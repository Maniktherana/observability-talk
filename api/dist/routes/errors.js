"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/crash", (req, res) => {
    throw new Error("This is a crash!");
});
exports.default = router;
