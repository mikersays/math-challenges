# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is **not a software project** — it is a research-documentation corpus about the
**P vs NP** problem, plus a static website that presents it. There is no build system,
no package manager, no test suite, and no lint config. The deliverables are Markdown
and HTML. Treat changes as scholarly writing, not code.

The content was produced by multi-agent "swarm" runs (expert-persona agents drafting,
adversarial agents refuting, a referee adjudicating). New research content is expected
to be generated the same way and then committed here.

## Layout (two halves)

- **`p-np/`** — the research corpus. Governed entirely by
  [`p-np/DOCUMENTATION_STANDARD.md`](p-np/DOCUMENTATION_STANDARD.md) — **read it before
  writing anything here.**
  - `approaches/` — one survey write-up per research angle (the known landscape).
  - `attempts/` — genuine *new* proof attempts, each ending in an `## Adjudication`
    section; rounds conclude in a `VERDICT.md`. Sub-rounds live in their own subfolder
    (e.g. `attempts/acc-thr-assault/`).
  - `PROGRESS_LOG.md` — append-only, one dated bullet per contribution.
  - `README.md` — index + status tables. `SYNTHESIS.md` — the unified barrier map.
- **`docs/`** — a self-contained static site (`index.html`, `approaches.html`,
  `style.css`) intended for GitHub Pages. No framework; math is rendered with the
  MathJax CDN. This is a *separate audience-facing presentation* — keep it in sync with
  the research conclusions in `p-np/`, but it is not auto-generated from them.

## Commands

There is nothing to build or test. The only useful local command is previewing the site:

```bash
cd docs && python3 -m http.server   # then open http://localhost:8000
```

Commit only when the user asks.

## Non-negotiable conventions (the whole point of this repo)

These come from `DOCUMENTATION_STANDARD.md` §5 and are the reason the corpus has value.
Violating them silently corrupts the project:

- **P vs NP is OPEN.** Never write anything that claims (or implies) it has been
  resolved. Every status line in `README.md`/`SYNTHESIS.md` reflects this.
- **Mark every claim** as either an **established result** (with citation) or a
  clearly-flagged **`[NOVEL: unverified]`** step. Never let an attempt read like a
  finished theorem.
- **A well-documented dead-end is a success; a fake success is a failure.** Attempts are
  expected to fail honestly and say exactly where they died.
- Distinguish "we proved X" from "X would follow if Y".
- Every attempt must pass a **barrier audit** — argue it is non-relativizing
  (Baker–Gill–Solovay), non-natural (Razborov–Rudich), and non-algebrizing
  (Aaronson–Wigderson). A "yes" to any barrier is fatal to the attempt.

## Writing conventions

- File names: `kebab-case`, descriptive of the angle, `.md`. One angle/attempt per file.
- New `approaches/` files must follow the 10-section template in
  `DOCUMENTATION_STANDARD.md` §3 (Title & Author-Angle → Abstract → Background →
  Approach → Attempt → Results → Barriers → Honest Assessment → Open Sub-questions →
  References).
- After any contribution, append a dated bullet to `PROGRESS_LOG.md` (append-only — read
  it first, never clobber prior entries) and keep the `README.md` status tables in sync.
- An attempt round follows the pattern **attempt → adjudication (appended to the same
  file) → round `VERDICT.md`**. The verdict states the ruling, where each attempt died,
  the barrier that killed it, and the single most promising next step.
