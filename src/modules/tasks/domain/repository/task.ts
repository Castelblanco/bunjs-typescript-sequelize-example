import { TTaskDOM, TTaskFilterDOM } from '../entities/task';

export type TTaskRepository = {
    getAll: (filter?: TTaskFilterDOM) => Promise<TTaskDOM[]>;
    getById: (id: number) => Promise<TTaskDOM>;
    save: (task: TTaskDOM) => Promise<TTaskDOM>;
    update: (id: number, task: TTaskDOM) => Promise<TTaskDOM>;
    delete: (id: number) => Promise<void>;
};
