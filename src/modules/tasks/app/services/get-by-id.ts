import { TTaskDOM } from 'modules/tasks/domain/entities/task';
import { TTaskRepository } from 'modules/tasks/domain/repository/task';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildGetById = ({ repository }: Dependencies) => {
    const service = async (id: number): Promise<TTaskDOM> => {
        return await repository.getById(id);
    };

    return service;
};
