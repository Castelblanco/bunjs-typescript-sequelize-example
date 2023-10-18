import { NextFunction, Request, Response } from 'express';
import { HttpSuccessCode } from 'modules/common/enums/success_enum';
import { TMappers } from 'modules/common/mappers_and_wrappers/mappers';
import { ApiReponse } from 'modules/common/responses/success/api_responses';
import { ListResponse } from 'modules/common/responses/success/list_responses';
import { ProjectMappers } from 'modules/projects/app/mappers/project';
import { ProjectServices } from 'modules/projects/app/services';
import { TProjectAPI } from 'modules/projects/domain/dto/project';
import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';

export class ProjectController {
    private readonly services: ProjectServices;
    private readonly mappers: TMappers<TProjectDOM, TProjectAPI>;

    constructor(services: ProjectServices) {
        this.services = services;
        this.mappers = new ProjectMappers();
    }

    getAll = async (
        req: Request<any, any, any, TProjectFilterDOM>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const projects = await this.services.getAll(req.query);

            res.json(
                new ListResponse(
                    projects.map(this.mappers.domToApi),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    getById = async (
        req: Request<any, any, any, TProjectFilterDOM>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const projects = await this.services.getById(+req.params.id);

            res.json(
                new ApiReponse(
                    this.mappers.domToApi(projects),
                    HttpSuccessCode.SUCCESSFUL
                )
            );
        } catch (e) {
            next(e);
        }
    };

    save = async (
        req: Request<any, any, TProjectAPI>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const newProject = await this.services.save(
                this.mappers.apiToDom(req.body)
            );

            res.status(HttpSuccessCode.CREATED).json(
                new ApiReponse(
                    this.mappers.domToApi(newProject),
                    HttpSuccessCode.CREATED
                )
            );
        } catch (e) {
            next(e);
        }
    };

    update = async (
        req: Request<any, any, TProjectAPI>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const projects = await this.services.update(
                +req.params.id,
                this.mappers.apiToDom(req.body)
            );

            res.json(
                new ApiReponse(
                    this.mappers.domToApi(projects),
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
