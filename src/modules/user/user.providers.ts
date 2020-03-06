import { User } from '../../models/User';
import { ValidatorService } from '../../shared/services';
import { USER_REPOSITORY } from '../../common/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  ValidatorService,
];
