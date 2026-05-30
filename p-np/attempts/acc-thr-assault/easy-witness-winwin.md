# Easy-Witness + Win-Win Assault on NEXP ⊄ ACC⁰ ∘ THR

> **Status:** Sharpened dead-end. Does NOT close. Read against
> `attempts/VERDICT.md`, `attempts/williams-algorithmic-method-scaling.md`, and
> `SYNTHESIS.md`. This attempt deliberately *avoids* the NEXP→NP scale-descent
> that killed the parent (`williams-algorithmic-method-scaling`) — it keeps the
> hard class at NEXP and instead pushes *sideways* to the richer circuit class
> `ACC⁰ ∘ THR`, which is exactly the "single most promising next concrete step"
> flagged in VERDICT.md. The conclusion below is that the natural easy-witness +
> win-win route to *fat* (arbitrary-weight) `ACC⁰ ∘ THR` re-hits
> conservation-of-difficulty at a *new, precisely-located* junction (the
> weight-tameness of witnesses), and I localize the surviving non-trapped edge
> (a geometric/combinatorial fat-THR counting algorithm).

---

## 1. Goal & precise claim

**Target class.** `C = ACC⁰ ∘ THR`: polynomial-size circuits with `O(1)` depth,
unbounded fan-in `AND/OR/NOT/MOD_m` gates (for a fixed constant modulus `m`),
sitting on top of a *single bottom layer* of linear-threshold (`THR`) gates with
arbitrary integer weights. Equivalently: `ACC⁰` whose inputs are the outputs of
`poly`-many threshold gates of the input variables. This is strictly more
powerful than `ACC⁰` and contains `ACC⁰ ∘ MAJ` (majority bottom layer).

**Claim we attempt.**

> **(Main Claim, ASPIRATIONAL).** `NEXP ⊄ ACC⁰ ∘ THR` of polynomial size.
> More ambitiously, with the Murray–Williams scaling, `NQP = NTIME[n^{polylog n}]
> ⊄ ACC⁰ ∘ THR` of polynomial size, and `NP ⊄ ACC⁰ ∘ THR` would follow from a
> sufficiently strong (subexponential) SAT algorithm.

**What is actually known (the baseline we must beat).**

- [ESTABLISHED: Williams 2011/2014, "Nonuniform ACC Circuit Lower Bounds"]
  `NEXP ⊄ ACC⁰`. Method: a `#SAT` (actually `Circuit-SAT`) algorithm for `ACC⁰`
  circuits running in time `2^{n - n^{ε}}` (better than `2^n` by a
  super-polynomial factor in the savings), combined with the
  easy-witness/connection lemma to contradict the nondeterministic time
  hierarchy.
- [ESTABLISHED: Williams 2014, "New algorithms and lower bounds for circuits
  with linear threshold gates" / and follow-ups] There is a `#SAT` algorithm and
  a lower bound for `ACC⁰ ∘ THR` **with a sub-linear or restricted bottom
  threshold layer** — specifically `ACC⁰` circuits with `n^{o(1)}`-many (or a
  thin layer of) `THR` gates. The lower bound `NEXP ⊄ ACC⁰ ∘ THR` is known when
  the number of threshold gates is bounded (`2^{(log n)^{o(1)}}` symmetric/threshold
  gates near the bottom in some formulations).
- [ESTABLISHED: Murray–Williams 2018, "Circuit lower bounds for nondeterministic
  quasi-polytime"] Scaled the `ACC⁰` result down to `NQP ⊄ ACC⁰` and
  `NTIME[n^{polylog}]` not in `ACC⁰ ∘ (thin THR)`. They also gave `(ACC⁰ ∘ THR)`
  results with a bounded number of threshold gates.
- [ESTABLISHED: Chen–Lyu–Williams 2020, "Almost-everywhere circuit lower bounds
  from non-trivial derandomization" and Chen–Lyu 2021] Average-case and
  almost-everywhere strengthenings; the `#SAT`/`GAP-SAT` machinery via
  probabilistic polynomials and fast rectangular matrix multiplication.

**The open edge (what would be genuinely new).** Removing the restriction on the
threshold layer: an *unrestricted* polynomial-size bottom layer of `THR` gates
with *arbitrary* weights, i.e. full `ACC⁰ ∘ THR`. The bottleneck is purely
algorithmic: we lack a `Circuit-SAT` (or `#SAT`/`GAP-SAT`) algorithm beating
brute force on `ACC⁰ ∘ THR` with a *fat* (poly-wide, arbitrary-weight) threshold
bottom layer.

This document's job is **not** to claim that algorithm exists. It is to (a)
isolate *exactly* the lemma that, if proved, closes the gap; (b) propose a
*specific, non-vacuous* route to it via probabilistic polynomials + the
easy-witness win-win; and (c) confront the conservation-of-difficulty trap that
(per the brief) killed the parent attempt.

---

## 2. The core NEW idea vs prior failed attempts

### 2.1 The conservation-of-difficulty trap (what I must avoid)

The parent attempt (`williams-algorithmic-method-scaling.md`) died — per
VERDICT.md, BROKEN 3/3 — on two coupled failures: (a) the easy-witness lever is
**vacuous at the NP scale** (poly-length witnesses ⇒ `O(log n)`-input circuits ⇒
lookup tables carrying zero information), and (b) the recursive "rung tower" glue
product blows up to `2^{Θ(N²)}`, with the only repair (polynomial-per-rung glue)
proven *equivalent in strength* to the target — a textbook
conservation-of-difficulty circularity. The general principle the algorithmic
method is a **reduction**, not a free lunch:

> To prove `C` lower bounds you need a non-trivial `Circuit-SAT` algorithm for
> `C`. But designing that algorithm is *itself* a lower-bound-flavored task: it
> requires structural control of `C` exactly where `C` is hard to control. When
> you "scale down" the hard class (NEXP → NQP → NP) you must correspondingly
> *strengthen* the SAT algorithm (savings `n^ε` → `n^{ω(1)}` → genuinely
> exponential `2^{δn}`). The difficulty you removed from the lower-bound side
> reappears, conserved, on the algorithm side. A "scaling" attempt that just
> turns the crank produces a SAT-algorithm requirement that is *equivalent in
> strength* to the lower bound it was supposed to prove — circular, or at least
> no-progress.

The same trap has a *witness-compression* avatar, which is the one the
easy-witness lemma is exposed to:

> **Vacuous-witness trap.** The easy-witness lemma says: if `NEXP ⊆ C` then
> every `NEXP` verifier accepting on some witness accepts on a witness with a
> *small `C`-circuit*. If `C` is so expressive that the witness-circuit
> compression is *automatic* (every string of the relevant kind already has a
> small `C`-description, or the compression buys you nothing the SAT algorithm
> can exploit), the win-win collapses: both branches are "easy" and you derive
> no contradiction with the time hierarchy. As `C` grows from `ACC⁰` toward
> `ACC⁰ ∘ THR`, the witnesses get *easier to compress*, which makes the
> easy-witness branch *weaker*, not stronger.

**Note on dodging the parent's vacuity failure (a).** By keeping the hard class
at **NEXP** (witnesses of length `2^n`, indexed by `n` bits), the easy-witness
lever retains its full exponential compression ratio — it is *not* vacuous here.
The parent's failure (a) was specific to the NP scale-descent; this attempt does
not descend, so (a) does not apply. The live danger is therefore *only*
conservation-of-difficulty in its witness-compression avatar (§2.3), which is
where I concentrate the audit.

### 2.2 The new idea: **decouple the win-win across two different complexity measures so the difficulty is not conserved but *traded across a gap that the matrix-multiplication exponent makes profitable***

The standard win-win is: "either NEXP has easy witnesses (use the SAT algorithm
on the compressed witness to speed up the verifier and beat NTIME hierarchy), or
it doesn't (then we already have a lower bound for a related class)." Both horns
reference the *same* class `C`. Conservation of difficulty is baked in because
both the witness-compression strength and the SAT-algorithm strength are
properties of the *same* `C`.

**Proposed decoupling.** Use *two distinct sub-classes*:

- `C_w = ACC⁰ ∘ THR` — the witness class (what we want the lower bound against).
- `C_a = ACC⁰ ∘ THR ∘ (probabilistic low-degree polynomial)` — the *algorithm's
  effective normal form*, a strictly richer class for which we only need an
  *approximate / GAP* satisfiability algorithm, not exact `Circuit-SAT`.

The leverage: the Chen–Lyu–Williams machinery shows that for the SAT *algorithm*
you do **not** need to decide `Circuit-SAT` for `C_w` exactly. You need to solve
`GAP-UNSAT` (distinguish "≥ ε fraction satisfying" from "unsatisfiable"), and a
*probabilistic polynomial* representation of `C_w` of degree `d = polylog(n)`
suffices — because `GAP` errors are absorbed by the `ε` gap. The win-win can be
re-balanced so that:

> The **witness side** only needs `C_w`-witnesses (compression is genuine
> because `ACC⁰ ∘ THR` is *not* trivially universal for the witness strings — see
> §2.3), while the **algorithm side** runs on `C_a`, and the cost of `C_a`'s SAT
> is governed by the **rectangular matrix multiplication exponent** `ω(·)`, not
> by the lower-bound difficulty of `C_w`.

The point of escape from conservation: the algorithm's cost is `2^{n-s}` where
the savings `s` is dictated by `(i)` the probabilistic-polynomial degree `d` of
`THR` and `ACC⁰`, and `(ii)` how the resulting `2^{n} × n^d` design matrix can be
multiplied/evaluated via fast rectangular MM. **Neither (i) nor (ii) is the same
quantity as the `C_w` lower-bound hardness.** The difficulty is *exported into
the value of `ω`* — a fixed, class-independent algebraic constant — rather than
being conserved against the lower bound.

### 2.3 Why witness compression is NOT vacuous for `ACC⁰ ∘ THR` (the crux)

The vacuous-witness trap says: if `ACC⁰ ∘ THR` can compute *anything* relevant,
the easy-witness branch is empty. The defense:

- [ESTABLISHED] `THR` (one threshold gate) is *not* universal; `ACC⁰` is not
  universal; their composition `ACC⁰ ∘ THR` of *polynomial size* computes a
  class strictly inside `TC⁰ ⊆ NC¹`, and (conditionally / by counting) does not
  contain all of `P/poly`. So a *random* string of length `N = 2^n` does **not**
  have a poly-size `ACC⁰ ∘ THR` circuit. Compression is therefore *non-trivial*:
  the easy-witness hypothesis `NEXP ⊆ ACC⁰ ∘ THR` is a genuine restriction, and
  its negation is a genuine lower bound.
- [NOVEL: unverified — this is the load-bearing structural claim] The *witness
  strings produced by an `NEXP` verifier under the easy-witness hypothesis* are
  compressible to `ACC⁰ ∘ THR` circuits whose **threshold bottom layer is
  unavoidable but tame**: specifically, the witness circuit's `THR` gates arise
  from the verifier's *counting/arithmetic substructure*, and these have
  *bounded weight magnitude* `2^{polylog}` (not arbitrary exponential weights).
  If true, this means we only ever need a SAT algorithm for the **bounded-weight
  sub-class** `ACC⁰ ∘ THR[w ≤ 2^{polylog}]`, which by weight-reduction
  [ESTABLISHED: Goldmann–Håstad–Razborov, Hofmeister; small-weight THR ⊆ MAJ of
  poly fan-in] collapses into `ACC⁰ ∘ MAJ` — a class the CLW probabilistic-
  polynomial method *already nearly handles*.

This is the only honest way I see to dodge both traps at once: **make the
algorithm's burden be the bounded-weight sub-class, justified by a structural
claim about what easy NEXP-witnesses actually look like.** It converts an open
"fat-THR SAT algorithm" (likely as hard as the lower bound) into a known-ish
"bounded-weight THR SAT algorithm," with the difficulty paid by proving the
weight-tameness of witnesses, NOT by conserving lower-bound hardness.

---

## 3. Setup & definitions

- `n` = input length to circuits; `N = 2^n` = truth-table length.
- `ACC⁰` = `AC⁰[m]` for some fixed composite `m`: depth `O(1)`,
  `AND/OR/NOT/MOD_m`, unbounded fan-in, poly size.
- `THR` = linear threshold function `[ Σ_i w_i x_i ≥ θ ]`, integer weights.
- `MAJ` = `THR` with all `|w_i| = 1` (or `poly`-bounded). Note `THR[poly-weight]
  = MAJ ∘ ... ` up to poly blowup [ESTABLISHED: small-weight reduction].
- `ACC⁰ ∘ THR` = `ACC⁰` circuit with a bottom layer of `THR` gates.
- **Probabilistic polynomial for `f`** of degree `d`, error `ε`: a distribution
  `P` over degree-`d` polynomials (over `ℤ` or `F_p`) with `Pr_P[P(x) = f(x)] ≥
  1-ε` for every fixed `x`.
- **`GAP-UNSAT(C, ε)`**: given circuit `C` from class, output `UNSAT` if `C` has
  no satisfying assignment, output `SAT` if `C` accepts ≥ `ε·2^n` inputs;
  arbitrary otherwise.
- **Easy-witness lemma** [ESTABLISHED: Impagliazzo–Kabanets–Wigderson 2002;
  Williams form]: If `NEXP ⊆ C` (`C` = poly-size class with the right closure),
  then for every `L ∈ NEXP` with verifier `V`, accepted inputs have witnesses
  whose truth tables are computed by poly-size `C`-circuits.
- **Williams' connection** [ESTABLISHED: Williams 2011]: a `Circuit-SAT`
  algorithm for `C` with savings beating brute force, plus easy witnesses,
  contradicts `NTIME[2^n] ⊄ NTIME[2^n / n^{ω(1)}]` (nondeterministic time
  hierarchy). Hence no such `C` can contain `NEXP`.

---

## 4. The attempt, step by step

**Goal restated:** produce a `GAP-UNSAT` algorithm for `ACC⁰ ∘ THR`-circuits on
`n` inputs and `2^{polylog}`-bounded weights, running in time
`2^{n}/n^{ω(1)}`, then run the Williams machinery.

**Step 1 [ESTABLISHED: CLW / Beigel–Tarui / Allender–Hertrampf].**
Every `ACC⁰` circuit of size `s`, depth `d` on `n` inputs is equivalent to a
`SYM ∘ AND` circuit (a symmetric function of `2^{(log s)^{O(d)}}` `AND`s of fan-in
`(log s)^{O(d)}`). This is the Yao–Beigel–Tarui normal form. Size of the
`SYM ∘ AND`: `2^{polylog(s)}`. For `s = poly(n)`, the `SYM` gate reads
`2^{polylog n}` bits.

**Step 2 [ESTABLISHED: probabilistic polynomials for `THR`/`MAJ`].**
A single `MAJ` (or poly-weight `THR`) on `k` inputs has a probabilistic
polynomial over `F_p` of degree `O(√k · log(1/ε))` (better, `polylog` for the
`GAP` regime via the Razborov–Smolensky-style + Minsky–Papert / Srinivasan
approximate-degree bounds). For the **bounded-weight** case relevant here (per
§2.3), `THR` reduces to `MAJ` of poly fan-in, so the same degree applies.
- [WEAKNESS FLAG]: the *exact* degree needed to keep the final running time
  below `2^n / n^{ω(1)}` is delicate; for *arbitrary-weight* `THR` the
  approximate degree can be `Ω(√n)` which is **too large** — this is precisely
  why the fat-THR case is open. The whole attempt is contingent on §2.3
  restricting us to the bounded-weight regime where degree stays `polylog`/`√n`
  *and* combines acceptably with Step 4.

**Step 3 [NOVEL: unverified — composition of the two normal forms].**
Compose: an `ACC⁰ ∘ THR[bounded-weight]` circuit becomes
`SYM ∘ AND ∘ MAJ`, then replace each bottom `MAJ` by its probabilistic
polynomial, and the `AND`s and `SYM` by their (exact or probabilistic)
polynomial representations. Net: a *probabilistic polynomial* `P` of total degree
`D = (polylog n) · (degree of MAJ poly)` representing the whole circuit, with
error `ε/2` say.
- The danger: degrees *multiply* across the `SYM ∘ AND ∘ MAJ` layers. `SYM` over
  `2^{polylog}` bits has degree `2^{polylog}` as a polynomial — this is the
  killer. CLW handle this by representing `SYM` not as a single polynomial but
  via the **evaluation-at-all-points / fast-MM** trick rather than naive
  composition.
- [NOVEL: unverified] The claim I need: the `SYM` outer layer can be handled by
  *table lookup over the value of the inner low-degree polynomial* (the inner
  poly takes few distinct values), so the *effective* object to evaluate over all
  `2^n` inputs is a degree-`D` polynomial with `D = polylog n` (from `AND ∘ MAJ`
  only), and the `SYM` is applied post-hoc per evaluated point. This is the
  CLW design-matrix structure.

**Step 4 [ESTABLISHED: fast rectangular matrix multiplication evaluation].**
To `GAP`-count satisfying assignments, evaluate `P` on all `2^n` inputs. Write
inputs as `(y, z)` with `|y| = |z| = n/2`. The matrix `M[y,z] = P(y,z)` is the
product of an `2^{n/2} × n^{D}` matrix (monomials in `y`) and an
`n^{D} × 2^{n/2}` matrix (monomials in `z`). Rectangular MM
[ESTABLISHED: Coppersmith; Le Gall–Urrutia] multiplies these in time
`2^{n/2 · (2 + o(1))} = 2^{n + o(n)}` if `n^D ≤ 2^{n/2 · α}` for the right `α`
(the "`α` = dual MM exponent" regime where the inner dimension is cheap).
Crucially, when `D = polylog n`, `n^D = 2^{polylog n} = 2^{o(n)} ≪ 2^{n/2}`, so
the inner dimension is *negligible* and the product costs `2^{n + o(n)}`.
- [WEAKNESS FLAG]: `2^{n+o(n)}` is **not** `2^n / n^{ω(1)}`. The savings come
  from the *finer* accounting (CLW get `2^{n}/n^{ω(1)}` because the inner
  dimension `n^D` lets you shave a super-poly factor via the
  Coppersmith balanced-MM small-dimension regime, where multiplying
  `N × N^{0.17}` by `N^{0.17} × N` costs `N^{2+o(1)}` and the `+o(1)` actually
  hides the savings). Getting an honest `n^{ω(1)}` savings (not just constant or
  `2^{o(n)}`) is the most technically fragile point and depends on `D` being
  *small enough* — `D = o(log n / log log n)` or similar. With `MAJ` polynomials
  of degree even `polylog`, this is *tight to violated*.

**Step 5 [ESTABLISHED, conditional on Steps 2–4: the win-win].**
Given a `GAP-UNSAT` algorithm for `ACC⁰ ∘ THR[bounded weight]` with savings
`n^{ω(1)}`:
1. Suppose for contradiction `NEXP ⊆ ACC⁰ ∘ THR` (poly size).
2. Easy-witness lemma ⇒ `NEXP`-witnesses have poly-size `ACC⁰ ∘ THR` circuits.
3. **[NOVEL: unverified — the bounded-weight witness claim of §2.3]** These
   witness circuits can be taken bounded-weight ⇒ in the class our algorithm
   handles.
4. Plug the witness circuit into the verifier; the verifier itself is in `NEXP ⊆
   ACC⁰ ∘ THR`; the composed acceptance condition is an `ACC⁰ ∘ THR` circuit
   `GAP`-SAT instance of size `2^{n+o(n)}` on `n` "guess the witness circuit"
   bits. Solve it with the fast algorithm in nondeterministic time
   `2^n / n^{ω(1)}`.
5. This places a `NTIME[2^n]`-complete problem in `NTIME[2^n / n^{ω(1)}]`,
   contradicting the nondeterministic time hierarchy theorem
   [ESTABLISHED: Žák / Cook / Seiferas–Fischer–Meyer].
6. Contradiction ⇒ `NEXP ⊄ ACC⁰ ∘ THR`. ∎ (modulo the [NOVEL] steps)

**Step 6 [ESTABLISHED: Murray–Williams scaling, IF the algorithm has enough
savings].** Replace `2^n` by `2^{polylog}` throughout to get
`NQP ⊄ ACC⁰ ∘ THR`; this needs the SAT algorithm to retain savings at the
`2^{polylog}`-input scale, which is exactly where conservation-of-difficulty
bites hardest (Step 4's fragile `n^{ω(1)}` must survive scaling). **I do not
claim this scaling goes through; it is where the parent attempt died and I have
no new defense for it beyond the bounded-weight reduction.**

---

## 5. Barrier audit

For a proof to be valid it must evade all three barriers. The algorithmic method
is famous for doing so; I check that *this variant* still does.

**Non-relativizing.** [ESTABLISHED, inherited] The whole framework is
non-relativizing: it uses the `SYM ∘ AND` normal form (Step 1) and fast matrix
multiplication (Step 4), both of which fail relative to generic oracles.
Williams' original `ACC⁰` result is non-relativizing for exactly this reason. My
variant adds *more* non-relativizing structure (probabilistic polynomials for
`THR`), so it is at least as non-relativizing. ✔

**Non-natural (Razborov–Rudich).** [ESTABLISHED, inherited] The argument does
not build a "natural property" (large, constructive, useful) distinguishing
`ACC⁰ ∘ THR` from random functions. It is a *win-win* contradiction argument
keyed to a specific `NEXP`-complete language; it never tests a random function
for an easiness property. Caveat: the *bounded-weight witness claim* (§2.3) is a
structural property of witnesses — I must ensure it is not secretly a natural
property usable to break `THR`-based PRGs/OWFs. [NOVEL: unverified] My belief is
it is not, because it is a property of *NEXP-derived* objects, not of random
functions, and is invoked nonconstructively inside the contradiction. **But I
have not proven it dodges naturalness — flag.** ⚠/✔

**Non-algebrizing (Aaronson–Wigderson).** [ESTABLISHED, partly inherited;
NOVEL emphasis] This is the referee-flagged frontier. The *algebrizing* barrier
kills techniques that go through low-degree polynomial *extensions* of oracles in
a way that survives algebraic oracles. The brief specifically demands the
**combinatorial (non-algebraic) Circuit-SAT normal form**. My Steps 3–4 use
probabilistic polynomials and fast MM — these are *algebraic*, which is exactly
the worry. **Defense:** Aaronson–Wigderson showed Williams' `ACC⁰` proof is
*non-algebrizing* because the matrix-multiplication and `SYM ∘ AND` steps use the
*combinatorial* structure of the specific circuit, not a black-box low-degree
extension of an oracle; the polynomials are applied to an *explicit* circuit, not
to an oracle's algebraic extension. My variant preserves this: the probabilistic
polynomial is a representation of a *given* circuit, evaluated combinatorially via
MM. So it should remain non-algebrizing. ⚠ — but the bottom-`THR` probabilistic
polynomial is the *newest* algebraic ingredient and I have not done the careful
A–W oracle-extension check on it. **Flag.** ✔/⚠

**Net barrier verdict:** The skeleton inherits all three evasions from Williams'
proven `ACC⁰` result. The *new* ingredients (THR probabilistic polynomial,
bounded-weight witness claim) need their *own* barrier checks, which I have only
argued heuristically.

---

## 6. Ruthless self-identification of the weakest step

**THE WEAKEST STEP IS §2.3 / Step 5.3: the "bounded-weight witness" claim.**

The entire escape from conservation-of-difficulty rests on the assertion that
easy `NEXP`-witnesses under the hypothesis `NEXP ⊆ ACC⁰ ∘ THR` can be taken to
have *bounded-weight* threshold bottom gates, hence reducing to the tractable
`ACC⁰ ∘ MAJ`-ish class. **I have no proof of this.** In fact there is strong
reason to doubt it:

- The easy-witness lemma gives you witnesses with small `C`-circuits *in the same
  class `C`* you assumed. If `C = ACC⁰ ∘ THR` with *arbitrary* weights, the
  guaranteed witness circuits have *arbitrary* weights too. There is no free
  weight reduction: weight reduction (`THR[exp weight] → MAJ`) costs a
  *quasi-polynomial blowup in the number of gates* [ESTABLISHED: the
  Goldmann–Håstad–Razborov reduction is for a *single* threshold and still
  increases fan-in], and a poly-size circuit can have poly-many fat-THR gates,
  whose simultaneous reduction may blow size past poly. So the reduction to
  bounded-weight is **likely false as stated**, or at best costs a size blowup
  that pushes the SAT instance out of the regime where Step 4 gives `n^{ω(1)}`
  savings.

This is **conservation of difficulty reasserting itself**, exactly as the brief
warned. The difficulty I tried to "export to `ω`" sneaks back in through the
weight-reduction blowup: the only way to get the algorithm is to assume the
witnesses are weight-tame, but the hypothesis only gives weight-fat witnesses,
and reducing them is as hard as handling fat-THR directly — which is the open
problem. **My decoupling (§2.2) is therefore probably illusory at this step.**

**Second-weakest: Step 4's savings.** Even granting bounded weight, getting an
honest `n^{ω(1)}` (super-polynomial) savings rather than `2^{o(n)}` or constant
from rectangular MM when `THR`/`MAJ` polynomials push the degree `D` up is
genuinely tight. CLW achieve it for `ACC⁰ ∘ THR` with a *thin* (`n^{o(1)}`)
threshold layer precisely because thinness keeps `D` low. A *fat* (poly-wide)
bottom layer multiplies the degree and likely breaks the savings. The known
literature result is exactly "thin layer," and the fatness is the open edge for a
reason I have now re-derived rather than overcome.

---

## 7. What must be true for it to go through; honest self-grade

**For the Main Claim to follow, ALL of the following must hold:**

1. **(W) Weight-tame witnesses.** Easy `NEXP`-witnesses for `NEXP ⊆ ACC⁰ ∘ THR`
   can be represented by poly-size `ACC⁰ ∘ THR` circuits with
   `2^{polylog}`-bounded weights (or, weaker but sufficient, with a bottom
   `THR`-layer whose probabilistic-polynomial degree is `polylog`). **Status:
   likely FALSE / unproven; this is the crux.**
2. **(P) Tame degree composition.** The `SYM ∘ AND ∘ MAJ` normal form admits a
   probabilistic polynomial whose *effective* degree for the MM evaluation is
   `D = o(log n / log log n)`, even with a poly-wide bottom layer. **Status:
   known only for thin bottom layers; unproven (likely false) for fat.**
3. **(M) MM savings.** Rectangular MM yields `2^n / n^{ω(1)}` for the resulting
   design matrix. **Status: ESTABLISHED conditional on (P).**
4. **(B) Barrier integrity of new ingredients.** The THR probabilistic
   polynomial keeps the argument non-relativizing/non-natural/non-algebrizing.
   **Status: heuristically yes, not verified.**
5. **(S) Scaling.** For NQP/NP, savings survive at the `2^{polylog}` scale.
   **Status: unproven; the parent dead-end.**

**Honest self-grade: `dead-end` (sharpened).**

I did not find a way around the conservation-of-difficulty trap. The proposed
escape — decouple the witness class from a richer algorithm class so the
difficulty is paid in the matrix-multiplication exponent `ω` rather than in
lower-bound hardness (§2.2) — *fails at the single most important junction*
(§2.3 / Step 5.3): the easy-witness lemma hands you witnesses *in the fat-THR
class you assumed*, and reducing their weights is itself the open hard problem.
The difficulty is conserved, not exported. This is the same wall, re-met from a
new angle, and I can now state *precisely where and why* the angle fails:

> **The decoupling requires weight-tame witnesses, but the easy-witness lemma is
> class-faithful: it cannot give you witnesses in a *weaker* class than the one
> you hypothesized. So you can never trade fat-THR-witnesses for
> bounded-weight-THR-witnesses for free, and the paid version costs exactly the
> fat-THR-SAT difficulty you were trying to avoid.**

**Why this is nonetheless a useful (successful) dead-end:**

- It localizes the *entire* gap to one crisp lemma: **"Do easy NEXP-witnesses
  for `ACC⁰ ∘ THR` admit weight-tame representatives?"** A *negative* answer
  (provable via a class-faithfulness argument for the easy-witness lemma) would
  be a clean impossibility result explaining why the thin-layer barrier is real.
  A *positive* answer would essentially close the problem. Either is publishable
  clarity.
- It identifies a concrete sub-target that is *not* obviously trapped: prove a
  fat-THR `GAP-UNSAT` algorithm directly, accepting the degree-`√n` `THR`
  polynomial, and find a *different* MM regime (e.g. using the *structure of
  threshold polytopes* / the fact that a single fat-`THR` is a halfspace, so the
  satisfying set is a 0/1-polytope slice amenable to *geometric* counting rather
  than algebraic counting). This **geometric counting** route sidesteps the
  approximate-degree blowup entirely and is, to my knowledge, not the standard
  CLW route — it is the most promising *next* direction and does not share this
  attempt's fatal §2.3 dependence.

**One concrete forward pointer (for the next attempt, not claimed here):**
Replace Step 2's *algebraic* `THR` approximation with a *combinatorial/geometric*
one: a fat-`THR` gate `[w·x ≥ θ]` defines a halfspace; counting satisfying `x`
for an `ACC⁰` function of `poly`-many halfspaces is a *parametric / arrangement
counting* problem. If the `ACC⁰` top can be put in `SYM ∘ AND` form (Step 1) and
the bottom is `m` halfspaces, the satisfying region is a cell-complex of the
hyperplane arrangement with `2^{O(m log m)}`-ish cells; `GAP`-counting over cells
might beat brute force via *epsilon-net / cutting* methods independent of weight
magnitude. This would dodge §2.3 entirely (no weight-tameness needed) and keeps
the algebrizing barrier clear (it is purely combinatorial-geometric). I flag it
as **[NOVEL: unverified, untried]** — the genuine next lead, born from this
dead-end.

## Adjudication (2026-05-30)

**Ruling: BROKEN.**

**Exact death point.** §2.3 / Step 5.3, requirement (W) — the "weight-tame
witness" claim — with the deeper root in the §2.2 decoupling. The easy-witness
lemma (IKW/Williams) is class-faithful: hypothesizing NEXP ⊆ ACC⁰∘THR (fat)
yields witness circuits in exactly that class, with arbitrary (exponential)
weights. There is no free reduction to bounded weight; the only available
repair (Goldmann–Håstad–Razborov weight reduction) is a single-gate result that
(i) changes the class (THR → MAJ∘MAJ) and (ii) applied to the poly-many fat-THR
gates a poly-size circuit may contain, blows size super-polynomially, ejecting
the GAP-SAT instance from the n^{ω(1)}-savings regime Step 4 requires. The
difficulty the author tried to "export into ω" is conserved: it re-enters as the
cost of weight reduction, which is the open fat-THR-SAT problem itself. Two
independent further deaths confirm BROKEN even if (W) is granted: (a) the
composed win-win instance (Step 5.4) inherits fat-THR from the *verifier*
(itself in NEXP ⊆ ACC⁰∘THR), so the algorithm must handle fat-THR regardless of
witness weight-tameness — the decoupling is illusory; (b) the quantitative wall
(D)/(P): fat-THR approximate degree is Θ(√n) (Paturi/Minsky-Papert), forcing
inner dimension n^{√n} = 2^{√n log n}, far outside the o(log²n) cheap-MM window
— savings are negative, not n^{ω(1)}. Weight-reduction does not reduce layer
width/degree, so (D) survives even granting (W). The author's own §7 ledger
nominates (W) as load-bearing and concedes (P),(D),(S) as open/false.

**Barrier audit result: inconclusive (academic).** The proof dies on a plain
unproven, likely-false load-bearing lemma (a correctness/circularity gap) before
any barrier bites — there is no completed construction to smuggle a
barrier-violating technique into. Adjudged on the machinery as if gaps were
filled: relativization is cleanly evaded (syntactic SYM∘AND normal form + MM on
explicit circuits, no oracle-relative analogue — confirmed). Naturalization is a
live but moot seam: the bounded-weight predicate is constructive and of unchecked
R-R largeness, but it is invoked nonconstructively inside the contradiction and,
per §6, the step carrying the risk probably does not exist (the lemma is false).
Algebrization is the most exposed: Steps 2-4 are algebraic (THR probabilistic
polynomial + rectangular MM); the defense (representation of a GIVEN explicit
circuit, evaluated combinatorially) is the correct shape and plausible, but the
A-W oracle-extension check on the THR probabilistic polynomial is admittedly not
done. None of the barriers can be upgraded to a clean "no" without work the
author did not do.

**Vote tally: 5/5 red-team BROKEN (fatal) — barrier, rigor, literature,
quantitative, circularity. Barrier audit: inconclusive. Referee: BROKEN.**

**Brokenness score: 9 / 10.** The load-bearing sub-lemma (W) is provably
equivalent in strength to the open fat-THR-SAT problem it claims to bypass —
textbook conservation-of-difficulty circularity — and the independent
quantitative wall (D) kills the algorithm even if (W) is granted. Two
independent fatal mechanisms, both conceded by the author. Not a 10 only because
the document is honestly self-graded, makes no false closing claim, and the
failure junction is located with genuine precision rather than being vacuous
hand-waving.

**Salvageable residue.** (1) The sideways-vs-downward framing is sound and worth
keeping: staying at the NEXP scale to preserve the easy-witness exponential
compression (avoiding the parent's NP-scale vacuity) is the right instinct. (2)
The precise localization of the conservation-of-difficulty junction — that
fat-THR easy-witnesses cannot be weight-tamed for free, and that the verifier
independently re-injects fat-THR into the composed instance — is a genuine,
reusable diagnostic for why the fat-THR frontier resists the Williams template.
(3) The §8 forward pointer (replace the algebraic THR probabilistic polynomial
with a combinatorial halfspace-arrangement / cell-counting method) is the
correct barrier-safe direction and is the only fragment with forward value — but
the author correctly notes the Θ(√n) degree wall (D) survives that substitution
unless the halfspace count is subexponentially structured, which is not known.
Any repair must first defeat (D) for a genuinely fat threshold layer; until
then the strategy is structurally blocked, not merely incomplete.
