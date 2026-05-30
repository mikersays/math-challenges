# P vs NP — Attempt-and-Refute Round: VERDICT

**Date:** 2026-05-29
**Status:** This document replaces an earlier version that was written *before* the
adversarial red-team ran. It is the corrected, externally-checked summary.

## Headline

**P vs NP remains OPEN and unsolved.** None of the four proof attempts in this
round survived. Each was subjected to an **independent 3-lens adversarial
red-team** (barrier lens / rigor lens / literature lens) plus a neutral referee
adjudication. **All four were judged BROKEN, 3/3 across every lens.** There is no
separation, no conditional separation that closes, and no survivor. Do not read
any of the "residue" below as partial success toward a proof — it is salvageable
*byproduct*, not progress on the main question.

---

## Per-frontier breakdown

### 1. williams-algorithmic-method-scaling

- **Claim:** Scale the algorithmic method down from NEXP to NP via a recursive
  "rung" tower, using an easy-witness lever to derive a contradiction with the
  nondeterministic time hierarchy.
- **Red-team tally:** BROKEN, 3/3.
- **Where it died:** Step 5/6 of Section 4 — the per-rung "glue cost" f(n_i) and
  its compounded witness-size product, reinforced by the Section 6 equivalence
  reduction. The Step-5 contradiction is valid only if s_top = poly(N), but the
  only composition bound that actually holds is *quasi-polynomial per rung*,
  f(n_i) ≈ n_i^{log n_i}. The product is top-rung-dominated, giving
  s_top ≥ f(n_{k-1}) = (2^N)^{log 2^N} = 2^{Θ(N²)} — doubly exponential, not
  poly(N) — so no contradiction with the nondeterministic time hierarchy is
  produced. The seductive load-bearing error (flagged by the author in §6) is
  conflating "few rungs k = O(log\* N)" with "small total overhead." The only
  repair (polynomial-per-rung glue) is proven in §6 to be logically *equivalent*
  to a scale-free easy-witness lemma that already yields the target — circular.
  Compounding this, the central easy-witness engine is **vacuous at the NP
  scale**: witnesses are poly(n) bits, so circuits have O(log n) inputs and a
  poly-size circuit is a full lookup table carrying zero information.
- **Barrier that killed it:** None classical (all refuters: barrier = none). The
  proximate killer is **internal circularity**, plus an information-theoretic
  vacuity of the easy-witness lever at the NP scale.
- **Author's own stance:** self-labeled an honest dead-end that does NOT close;
  the author concurs with BROKEN.

### 2. meta-complexity-magnification

- **Claim:** Combine a sound magnification amplifier (NP ⊄ P/poly reduces to an
  N^{1+ε} weak lower bound for MKtP[s]/MCSP[s] at a sparse parameter) with a
  spectral/Fourier-mass argument to actually prove the weak bound.
- **Red-team tally:** BROKEN, 3/3.
- **Where it died:** Step B2 (Section 4, Part B — the global Fourier-mass
  invariant), with dependent collapse of Step B3 (formula Fourier-tail bound).
  Two independent fatal failures: (1) Kt is O(log N)-Lipschitz, so MKtP[s] has
  *low* average sensitivity, which by the influence–Fourier identity forces
  Fourier mass to LOW levels — not the level N^{Ω(1)} that B3 requires — so the
  Ω(1)-vs-tail collision never fires and no N^{1+ε} bound emerges; (2) even
  patched, B3's only known proof route (random restrictions) is an N^{o(1)}-local
  certificate, and the **CHOPRS locality barrier** proves no local method can
  prove the N^{1+ε} weak bound at the magnifiable parameter.
- **Barrier that killed it:** the **CHOPRS locality barrier** (for the patched
  route), preceded by an internal spectral contradiction (Lipschitz ⇒ low Fourier
  mass) that kills the unpatched route outright.
- **Note:** Part A (the OPS/MMW/CHOPRS amplifier) is sound and uncontested — but
  amplifying a bound you cannot prove is not a proof.

### 3. gct-multiplicity-obstruction

- **Claim:** Separate via Geometric Complexity Theory by exhibiting a shape λ
  whose orbit-closure multiplicity is bounded above on the determinant side and
  bounded below on the permanent side (an occurrence/multiplicity obstruction).
- **Red-team tally:** BROKEN, 3/3.
- **Where it died:** Step 5 (§4, the permanent-side / Y-side multiplicity LOWER
  bound), restated as the second half of Conjecture MO (Step 6). The chain is
  rigorous only through Step 3 (the determinant-side upper bound
  m_λ(X) ≤ s_λ(det) via algebraic Peter–Weyl — the valid
  Bürgisser–Ikenmeyer symmetry-multiplicity bound). Step 5 supplies **no** lower
  bound on m_λ(Y): nonvanishing of the Young-symmetrizer contraction, linear
  independence of the C+1 claimed covariants, and decoupling are all asserted and
  self-admittedly unproven. The "reduction to Conjecture MO" is therefore vacuous
  — MO *is* the original separation problem restated.
- **Barrier that killed it:** the **lockstep / decoupling problem** (conceded in
  §6(3) and §7 need #2): the same symmetry principle that shrinks the det side
  shrinks the per side simultaneously, since P = z^{m−n}·per_n lives in the same
  C^m ⊗ C^m matrix space as det, and the Bürgisser–Ikenmeyer–Panova
  no-occurrence-obstruction mechanism predicts the per covariants already appear
  for det. Thus m_λ(Y) > m_λ(X) points *against* the known evidence; Step 7 even
  predicts failure in every checkable small case. (Secondary: Step 4 small-symmetry
  plethysm is heuristic; the m = n^{O(log n)} regime is unverified.)
- **Author's own stance:** declares "does NOT close" up front; an honest,
  documented dead-end, never claimed as proof.

### 4. proof-complexity-generators-frege

- **Claim:** Derive Extended Frege (EF) lower bounds from proof-complexity
  generators by converting EF proofs into Range-vs-complement distinguishers and
  pinning hardness to one explicit function f.
- **Red-team tally:** BROKEN, 3/3.
- **Where it died:** Two independent fatal points, both *upstream* of the open
  wall. (1) Lemma 4 / Step 4 ("Pseudorandomness ⇒ proof hardness" and the
  diagonal collision) is an invalid non-sequitur: its "EF proof ⇒
  Range-vs-complement distinguisher" conversion is vacuous — Range has density
  ≤ 2^{n−m} → 0, so a constant-size "not in range" circuit distinguishes it
  unconditionally, consistent with the pseudorandomness (which only constrains the
  *forward* output distribution) — and it has no Cook–Reckhow/reflection
  mechanism (that implication *is* the open Razborov conjecture). (2) Step 3
  ("Key sub-claim" [NOVEL: unverified]) misapplies Buss's witnessing theorem (a
  Σ^b_1 existential extractor) to the universal/refutational statement ¬τ_b,
  with no derivation forcing the extension variables to compute/approximate the
  base function f on the design slice. The author's self-flagged terminal wall —
  Step 5 (★), requiring an explicit unconditional P/poly lower bound — would block
  any unconditional conclusion anyway, but the attempt dies before reaching it,
  breaking even the advertised *conditional* reduction. The §6 AC⁰-Frege
  "salvage" inherits the same Step-3 defect.
- **Barrier that killed it:** internal non-sequitur (vacuous distinguisher) +
  misapplied witnessing theorem; and *behind* that wall, the **natural-proofs and
  relativization barriers** that the required (★) explicit P/poly lower bound
  would inherit.

---

## What this round genuinely contributed

No proof. What it produced are **sharpened, independently-checked dead-ends** and
a few reusable artifacts. Each is documentation that saves future effort, not a
step toward a separation.

1. **Quantified no-go for naive NEXP→NP descent of the algorithmic method**
   (from #1). The easy-witness lever is powered entirely by the *exponential
   witness-vs-index length ratio*, which collapses to O(log n)-input lookup tables
   at NP, rendering "every witness is easy" information-free. Plus the 2^{Θ(N²)}
   glue-product computation as a **cautionary lemma** for recursive-tower
   constructions: a small (log\*) rung count cannot rescue super-polynomial
   per-rung overhead because the product is top-rung-dominated. Plus the §6
   equivalence as a standalone **conservation-of-difficulty** result: a
   scale-free / polynomial-per-rung easy-witness lemma is *equivalent in strength*
   to the target separation — worth citing to forestall re-walking this dead-end.

2. **A spectral-mass class ruled out for meta-complexity magnification** (from #2).
   Kt's O(log N)-Lipschitz property forces MKtP[s] Fourier mass to low levels,
   killing an entire class of spectral-mass approaches at one stroke. The
   sharpened frontier statement is correct: one needs a "globally hard but locally
   opaque" sparse meta-predicate **plus** a *non-local* (non-restriction) formula
   Fourier-tail bound, with a Williams-style algorithmic-method ingredient as the
   only plausible non-local source. Part A amplifier is sound and well-cited.

3. **A clean reusable GCT upper bound + a named structural obstruction** (from #3).
   The Step-3 determinant-side bound
   m_λ(det) ≤ dim S_λ(C^m ⊗ C^m)^{SL_m × SL_m} is correct, self-contained, and
   reusable. The document precisely isolates the missing mathematical object — a
   *positive lower-bound method for orbit-closure multiplicities of a
   small-symmetry form* — and crisply names the **lockstep/decoupling problem** as
   the structural reason symmetry-based GCT cannot separate the two sides by
   itself. Any future attempt must produce a *decoupling theorem*, not merely
   engineer a shape λ.

4. **A localized hard direction for the generators program** (from #4). It
   correctly identifies that the proof-complexity-generators route to EF hardness
   hinges on a witnessing-to-base-function reduction (Step 3) that is exactly the
   unbridged hard direction of the Krajíček/Razborov program, and that any
   unconditional finish needs an explicit P/poly lower bound (★) inheriting the
   natural-proofs and relativization barriers. The density observation refuting
   Lemma 4 (Range density 2^{n−m} makes the naive distinguisher framing vacuous)
   is a clean reusable insight; the construction does plausibly remove the
   Bonet–Pitassi–Raz cryptographic escape hatch by pinning hardness to one
   explicit f. *Caveat (preserved from adjudication):* the author's claim that
   "largeness fails because the hard set is not dense" misidentifies what the
   Razborov–Rudich largeness condition measures — largeness is over the space of
   functions f, not over range density.

### Common pattern across all four

Three of the four were killed by **internal circularity / vacuity**, not by a
classical barrier (the barrier lens returned "none" as the proximate cause for
#1, and the live obstructions for #2–#4 sit *behind* the point where each proof
already failed). The recurring failure mode is **reducing the target to an object
that is provably equivalent to the target** (the §6 equivalence in #1; Conjecture
MO in #3; the open Razborov conjecture in #4) or to an object the proof's own
machinery forces in the wrong direction (Lipschitz ⇒ low Fourier mass in #2).

---

## Single most promising next concrete step

**Pursue the combinatorial (non-algebraic) Circuit-SAT normal form for a
superclass of ACC⁰ — specifically ACC⁰ ∘ THR (Chen–Lyu–Williams).** This is the
one direction the swarm surfaced that is **live, non-barriered, and already
showing real (non-circular) progress**, correctly named in §7 of attempt #1 as
where genuine forward motion exists. It sidesteps the easy-witness vacuity (#1),
needs no spectral-mass invariant (#2), requires no orbit-closure lower-bound
method (#3), and avoids the witnessing-to-base-function gap (#4). The concrete
move: push the algorithmic method on ACC⁰ ∘ THR via its combinatorial Circuit-SAT
normal form rather than attempting any further scale-down of the easy-witness
lever to NP.

---

## Bottom line

**No attempt survived. P vs NP remains OPEN.** This round delivered four
externally-validated dead-ends and a handful of reusable lemmas and frontier
maps. That is honest negative knowledge — it is not a proof, and nothing here
should be represented as one.
