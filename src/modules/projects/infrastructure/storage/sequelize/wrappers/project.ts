import { TWrappers } from 'modules/common/mappers_and_wrappers/wrappers';
import {
    ProjectDOM,
    TProjectDOM,
} from 'modules/projects/domain/entities/project';
import { ProjectDAL, TProjectDAL } from '../models/project';

export class ProjectWrappers implements TWrappers<TProjectDOM, TProjectDAL> {
    dalToDom = (item: TProjectDAL): TProjectDOM => {
        return new ProjectDOM({
            id: item._id,
            name: item.name,
            description: item.description,
            priority: item.priority,
        });
    };

    domToDal = (item: TProjectDOM): TProjectDAL => {
        return new ProjectDAL({
            _id: item.id,
            name: item.name,
            description: item.description,
            priority: item.priority,
        });
    };
}
