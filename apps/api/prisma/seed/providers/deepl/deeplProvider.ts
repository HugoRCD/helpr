import { prisma } from "../../../seed";
import { translateTextAction } from "./deeplActions";

export async function createDeeplProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: "DeepL",
      description: "DeepL provide translations for your content",
      logo: "deepl-logo",
      premium: true,
    },
  });
  // Action
  await translateTextAction(provider.id);
}
