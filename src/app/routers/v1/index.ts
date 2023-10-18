import { Router } from 'express';
import { projectRouter } from './projects';
import { taskRouter } from './tasks';

export const v1Router = Router();

v1Router.use('/v1', projectRouter, taskRouter);
