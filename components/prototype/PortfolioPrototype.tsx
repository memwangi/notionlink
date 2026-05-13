"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ProjectDetail = {
  title: string;
  body: string;
  color?: string;
  label: string;
};

type Project = {
  id: string;
  title: string;
  company: string;
  description: string;
  year: string;
  role: string;
  color: string;
  details: ProjectDetail[];
};

const projects: Project[] = [
  {
    id: "sable-house",
    title: "Sable House",
    company: "Private commission",
    description: "A residential launch shaped as a calm editorial experience.",
    year: "2026",
    role: "Art direction, digital experience",
    color: "oklch(81% 0.05 60)",
    details: [
      {
        label: "Facade study",
        title: "First impression",
        body: "The opening gives the residence space before asking the visitor to read. Quiet image rhythm, exact metadata, and short copy carry the page.",
        color: "oklch(81% 0.05 60)",
      },
      {
        label: "Sequence note",
        title: "Reading pace",
        body: "Longer notes are broken into deliberate beats so the project feels guided, not exported.",
        color: "oklch(74% 0.06 95)",
      },
      {
        label: "Material crop",
        title: "Texture before copy",
        body: "The supporting visuals can hold surfaces, thresholds, and small details that make the residence feel specific.",
        color: "oklch(70% 0.04 38)",
      },
    ],
  },
  {
    id: "afterlight",
    title: "Afterlight Systems",
    company: "Afterlight Systems",
    description: "Identity and product story for a sensing platform.",
    year: "2025",
    role: "Brand system, interface direction",
    color: "oklch(74% 0.07 214)",
    details: [
      {
        label: "Signal map",
        title: "System frame",
        body: "The brand language makes a complex sensing platform feel measured and legible without turning it into a generic software page.",
        color: "oklch(74% 0.07 214)",
      },
      {
        label: "Interface frame",
        title: "Interface direction",
        body: "Product screens, diagrams, and launch copy share one visual tempo: restrained, technical, and clear.",
        color: "oklch(76% 0.05 150)",
      },
      {
        label: "Launch field",
        title: "Product story",
        body: "The case study can move from atmosphere to interface proof without forcing every detail into the first view.",
        color: "oklch(69% 0.055 252)",
      },
    ],
  },
  {
    id: "monograph",
    title: "Monograph 03",
    company: "Self-initiated",
    description: "A portfolio publication designed as a web narrative.",
    year: "2024",
    role: "Editorial design, motion concept",
    color: "oklch(78% 0.04 18)",
    details: [
      {
        label: "Cover spread",
        title: "Publication logic",
        body: "The project tests how case studies can behave like a sequence of spreads while staying readable on the web.",
        color: "oklch(78% 0.04 18)",
      },
      {
        label: "Pacing test",
        title: "Prototype value",
        body: "The structure isolates what matters first: opening, reading, pacing, and returning to the index.",
        color: "oklch(74% 0.05 320)",
      },
      {
        label: "Archive page",
        title: "Narrative system",
        body: "A small set of repeatable spreads lets the publication grow without turning the portfolio into a template.",
        color: "oklch(72% 0.045 42)",
      },
    ],
  },
];

const headerBlocks = [
  { left: "5%", top: "0%", width: "4%", height: "18%" },
  { left: "0%", top: "36%", width: "5%", height: "7%" },
  { left: "15%", top: "43%", width: "5%", height: "6%" },
  { left: "27%", top: "16%", width: "5%", height: "8%" },
  { left: "34%", top: "34%", width: "5%", height: "7%" },
  { left: "39%", top: "28%", width: "5%", height: "8%" },
  { left: "46%", top: "25%", width: "4%", height: "15%" },
  { left: "46%", top: "56%", width: "5%", height: "7%" },
  { left: "51%", top: "60%", width: "4%", height: "8%" },
  { left: "22%", top: "73%", width: "5%", height: "7%" },
  { left: "33%", top: "86%", width: "4%", height: "13%" },
  { left: "61%", top: "85%", width: "5%", height: "7%" },
  { left: "67%", top: "90%", width: "5%", height: "6%" },
  { left: "75%", top: "12%", width: "5%", height: "7%" },
  { left: "84%", top: "13%", width: "5%", height: "7%" },
  { left: "75%", top: "28%", width: "5%", height: "7%" },
  { left: "88%", top: "34%", width: "5%", height: "11%" },
  { left: "93%", top: "26%", width: "6%", height: "8%" },
  { left: "80%", top: "73%", width: "5%", height: "7%" },
  { left: "92%", top: "88%", width: "6%", height: "9%" },
];

function WorkImage({
  color,
  title,
  className = "",
}: {
  color: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      aria-label={`${title} preview`}
      role="img"
      className={`relative overflow-hidden rounded-sm border border-hairline ${className}`}
      style={{ backgroundColor: color }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] top-[18%] h-px bg-background/55"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] left-[12%] h-px w-[44%] bg-background/45"
      />
    </div>
  );
}

function FlipCard({
  detail,
  index,
  projectTitle,
  isFlipped,
  onFlip,
}: {
  detail: ProjectDetail;
  index: number;
  projectTitle: string;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isFlipped}
      aria-label={`${isFlipped ? "Show image for" : "Read note for"} ${detail.label}`}
      onClick={onFlip}
      className="group/card w-[min(78vw,30rem)] shrink-0 snap-center text-left focus-visible:outline-2 focus-visible:outline-[#CA4D0B] md:w-[30rem]"
    >
      <span className="relative block aspect-[4/5] rounded-sm transition-transform duration-300 ease-out group-hover/card:-translate-y-0.5">
        {isFlipped ? (
          <span className="absolute inset-0 flex flex-col justify-between rounded-sm border border-[#CA4D0B] bg-[#FBFAF7] p-6 text-[#28231F] md:p-8">
            <span className="space-y-4">
              <span className="block text-[0.8125rem] font-medium leading-6 text-[#706A62]">
                {projectTitle}
              </span>
              <span className="block max-w-[12ch] text-balance text-[clamp(1.75rem,3vw,2.625rem)] font-semibold leading-[0.98]">
                {detail.title}
              </span>
            </span>
            <span className="block max-w-[31ch] text-[1rem] leading-7 text-[#706A62]">
              {detail.body}
            </span>
          </span>
        ) : (
          <span
            className="absolute inset-0 overflow-hidden rounded-sm border border-[#FBFAF7]/25"
            style={{ backgroundColor: detail.color }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-[10%] top-[14%] h-px bg-background/55"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[15%] left-[10%] h-px w-[46%] bg-background/45"
            />
            <span
              aria-hidden="true"
              className="absolute right-[12%] top-[24%] h-[38%] w-px bg-background/40"
            />
            <span className="absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-background/35 pt-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-background/90">
              <span>{detail.label}</span>
              <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </span>
        )}
      </span>
    </button>
  );
}

function HeaderSpread() {
  return (
    <div className="min-h-screen w-full flex-1 overflow-hidden bg-[#192649]">
      <div className="relative h-full min-h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[10%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#070807]/45 to-transparent"
        />

        {headerBlocks.map((block) => (
          <span
            key={`${block.left}-${block.top}`}
            aria-hidden="true"
            className="absolute bg-[#CA4D0B]"
            style={block}
          />
        ))}

        <div className="absolute inset-x-6 top-1/2 z-10 max-w-[24rem] -translate-y-1/2 bg-[#192649]/90 px-6 py-7 text-center text-[#E7E2D8] sm:left-[48%] sm:right-auto sm:max-w-[32rem] sm:px-8 sm:py-8 sm:text-left md:left-[54%] lg:max-w-[36rem] lg:px-10 lg:py-10">
          <Link
            href="/"
            className="block text-[clamp(3.75rem,16vw,5.5rem)] font-bold leading-[0.84] transition-colors hover:text-[#CA4D0B] focus-visible:outline-2 focus-visible:outline-[#CA4D0B] sm:text-[clamp(2.75rem,6vw,5.5rem)]"
          >
            Joseph Mugo
          </Link>
          <p className="mx-auto mt-5 max-w-[25ch] text-[clamp(1.05rem,4vw,1.3rem)] font-medium leading-7 text-[#C9C4BB] sm:mx-0 sm:text-[clamp(1rem,1.6vw,1.25rem)]">
            Interfaces, identities, and stories for{" "}
            <span className="text-[#CA4D0B]">curious</span> minds
          </p>
          <nav className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.95rem] font-semibold uppercase leading-6 text-[#CA4D0B] sm:justify-start">
            <a href="#work" className="transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              Work
            </a>
            <a href="mailto:hello@example.com" className="transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              Contact
            </a>
            <a href="#essays" className="transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              Essays
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPrototype() {
  const [openId, setOpenId] = useState<string>(projects[0].id);
  const [flippedCardId, setFlippedCardId] = useState<string>("");
  const projectRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const projectElement = projectRefs.current[openId];

    if (!projectElement) {
      return;
    }

    requestAnimationFrame(() => {
      projectElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [openId]);

  return (
    <main className="w-full">
      <header className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1">
            <HeaderSpread />
          </div>
        </div>
      </header>

      <section
        id="work"
        className="mx-auto w-full max-w-[78rem] space-y-3 px-6 py-14 sm:px-10 lg:py-20"
        aria-label="Selected work"
      >
        {projects.map((project, index) => {
          const isOpen = openId === project.id;

          return (
            <article
              key={project.id}
              ref={(element) => {
                projectRefs.current[project.id] = element;
              }}
              className="border-b border-hairline py-8 last:border-b-0"
            >
              {isOpen ? (
                <div className="rounded-sm bg-[#192649] px-5 py-6 text-[#FBFAF7] animate-[dock-in_360ms_cubic-bezier(0.22,1,0.36,1)] sm:px-7 md:px-8 md:py-8">
                  <div className="mb-8 grid gap-5 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-start">
                    <p className="border-t border-[#CA4D0B] pt-3 text-sm font-medium leading-6 tabular-nums text-[#DAD5CA]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div className="max-w-[46rem] space-y-4">
                      <h2 className="max-w-[12ch] text-balance text-[clamp(2.5rem,7vw,6.2rem)] font-medium leading-[0.86] text-[#FBFAF7]">
                        {project.title}
                      </h2>
                      <p className="max-w-[42ch] text-[1.08rem] leading-8 text-[#DAD5CA]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] font-medium leading-6 text-[#BEB7AA]">
                        <span>{project.company}</span>
                        <span>{project.year}</span>
                        <span>{project.role}</span>
                        <span>{project.details.length} frames</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenId("");
                        setFlippedCardId("");
                      }}
                      className="justify-self-start border-t border-[#CA4D0B] pt-3 text-[0.8125rem] font-medium leading-6 text-[#DAD5CA] transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B] md:justify-self-end"
                    >
                      Close
                    </button>
                  </div>

                  <div
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-[24vw] md:ml-16 [scrollbar-color:#CA4D0B_transparent] [scrollbar-width:thin]"
                    aria-label={`${project.title} picture notes`}
                  >
                    {project.details.map((detail, detailIndex) => {
                      const cardId = `${project.id}-${detailIndex}`;

                      return (
                        <FlipCard
                          key={cardId}
                          detail={detail}
                          index={detailIndex}
                          projectTitle={project.title}
                          isFlipped={flippedCardId === cardId}
                          onFlip={() => {
                            setFlippedCardId(flippedCardId === cardId ? "" : cardId);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-[4rem_minmax(0,1fr)_minmax(14rem,22rem)] md:items-start">
                  <p className="text-sm font-medium leading-6 tabular-nums text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="max-w-[42rem] space-y-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => {
                        setOpenId(project.id);
                        setFlippedCardId("");
                      }}
                      className="block text-left focus-visible:outline-2"
                    >
                      <h2 className="max-w-[12ch] text-balance text-[clamp(2.1rem,5vw,4.5rem)] font-medium leading-[0.92] text-foreground">
                        {project.title}
                      </h2>
                    </button>

                    <p className="max-w-[40ch] text-[1.0625rem] leading-8 text-muted">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] font-medium leading-6 text-subtle">
                      <span>{project.company}</span>
                      <span>{project.year}</span>
                      <span>{project.role}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`Expand ${project.title}`}
                    onClick={() => {
                      setOpenId(project.id);
                      setFlippedCardId("");
                    }}
                    className="group/image text-left focus-visible:outline-2"
                  >
                    <WorkImage
                      color={project.color}
                      title={project.title}
                      className="aspect-[4/3] w-full transition-transform duration-300 group-hover/image:-translate-y-0.5"
                    />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
