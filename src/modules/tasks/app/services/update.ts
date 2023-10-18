import { TTaskDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildUpdate = ({ repository }: Dependencies) => {
    const service = async (id: number, task: TTaskDOM): Promise<TTaskDOM> => {
        return await repository.update(id, task);
    };

    return service;
};
