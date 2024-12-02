import { prisma } from "../../../seed";
import { createSheetAction, updateSheetAction } from "./sheetsActions";

export async function createSheetsProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: "Sheets",
      description: "Create or update a sheet in Google Sheets.",
      logo: "sheets-logo",
    },
  });
  // Action
  await createSheetAction(provider.id);
  await updateSheetAction(provider.id);
}
