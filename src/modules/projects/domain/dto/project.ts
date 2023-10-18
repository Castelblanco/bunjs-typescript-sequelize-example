export type TProjectAPI = {
    _id: number;
    name: string;
    priority: number;
    description: string;
};

export class ProjectAPI implements TProjectAPI {
    _id: number;
    name: string;
    priority: number;
    description: string;

    constructor(project: TProjectAPI) {
        this._id = project._id;
        this.name = project.name;
        this.priority = project.priority;
        this.description = project.description;
    }
}
