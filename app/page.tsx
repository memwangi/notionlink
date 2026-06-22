import { PortfolioPrototype } from "@/components/prototype/PortfolioPrototype";
import { getPortfolioProjects } from "@/lib/notion";
import { connection } from "next/server";

export default async function HomePage() {
  await connection();

  const notionProjects = await getPortfolioProjects().catch((error) => {
    console.error("Failed to load Notion portfolio projects", error);
    return [];
  });

  return <PortfolioPrototype notionProjects={notionProjects} />;
}
