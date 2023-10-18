import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';
import { buildGetAll } from './get-all';
import { buildSave } from './save';
import { buildUpdate } from './update';
import { buildDalete } from './delete';
import { buildGetById } from './get-by-id';

export class ProjectServices {
    getAll: (filter?: TProjectFilterDOM) => Promise<TProjectDOM[]>;
    getById: (id: number) => Promise<TProjectDOM>;
    save: (project: TProjectDOM) => Promise<TProjectDOM>;
    update: (id: number, project: TProjectDOM) => Promise<TProjectDOM>;
    delete: (id: number) => Promise<void>;

    constructor(repository: TProjectRepository) {
        this.getAll = buildGetAll({ repository });
        this.getById = buildGetById({ repository });
        this.save = buildSave({ repository });
        this.update = buildUpdate({ repository });
        this.delete = buildDalete({ repository });
    }
}
