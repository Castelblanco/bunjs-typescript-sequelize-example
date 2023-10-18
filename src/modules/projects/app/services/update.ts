import {
    TProjectDOM,
    TProjectFilterDOM,
} from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';

type Dependencies = {
    repository: TProjectRepository;
};

export const buildUpdate = ({ repository }: Dependencies) => {
    const service = async (
        id: number,
        project: TProjectDOM
    ): Promise<TProjectDOM> => {
        return await repository.update(id, project);
    };

    return service;
};
