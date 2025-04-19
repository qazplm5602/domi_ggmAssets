export class DomiError extends Error {
    status = 0;
    message = "empty";

    constructor(status: number, message: string) {
        super();
        
        this.status = status;
        this.message = message;
    }
}