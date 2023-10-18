import { Router } from 'express';
import { TaskController } from '../controller/task';
import { TaskServices } from 'modules/tasks/app/services';
import { TaskSequelizeReposiroty } from '../storage/sequelize/implementation/task';

export const taskRouters = Router();

const controller = new TaskController(
    new TaskServices(new TaskSequelizeReposiroty())
);

taskRouters.get('/get-all', controller.getAll);
taskRouters.get('/get-by-id/:id', controller.getById);
taskRouters.post('/save', controller.save);
taskRouters.put('/update/:id', controller.update);
taskRouters.delete('/delete/:id', controller.delete);
