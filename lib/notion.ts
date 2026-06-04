import {
  Client,
  collectPaginatedAPI,
  isFullBlock,
  isFullPage,
  type BlockObjectResponse,
  type PageObjectResponse,
} from "@notionhq/client";
import {
  getPropertyFiles,
  getPropertyText,
  getPropertyTitle,
} from "@/lib/notion-helpers";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export type NotionBlock = BlockObjectResponse & {
  children?: NotionBlock[];
};

export type PortfolioProjectMedia = {
  name: string;
  url: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  summary: string;
  section: string;
  year: string;
  media: PortfolioProjectMedia[];
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

function mapPortfolioPage(page: PageObjectResponse): PortfolioProject | null {
  const title = getPropertyTitle(page.properties.Name);

  if (!title) {
    return null;
  }

  return {
    id: page.id,
    title,
    summary: getPropertyText(page.properties.Slug),
    section: getPropertyText(page.properties.Section),
    year:
      getPropertyText(page.properties.Year) ||
      getPropertyText(page.properties.Time) ||
      getPropertyText(page.properties.Period),
    media: getPropertyFiles(page.properties["Files & media"]),
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const dataSourceId =
    process.env.NOTION_PORTFOLIO_DATA_SOURCE_ID ??
    process.env.NOTION_PORTFOLIO_DATABASE_ID;

  if (!process.env.NOTION_API_KEY || !dataSourceId) {
    return [];
  }

  const pages = await collectPaginatedAPI(notion.dataSources.query, {
    data_source_id: dataSourceId,
    sorts: [
      {
        property: "Year",
        direction: "descending",
      },
    ],
  });

  return pages
    .filter(isFullPage)
    .map(mapPortfolioPage)
    .filter((project): project is PortfolioProject => project !== null)
    .sort((firstProject, secondProject) => {
      const firstYear = Number.parseInt(firstProject.year, 10);
      const secondYear = Number.parseInt(secondProject.year, 10);

      if (Number.isNaN(firstYear) || Number.isNaN(secondYear)) {
        return 0;
      }

      return secondYear - firstYear;
    });
}
