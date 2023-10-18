import { TProjectDOM, TProjectFilterDOM } from '../entities/project';

export type TProjectRepository = {
    getAll: (filter?: TProjectFilterDOM) => Promise<TProjectDOM[]>;
    getById: (id: number) => Promise<TProjectDOM>;
    save: (project: TProjectDOM) => Promise<TProjectDOM>;
    update: (id: number, project: TProjectDOM) => Promise<TProjectDOM>;
    delete: (id: number) => Promise<void>;
};
