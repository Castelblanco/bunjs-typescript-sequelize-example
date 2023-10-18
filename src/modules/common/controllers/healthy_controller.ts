import { NextFunction, Request, Response } from 'express';
import { HttpSuccessCode } from '../enums/success_enum';
import { ApiReponse } from '../responses/success/api_responses';
import { version } from '../../../../package.json';

const svc = process.env.APP_ID || 'Service';

export interface IHealthy {
    message: string;
    version: string;
}

const healthy: IHealthy = {
    message: `${svc} OK 👩‍💻`,
    version: version,
};

export class HealthyController {
    get = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(HttpSuccessCode.SUCCESSFUL).json(
                new ApiReponse<IHealthy>(healthy, HttpSuccessCode.SUCCESSFUL)
            );
        } catch (e) {
            next(e);
        }
    };

    readiness = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(HttpSuccessCode.SUCCESSFUL).json(
                new ApiReponse<IHealthy>(healthy, HttpSuccessCode.SUCCESSFUL)
            );
        } catch (e) {
            next(e);
        }
    };

    health = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(HttpSuccessCode.SUCCESSFUL).json(
                new ApiReponse<IHealthy>(healthy, HttpSuccessCode.SUCCESSFUL)
            );
        } catch (e) {
            next(e);
        }
    };
}
