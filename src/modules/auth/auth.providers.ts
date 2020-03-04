import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

export const authProviders = [
  {
    provide: 'User',
    useValue: JwtStrategy,
  },
  AuthService,
];
