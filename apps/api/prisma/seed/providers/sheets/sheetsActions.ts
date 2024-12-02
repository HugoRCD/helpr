import { prisma } from "../../../seed";

export async function createSheetAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Create Sheet",
      description: "Create a new sheet in Google Sheet",
      endpoint: "sheet",
      name: "create-sheet",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Create sheet title",
            key: "sheet_create_title",
            value: "{sheet_create_title}",
            required: true,
          },
        ],
      },
    },
  });
}

export async function updateSheetAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: "Update Sheet",
      description: "Update a sheet in Google Sheet",
      endpoint: "sheet",
      name: "update-sheet",
      providerId: providerId,
      variables: {
        create: [
          {
            title: "Update sheet ID",
            key: "sheet_update_id",
            value: "{sheet_update_id}",
            required: true,
          },
          {
            title: "Update sheet title",
            key: "sheet_update_title",
            value: "{sheet_update_title}",
            required: true,
          },
        ],
      },
    },
  });
}
