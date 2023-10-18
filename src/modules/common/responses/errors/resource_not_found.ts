import { HttpErrorCode } from 'modules/common/enums/errors_enum';
import { BaseError } from './base_error';

export class ErrorResourceNotFound extends BaseError {
    constructor(message: string, metadata?: any) {
        super(
            message,
            HttpErrorCode.RESOURCE_NOT_FOUND,
            HttpErrorCode.RESOURCE_NOT_FOUND,
            metadata
        );
    }
}
