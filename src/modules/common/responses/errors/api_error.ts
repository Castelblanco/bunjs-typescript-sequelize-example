export class ApiError {
    status: number;
    message: string;
    metadata?: any;

    constructor(status: number, message: string, metadata?: any) {
        this.status = status;
        this.message = message;
        this.metadata = metadata;
    }
}
