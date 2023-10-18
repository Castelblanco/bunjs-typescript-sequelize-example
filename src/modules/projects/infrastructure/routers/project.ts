import { Router } from 'express';
import { ProjectController } from '../controller/project';
import { ProjectServices } from 'modules/projects/app/services';
import { ProjectSequelizeRepository } from '../storage/sequelize/implemantations/project';

export const projectRouters = Router();

const controller = new ProjectController(
    new ProjectServices(new ProjectSequelizeRepository())
);

projectRouters.get('/get-all', controller.getAll);
projectRouters.get('/get-by-id/:id', controller.getById);
projectRouters.post('/save', controller.save);
projectRouters.put('/update/:id', controller.update);
projectRouters.delete('/delete/:id', controller.delete);
