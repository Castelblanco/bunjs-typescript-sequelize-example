import {
    TProjectFilterDOM,
    TProjectDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';
import { ProjectSchema, TProjectDAL } from '../models/project';
import { TWrappers } from 'modules/common/mappers_and_wrappers/wrappers';
import { ProjectWrappers } from '../wrappers/project';
import { StorageError } from 'modules/common/responses/errors/storage_error';
import { ErrorResourceNotFound } from 'modules/common/responses/errors/resource_not_found';
import { Op, WhereOptions } from 'sequelize';

export class ProjectSequelizeRepository implements TProjectRepository {
    db: typeof ProjectSchema;
    wrappers: TWrappers<TProjectDOM, TProjectDAL>;
    filtersIf: Record<
        keyof TProjectFilterDOM,
        (
            options: WhereOptions<TProjectDAL>,
            value: string | number
        ) => WhereOptions<TProjectDAL>
    >;

    constructor() {
        this.db = ProjectSchema;
        this.wrappers = new ProjectWrappers();

        this.filtersIf = {
            name: (o, v) => {
                return {
                    ...o,
                    $name$: {
                        [Op.substring]: v,
                    },
                };
            },
            priority: (o, v) => {
                return {
                    ...o,
                    $priority$: {
                        [Op.eq]: v,
                    },
                };
            },
        };
    }

    getAll = async (filter?: TProjectFilterDOM): Promise<TProjectDOM[]> => {
        try {
            const projects = await this.db.findAll({
                where: this.filterDomToWhere(filter),
            });

            return projects.map(({ dataValues }) =>
                this.wrappers.dalToDom(dataValues)
            );
        } catch (e) {
            throw new StorageError(e);
        }
    };

    getById = async (id: number): Promise<TProjectDOM> => {
        try {
            const project = await this.db.findByPk(id);

            if (!project)
                throw new ErrorResourceNotFound(
                    `this project with id: ${id}, not exist`
                );

            return this.wrappers.dalToDom(project.dataValues);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    save = async (project: TProjectDOM): Promise<TProjectDOM> => {
        try {
            const { dataValues: newProject } = await this.db.create(
                this.wrappers.domToDal(project)
            );

            return this.wrappers.dalToDom(newProject);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    update = async (id: number, project: TProjectDOM): Promise<TProjectDOM> => {
        try {
            const updateProject = await this.db.findByPk(id);

            if (!updateProject)
                throw new ErrorResourceNotFound(
                    `this project with id: ${id}, not exist`
                );

            updateProject.set(this.wrappers.domToDal(project));

            return this.wrappers.dalToDom(
                (await updateProject.save()).dataValues
            );
        } catch (e) {
            throw new StorageError(e);
        }
    };

    delete = async (id: number): Promise<void> => {
        try {
            await this.db.destroy({
                where: {
                    _id: id,
                },
            });
        } catch (e) {
            throw new StorageError(e);
        }
    };

    filterDomToWhere = (
        filter?: TProjectFilterDOM
    ): WhereOptions<TProjectDAL> | undefined => {
        if (!filter) return;

        let options: WhereOptions<TProjectDAL> = {};

        /* for (const key of Object.keys(filter)) {
            const value = filter[key as keyof TProjectFilterDOM];

            if (!value) return;
            options = this.filtersIf[key as keyof TProjectFilterDOM](
                options,
                value
            );
        } */
        Object.keys(filter).forEach((key) => {
            const value = filter[key as keyof TProjectFilterDOM];

            if (!value) return;
            options = this.filtersIf[key as keyof TProjectFilterDOM](
                options,
                value
            );
        });

        console.log({ options });

        return options;
    };
}
