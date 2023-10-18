export type TProjectDOM = {
    id: number;
    name: string;
    priority: number;
    description: string;
};

export type TProjectFilterDOM = {
    name?: string;
    priority?: number;
};

export class ProjectDOM implements TProjectDOM {
    id: number;
    name: string;
    priority: number;
    description: string;

    constructor(project: TProjectDOM) {
        this.id = project.id;
        this.name = project.name;
        this.priority = project.priority;
        this.description = project.description;
    }
}
