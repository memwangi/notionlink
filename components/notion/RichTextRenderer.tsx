import type { ReactNode } from "react";
import type { RichTextItemResponse } from "@notionhq/client";

type RichTextRendererProps = {
  richText: RichTextItemResponse[];
};

function annotationClassName(text: RichTextItemResponse) {
  const classes = [];

  if (text.annotations.underline) {
    classes.push("underline underline-offset-4");
  }

  if (text.annotations.strikethrough) {
    classes.push("line-through");
  }

  return classes.join(" ");
}

export function RichTextRenderer({ richText }: RichTextRendererProps) {
  return (
    <>
      {richText.map((text, index) => {
        let content: ReactNode = text.plain_text;

        if (text.annotations.code) {
          content = (
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9375em] text-foreground">
              {content}
            </code>
          );
        }

        if (text.annotations.bold) {
          content = <strong>{content}</strong>;
        }

        if (text.annotations.italic) {
          content = <em>{content}</em>;
        }

        const className = annotationClassName(text);

        if (className) {
          content = <span className={className}>{content}</span>;
        }

        if (text.href) {
          content = (
            <a
              href={text.href}
              className="font-medium text-accent underline decoration-hairline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2"
              target="_blank"
              rel="noreferrer"
            >
              {content}
            </a>
          );
        }

        return <span key={`${text.plain_text}-${index}`}>{content}</span>;
      })}
    </>
  );
}
