import express, { json } from 'express';
import { errorHandler } from './error_handler';

const PORT = process.env.PORT || 5000;
const app = express();

const routers = async () => {
    const { router } = await import('../routers');
    app.use(router);
};

const initHandlerError = () => {
    app.use(errorHandler);
};

const middleware = () => {
    app.use(json());
};

export const server = async () => {
    middleware();
    await routers();
    initHandlerError();
    await app.listen(PORT);
    console.log(`Server init in the http://localhost:${PORT}`);
};
