import { TMappers } from 'modules/common/mappers_and_wrappers/mappers';
import { TTaskAPI, TaskAPI } from 'modules/tasks/domain/dto/task';
import { TTaskDOM, TaskDOM } from 'modules/tasks/domain/entities/task';

export class TaskMappers implements TMappers<TTaskDOM, TTaskAPI> {
    apiToDom = (item: TTaskAPI): TTaskDOM => {
        return new TaskDOM({
            id: item._id,
            name: item.name,
            done: item.done,
            projectId: item.project_id,
        });
    };

    domToApi = (item: TTaskDOM): TTaskAPI => {
        return new TaskAPI({
            _id: item.id,
            name: item.name,
            done: item.done,
            project_id: item.projectId,
        });
    };
}
