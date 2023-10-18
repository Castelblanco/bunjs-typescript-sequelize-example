import { TTaskDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildSave = ({ repository }: Dependencies) => {
    const service = async (task: TTaskDOM): Promise<TTaskDOM> => {
        return await repository.save(task);
    };

    return service;
};
