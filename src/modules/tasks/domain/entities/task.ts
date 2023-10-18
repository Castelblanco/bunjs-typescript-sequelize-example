export type TTaskDOM = {
    id: number;
    name: string;
    done: boolean;
    projectId: number;
};

export type TTaskFilterDOM = {
    name?: string;
    done?: boolean;
    projectId?: number;
};

export class TaskDOM implements TTaskDOM {
    id: number;
    name: string;
    done: boolean;
    projectId: number;

    constructor(task: TTaskDOM) {
        this.id = task.id;
        this.name = task.name;
        this.done = task.done;
        this.projectId = task.projectId;
    }
}
