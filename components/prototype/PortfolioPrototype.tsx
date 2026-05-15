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
    id: "designing-for-trust",
    title: "Designing for Trust",
    company: "Banking systems",
    description:
      "People trust financial tools when every step is clear, checked, and easy to prove.",
    year: "Problem area",
    role: "Verification, approvals, auditability",
    color: "oklch(81% 0.05 60)",
    details: [
      {
        label: "Confirmations",
        title: "Check before sending",
        body: "Before a user submits, the screen should clearly show the recipient, amount, account, reference, fees, timing, and what will happen next.",
        color: "oklch(81% 0.05 60)",
      },
      {
        label: "Verification",
        title: "Proof where it matters",
        body: "QR checks, receipts, downloads, and status labels help people prove that a payment, release, or approval is real.",
        color: "oklch(74% 0.06 95)",
      },
      {
        label: "Controls",
        title: "Show who did what",
        body: "Approvals, audit trails, roles, and success or failure states show who can act, who already acted, and what still needs attention.",
        color: "oklch(70% 0.04 38)",
      },
    ],
  },
  {
    id: "moving-money-clearly",
    title: "Moving Money Clearly",
    company: "Payments and transfers",
    description:
      "Payment tools should make the amount, cost, destination, timing, and status easy to understand.",
    year: "Problem area",
    role: "Payment flows, status systems, receipts",
    color: "oklch(74% 0.07 214)",
    details: [
      {
        label: "Payment state",
        title: "Where the money is",
        body: "Pending, processing, released, reversed, failed, and settled states should be easy to tell apart at a glance.",
        color: "oklch(74% 0.07 214)",
      },
      {
        label: "Cost clarity",
        title: "No hidden math",
        body: "Fees, exchange rates, deductions, balances, and ledger changes should be shown before a user confirms.",
        color: "oklch(76% 0.05 150)",
      },
      {
        label: "Receipts",
        title: "Receipts people can use",
        body: "A useful receipt shows IDs, parties, time, QR proof, and download options so customers, banks, and teams can all use it.",
        color: "oklch(69% 0.055 252)",
      },
    ],
  },
  {
    id: "operational-clarity",
    title: "Making Operations Legible",
    company: "Internal tools",
    description:
      "Internal tools should help teams see work, problems, owners, and next steps quickly.",
    year: "Problem area",
    role: "Dashboards, workflows, exception handling",
    color: "oklch(78% 0.04 18)",
    details: [
      {
        label: "Queues",
        title: "Work that is easy to scan",
        body: "Dashboards and lists should show priority, age, owner, risk, and status so teams know what to handle first.",
        color: "oklch(78% 0.04 18)",
      },
      {
        label: "Exceptions",
        title: "When something is stuck",
        body: "Error and exception screens should explain what broke, what is blocked, what is missing, and who can fix it.",
        color: "oklch(74% 0.05 320)",
      },
      {
        label: "Handoffs",
        title: "Clear ownership",
        body: "Handoffs should keep notes, documents, approvals, time stamps, and the reason work moved from one team to another.",
        color: "oklch(72% 0.045 42)",
      },
    ],
  },
  {
    id: "regulated-workflows",
    title: "Designing Regulated Workflows",
    company: "Compliance and risk",
    description:
      "Regulated tools should make rules, evidence, permissions, and reviews easier to follow.",
    year: "Problem area",
    role: "Compliance UX, permissions, evidence capture",
    color: "oklch(76% 0.05 150)",
    details: [
      {
        label: "Evidence",
        title: "Ask at the right time",
        body: "Onboarding, KYC, release documents, and approvals work better when the system asks for proof at the right moment.",
        color: "oklch(76% 0.05 150)",
      },
      {
        label: "Permissions",
        title: "Explain access",
        body: "When something is locked, the user should know what is hidden, why it is locked, and who can unlock it.",
        color: "oklch(71% 0.06 185)",
      },
      {
        label: "Review",
        title: "Turn rules into steps",
        body: "Good review flows turn policy into checks, warnings, required fields, documents, and clear next steps.",
        color: "oklch(69% 0.055 252)",
      },
    ],
  },
  {
    id: "digital-ecosystems",
    title: "Connecting Digital Ecosystems",
    company: "Financial infrastructure",
    description:
      "Banks now connect customers, goods, partners, ledgers, and services.",
    year: "Problem area",
    role: "Ecosystem design, service flows, integration logic",
    color: "oklch(74% 0.05 320)",
    details: [
      {
        label: "Partners",
        title: "Shared details",
        body: "When banks connect to merchants, logistics teams, warehouses, and customers, every side needs the same IDs and status language.",
        color: "oklch(74% 0.05 320)",
      },
      {
        label: "Goods",
        title: "Money and goods together",
        body: "Release flows connect payment, approval, documents, and goods. The design has to show both money status and goods status.",
        color: "oklch(80% 0.045 42)",
      },
      {
        label: "Systems",
        title: "Clear system handoffs",
        body: "Good system design shows what changed, where it changed, who owns the next step, and what proof moves with it.",
        color: "oklch(70% 0.04 38)",
      },
    ],
  },
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

function StockChartBackdrop() {
  const candles = [
    { x: 9, high: 68, low: 84, open: 72, close: 80 },
    { x: 16, high: 58, low: 77, open: 64, close: 73 },
    { x: 23, high: 61, low: 81, open: 77, close: 67 },
    { x: 30, high: 50, low: 72, open: 67, close: 56 },
    { x: 37, high: 46, low: 68, open: 51, close: 62 },
    { x: 44, high: 38, low: 60, open: 56, close: 43 },
    { x: 51, high: 33, low: 57, open: 40, close: 52 },
    { x: 58, high: 27, low: 49, open: 45, close: 32 },
    { x: 65, high: 29, low: 55, open: 34, close: 48 },
    { x: 72, high: 20, low: 44, open: 42, close: 26 },
    { x: 79, high: 18, low: 41, open: 24, close: 37 },
    { x: 86, high: 12, low: 34, open: 32, close: 18 },
    { x: 93, high: 9, low: 29, open: 16, close: 24 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="stock-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CA4D0B" stopOpacity="0.34" />
          <stop offset="72%" stopColor="#CA4D0B" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <path
        d="M0 22H100M0 38H100M0 54H100M0 70H100M14 0V100M28 0V100M42 0V100M56 0V100M70 0V100M84 0V100"
        className="stroke-[#FBFAF7]/[0.08]"
        strokeWidth="0.16"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 78 C8 72 12 76 19 66 S32 55 41 57 S52 35 61 39 S73 25 83 28 S93 12 100 16 L100 100 L0 100 Z"
        fill="url(#stock-fill)"
      />
      <path
        d="M0 78 C8 72 12 76 19 66 S32 55 41 57 S52 35 61 39 S73 25 83 28 S93 12 100 16"
        fill="none"
        className="stroke-[#CA4D0B]"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.9"
        vectorEffect="non-scaling-stroke"
      />

      {candles.map((candle) => {
        const isUp = candle.close < candle.open;
        const top = Math.min(candle.open, candle.close);
        const height = Math.abs(candle.close - candle.open);

        return (
          <g key={candle.x} className={isUp ? "text-[#CA4D0B]" : "text-[#E7E2D8]/55"}>
            <line
              x1={candle.x}
              x2={candle.x}
              y1={candle.high}
              y2={candle.low}
              stroke="currentColor"
              strokeWidth="0.45"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x={candle.x - 1.4}
              y={top}
              width="2.8"
              height={Math.max(height, 2)}
              fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}

function FilledCtaIcon({
  type,
}: {
  type: "work" | "contact" | "essays" | "open" | "close";
}) {
  if (type === "work") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
        <path d="M10 15.5 3.5 7h13L10 15.5Z" />
      </svg>
    );
  }

  if (type === "contact") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
        <path d="M2.5 5.25A2.25 2.25 0 0 1 4.75 3h10.5a2.25 2.25 0 0 1 2.25 2.25v9.5A2.25 2.25 0 0 1 15.25 17H4.75a2.25 2.25 0 0 1-2.25-2.25v-9.5Zm2.34-.1 5.16 4.02 5.16-4.02H4.84Zm10.91 9.7V7.08l-5.29 4.12a.75.75 0 0 1-.92 0L4.25 7.08v7.77h11.5Z" />
      </svg>
    );
  }

  if (type === "open") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
        <path d="M10 3.25a.75.75 0 0 1 .75.75v5.25H16a.75.75 0 0 1 0 1.5h-5.25V16a.75.75 0 0 1-1.5 0v-5.25H4a.75.75 0 0 1 0-1.5h5.25V4a.75.75 0 0 1 .75-.75Z" />
      </svg>
    );
  }

  if (type === "close") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
        <path d="M4.75 9.25h10.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
      <path d="M5 2.75A1.75 1.75 0 0 1 6.75 1h6.5A1.75 1.75 0 0 1 15 2.75v14.5a.75.75 0 0 1-1.16.63L10 15.36l-3.84 2.52A.75.75 0 0 1 5 17.25V2.75Z" />
    </svg>
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
      className="group/card w-[calc(100vw-3rem)] max-w-[46rem] shrink-0 snap-center scroll-mx-6 text-left focus-visible:outline-2 focus-visible:outline-[#CA4D0B] sm:w-[calc(100vw-5rem)] md:w-[min(72vw,46rem)] md:scroll-mx-10 lg:w-[min(64vw,46rem)]"
    >
      <span className="relative block min-h-[min(34rem,72vh)] rounded-sm transition-transform duration-300 ease-out group-hover/card:-translate-y-0.5 sm:min-h-[min(38rem,74vh)]">
        {isFlipped ? (
          <span className="absolute inset-0 flex flex-col justify-between rounded-sm border border-[#CA4D0B] bg-[#FBFAF7] p-6 text-[#28231F] md:p-10">
            <span className="space-y-4">
              <span className="block text-[0.8125rem] font-medium leading-6 text-[#706A62]">
                {projectTitle}
              </span>
              <span className="block max-w-[13ch] text-balance text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.98]">
                {detail.title}
              </span>
            </span>
            <span className="block max-w-[38ch] text-[1.05rem] leading-8 text-[#706A62]">
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
        <StockChartBackdrop />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(202,77,11,0.12),transparent_34%),linear-gradient(90deg,rgba(25,38,73,0.1),rgba(25,38,73,0.66))]"
        />

        <div className="absolute inset-x-5 top-1/2 z-10 max-w-[24rem] -translate-y-1/2 bg-[#192649]/94 px-5 py-6 text-center text-[#E7E2D8] sm:inset-x-6 sm:left-[44%] sm:right-auto sm:max-w-[36rem] sm:px-8 sm:py-8 sm:text-left md:left-[48%] lg:max-w-[42rem] lg:px-10 lg:py-10">
          <Link
            href="/"
            className="block text-balance text-[clamp(2.15rem,10vw,3.55rem)] font-semibold leading-[0.95] transition-colors hover:text-[#CA4D0B] focus-visible:outline-2 focus-visible:outline-[#CA4D0B] sm:text-[clamp(2.6rem,4.7vw,4.65rem)] sm:leading-[0.92]"
          >
            I design financial systems that help money, goods, and trust move clearly.
          </Link>
          <p className="mx-auto mt-4 max-w-[42ch] text-balance text-[0.98rem] font-medium leading-7 text-[#D6D0C6] sm:mx-0 sm:mt-5 sm:text-[clamp(1rem,1.45vw,1.18rem)]">
            My work focuses on common problems in banking and financial systems:
            trust, money movement, regulated workflows, internal tools, and connected
            services.
          </p>
          <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-[0.86rem] font-semibold uppercase leading-6 text-[#CA4D0B] sm:mt-7 sm:justify-start sm:text-[0.9rem]">
            <a href="#work" className="inline-flex items-center gap-2 transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              <FilledCtaIcon type="work" />
              Areas
            </a>
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              <FilledCtaIcon type="contact" />
              Contact
            </a>
            <a href="#essays" className="inline-flex items-center gap-2 transition-colors hover:text-[#FBFAF7] focus-visible:outline-2 focus-visible:outline-[#CA4D0B]">
              <FilledCtaIcon type="essays" />
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
        aria-label="Problem areas"
      >
        <div className="grid gap-5 border-b border-hairline pb-10 md:grid-cols-[4rem_minmax(0,1fr)]">
          <p className="border-t border-[#CA4D0B] pt-3 text-sm font-medium leading-6 text-muted">
            Focus
          </p>
          <div className="max-w-[48rem] space-y-4">
            <h1 className="text-balance text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[0.92] text-foreground">
              Problem areas, not just project cards.
            </h1>
            <p className="max-w-[46ch] text-[1.08rem] leading-8 text-muted">
              Each section shows a common problem in financial systems and the design
              patterns that make it easier to use.
            </p>
          </div>
        </div>

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
                <div className="animate-[dock-in_360ms_cubic-bezier(0.22,1,0.36,1)] py-2 sm:py-4">
                  <div className="mb-10 grid gap-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-start">
                    <p className="border-t border-[#CA4D0B] pt-3 text-sm font-medium leading-6 tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div className="max-w-[46rem] space-y-5">
                      <h2 className="max-w-[16ch] text-balance text-[clamp(2.15rem,5vw,4.4rem)] font-medium leading-[0.9] text-foreground">
                        {project.title}
                      </h2>
                      <p className="max-w-[42ch] text-[1.08rem] leading-8 text-muted">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] font-medium leading-6 text-subtle">
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
                      className="inline-flex items-center gap-2 justify-self-start border-t border-[#CA4D0B] pt-3 text-[0.8125rem] font-medium leading-6 text-muted transition-colors hover:text-[#CA4D0B] focus-visible:outline-2 focus-visible:outline-[#CA4D0B] md:justify-self-end"
                    >
                      <FilledCtaIcon type="close" />
                      Close
                    </button>
                  </div>

                  <div
                    className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-5 sm:-mx-10 sm:px-10 md:ml-10 md:gap-8 md:pr-[calc(100vw-46rem)] [scrollbar-color:#CA4D0B_transparent] [scrollbar-width:thin]"
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
                    className="group/image relative text-left focus-visible:outline-2"
                  >
                    <span className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center bg-[#CA4D0B] text-[#FBFAF7] transition-colors group-hover/image:bg-[#192649]">
                      <FilledCtaIcon type="open" />
                    </span>
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
