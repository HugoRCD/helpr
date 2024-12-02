import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtPayload } from "../auth/auth.service";
import { User } from "@prisma/client";

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  attachments = [
    {
      filename: "logo.png",
      path: __dirname + "/templates/assets/logo.png",
      cid: "logo",
    },
    {
      filename: "facebook.png",
      path: __dirname + "/templates/assets/facebook.png",
      cid: "facebook",
    },
    {
      filename: "twitter.png",
      path: __dirname + "/templates/assets/twitter.png",
      cid: "twitter",
    },
    {
      filename: "instagram.png",
      path: __dirname + "/templates/assets/instagram.png",
      cid: "instagram",
    },
    {
      filename: "linkedin.png",
      path: __dirname + "/templates/assets/linkedin.png",
      cid: "linkedin",
    },
  ];

  async sendNewVerification(user: JwtPayload, url: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: "Please confirm your email",
        template: "verif-code",
        context: {
          username: user.username,
          verifyUrl: url,
        },
        attachments: this.attachments,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendNewUser(user: JwtPayload, url: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: "Welcome to NestJS",
        template: "new-user",
        context: {
          username: user.username,
          verifyUrl: url,
        },
        attachments: this.attachments,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendResetPassword(user: User, resetUrl: string): Promise<void> {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: "Reset your password",
        template: "reset-password",
        context: {
          username: user.username,
          resetUrl: resetUrl,
        },
        attachments: this.attachments,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendResetPasswordSuccess(user: User): Promise<void> {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: "Password reset",
        template: "reset-password-success",
        context: {
          username: user.username,
        },
        attachments: this.attachments,
      })
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
