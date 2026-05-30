# Documentation Standard — P vs NP Research Program

This document is **binding** for every contributor to the P vs NP research
program. It exists so that a swarm of independent mathematicians can document
their work consistently, so that progress is auditable, and so that no reader
ever mistakes a hopeful attempt for an established theorem.

Read this file in full before writing your first contribution.

---

## 1. Directory Layout

```
p-np/
├── README.md                  # Project index + table of all approaches
├── DOCUMENTATION_STANDARD.md  # This file (the rules)
├── PROGRESS_LOG.md            # Shared chronological log (one bullet per contribution)
└── approaches/                # One markdown file per research angle
    ├── circuit-lower-bounds.md
    ├── proof-complexity.md
    ├── geometric-complexity-theory.md
    └── ...                     # one file per distinct angle
```

Rules:

- **All research write-ups live in `approaches/`.** Nothing else goes there.
- **One markdown file per angle.** An "angle" is a distinct line of attack
  (e.g. circuit lower bounds, proof complexity, GCT, descriptive complexity,
  algebraic methods, diagonalization variants). Do **not** create a second file
  for the same angle — extend the existing one and log the update.
- If your work spans two angles, pick the dominant one as its home and
  cross-reference the other with a relative link.
- Top-level files (`README.md`, this file, `PROGRESS_LOG.md`) are the only
  documents outside `approaches/`.

---

## 2. File Naming Convention

- **Format:** `kebab-case` — lowercase ASCII words separated by single hyphens.
- **Descriptive:** the name must identify the angle, not the author or a date.
- **Extension:** always `.md`.
- No spaces, underscores, capital letters, or version suffixes (`-v2`, `-final`).
- Use the singular/standard name of the technique where one exists.

| Good                              | Bad                          |
| --------------------------------- | ---------------------------- |
| `circuit-lower-bounds.md`         | `Circuit_Lower_Bounds.md`    |
| `proof-complexity.md`             | `proofcomplexity.md`         |
| `geometric-complexity-theory.md`  | `gct-attempt-v3-final.md`    |
| `natural-proofs-evasion.md`       | `mikes-idea.md`              |

---

## 3. Mandatory Write-up Template

Every file in `approaches/` **must** contain the following sections, in this
order, using these exact headings. Do not rename, reorder, merge, or drop a
section. If a section has nothing to report yet, keep the heading and write
`_Nothing to report yet._` underneath it.

```markdown
# <Approach Title> — <Author / Angle>

## Abstract
One paragraph (3–6 sentences) summarizing the angle, what was attempted, and
the current honest status.

## Background / Prior Work
The established context: key definitions, the relevant known theorems, and the
prior literature this work builds on. Cite, do not re-derive.

## Approach & Methodology
The strategy. Why this angle could plausibly separate (or collapse) P and NP,
and the high-level plan of attack.

## Attempt / Key Arguments
The actual mathematical content: lemmas, constructions, proof sketches,
computations. Clearly flag every step as proven, conjectured, or hand-waved.

## Results Obtained
Concrete, defensible outputs of this work. State each result precisely. If a
result is conditional, state the condition.

## Barriers Encountered
Which known obstructions this approach runs into, and how (if at all) it is
argued to evade them. Address each relevant barrier explicitly:
- **Relativization** (Baker–Gill–Solovay)
- **Natural Proofs** (Razborov–Rudich)
- **Algebrization** (Aaronson–Wigderson)
- Any other obstruction specific to the angle.

## Honest Assessment
A candid evaluation of how far this moves us toward resolving P vs NP. State
plainly whether the approach is promising, stalled, or refuted, and why. No
overclaiming.

## Open Sub-questions
A bulleted list of the concrete next questions this work raises — the things a
collaborator could pick up.

## References
Numbered list of cited works (papers, books, preprints) with enough detail to
locate them.
```

### Section checklist (the eleven mandatory headings)

1. **Title & Author-Angle** (the top-level `#` heading)
2. **Abstract**
3. **Background / Prior Work**
4. **Approach & Methodology**
5. **Attempt / Key Arguments**
6. **Results Obtained**
7. **Barriers Encountered**
8. **Honest Assessment**
9. **Open Sub-questions**
10. **References**

---

## 4. The Shared Progress Log

`PROGRESS_LOG.md` is the program's single chronological record.

- **One dated bullet per contribution.** A "contribution" is any meaningful
  change: a new approach file, a substantive update to one, a refuted lemma, a
  newly discovered barrier.
- **Format of each bullet:**

  ```markdown
  - **YYYY-MM-DD** — _<author/angle>_ — <what changed>. (`approaches/<file>.md`)
  ```

- **Append only.** Add new bullets at the bottom under the correct date. Never
  rewrite or delete history; if something was wrong, add a new bullet that
  corrects it.
- Use ISO `YYYY-MM-DD` dates. Group bullets under a `## YYYY-MM-DD` heading if
  it improves readability, but the per-bullet date is still required.
- Keep each bullet to one line. Detail belongs in the approach file; the log is
  an index of *when* and *what*, with a link.

---

## 5. Honesty Rule (Non-negotiable)

P vs NP attracts overclaiming. This program does not.

- **Every claim must be honestly labeled.** Distinguish clearly and explicitly
  between:
  - **Established result** — a theorem with a published, accepted proof, or a
    proof fully verified within this program. Cite it.
  - **Conditional result** — true given a stated, unproven assumption. State
    the assumption inline.
  - **Speculation / attempt** — an idea, heuristic, conjecture, or incomplete
    argument. Mark it as such.

- **Use explicit markers** in prose, e.g. `**[ESTABLISHED]**`,
  `**[CONDITIONAL on X]**`, `**[CONJECTURE]**`, `**[ATTEMPT — gap at step N]**`.

- **Never present a P vs NP resolution as complete** unless every step is at the
  "established" bar and has survived independent review logged in
  `PROGRESS_LOG.md`. Extraordinary claims require the full template's
  **Honest Assessment** section to say so plainly.

- **Report negative results.** A refuted approach or a confirmed barrier is a
  valuable, loggable contribution. Document why it failed.

- When in doubt, downgrade the claim. It is always better to under-claim and let
  a reviewer upgrade than to over-claim and mislead the swarm.
