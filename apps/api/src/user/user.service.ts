import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { MailingService } from "../mailing/mailing.service";
import { ConfigService } from "@nestjs/config";
import { User, ResetPassword } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtPayload } from "../auth/auth.service";
import { hash, formatUser, generateCode } from "../utils";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailingService: MailingService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: createUserDto.username,
          },
          {
            email: createUserDto.email,
          },
        ],
      },
    });
    if (foundUser) {
      throw new BadRequestException("user_already_exists");
    }
    const password = await hash(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password,
      },
    });
    const url = await this.createVerificationUrl(user, false);
    await this.mailingService.sendNewUser(user, url);
    return formatUser(user);
  }

  async createVerificationUrl(
    user: JwtPayload,
    isEmail: boolean,
  ): Promise<string> {
    const resetEntity: ResetPassword =
      await this.prisma.emailVerification.create({
        data: {
          userId: user.id,
          token: await generateCode(),
        },
      });
    const url = `${this.configService.get("frontend_url")}/verify/user?token=${
      resetEntity.token
    }`;
    if (isEmail) {
      await this.mailingService.sendNewVerification(user, url);
    }
    return url;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("user_not_found");
    }
    return user;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: login }, { username: login }],
      },
    });
    if (!user) throw new BadRequestException("user_not_found");
    return user;
  }

  async createSession(
    user: User,
    authToken: string,
    resetToken: string,
    response: Response,
  ): Promise<User> {
    const encryptedRefreshToken = await hash(resetToken);
    const app_env = this.configService.get("env");
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        authToken,
        refreshToken: encryptedRefreshToken,
      },
      include: {
        subscription: true,
      },
    });
    switch (app_env) {
      case "development":
        response.cookie("refreshToken", resetToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
        });
        response.cookie("authToken", authToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
        });
        break;
      case "production":
        response.cookie("refreshToken", resetToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
          sameSite: "none",
          secure: true,
        });
        response.cookie("authToken", authToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
          sameSite: "none",
          secure: true,
        });
    }
    return formatUser(user);
  }

  async deleteTokens(
    userId: number,
    response: Response,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException("user_not_found");
    response.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    response.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null, authToken: null },
    });
    return { message: "tokens_deleted" };
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async verifyEmail(userId: number, token: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException("user_not_found");
    const emailVerification = await this.prisma.emailVerification.findFirst({
      where: {
        userId,
        token,
      },
    });
    if (!emailVerification) throw new BadRequestException("invalid_token");
    await this.prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
    await this.prisma.emailVerification.delete({
      where: { id: emailVerification.id },
    });
    return { message: "email_verified" };
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException("user_not_found");
    return await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException("user_not_found");
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: "user deleted" };
  }

  async getUserByProviderId(providerId: string): Promise<User> {
    const userCredentials = await this.prisma.providerCredentials.findUnique({
      where: { providerId },
    });
    if (!userCredentials) throw new BadRequestException("user_not_found");
    return await this.prisma.user.findUnique({
      where: { id: userCredentials.userId },
    });
  }
}
