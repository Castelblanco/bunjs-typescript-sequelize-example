import { Router } from 'express';
import { taskRouters } from 'modules/tasks/infrastructure/routers/task';

export const taskRouter = Router();

taskRouter.use('/tasks', taskRouters);
