# P vs NP — Progress Log

A running, dated record of proof attempts, red-team rounds, and adjudications by
the swarm. Newest entries at the bottom.

---

- **2026-05-29 — Adversarial red-team round (4 attempts, all BROKEN).** Four
  genuine new P vs NP proof attempts were each subjected to an *independent
  3-lens* adversarial red-team (barrier / rigor / literature) plus a neutral
  referee adjudication. **Outcome: every attempt was judged BROKEN, 3/3 across
  all lenses. No survivor. P vs NP remains OPEN.**
  - `williams-algorithmic-method-scaling` — BROKEN (3/3). Died at Step 5/6 §4:
    quasi-polynomial-per-rung glue gives top-rung-dominated s_top = 2^{Θ(N²)}, so
    no time-hierarchy contradiction; the only repair is provably circular (§6
    equivalence); easy-witness lever is information-vacuous at NP scale. Killer:
    internal circularity (no classical barrier).
  - `meta-complexity-magnification` — BROKEN (3/3). Died at Step B2/B3 §4: Kt is
    O(log N)-Lipschitz ⇒ low Fourier mass, so the mass-collision never fires;
    patched route blocked by the CHOPRS locality barrier. Part A amplifier sound.
  - `gct-multiplicity-obstruction` — BROKEN (3/3). Died at Step 5 §4: no lower
    bound on the permanent-side orbit-closure multiplicity; "reduction to
    Conjecture MO" is vacuous. Killer: the lockstep/decoupling problem.
  - `proof-complexity-generators-frege` — BROKEN (3/3). Died at Lemma 4/Step 4
    (vacuous Range-vs-complement distinguisher, density 2^{n−m}) and Step 3
    (misapplied Buss witnessing); behind the wall, natural-proofs + relativization.
  - **Residue:** four sharpened, externally-checked dead-ends (quantified
    NEXP→NP descent no-go + 2^{Θ(N²)} cautionary lemma + §6 conservation-of-
    difficulty equivalence; a ruled-out spectral-mass class for magnification; a
    reusable GCT determinant-side upper bound + named decoupling obstruction; a
    localized witnessing-to-base-function hard direction for the generators
    program). **Most promising next step:** push the algorithmic method on
    ACC⁰ ∘ THR via its combinatorial (non-algebraic) Circuit-SAT normal form
    (Chen–Lyu–Williams) — live, non-barriered, non-circular.
  - Full adjudication: see [`attempts/VERDICT.md`](attempts/VERDICT.md).

- 2026-05-30 — **Maximum-rigor assault on the ACC⁰∘THR lead** (lead coordinator).
  Five independent attempt teams (probabilistic-poly-correlation, easy-witness-winwin,
  gap-sat-derandomization, meta-algorithmic-magnification, thr-degree-reduction), each
  with a dedicated barrier auditor + a 5-lens adversarial red-team (barrier / rigor /
  literature / quantitative / circularity) + neutral adjudication; the least-broken
  attempt then went through a repair round with re-refutation. ~42 agents, ~2.1M tokens.
  **All five ruled BROKEN, 5/5 each**, and the repair on the least-broken attempt
  (probabilistic-poly-correlation, brokenness 7/10) **failed fundamentally**. Unifying
  finding: every route dies on one object — the unconditional `Θ(√n)` approximate-degree
  lower bound for threshold functions (Paturi / Nisan–Szegedy / Sherstov) — seen through
  different lenses (degree / sparsity / matmul inner dimension / sign-rank / core-shell
  measure); the algorithmic method *conserves* the wall rather than defeating it. P vs NP
  remains OPEN; this specific lead is now a sharpened, externally-checked dead-end.
  Full writeup: [`attempts/acc-thr-assault/VERDICT.md`](attempts/acc-thr-assault/VERDICT.md).
