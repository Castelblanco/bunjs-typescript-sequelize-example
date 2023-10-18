import { TTaskDOM, TTaskFilterDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildGetAll = ({ repository }: Dependencies) => {
    const service = async (filter?: TTaskFilterDOM): Promise<TTaskDOM[]> => {
        return await repository.getAll(filter);
    };

    return service;
};
