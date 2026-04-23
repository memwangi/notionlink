import {
  Client,
  collectPaginatedAPI,
  isFullBlock,
  type BlockObjectResponse,
} from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export type NotionBlock = BlockObjectResponse & {
  children?: NotionBlock[];
};

type GetBlockChildrenOptions = {
  recursive?: boolean;
};

export async function getBlockChildren(
  blockId: string,
  options: GetBlockChildrenOptions = {},
): Promise<NotionBlock[]> {
  const { recursive = true } = options;
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  });
  const fullBlocks = blocks.filter(isFullBlock);

  if (!recursive) {
    return fullBlocks;
  }

  return Promise.all(
    fullBlocks.map(async (block) => {
      if (!block.has_children) {
        return block;
      }

      return {
        ...block,
        children: await getBlockChildren(block.id, options),
      };
    }),
  );
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  return getBlockChildren(pageId);
}

export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  return getPageBlocks(pageId);
}
