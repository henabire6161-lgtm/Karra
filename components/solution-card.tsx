"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Solution } from "@/lib/content";

type SolutionCardProps = {
  solution: Solution;
  active: boolean;
  expanded: boolean;
  cardRef: (instance: HTMLElement | null) => void;
  onToggle: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function SolutionCard({
  solution,
  active,
  expanded,
  cardRef,
  onToggle,
  onFocus,
  onBlur,
}: SolutionCardProps) {
  return (
    <article
      id={solution.id}
      ref={cardRef}
      className={`solution-card${active ? " is-active" : ""}${expanded ? " is-expanded" : ""}`}
    >
      <Image
        className="solution-image"
        src={solution.image}
        alt={solution.imageAlt}
        fill
        sizes="(max-width: 760px) 92vw, (max-width: 1100px) 48vw, 31vw"
      />
      <div className="solution-wash" aria-hidden="true" />
      <div className="solution-card-top">
        <span>{solution.kicker}</span>
        <span className="solution-orbit" aria-hidden="true">↗</span>
      </div>
      <div className="solution-card-content">
        <div className="solution-title-row">
          <h3>{solution.name}</h3>
          <span className="solution-plus" aria-hidden="true"><Plus size={18} /></span>
        </div>
        <p className="solution-summary">{solution.description}</p>
        <div className="solution-services" aria-hidden={!active}>
          <p className="service-label">What we do</p>
          <ul>
            {solution.services.map((service) => <li key={service}>{service}</li>)}
          </ul>
          <p className="solution-footprint">{solution.footprint}</p>
        </div>
        <button
          type="button"
          className="solution-discover"
          aria-expanded={active}
          aria-pressed={expanded}
          aria-label={`${expanded ? "Stop pinning" : "Keep"} ${solution.name} service details open`}
          onClick={onToggle}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span>{expanded ? "Pinned open" : active ? "Keep details open" : "Discover services"}</span>
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}
