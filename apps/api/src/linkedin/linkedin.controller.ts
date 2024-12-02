import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LinkedinService } from "./linkedin.service";
import { JwtPayload } from "../auth/auth.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags("Linkedin")
@Controller("linkedin")
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}
  @Post("add-credentials")
  async createCredential(
    @CurrentUser() user: JwtPayload,
    @Body("accessToken") accessToken: string,
  ) {
    return await this.linkedinService.createCredentials(user.id, accessToken);
  }

  @Post("create-post")
  async createPost(
    @CurrentUser() user: JwtPayload,
    @Body("linkedin_post_content") linkedin_post_content: string,
  ) {
    return await this.linkedinService.postOnLinkedIn(
      user.id,
      linkedin_post_content,
    );
  }
}
