class ExpressError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, ExpressError.prototype);
    }
}

export default ExpressError;