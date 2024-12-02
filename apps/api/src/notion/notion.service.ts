import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
import { Client } from "@notionhq/client";
import { UserService } from "../user/user.service";
import { ProviderService } from "../provider/provider.service";
import { ProviderCredentials } from "@prisma/client";
import {
  createItemInDatabaseInput,
  createDatabaseInput,
  createComment,
} from "./notion.type";

@Injectable()
export class NotionService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}

  async createCredentials(
    userId: number,
    accessToken: string,
  ): Promise<ProviderCredentials> {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException("user_not_found");
    const notionClient = new Client({
      auth: accessToken,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const notionUser = await notionClient.users.me();
    if (!notionUser) throw new BadRequestException("invalid_credentials");
    return await this.providerService.addCredentials(
      user.id,
      notionUser.id,
      "notion",
      accessToken,
    );
  }

  async createComment(userId: number, createComment: createComment) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "notion",
      true,
    );
    const notionClient = new Client({
      auth: accessToken,
    });
    const response = await notionClient.comments.create({
      parent: {
        type: "page_id",
        page_id: createComment.notion_comment_pageId,
      },
      rich_text: [
        {
          type: "text",
          text: {
            content: createComment.notion_comment_text,
          },
        },
      ],
    });
    return {
      message: "comment_created",
      data: response,
    };
  }

  async createDatabase(
    userId: number,
    createDatabaseInput: createDatabaseInput,
  ) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "notion",
      true,
    );
    const notionClient = new Client({
      auth: accessToken,
    });
    const response = await notionClient.databases.create({
      parent: {
        type: "page_id",
        page_id: createDatabaseInput.notion_database_pageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: createDatabaseInput.notion_database_title,
          },
        },
      ],
      description: [
        {
          type: "text",
          text: {
            content: createDatabaseInput.notion_database_description,
          },
        },
      ],
      properties: {
        title: {
          title: {},
        },
      },
    });
    return {
      message: "database_created",
      data: response,
    };
  }

  async createItemInDatabase(
    userId: number,
    createItemInDatabaseInput: createItemInDatabaseInput,
  ) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "notion",
      true,
    );
    const notionClient = new Client({
      auth: accessToken,
    });
    const response = await notionClient.pages.create({
      parent: {
        database_id: createItemInDatabaseInput.notion_item_databaseId,
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: createItemInDatabaseInput.notion_item_title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: createItemInDatabaseInput.notion_item_description,
                },
              },
            ],
          },
        },
      ],
    });
    return {
      message: "item_created",
      data: response,
    };
  }
}
