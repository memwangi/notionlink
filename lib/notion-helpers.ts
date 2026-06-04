import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client";

type NotionProperty = PageObjectResponse["properties"][string];

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

export function getPropertyTitle(property: NotionProperty | undefined) {
  if (property?.type !== "title") {
    return "";
  }

  return richTextToPlainText(property.title);
}

export function getPropertyText(property: NotionProperty | undefined) {
  if (!property) {
    return "";
  }

  if (property.type === "rich_text") {
    return richTextToPlainText(property.rich_text);
  }

  if (property.type === "title") {
    return richTextToPlainText(property.title);
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "multi_select") {
    return property.multi_select.map((option) => option.name).join(", ");
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  if (property.type === "number") {
    return property.number?.toString() ?? "";
  }

  if (property.type === "date") {
    if (!property.date) {
      return "";
    }

    return property.date.end
      ? `${property.date.start} - ${property.date.end}`
      : property.date.start;
  }

  return "";
}

export function getPropertyFiles(property: NotionProperty | undefined) {
  if (property?.type !== "files") {
    return [];
  }

  return property.files.map((file) => ({
    name: file.name,
    url: file.type === "external" ? file.external.url : file.file.url,
  }));
}
