export type TTaskAPI = {
    _id: number;
    name: string;
    done: boolean;
    project_id: number;
};

export class TaskAPI implements TTaskAPI {
    _id: number;
    name: string;
    done: boolean;
    project_id: number;

    constructor(task: TTaskAPI) {
        this._id = task._id;
        this.name = task.name;
        this.done = task.done;
        this.project_id = task.project_id;
    }
}
