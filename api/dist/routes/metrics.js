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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metrics_1 = require("../metrics");
const router = (0, express_1.Router)();
router.get("/custom", (req, res) => {
    const end = metrics_1.httpRequestDuration.startTimer();
    res.send("Custom metric recorded");
    end({ route: "/metrics/custom", status_code: 200, method: "GET" });
});
router.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", metrics_1.register.contentType);
    res.end(yield metrics_1.register.metrics());
}));
exports.default = router;
