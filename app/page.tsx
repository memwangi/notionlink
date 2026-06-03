import { PortfolioPrototype } from "@/components/prototype/PortfolioPrototype";
import { getPortfolioProjects } from "@/lib/notion";

export const revalidate = 300;

export default async function HomePage() {
  const notionProjects = await getPortfolioProjects().catch((error) => {
    console.error("Failed to load Notion portfolio projects", error);
    return [];
  });

  return <PortfolioPrototype notionProjects={notionProjects} />;
}
