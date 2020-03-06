import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Users_Tokens } from '../models/Users_Tokens';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'ayscan',
      });
      sequelize.addModels([User, Users_Tokens]);
      await sequelize.sync();
      // await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
