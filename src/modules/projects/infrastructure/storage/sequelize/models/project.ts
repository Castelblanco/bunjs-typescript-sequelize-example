import { sequelize } from 'app/db/sequelize';
import { TaskSchema } from 'modules/tasks/infrastructure/storage/sequelize/models/task';
import { DataTypes, Model } from 'sequelize';

export type TProjectDAL = {
    _id: number;
    name: string;
    priority: number;
    description: string;
};

export class ProjectDAL implements TProjectDAL {
    _id: number;
    name: string;
    priority: number;
    description: string;

    constructor(project: TProjectDAL) {
        this._id = project._id;
        this.name = project.name;
        this.priority = project.priority;
        this.description = project.description;
    }
}

export const ProjectSchema = sequelize.define<Model<TProjectDAL>, TProjectDAL>(
    'projects',
    {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        priority: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
    }
);

ProjectSchema.hasMany(TaskSchema, {
    foreignKey: 'project_id',
    sourceKey: '_id',
});

TaskSchema.belongsTo(ProjectSchema, {
    foreignKey: 'project_id',
    targetKey: '_id',
});
