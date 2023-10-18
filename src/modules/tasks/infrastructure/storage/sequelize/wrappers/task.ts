import { TWrappers } from 'modules/common/mappers_and_wrappers/wrappers';
import { TTaskDOM, TaskDOM } from 'modules/tasks/domain/entities/task';
import { TTaskDAL, TaskDAL } from '../models/task';

export class TaskWrappers implements TWrappers<TTaskDOM, TTaskDAL> {
    dalToDom = (item: TTaskDAL): TTaskDOM => {
        return new TaskDOM({
            id: item._id,
            done: item.done,
            name: item.name,
            projectId: item.project_id,
        });
    };

    domToDal = (item: TTaskDOM): TTaskDAL => {
        return new TaskDAL({
            _id: item.id,
            done: item.done,
            name: item.name,
            project_id: item.projectId,
        });
    };
}
