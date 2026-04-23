"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ProjectPanel =
  | {
      type: "spread";
      eyebrow: string;
      title: string;
      body: string[];
      imageLabel: string;
      imageColor: string;
      meta: Array<{ label: string; value: string }>;
    }
  | {
      type: "image";
      eyebrow: string;
      caption: string;
      imageLabel: string;
      imageColor: string;
    }
  | {
      type: "text";
      eyebrow: string;
      title: string;
      body: string[];
    };

type Project = {
  id: string;
  title: string;
  company: string;
  description: string;
  year: string;
  role: string;
  previewColor: string;
  previewLabel: string;
  panels: ProjectPanel[];
};

const projects: Project[] = [
  {
    id: "sable-house",
    title: "Sable House",
    company: "Private commission",
    description: "Editorial portfolio concept for a private residence launch.",
    year: "2026",
    role: "Art direction, digital experience",
    previewColor: "oklch(80% 0.06 57)",
    previewLabel: "Hero image placeholder",
    panels: [
      {
        type: "spread",
        eyebrow: "Opening spread",
        title: "A quiet first impression with room to breathe.",
        body: [
          "The first panel behaves like a cover spread: metadata on the left, one generous visual in the center, and a short framing text on the right.",
          "It should feel like entering a project without leaving the larger portfolio index.",
        ],
        imageLabel: "Primary project visual",
        imageColor: "oklch(81% 0.05 60)",
        meta: [
          { label: "Client", value: "Private commission" },
          { label: "Type", value: "Residential brand site" },
          { label: "Status", value: "Prototype" },
        ],
      },
      {
        type: "image",
        eyebrow: "Visual beat",
        caption: "A full-width image panel gives the project a cinematic pause before more narrative appears.",
        imageLabel: "Wide image placeholder",
        imageColor: "oklch(72% 0.06 95)",
      },
      {
        type: "text",
        eyebrow: "Narrative beat",
        title: "Text panels slow the pace and turn the project into a guided case study.",
        body: [
          "This is where process, design choices, constraints, or outcomes can live without collapsing the whole project into one long article.",
          "The sideways motion makes the reading feel deliberate rather than dumped into a scrolling wall of content.",
        ],
      },
      {
        type: "image",
        eyebrow: "Detail beat",
        caption: "A second image can hold mockups, photography, sketches, or a UI close-up.",
        imageLabel: "Detail image placeholder",
        imageColor: "oklch(70% 0.06 215)",
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
    previewColor: "oklch(72% 0.07 215)",
    previewLabel: "Preview image placeholder",
    panels: [
      {
        type: "spread",
        eyebrow: "Opening spread",
        title: "The project opens inside the stack instead of leaving the page.",
        body: [
          "This keeps vertical browsing intact. One click expands the row, but the overall page remains a portfolio index.",
          "That balance is what makes the interaction feel authored instead of gimmicky.",
        ],
        imageLabel: "Primary project visual",
        imageColor: "oklch(74% 0.07 214)",
        meta: [
          { label: "Client", value: "Afterlight Systems" },
          { label: "Type", value: "B2B product launch" },
          { label: "Status", value: "Concept" },
        ],
      },
      {
        type: "text",
        eyebrow: "System note",
        title: "Vertical scroll is for breadth. Horizontal scroll is for depth.",
        body: [
          "That directional split gives users a simple mental model: keep moving down to browse projects, move sideways to understand one project deeply.",
          "It is legible interaction design because the directions mean different things.",
        ],
      },
      {
        type: "image",
        eyebrow: "Proof point",
        caption: "This panel could become a grid of screens, a motion storyboard, or a prototype frame.",
        imageLabel: "System panel placeholder",
        imageColor: "oklch(76% 0.05 150)",
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
    previewColor: "oklch(78% 0.04 18)",
    previewLabel: "Preview image placeholder",
    panels: [
      {
        type: "spread",
        eyebrow: "Opening spread",
        title: "A project can alternate between visual immersion and editorial explanation.",
        body: [
          "This makes the expanded state feel less like a card and more like a sequence of spreads in a publication.",
          "That is a better match for a design portfolio than a dashboard-style detail view.",
        ],
        imageLabel: "Primary project visual",
        imageColor: "oklch(78% 0.04 18)",
        meta: [
          { label: "Client", value: "Self-initiated" },
          { label: "Type", value: "Publication system" },
          { label: "Status", value: "Built" },
        ],
      },
      {
        type: "image",
        eyebrow: "Sequence beat",
        caption: "A colored rectangle stands in for a future image, but the interaction structure is already testable.",
        imageLabel: "Publication image placeholder",
        imageColor: "oklch(74% 0.05 320)",
      },
      {
        type: "text",
        eyebrow: "Reading note",
        title: "Prototype first. Real content later.",
        body: [
          "This prototype is useful because it isolates the behavior: opening, closing, horizontal reading, and the transition back to vertical browsing.",
          "Once the structure feels right, the dummy panels can be replaced with real project data and media.",
        ],
      },
    ],
  },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DummyImage({
  color,
  label,
  className,
}: {
  color: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-label={label}
      role="img"
      className={classNames(
        "relative overflow-hidden rounded-sm border border-hairline",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/25 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/88">
        <span>{label}</span>
        <span>Dummy</span>
      </div>
    </div>
  );
}

function ProjectPanelView({ panel }: { panel: ProjectPanel }) {
  if (panel.type === "spread") {
    return (
      <article className="grid w-[min(72vw,62rem)] shrink-0 snap-start grid-cols-1 gap-6 rounded-sm border border-hairline bg-background p-5 md:grid-cols-[13rem_minmax(0,1fr)_16rem] md:p-6">
        <div className="space-y-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">
            {panel.eyebrow}
          </p>
          <div className="space-y-4">
            {panel.meta.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">
                  {item.label}
                </p>
                <p className="text-sm leading-6 text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <DummyImage
          color={panel.imageColor}
          label={panel.imageLabel}
          className="h-[clamp(18rem,44vh,28rem)]"
        />

        <div className="flex max-w-[28ch] flex-col justify-between gap-5">
          <div className="space-y-4">
            <h2 className="text-[clamp(1.35rem,2.5vw,2.4rem)] font-semibold leading-[1.02] text-foreground">
              {panel.title}
            </h2>
            <div className="space-y-4 text-[1.05rem] leading-8 text-muted">
              {panel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (panel.type === "image") {
    return (
      <article className="w-[min(70vw,56rem)] shrink-0 snap-start space-y-4 rounded-sm border border-hairline bg-background p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">
            {panel.eyebrow}
          </p>
          <p className="text-sm leading-6 text-subtle">Scroll sideways for the next beat</p>
        </div>
        <DummyImage
          color={panel.imageColor}
          label={panel.imageLabel}
          className="h-[clamp(17rem,42vh,26rem)]"
        />
        <p className="max-w-[46ch] text-[1rem] leading-7 text-muted">{panel.caption}</p>
      </article>
    );
  }

  return (
    <article className="flex h-[clamp(18rem,44vh,26rem)] w-[min(56vw,30rem)] shrink-0 snap-start flex-col justify-between gap-8 rounded-sm border border-hairline bg-surface p-6 md:p-8">
      <div className="space-y-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">
          {panel.eyebrow}
        </p>
        <h2 className="max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.03] text-foreground">
          {panel.title}
        </h2>
      </div>
      <div className="space-y-4 text-[1.04rem] leading-8 text-muted">
        {panel.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function OpeningHeroPanel({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <article className="w-[min(74vw,60rem)] shrink-0 snap-start space-y-4 rounded-sm border border-hairline bg-background p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">
          Opening image
        </p>
        <p className="text-sm leading-6 text-subtle">The clicked preview expands into the rail.</p>
      </div>
      <DummyImage
        color={color}
        label={label}
        className="h-[clamp(19rem,48vh,30rem)]"
      />
    </article>
  );
}

function OpeningTextPanel({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string[];
}) {
  return (
    <article className="flex h-[clamp(18rem,44vh,25rem)] w-[min(52vw,28rem)] shrink-0 snap-start flex-col justify-between gap-8 rounded-sm border border-hairline bg-surface p-6 md:p-8">
      <div className="space-y-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">
          {eyebrow}
        </p>
        <h3 className="max-w-[15ch] text-[clamp(1.45rem,2.5vw,2.65rem)] font-semibold leading-[1.03] text-foreground">
          {title}
        </h3>
      </div>
      <div className="space-y-4 text-[1.04rem] leading-8 text-muted">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export function PortfolioPrototype() {
  const [openId, setOpenId] = useState<string>("");
  const [railProgress, setRailProgress] = useState(0);
  const projectRefs = useRef<Record<string, HTMLElement | null>>({});
  const railRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!openId) {
      return;
    }

    const projectElement = projectRefs.current[openId];
    const railElement = railRefs.current[openId];

    if (railElement) {
      railElement.scrollTo({ left: 0, behavior: "smooth" });
    }

    if (!projectElement) {
      return;
    }

    requestAnimationFrame(() => {
      projectElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [openId]);

  function handleRailScroll(projectId: string) {
    if (projectId !== openId) {
      return;
    }

    const rail = railRefs.current[projectId];

    if (!rail) {
      return;
    }

    const nextProgress = Math.min(rail.scrollLeft / 320, 1);
    setRailProgress(nextProgress);
  }

  return (
    <main className="mx-auto w-full max-w-[96rem] px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
      <header className="mx-auto mb-16 flex max-w-[52rem] items-end justify-between gap-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="font-[family:var(--font-signature)] text-[clamp(1.5rem,3vw,2.75rem)] leading-none text-foreground transition-colors hover:text-accent focus-visible:outline-2"
          >
            Joseph Mugo
          </Link>
          <div className="max-w-[46ch] space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-subtle">
              Prototype 01
            </p>
            <p className="text-[1.05rem] leading-8 text-muted">
              A vertical portfolio index with inline horizontal case-study rails.
              Open one project, read sideways, then keep moving down the stack.
            </p>
          </div>
        </div>

        <p className="hidden max-w-[18ch] text-right text-sm leading-6 text-subtle lg:block">
          Testing interaction first with dummy content and color fields in place of future project imagery.
        </p>
      </header>

      <section className="space-y-6">
        {projects.map((project, index) => {
          const isOpen = openId === project.id;
          const openingPanel =
            project.panels[0]?.type === "spread" ? project.panels[0] : null;
          const railPanels = openingPanel ? project.panels.slice(1) : project.panels;

          return (
            <section
              key={project.id}
              ref={(element) => {
                projectRefs.current[project.id] = element;
              }}
              className="border-t border-hairline pt-6 first:border-t-0 first:pt-0"
              style={{ scrollMarginBlock: "16vh" }}
            >
              {isOpen ? (
                <div className="relative mx-auto grid w-full max-w-[80rem] animate-[dock-in_420ms_cubic-bezier(0.22,1,0.36,1)] grid-cols-1 items-center gap-6 px-2 pb-6 pt-1 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-8 md:px-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-6 -z-10 hidden h-[78%] rounded-[2rem] bg-foreground/4 blur-3xl md:block"
                    style={{
                      opacity: 0.2 + (1 - railProgress) * 0.35,
                      transform: `scale(${1 - railProgress * 0.02})`,
                    }}
                  />

                  <div
                    className="space-y-4 text-center md:text-right"
                    style={{
                      opacity: 1 - railProgress * 0.24,
                      transform: `translateY(${railProgress * 6}px) scale(${1 - railProgress * 0.08})`,
                      transformOrigin: "center right",
                    }}
                  >
                    <div className="flex items-center justify-center gap-3 md:justify-end">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-subtle">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="h-px w-20 bg-hairline" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-[clamp(1.3rem,2vw,2.2rem)] font-semibold leading-[1.03] text-foreground">
                        {project.title}
                      </h2>
                      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-subtle">
                        {project.company}
                      </p>
                    </div>
                    <div className="space-y-3 text-sm leading-6 text-muted">
                      <p>{project.year}</p>
                      <p>{project.role}</p>
                      <p className="text-foreground">{project.description}</p>
                    </div>
                  </div>

                  <div
                    className="space-y-3"
                    style={{
                      transform: `translateY(${railProgress * 4}px)`,
                    }}
                  >
                    <div
                      className="flex items-center justify-between gap-4"
                      id={`${project.id}-rail`}
                    >
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-subtle">
                        Project rail
                      </p>
                      <p className="text-sm leading-6 text-subtle">
                        Scroll sideways to follow the project. Scroll down to continue browsing.
                      </p>
                    </div>

                    <div
                      className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-2 pl-1 pr-[26vw] scroll-smooth [scrollbar-color:var(--hairline)_transparent] [scrollbar-width:thin]"
                      tabIndex={0}
                      aria-label={`${project.title} horizontal case study rail`}
                      ref={(element) => {
                        railRefs.current[project.id] = element;
                      }}
                      onScroll={() => handleRailScroll(project.id)}
                    >
                      <OpeningHeroPanel
                        color={project.previewColor}
                        label={project.previewLabel}
                      />

                      {openingPanel ? (
                        <OpeningTextPanel
                          eyebrow={openingPanel.eyebrow}
                          title={openingPanel.title}
                          body={openingPanel.body}
                        />
                      ) : null}

                      {railPanels.map((panel, panelIndex) => (
                        <ProjectPanelView
                          key={`${project.id}-${panel.type}-${panelIndex + 1}`}
                          panel={panel}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto grid w-full max-w-[56rem] grid-cols-1 items-center gap-8 pb-6 md:grid-cols-[minmax(0,17rem)_minmax(0,28rem)] md:justify-center md:gap-10">
                  <div className="order-2 space-y-3 text-center md:order-1 md:text-right">
                    <div className="flex items-center gap-3 md:justify-end">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-subtle">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="h-px w-24 bg-hairline" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-[clamp(1.25rem,2.2vw,2.35rem)] font-semibold leading-[1.03] text-foreground">
                        {project.title}
                      </h2>
                      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-subtle">
                        {project.company}
                      </p>
                      <p className="mx-auto max-w-[30ch] text-[1rem] leading-7 text-muted md:ml-auto md:mr-0">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm leading-6 text-subtle md:justify-end">
                      <span>{project.year}</span>
                      <span>{project.role}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={false}
                    aria-controls={`${project.id}-rail`}
                    aria-label={`Expand ${project.title}`}
                    onClick={() => {
                      setRailProgress(0);
                      setOpenId(project.id);
                    }}
                    className="group/image order-1 block text-left md:order-2"
                  >
                    <DummyImage
                      color={project.previewColor}
                      label={project.previewLabel}
                      className="mx-auto min-h-[15rem] w-full max-w-[28rem] transition-all duration-300 group-hover/image:-translate-y-0.5 md:min-h-[16rem]"
                    />
                    <div className="mt-3 flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-subtle">
                      <span>Click image to expand</span>
                      <span>+</span>
                    </div>
                  </button>
                </div>
              )}

            </section>
          );
        })}
      </section>
    </main>
  );
}
