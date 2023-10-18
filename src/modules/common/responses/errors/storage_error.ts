import { HttpErrorCode } from '../../enums/errors_enum';
import { BaseError } from './base_error';

export class StorageError extends BaseError {
    constructor(metadata?: any) {
        super(
            'Storage error',
            HttpErrorCode.STORAGE_EXCEPTION,
            HttpErrorCode.BAD_REQUEST,
            metadata
        );
    }
}
