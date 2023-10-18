import { TMappers } from 'modules/common/mappers_and_wrappers/mappers';
import { ProjectAPI, TProjectAPI } from 'modules/projects/domain/dto/project';
import {
    ProjectDOM,
    TProjectDOM,
} from 'modules/projects/domain/entities/project';

export class ProjectMappers implements TMappers<TProjectDOM, TProjectAPI> {
    apiToDom = (item: TProjectAPI) => {
        return new ProjectDOM({
            id: item._id,
            name: item.name,
            description: item.description,
            priority: item.priority,
        });
    };

    domToApi = (item: TProjectDOM) => {
        return new ProjectAPI({
            _id: item.id,
            name: item.name,
            description: item.description,
            priority: item.priority,
        });
    };
}
