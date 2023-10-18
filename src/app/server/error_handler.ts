import { NextFunction, Request, Response } from 'express';
import { HttpErrorCode } from 'modules/common/enums/errors_enum';
import { ApiError } from 'modules/common/responses/errors/api_error';
import { BaseError } from 'modules/common/responses/errors/base_error';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!err) return next();

    if (err instanceof BaseError) {
        return res
            .status(
                err.metadata.status ||
                    err.status ||
                    HttpErrorCode.INTERNAL_SERVER_ERROR
            )
            .json(new ApiError(err.code, err.error, err.metadata));
    }

    if (err instanceof Error) {
        return res
            .status(HttpErrorCode.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(HttpErrorCode.INTERNAL_SERVER_ERROR, err.message)
            );
    }

    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json(new ApiError(err.status, err.message, err.metadata));
    }

    return res
        .status(HttpErrorCode.INTERNAL_SERVER_ERROR)
        .json(
            new ApiError(HttpErrorCode.INTERNAL_SERVER_ERROR, 'Unknow error')
        );
};
