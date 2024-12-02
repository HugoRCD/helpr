export type createItemInDatabaseInput = {
  notion_item_databaseId: string;
  notion_item_title: string;
  notion_item_description: string;
};

export type createDatabaseInput = {
  notion_database_pageId: string;
  notion_database_title: string;
  notion_database_description: string;
};

export type createComment = {
  notion_comment_pageId: string;
  notion_comment_text: string;
};
