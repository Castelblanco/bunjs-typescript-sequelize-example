import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';

type Dependencies = {
    repository: TProjectRepository;
};

export const buildDalete = ({ repository }: Dependencies) => {
    const service = async (id: number): Promise<void> => {
        return await repository.delete(id);
    };

    return service;
};
