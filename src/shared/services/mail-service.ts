import { Injectable } from '@nestjs/common';
import { MailerService  as NestMailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: NestMailerService) {}
  public async sendResetPasswordEmail(to: string, token: string): Promise<any> {
    return await this
      .mailerService
      .sendMail({
        to,
        from: 'dev1@ayscan.de',
        subject: 'Reset your password ✔',
        html: `<span>Token is ${token}</span>`,
      })
  }

  public withHandleBar(): void {
    this
      .mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
  }

  public example3(to): void {
    this
      .mailerService
      .sendMail({
        to,
        from: 'dev1@ayscan.de',
        subject: 'Reset your password ✔',
        template: __dirname + '/welcome', // The `.pug` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
