import { AuthService } from './auth.service';
import { Users_Tokens } from '../../models/Users_Tokens';

export const authProviders = [
  {
    provide: 'Users_Tokens',
    useValue: Users_Tokens,
  },
  AuthService,
];
