import { sequelizeSync } from 'app/db/sequelize';
import { server } from './server';
(async () => {
    try {
        await server();
        await sequelizeSync();
    } catch (e) {
        console.log(e);
        console.log('Error init server');
    }
})();
