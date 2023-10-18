import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';

type Dependencies = {
    repository: TProjectRepository;
};

export const buildGetAll = ({ repository }: Dependencies) => {
    const service = async (
        filter?: TProjectFilterDOM
    ): Promise<TProjectDOM[]> => {
        return await repository.getAll(filter);
    };

    return service;
};
