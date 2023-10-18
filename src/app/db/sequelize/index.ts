import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'sequelize_example',
    'castel',
    'castel_psql',
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

export const sequelizeSync = async () => {
    try {
        await sequelize.sync({
            force: false,
        });
        console.log('Sequelize Sync');
    } catch (e) {
        console.log(e);
        console.log('Error Sync Sequelize');
    }
};
