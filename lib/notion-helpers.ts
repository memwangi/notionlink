import type { RichTextItemResponse } from "@notionhq/client";

export function richTextToPlainText(richText: RichTextItemResponse[]) {
  return richText.map((text) => text.plain_text).join("");
}

export function getNotionImageUrl(
  image: Extract<
    import("@notionhq/client").BlockObjectResponse,
    { type: "image" }
  >["image"],
) {
  return image.type === "external" ? image.external.url : image.file.url;
}
