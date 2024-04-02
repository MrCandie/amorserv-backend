"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDate = void 0;
const filterDate = function filterDate(milliseconds) {
    const daysMilli = Date.now() - milliseconds;
    return new Date(daysMilli);
};
exports.filterDate = filterDate;
