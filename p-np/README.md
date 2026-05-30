# P vs NP — Collaborative Research Program

A swarm of mathematicians collaborating on the **P versus NP** problem: does
every problem whose solution can be *verified* in polynomial time also admit a
solution that can be *found* in polynomial time?

This repository is the shared workspace for that effort. It is organized so that
many independent contributors can document their progress consistently, so that
the state of every line of attack is auditable, and so that honest, well-labeled
mathematics is the only thing that gets recorded.

> **Status: P vs NP remains OPEN and unsolved by this swarm.** As of the
> 2026-05-29 adversarial red-team round, every genuine proof attempt has been
> independently judged **BROKEN** (3/3 across the barrier / rigor / literature
> lenses). Nothing in this repository is a proof. See
> [`attempts/VERDICT.md`](attempts/VERDICT.md).

---

## How This Project Works

- Each distinct **line of attack** ("angle") gets exactly one markdown file in
  [`approaches/`](approaches/).
- Every write-up follows the **mandatory template** defined in the
  [Documentation Standard](DOCUMENTATION_STANDARD.md).
- Every contribution is recorded as a dated bullet in the shared
  [Progress Log](PROGRESS_LOG.md).
- **Honesty is enforced:** every claim is explicitly labeled as an *established
  result*, a *conditional result*, or *speculation/attempt*. See §5 of the
  standard.

**Before contributing, read [`DOCUMENTATION_STANDARD.md`](DOCUMENTATION_STANDARD.md) in full.**

---

## Repository Layout

```
p-np/
├── README.md                  # This index
├── DOCUMENTATION_STANDARD.md  # The binding rules for all contributors
├── PROGRESS_LOG.md            # Chronological record of every contribution
├── SYNTHESIS.md               # Unified cross-approach picture + barrier map
├── approaches/                # One markdown file per research angle
└── attempts/                  # Genuine proof attempts + their adjudications
```

---

## Proof Attempts (adversarially adjudicated)

Beyond the survey-level [`approaches/`](approaches/), the [`attempts/`](attempts/)
directory holds *genuine new proof attempts*, each subjected to an **independent
3-lens adversarial red-team** (barrier / rigor / literature) plus a neutral
referee adjudication. The round-level verdict is in
[**`attempts/VERDICT.md`**](attempts/VERDICT.md).

| Attempt | File | Red-team | Verdict |
|---|---|---|---|
| Williams' algorithmic method, scaled below NEXP | [`attempts/williams-algorithmic-method-scaling.md`](attempts/williams-algorithmic-method-scaling.md) | 3/3 BROKEN | Refuted |
| Meta-complexity hardness magnification | [`attempts/meta-complexity-magnification.md`](attempts/meta-complexity-magnification.md) | 3/3 BROKEN | Refuted |
| GCT multiplicity obstruction | [`attempts/gct-multiplicity-obstruction.md`](attempts/gct-multiplicity-obstruction.md) | 3/3 BROKEN | Refuted |
| Proof-complexity generators → Frege | [`attempts/proof-complexity-generators-frege.md`](attempts/proof-complexity-generators-frege.md) | 3/3 BROKEN | Refuted |

**Round result (2026-05-29): no attempt survived. P vs NP remains OPEN.** See
[`attempts/VERDICT.md`](attempts/VERDICT.md) for each attempt's claim, the precise
step where it died, the barrier that killed it, the salvageable residue, and the
single most promising next concrete step.

---

## Approaches

Each row links to a write-up in `approaches/`. Files not yet written are marked
_planned_; create them using the template when you begin work on that angle.

| Angle                          | File                                                                       | Status   |
| ------------------------------ | -------------------------------------------------------------------------- | -------- |
| Circuit lower bounds           | [`circuit-lower-bounds.md`](approaches/circuit-lower-bounds.md)             | _planned_ |
| Proof complexity               | [`proof-complexity.md`](approaches/proof-complexity.md)                     | _planned_ |
| Geometric Complexity Theory    | [`geometric-complexity-theory.md`](approaches/geometric-complexity-theory.md) | _planned_ |
| Diagonalization & relativization | [`diagonalization.md`](approaches/diagonalization.md)                     | _planned_ |
| Descriptive complexity         | [`descriptive-complexity.md`](approaches/descriptive-complexity.md)         | _planned_ |
| Algebraic / polynomial methods | [`algebraic-methods.md`](approaches/algebraic-methods.md)                   | _planned_ |
| Natural-proofs evasion         | [`natural-proofs-evasion.md`](approaches/natural-proofs-evasion.md)         | _planned_ |
| Communication complexity       | [`communication-complexity.md`](approaches/communication-complexity.md)     | _planned_ |

> Add a new row when you start a new angle. Update **Status** to _active_,
> _stalled_, or _refuted_ as the work evolves, and keep the link in sync with
> the actual filename.

---

## Quick Reference

- **Naming:** `kebab-case`, descriptive of the angle, `.md` extension.
- **Template sections (in order):** Title & Author-Angle, Abstract,
  Background / Prior Work, Approach & Methodology, Attempt / Key Arguments,
  Results Obtained, Barriers Encountered, Honest Assessment, Open Sub-questions,
  References.
- **Known barriers to address:** relativization (Baker–Gill–Solovay),
  natural proofs (Razborov–Rudich), algebrization (Aaronson–Wigderson).
- **Golden rule:** never let an attempt read like a theorem.

<!-- SWARM-INDEX -->
## Approach Index

Synthesis across all approaches: [SYNTHESIS.md](SYNTHESIS.md)

| Approach | Write-up | Focus | Status |
|---|---|---|---|
| Diagonalization & Relativization | [approaches/diagonalization-relativization.md](approaches/diagonalization-relativization.md) | Hierarchy theorems, Baker-Gill-Solovay oracles | Provably insufficient in isolation |
| Boolean Circuit Complexity | [approaches/boolean-circuit-complexity.md](approaches/boolean-circuit-complexity.md) | Circuit lower bounds, ~5n wall, Williams' method | Stalled, barrier-guarded |
| Natural Proofs Barrier | [approaches/natural-proofs-barrier.md](approaches/natural-proofs-barrier.md) | Razborov-Rudich obstruction, filtering role | Obstruction theorem (no distance to answer) |
| Proof Complexity | [approaches/proof-complexity.md](approaches/proof-complexity.md) | Cook-Reckhow, Frege barrier, interpolation | Most barrier-resistant; stalled at Frege |
| Geometric Complexity Theory | [approaches/geometric-complexity-theory.md](approaches/geometric-complexity-theory.md) | Mulmuley-Sohoni, perm vs det, BIP no-go | Occurrence route dead; multiplicity route open |
| Algebraic Complexity (VP vs VNP) | [approaches/algebraic-complexity-vp-vnp.md](approaches/algebraic-complexity-vp-vnp.md) | Arithmetic circuits, depth-4 chasm | Provably capped at chasm; conditional transfer |
| Algebrization Barrier | [approaches/algebrization-barrier.md](approaches/algebrization-barrier.md) | Aaronson-Wigderson, arithmetization limits | Established meta-barrier |
| Algorithms & Upper Bounds | [approaches/algorithms-and-upper-bounds.md](approaches/algorithms-and-upper-bounds.md) | SAT algorithms, ETH/SETH, locality wall | Width-local; no global mechanism |

**Status: P vs NP remains OPEN. The swarm did not resolve it.** See [SYNTHESIS.md](SYNTHESIS.md) for the unified picture, barrier map, and what would be required for real progress.
