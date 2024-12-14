"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, ExpressError.prototype);
    }
}
exports.default = ExpressError;
