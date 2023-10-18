import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';

type Dependencies = {
    repository: TProjectRepository;
};

export const buildGetById = ({ repository }: Dependencies) => {
    const service = async (id: number): Promise<TProjectDOM> => {
        return await repository.getById(id);
    };

    return service;
};
