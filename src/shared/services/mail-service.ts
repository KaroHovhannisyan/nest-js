import {ServiceUnavailableException} from '@nestjs/common';
const sgMail = require('@sendgrid/mail');

export class MailService {
  constructor(){
    sgMail.setApiKey();
  }
  async sendMail(to: any, options: any) {
    let defaultOptions = { html: false, ...options };
    try {
      const msg: any = {
        to,
        from: {
          name: "AYSCAN",
          email: "ayscan@gmail.com"
        },
        subject: options.subject || undefined,
        templateId: options.template || undefined,
        dynamic_template_data: options.templateData || undefined,
      };

      // if (defaultOptions.html) {
      //   msg.html = message;
      // } else if (defaultOptions.text) {
      //   msg.text = message;
      // }

      return await sgMail.send(msg);
    } catch(e) {
      throw new ServiceUnavailableException(e);
    }
  }

  getForgotPasswordConfirmationUrl(url, token) {
    return url + "/reset-password/confirm?token=" + token;
  }
}
