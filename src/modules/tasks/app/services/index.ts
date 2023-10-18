import { TTaskDOM, TTaskFilterDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';
import { buildGetAll } from './get-all';
import { buildSave } from './save';
import { buildDelete } from './delete';
import { buildGetById } from './get-by-id';
import { buildUpdate } from './update';

export class TaskServices {
    getAll: (filter?: TTaskFilterDOM) => Promise<TTaskDOM[]>;
    getById: (id: number) => Promise<TTaskDOM>;
    save: (task: TTaskDOM) => Promise<TTaskDOM>;
    update: (id: number, task: TTaskDOM) => Promise<TTaskDOM>;
    delete: (id: number) => Promise<void>;

    constructor(repository: TTaskRepository) {
        this.getAll = buildGetAll({ repository });
        this.save = buildSave({ repository });
        this.getById = buildGetById({ repository });
        this.update = buildUpdate({ repository });
        this.delete = buildDelete({ repository });
    }
}
