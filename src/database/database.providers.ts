import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Users_Tokens } from '../models/Users_Tokens';
import { ConfigService } from '../shared/services';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize(configService.sequlizeConfigs);
      sequelize.addModels([User, Users_Tokens]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
