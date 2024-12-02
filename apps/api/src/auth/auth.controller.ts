import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService, JwtPayload } from "./auth.service";
import { Request, Response } from "express";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse, ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { LocalGuard } from "./guards/local-auth.guard";
import { User } from "@prisma/client";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt.guard";

@ApiTags("Authentification")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  @ApiCreatedResponse({ description: "User registered successfully." })
  @ApiBadRequestResponse({ description: "Invalid data provided." })
  @ApiParam({ name: "email", description: "User email", required: true })
  @ApiParam({ name: "username", description: "User username", required: true })
  @ApiParam({
    name: "firstname",
    description: "User firstname",
    required: true,
  })
  @ApiParam({ name: "lastname", description: "User lastname", required: true })
  @ApiParam({ name: "password", description: "User password", required: true })
  @ApiParam({ name: "avatar", description: "User avatar", required: false })
  @ApiParam({ name: "cover", description: "User cover", required: false })
  @ApiParam({ name: "role", description: "User role", required: false })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalGuard)
  @Post("login")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Authenticated successfully.",
  })
  @ApiBadRequestResponse({ description: "Invalid login or password." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiParam({ name: "login", description: "User login", required: true })
  @ApiParam({ name: "password", description: "User password", required: true })
  async login(
    @Body("login") login: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.authService.validateUser(login, password);
    const authToken = await this.authService.createAccessToken(user);
    const resetToken = await this.authService.createRefreshToken(user);
    return await this.userService.createSession(
      user,
      authToken,
      resetToken,
      response,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logged out successfully.",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return this.userService.deleteTokens(user.id, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Refreshed successfully.",
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  async refresh(@Req() request: Request): Promise<{ authToken: string }> {
    return this.authService.refreshToken(request);
  }
}
