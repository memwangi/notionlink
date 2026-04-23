import type { NotionBlock } from "@/lib/notion";
import { getNotionImageUrl, richTextToPlainText } from "@/lib/notion-helpers";
import { NotionRenderer } from "@/components/notion/NotionRenderer";
import { RichTextRenderer } from "@/components/notion/RichTextRenderer";

type RenderBlockProps = {
  block: NotionBlock;
};

function NestedBlocks({ block }: RenderBlockProps) {
  if (!block.children?.length) {
    return null;
  }

  return <NotionRenderer blocks={block.children} className="mt-3" />;
}

export function RenderBlock({ block }: RenderBlockProps) {
  switch (block.type) {
    case "paragraph":
      if (block.paragraph.rich_text.length === 0) {
        return <div className="h-2" aria-hidden="true" />;
      }

      return (
        <div>
          <p className="max-w-[66ch] text-[1.0625rem] leading-8 text-muted">
            <RichTextRenderer richText={block.paragraph.rich_text} />
          </p>
          <NestedBlocks block={block} />
        </div>
      );

    case "heading_1":
      return (
        <section>
          <h1 className="mt-16 max-w-[11ch] text-balance text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] text-foreground first:mt-0">
            <RichTextRenderer richText={block.heading_1.rich_text} />
          </h1>
          <NestedBlocks block={block} />
        </section>
      );

    case "heading_2":
      return (
        <section>
          <h2 className="mt-14 max-w-[18ch] text-balance text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-none text-foreground first:mt-0">
            <RichTextRenderer richText={block.heading_2.rich_text} />
          </h2>
          <NestedBlocks block={block} />
        </section>
      );

    case "heading_3":
      return (
        <section>
          <h3 className="mt-10 max-w-[42ch] text-balance text-[1.375rem] font-semibold leading-snug text-foreground first:mt-0">
            <RichTextRenderer richText={block.heading_3.rich_text} />
          </h3>
          <NestedBlocks block={block} />
        </section>
      );

    case "bulleted_list_item":
      return (
        <li className="pl-1">
          <RichTextRenderer richText={block.bulleted_list_item.rich_text} />
          <NestedBlocks block={block} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="pl-1">
          <RichTextRenderer richText={block.numbered_list_item.rich_text} />
          <NestedBlocks block={block} />
        </li>
      );

    case "quote":
      return (
        <blockquote className="max-w-[52ch] py-3 text-[1.5rem] font-medium leading-snug text-foreground">
          <RichTextRenderer richText={block.quote.rich_text} />
          <NestedBlocks block={block} />
        </blockquote>
      );

    case "divider":
      return <hr className="my-12 max-w-[66ch] border-hairline" />;

    case "to_do":
      return (
        <div className="flex max-w-[66ch] gap-3 text-[1.0625rem] leading-8 text-muted">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            aria-label="Completed"
            className="mt-2 h-4 w-4 accent-accent"
          />
          <div className={block.to_do.checked ? "line-through opacity-70" : ""}>
            <RichTextRenderer richText={block.to_do.rich_text} />
            <NestedBlocks block={block} />
          </div>
        </div>
      );

    case "toggle":
      return (
        <details className="max-w-[66ch] rounded-sm border border-hairline bg-background p-5 text-[1.0625rem] leading-8 text-muted">
          <summary className="cursor-pointer text-[1.0625rem] font-semibold leading-7 text-foreground transition-colors hover:text-accent focus-visible:outline-2">
            <RichTextRenderer richText={block.toggle.rich_text} />
          </summary>
          <NestedBlocks block={block} />
        </details>
      );

    case "callout":
      return (
        <aside className="max-w-[66ch] rounded-sm border border-hairline bg-surface p-5 text-[1.0625rem] leading-8 text-muted">
          <div className="flex gap-3">
            <span className="shrink-0 text-sm font-semibold text-subtle">
              {block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "Note"}
            </span>
            <div>
              <RichTextRenderer richText={block.callout.rich_text} />
              <NestedBlocks block={block} />
            </div>
          </div>
        </aside>
      );

    case "image": {
      const caption = richTextToPlainText(block.image.caption);

      return (
        <figure className="my-10 space-y-3">
          {/* Notion image hosts vary, so this avoids brittle next/image remote config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getNotionImageUrl(block.image)}
            alt={caption || "Notion image"}
            className="w-full rounded-sm border border-hairline object-cover"
          />
          {caption ? (
            <figcaption className="max-w-[66ch] text-sm leading-6 text-subtle">
              <RichTextRenderer richText={block.image.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    }

    default:
      return null;
  }
}
