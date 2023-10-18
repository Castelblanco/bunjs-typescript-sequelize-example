import { TProjectDOM } from 'modules/projects/domain/entities/project';
import { TProjectRepository } from 'modules/projects/domain/repository/project';

type Dependencies = {
    repository: TProjectRepository;
};

export const buildSave = ({ repository }: Dependencies) => {
    const service = async (project: TProjectDOM): Promise<TProjectDOM> => {
        return await repository.save(project);
    };

    return service;
};
