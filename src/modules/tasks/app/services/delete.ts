import { TTaskRepository } from 'modules/tasks/domain/repository/task';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildDelete = ({ repository }: Dependencies) => {
    const service = async (id: number): Promise<void> => {
        return await repository.delete(id);
    };

    return service;
};
