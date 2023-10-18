import { TTaskFilterDOM, TTaskDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';
import { TTaskDAL, TaskSchema } from '../models/task';
import { TWrappers } from 'modules/common/mappers_and_wrappers/wrappers';
import { TaskWrappers } from '../wrappers/task';
import { StorageError } from 'modules/common/responses/errors/storage_error';
import { ErrorResourceNotFound } from 'modules/common/responses/errors/resource_not_found';
import { Op, WhereOptions } from 'sequelize';

export class TaskSequelizeReposiroty implements TTaskRepository {
    db: typeof TaskSchema;
    wrappers: TWrappers<TTaskDOM, TTaskDAL>;
    filtersIf: Record<
        keyof TTaskFilterDOM,
        (
            options: WhereOptions<TTaskDAL>,
            value: string | number | boolean
        ) => WhereOptions<TTaskDAL>
    >;

    constructor() {
        this.db = TaskSchema;
        this.wrappers = new TaskWrappers();

        this.filtersIf = {
            name: (o, v) => ({
                ...o,
                $name$: {
                    [Op.substring]: v,
                },
            }),
            done: (o, v) => ({
                ...o,
                $done$$: {
                    [Op.eq]: v,
                },
            }),
            projectId: (o, v) => ({
                ...o,
                $project_id$: {
                    [Op.eq]: v,
                },
            }),
        };
    }

    getAll = async (filter?: TTaskFilterDOM): Promise<TTaskDOM[]> => {
        try {
            const tasks = await this.db.findAll({
                where: this.filterDomToWhere(filter),
            });

            return tasks.map(({ dataValues }) =>
                this.wrappers.dalToDom(dataValues)
            );
        } catch (e) {
            throw new StorageError(e);
        }
    };

    getById = async (id: number): Promise<TTaskDOM> => {
        try {
            const task = await this.db.findByPk(id);

            if (!task)
                throw new ErrorResourceNotFound(
                    `this task with id: ${id}, not exist`
                );

            return this.wrappers.dalToDom(task.dataValues);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    save = async (task: TTaskDOM): Promise<TTaskDOM> => {
        try {
            const { dataValues: newTask } = await this.db.create(
                this.wrappers.domToDal(task)
            );

            return this.wrappers.dalToDom(newTask);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    update = async (id: number, task: TTaskDOM): Promise<TTaskDOM> => {
        try {
            const updateTask = await this.db.findByPk(id);

            if (!updateTask)
                throw new ErrorResourceNotFound(
                    `this task with id: ${id}, not exist`
                );

            updateTask.set(this.wrappers.domToDal(task));

            return this.wrappers.dalToDom((await updateTask.save()).dataValues);
        } catch (e) {
            throw new StorageError(e);
        }
    };
    delete = async (id: number): Promise<void> => {
        try {
            await this.db.destroy({
                where: {
                    $_id$: id,
                },
            });
        } catch (e) {
            throw new StorageError(e);
        }
    };

    filterDomToWhere = (
        filter?: TTaskFilterDOM
    ): WhereOptions<TTaskDAL> | undefined => {
        if (!filter) return;

        let options: WhereOptions<TTaskDAL> = {};

        Object.keys(filter).forEach((key) => {
            const value = filter[key as keyof TTaskFilterDOM];

            if (value === undefined || value === '') return;
            options = this.filtersIf[key as keyof TTaskFilterDOM](
                options,
                value
            );
        });

        return options;
    };
}
