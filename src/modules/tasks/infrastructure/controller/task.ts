import { NextFunction, Request, Response } from 'express';
import { HttpSuccessCode } from 'modules/common/enums/success_enum';
import { TMappers } from 'modules/common/mappers_and_wrappers/mappers';
import { ApiReponse } from 'modules/common/responses/success/api_responses';
import { ListResponse } from 'modules/common/responses/success/list_responses';
import { TaskMappers } from 'modules/tasks/app/mappers/task';
import { TaskServices } from 'modules/tasks/app/services';
import { TTaskAPI } from 'modules/tasks/domain/dto/task';
import { TTaskDOM, TTaskFilterDOM } from 'modules/tasks/domain/entities/task';

export class TaskController {
    services: TaskServices;
    mappers: TMappers<TTaskDOM, TTaskAPI>;

    constructor(services: TaskServices) {
        this.services = services;
        this.mappers = new TaskMappers();
    }

    getAll = async (
        req: Request<any, any, any, TTaskFilterDOM>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const tasks = await this.services.getAll(req.query);

            res.json(
                new ListResponse(
                    tasks.map(this.mappers.domToApi),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = await this.services.getById(+req.params.id);

            res.json(
                new ApiReponse(
                    this.mappers.domToApi(task),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    save = async (
        req: Request<any, any, TTaskAPI>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const newTask = await this.services.save(
                this.mappers.apiToDom(req.body)
            );

            res.json(
                new ApiReponse(
                    this.mappers.domToApi(newTask),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    update = async (
        req: Request<any, any, TTaskAPI>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const updateTask = await this.services.update(
                +req.params.id,
                this.mappers.apiToDom(req.body)
            );

            res.json(
                new ApiReponse(
                    this.mappers.domToApi(updateTask),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.services.delete(+req.params.id);

            res.sendStatus(HttpSuccessCode.NOT_CONTENT);
        } catch (e) {
            next(e);
        }
    };
}
