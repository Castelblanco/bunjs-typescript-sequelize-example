import { sequelize } from 'app/db/sequelize';
import { ProjectSchema } from 'modules/projects/infrastructure/storage/sequelize/models/project';
import { DataTypes, Model } from 'sequelize';

export type TTaskDAL = {
    _id: number;
    name: string;
    done: boolean;
    project_id: number;
};

export class TaskDAL implements TTaskDAL {
    _id: number;
    name: string;
    done: boolean;
    project_id: number;

    constructor(task: TTaskDAL) {
        this._id = task._id;
        this.name = task.name;
        this.done = task.done;
        this.project_id = task.project_id;
    }
}

export const TaskSchema = sequelize.define<Model<TTaskDAL>, TTaskDAL>('tasks', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
    },
});
