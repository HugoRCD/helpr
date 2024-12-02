import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { ProviderService } from "../provider/provider.service";
import * as deepl from "deepl-node";
import { translateTextInput } from "./deepl.type";
import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";
import { Model } from "../openai/openai.type";

@Injectable()
export class DeeplService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}

  public locales = [
    {
      value: "en-US",
      name: "🇺🇸 English",
    },
    {
      value: "FR",
      name: "🇫🇷 French",
    },
    {
      value: "ES",
      name: "🇪🇸 Spanish",
    },
    {
      value: "IT",
      name: "🇮🇹 Italian",
    },
    {
      value: "DE",
      name: "🇩🇪 German",
    },
    {
      value: "NL",
      name: "🇳🇱 Dutch",
    },
    {
      value: "CH",
      name: "🇨🇭 Chinese",
    },
    {
      value: "JP",
      name: "🇯🇵 Japanese",
    },
  ];

  async translate(text: string, from: string, to: string) {
    const source = from === "en-US" ? "EN" : from;
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY);
    const response = await translator.translateText(
      text,
      <SourceLanguageCode>source,
      <TargetLanguageCode>to,
    );
    return {
      deepl_response: response.text,
    };
  }

  async translateText(userId: number, translateTextInput: translateTextInput) {
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY);
    const source =
      translateTextInput.deepl_source_lang === "en-US"
        ? "EN"
        : translateTextInput.deepl_source_lang;
    const response = await translator.translateText(
      translateTextInput.deepl_text,
      <SourceLanguageCode>source,
      <TargetLanguageCode>translateTextInput.deepl_target_lang,
    );
    return {
      variables: [
        {
          key: "deepl_response",
          value: response.text,
        },
      ],
    };
  }

  async getData() {
    const deepl_source_lang = this.locales;
    const deepl_target_lang = this.locales;
    return {
      deepl_source_lang: deepl_source_lang,
      deepl_target_lang: deepl_target_lang,
    };
  }
}
