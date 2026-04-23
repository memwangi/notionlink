import type { NotionBlock } from "@/lib/notion";
import { RenderBlock } from "@/components/notion/RenderBlock";

type NotionRendererProps = {
  blocks: NotionBlock[];
  className?: string;
};

function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isBulletedListItem(block: NotionBlock) {
  return block.type === "bulleted_list_item";
}

function isNumberedListItem(block: NotionBlock) {
  return block.type === "numbered_list_item";
}

export function NotionRenderer({ blocks, className }: NotionRendererProps) {
  const renderedBlocks = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isBulletedListItem(block)) {
      const listItems = [];

      while (blocks[index] && isBulletedListItem(blocks[index])) {
        listItems.push(blocks[index]);
        index += 1;
      }

      index -= 1;

      renderedBlocks.push(
        <ul
          key={block.id}
          className="max-w-[66ch] list-disc space-y-2 pl-6 text-[1.0625rem] leading-8 text-muted marker:text-subtle"
        >
          {listItems.map((listItem) => (
            <RenderBlock key={listItem.id} block={listItem} />
          ))}
        </ul>,
      );

      continue;
    }

    if (isNumberedListItem(block)) {
      const listItems = [];

      while (blocks[index] && isNumberedListItem(blocks[index])) {
        listItems.push(blocks[index]);
        index += 1;
      }

      index -= 1;

      renderedBlocks.push(
        <ol
          key={block.id}
          className="max-w-[66ch] list-decimal space-y-2 pl-6 text-[1.0625rem] leading-8 text-muted marker:text-subtle"
        >
          {listItems.map((listItem) => (
            <RenderBlock key={listItem.id} block={listItem} />
          ))}
        </ol>,
      );

      continue;
    }

    renderedBlocks.push(<RenderBlock key={block.id} block={block} />);
  }

  return (
    <div className={classNames("notion-renderer space-y-6", className)}>
      {renderedBlocks}
    </div>
  );
}
