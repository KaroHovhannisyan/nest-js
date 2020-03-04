import { User } from '../../models/User';
import { ValidatorService } from '../../shared/services/validator.service';

export const userProviders = [
  {
    provide: 'UserRepository',
    useValue: User,
  },
  ValidatorService,
];
