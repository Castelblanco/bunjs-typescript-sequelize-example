import { Router } from 'express';
import { projectRouters } from 'modules/projects/infrastructure/routers/project';

export const projectRouter = Router();

projectRouter.use('/projects', projectRouters);
