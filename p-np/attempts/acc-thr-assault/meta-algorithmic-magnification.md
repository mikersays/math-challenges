# Meta-Algorithmic-Magnification: an assault at the ACC0 ∘ THR boundary

**Frontier:** acc-thr-assault
**Strategy tag:** `meta-algorithmic-magnification`
**Author:** automated research attempt (circuit-complexity / algorithmic-method specialist)
**Date:** 2026-05-30
**Status:** Sharpened, honestly-bounded dead-end with one genuinely new technical
lemma (a sparsity-controlled THR-composition for the CLW probabilistic-polynomial
SAT engine) and one explicitly-identified missing bridge. Does **NOT** close.

> CONTEXT READ. This attempt was written after reading
> `attempts/VERDICT.md`, `attempts/williams-algorithmic-method-scaling.md`, and
> `SYNTHESIS.md`. It is deliberately built to (i) be the "single most promising
> next concrete step" the VERDICT named — *push the algorithmic method on
> `ACC0 ∘ THR` via the combinatorial Chen–Lyu–Williams Circuit-SAT normal form*
> (VERDICT §"Single most promising next concrete step", lines 186–195) — and
> (ii) avoid the three documented killers: the conservation-of-difficulty trap
> that killed `williams-algorithmic-method-scaling` (VERDICT §1), the CHOPRS
> locality barrier that killed `meta-complexity-magnification` (VERDICT §2), and
> the vacuity/easy-witness collapse at the NP scale (VERDICT §1, "vacuous at the
> NP scale").

---

## 1. Goal & precise claim

### 1.1 The dream theorem (explicitly NOT claimed)

> **(D)** `NP ⊄ (ACC0 ∘ THR)[poly]`, ideally pushing the hard object down to a
> magnifiable meta-problem so hardness magnification amplifies it to a strong
> separation.

I do **not** claim (D). I claim a conditional reduction plus a partial
*unconditional* result for a restricted sub-class, with the gap to (D) mapped.

### 1.2 What is actually claimed

Let `C = ACC0 ∘ THR`: a depth-`d` `AC0[m]` circuit (AND/OR/`MOD_m`, fixed
composite `m`) on top of a **single bottom layer of linear-threshold (LTF)
gates** that read the inputs. Write `C[s]` for size `s`. Define
`sparse-THR` = LTF gates of **total integer weight `Σ|w_i| ≤ W = n^{o(1)}`**
(equivalently, after standard weight-reduction caveats, fan-in `n^{o(1)}`; see
§3 and the weakness audit). Let `C_sp = ACC0 ∘ sparse-THR`.

**Claim A (unconditional, modulo the Step-3 bookkeeping I flag).**
> `NQP := NTIME[2^{polylog n}] ⊄ C_sp[n^{1+ε}]` for some `ε > 0`.

i.e. an explicit quasi-NP language has no slightly-superlinear `ACC0 ∘ sparse-THR`
circuits. This is the Murray–Williams "quasi-NP" instantiation of the algorithmic
method, ported to a THR-augmented class by building the SAT algorithm there.

**Claim B (conditional — the magnification layer).**
If a hardness-magnification (HM) theorem instantiates with hypothesis class
`C_sp` and a hard language `L ∈ NQP` at the granularity Claim A delivers, then a
slightly-superlinear bound against `C_sp` magnifies toward (D). The honest
status: the *generic* HM templates (CHJW "all sparse NP languages") plausibly
take `C_sp` since it is closed under projections — but matching the *specific*
hard language is open (§4 Part II, §6).

**Claim C (the genuine new technical contribution).**
A **sparsity-controlled THR-composition lemma**: the CLW probabilistic-polynomial
representation of the `ACC0` part composes with one **sparse**-THR layer while
keeping degree `polylog(n)` and sparsity `2^{polylog(n)}`, so the CLW
rectangular-matrix-multiplication `#SAT` engine runs through `C_sp`. The drop
from general THR to sparse-THR is the price, stated openly: general (large-weight)
THR provably breaks the composition (degree `Θ(√n)`, §4 Step 8).

**Deliverable:** Claim C ⇒ Claim A (a real weak lower bound for the sub-class),
plus a clean map of exactly what is missing to reach (D) via Claim B. A sharpened
lead, not a proof.

---

## 2. The core NEW idea vs prior failed attempts

### 2.1 The three documented traps and my evasion of each

**Trap 1 — Conservation of difficulty (killed `williams-algorithmic-method-scaling`).**
That attempt (VERDICT §1) relocated the difficulty into a "scale-free
easy-witness lemma" provably *equivalent in strength to the target*. The general
algorithmic-method objection: "you moved the hardness from the lower bound into
the assumed SAT algorithm." 
**My evasion:** in the part I claim unconditionally (Claim A), I do **not** assume
a SAT algorithm — I *build* it (§4 Steps 1–4) from the CLW probabilistic
polynomial (for the `ACC0` part) plus the Beigel–Reingold–Spielman /
Chen–Papakonstantinou threshold-to-polynomial conversion (for the sparse-THR
layer), and I show *exactly where the weight bound is consumed*. The
conservation tax is paid in full for `C_sp`; the unpaid balance (general THR) is
labeled, not hidden. This is structurally different from relocating the
difficulty into an equivalent-strength lemma: the sparse-THR SAT algorithm is a
concrete object, not a restatement of the goal.

**Trap 2 — CHOPRS locality barrier (killed `meta-complexity-magnification`).**
That attempt (VERDICT §2) died because its weak `N^{1+ε}` bound for `MKtP`/`MCSP`
had only a *random-restriction* proof, which is an `N^{o(1)}`-local certificate,
and **CHOPRS proves no local method can prove the magnifiable weak bound.**
Fourier/restriction proofs are "local"; locality is exactly what magnification
cannot consume.
**My evasion (the heart of the new idea):** supply the weak bound through the
**Circuit-SAT / counting channel**, not a Fourier/restriction channel. The
algorithmic-method lower bound is the contrapositive of a *global* `#SAT`
algorithm: it inspects the entire truth table in bulk via the
probabilistic-polynomial evaluation and one rectangular matrix product over all
`2^{n/2} × 2^{n/2}` half-assignment pairs. Its "certificate" is a `2^n`-sized
object processed globally, **not** an `n^{o(1)}`-coordinate probe. CHOPRS
locality is a property of the *proof-technique footprint*; the algorithmic
method's footprint is the whole instance.
`[NOVEL: unverified]` — that the algorithmic-method bound is "non-local in the
CHOPRS technical sense" must be checked against their formal locality definition;
the danger is that the easy-witness *anti-checker* hidden inside the method is
itself local. Audited in §6.

**Trap 3 — Vacuity / easy-witness collapse at the NP scale (killed `williams-...-scaling`).**
VERDICT §1: at the NP scale, witnesses are `poly(n)` bits, circuits have
`O(log n)` inputs, and "every witness is easy" is information-free.
**My evasion:** I do **not** attempt the NEXP→NP descent at all. Claim A targets
`NQP` (`NTIME[2^{polylog}]`), the Murray–Williams scale, where the
witness-vs-index ratio is `2^{polylog}/polylog` — still super-polynomial, so the
easy-witness lever retains content. I deliberately stop one rung above the
vacuity cliff. The descent to NP is outsourced to the *magnification* step
(Claim B), which is a different mechanism (amplifying a weak bound for a sparse
language) and does **not** route through easy-witness compression — so it does
not inherit the NP-scale vacuity. (Whether it inherits CHOPRS instead is Trap 2,
handled above.)

### 2.2 The new idea in one paragraph

**Chain two reductions never chained at this class, keeping the chain
combinatorial (non-algebrizing).** Step (i): a *global*, counting-based weak
lower bound for an explicit `NQP` language against `ACC0 ∘ sparse-THR`,
manufactured by the algorithmic method from a CLW-style `#SAT` algorithm that I
*construct* via a new sparsity-controlled THR-composition lemma. Step (ii): an HM
theorem that amplifies a slightly-superlinear bound. The novelty is the
THR-composition lemma (Claim C) — which makes the algorithmic method run for a
THR-augmented class for the first time in the *sparse* regime via the CLW
combinatorial engine rather than Williams' 2014 linear-size gadget — together
with the *global-SAT-channel* argument that the resulting weak bound is the right
*kind* (global, hence CHOPRS-immune) to feed Step (ii). The algebraic-degree
accounting at the THR boundary is where everything survives or dies.

---

## 3. Setup & definitions

- **LTF/THR gate:** `f(x)=sign(Σ w_i x_i − θ)`, integer `w_i, θ`.
  **sparse-THR:** total weight `W = Σ|w_i| = n^{o(1)}`. (Goldmann–Håstad–Razborov
  and Hofmeister weight-reduction relate weight and fan-in but not freely; I use
  the *weight* notion because the polynomial conversion in Step 2 is driven by
  `log W`.)
- **ACC0 = AC0[m]:** constant depth, poly size, unbounded fan-in
  AND/OR/`MOD_m`, fixed composite `m`.
- **C = ACC0 ∘ THR:** `ACC0` output part of depth `d`; bottom layer (touching
  inputs) one layer of THR gates. `C_sp = ACC0 ∘ sparse-THR`.
- **Probabilistic polynomial (PP) for ACC0.**
  `[ESTABLISHED: Beigel–Tarui 1994; Yao 1990; Allender–Gore; Williams 2011
  "Non-uniform ACC circuit lower bounds"; Chen–Lyu–Williams 2020.]` Every `ACC0`
  function on `n` bits has a `SYM ∘ AND` representation: a symmetric function of
  a sum of `2^{polylog n}` monomials, each of degree `polylog n`; probabilistic
  versions correlate with error `<1/3` (boostable). CLW make construction *and*
  batched evaluation fast enough for SAT.
- **Algorithmic method (Williams' connection).**
  `[ESTABLISHED: Williams 2010/2014 "Non-uniform ACC...", JACM; Murray–Williams
  2018 STOC "Circuit lower bounds for nondeterministic quasi-polytime".]` If
  `C`-`SAT` (or `#`/`GAP`-`SAT`) on size-`s` circuits runs in `2^n / n^{ω(1)}`,
  then `NQP ⊄ C[s']` for a slightly smaller `s'`. Bridge: a fast SAT algorithm
  + nondeterministic guess of a succinct `C`-circuit contradicts a
  nondeterministic time hierarchy.
- **Hardness magnification (HM).**
  `[ESTABLISHED: Oliveira–Santhanam 2018; Oliveira–Pich–Santhanam 2019
  "Hardness magnification near state-of-the-art lower bounds"; Chen–Jin–Williams
  2019/2020 "Hardness magnification for all sparse NP languages";
  McKay–Murray–Williams 2019.]` Shape: an `n^{1+ε}` (or `N·polylog`) bound for an
  explicit sparse/meta language `L` against `C` implies `NP ⊄ C[poly]` (or a
  strong separation). CHOPRS catch: known weak bounds for these `L` are local,
  hence cannot be the trigger.
- **CHOPRS locality barrier.**
  `[ESTABLISHED: Chen–Hirahara–Oliveira–Pich–Rajgopal–Santhanam 2020, "Beyond
  Natural Proofs: Hardness Magnification and Locality".]` Any lower bound
  provable by an "`(s,t)`-local" argument (decided by inspecting `≤ t`
  coordinates / a low-complexity core) cannot be the one HM needs, because HM's
  own error-correction would then already yield the strong bound, contradicting
  known limits.

---

## 4. The attempt: step-by-step

### Part I — A SAT algorithm and weak lower bound for `ACC0 ∘ sparse-THR`

**Step 1 [ESTABLISHED: Beigel–Tarui; Williams 2011; CLW 2020].**
The `ACC0` part `A` has a `SYM ∘ AND` PP: `A(y) = g(Σ_{monomials} p(y))` w.h.p.,
`g` symmetric, degree `polylog(n)`, `2^{polylog n}` monomials, with the
evaluation over a block of `t` variables batchable.

**Step 2 [ESTABLISHED: Beigel–Reingold–Spielman 1991; Aspnes–Beigel–Hajnal–
Rudich 1994; Chen–Papakonstantinou; Maciel–Thérien].**
A single THR gate of weight `W` has an exact `SYM ∘ AND` / polynomial-threshold
representation of degree `O(log W)` over its operating range (alternatively a
`(1/3)`-approx real polynomial of degree `O(√k · log(1/δ))` for fan-in `k`). For
**sparse-THR** (`W = n^{o(1)}`): `log W = o(log n)`, so per-gate exact degree is
`δ = o(log n)`. **This is the exact place the sparsity hypothesis is spent.**

**Step 3 [NOVEL: unverified — the composition lemma, "Claim C" core].**
Let `F = A(T_1(x),…,T_M(x))`, `A ∈ ACC0` with PP of degree `D = polylog(n)` and
`S_A = 2^{polylog n}` monomials, each `T_j` a sparse-THR with exact polynomial
`q_j` of degree `δ = o(log n)`. Substitute `q_j` for the `j`-th threshold-input
of `A`'s PP.
- **Degree:** a monomial of `A` of degree `≤ D` in the `T_j`'s becomes degree
  `≤ D·δ = polylog(n)·o(log n) = polylog(n)`. Still polylog.
- **Sparsity (the dangerous quantity):** each of the `≤ D` slots of an `A`-monomial
  expands into `≤ (sparsity of q_j)` terms. The sparsity of a degree-`δ`
  polynomial over a weight-`W` THR is `≤ (#distinct monomials of degree ≤ δ over
  its support)`. Over fan-in `k` this is `≤ k^{δ}`; with `k = n^{o(1)}` and
  `δ = o(log n)`, `k^{δ} = n^{o(1)·o(log n)} = 2^{o(log^2 n)} = 2^{o(polylog n)}`.
  Per `A`-monomial the blowup is `≤ (2^{o(polylog n)})^{D} = 2^{o(polylog n)·D}
  = 2^{o(polylog n)}` (since `D = polylog`). Total sparsity
  `S_F ≤ S_A · 2^{o(polylog n)} = 2^{polylog n}`.
- **Conclusion:** `F` has a PP of degree `polylog(n)` and sparsity `2^{polylog n}`
  — **the same asymptotic class as plain `ACC0`** — *provided the THR layer is
  sparse*.
*Self-flag:* the product `2^{o(polylog n)·D}` is where constants are most
fragile. If `D = log^c n` and the per-slot exponent is `log^2 n`, the product is
`2^{log^{c+2} n}`, still quasipolynomial (fine for `#SAT`) but it erodes any hope
of a *near-linear-size* PP — which matters for whether HM (wanting near-linear
size) can fire. Audited in §6.

**Step 4 [ESTABLISHED: CLW 2020; Williams 2014 (fast matrix mult for SAT)].**
Given a PP of sparsity `S = 2^{polylog n}` and degree `polylog n`, `#SAT` over
`n` variables is computed by: (a) split variables into halves of `n/2`; (b) form
the `2^{n/2} × S` and `S × 2^{n/2}` evaluation matrices (half-assignments vs
monomials); (c) one **rectangular matrix multiplication** yields all
`2^{n/2}·2^{n/2}` combined evaluations to sum. With `S ≪ 2^{n/2}`, fast
rectangular MM (Coppersmith; Le Gall–Urrutia) plus the CLW refinement gives a
`2^n / n^{ω(1)}` saving. By Step 3, `F ∈ C_sp` (size `2^{polylog n}`, in
particular `n^{1+ε}`) satisfies the hypothesis, so:
> **Lemma 4 (unconditional given Step 3).** `#SAT` for `ACC0 ∘ sparse-THR`
> circuits of size `2^{polylog n}` runs in `2^n / n^{ω(1)}`.

This is the conservation-of-difficulty payment, made in full for `C_sp`. It is
the load-bearing unconditional claim and rests on Step 3.

**Step 5 [ESTABLISHED: Williams' connection; Murray–Williams easy-witness].**
A `#SAT` (or `GAP-SAT`) algorithm beating brute force by `n^{ω(1)}` for `C[s]`
yields `NQP ⊄ C[s']` (standard parameter loss). The Murray–Williams refinement
brings the hard language from `NEXP` down to `NQP`; the verifier guesses a
`C`-circuit and runs Lemma 4's `#SAT` to verify.

**Step 6 [NOVEL: unverified — non-vacuity / Goldilocks check].**
Apply Step 5 with `C = C_sp`, `s = n^{1+ε}`. Need: (i) closure under the
operations the machinery uses — `C_sp` is closed under projections and
constant-fan-in output composition, and fixing inputs keeps THR sparse: **yes**.
(ii) The guessed circuit family is verifiable by the nondeterministic machine via
Lemma 4: **yes**. (iii) Non-vacuity: `C_sp[n^{1+ε}]` is near-linear size, so it
cannot compute all of `ACC0[poly]`, hence the "easy" branch of the win-win
genuinely *can* fail, so the dichotomy is non-vacuous. Crucially, this is at the
`NQP` scale, **avoiding** the NP-scale lookup-table vacuity that killed the prior
attempt (VERDICT §1): here circuit inputs number `polylog(n)`-many is *false* —
the diagonal language is at exponential input length `2^{polylog}`, so the
witness-vs-index ratio is super-polynomial and the lever has content.

**Step 7 [NOVEL: unverified — assembling Claim A].**
Steps 4–6 chain:
> **Proposition 7.** `NQP ⊄ ACC0 ∘ sparse-THR[n^{1+ε}]` for some `ε > 0`,
> *unconditional given the Step-3 sparsity bookkeeping*. Stronger than the known
> `NQP ⊄ ACC0` (Murray–Williams) in that it tolerates a sparse THR bottom layer.
> It is **not** `NP ⊄ ...` and **not** general-THR.

**Step 8 [ESTABLISHED — NEGATIVE: the honest boundary].**
General (large-weight) THR breaks Step 2: an LTF with exponential weights needs
degree `Θ(√n)` for polynomial approximation
`[ESTABLISHED: Aspnes–Beigel–Hajnal–Rudich 1994; Sherstov, threshold-degree
lower bounds]`. Degree `√n` makes Step 3 sparsity `2^{Ω(√n)}`, which destroys the
`2^n/n^{ω(1)}` saving in Step 4. **So Claim A for general `ACC0 ∘ THR` is NOT
delivered**; it remains conditional on a better THR-SAT subroutine. This is the
precise frontier line.

**Step 9 [ESTABLISHED: Williams 2014 — prior-art delta].**
Williams 2014 already proved a SAT algorithm and `NEXP ⊄` bound for
*linear-size* `THR ∘ THR` / `ACC0 ∘ THR`-flavored classes via a different
(non-CLW) gadget. My delta: (a) the *sparse* (weight-`n^{o(1)}`) regime via the
CLW combinatorial PP rather than the linear-size gadget; (b) `NQP` target
(Murray–Williams) not just `NEXP`; (c) the HM hookup setup. *Honest risk:* if
Williams 2014's linear-size result already subsumes Proposition 7 quantitatively,
then Proposition 7 is a re-derivation, not new. Flagged in §6.

### Part II — The magnification hookup (Claim B)

**Step 10 [ESTABLISHED: OPS 2019; CHJW 2019].**
Explicit problems `L` (`MCSP[n^β]`, `MKtP`, gap-`MCSP`, sparse-NP languages) and
HM theorems: "if `L` needs `C`-circuits of size `≥ n^{1+ε}` then
`NP ⊄ C[poly]`."

**Step 11 [NOVEL: unverified — the granularity-matching problem].**
To fire HM with Proposition 7's bound, I need an HM theorem whose hypothesis
class is `C_sp`, whose hard language `L ∈ NQP` (so Proposition 7 applies), and
whose required size `n^{1+ε}` matches.
- **Class granularity:** published HM theorems are mostly stated for `B2/U2`,
  formulas, `AC0`, or "`C` closed under projections." `C_sp` *is* closed under
  projections, so the generic CHJW "all sparse NP languages" template
  *plausibly* instantiates with `C = C_sp`. **Most promising sub-claim.**
  `[NOVEL: unverified — needs the CHJW proof checked to confirm class-agnosticism
  for `ACC0 ∘ sparse-THR`.]`
- **Language matching — THE CRUX GAP:** Proposition 7 gives hardness of an
  `NQP`-*diagonal* language `H`. HM wants hardness of a *specific* magnifiable
  `L` (MCSP/MKtP/Search-MCSP). There is no reason `H = L`. The algorithmic method
  (Steps 4–7) produces hardness for a diagonal language, **not** for
  `Search-MCSP`. **The two channels do not meet.** This is the wall.

**Step 12 [NOVEL: unverified — the one bridge that could close it].**
The only clean meeting point I see: the **`MCSP`-as-SAT-subroutine** identity.
`MCSP`/`Search-MCSP` hardness is morally circuit-analysis-algorithm
impossibility, and the algorithmic method routes through circuit analysis. If one
could show "the algorithmic-method bound from Lemma 4 *is* a lower bound on
`Search-MCSP` against `C_sp`" — because Lemma 4's `#SAT` algorithm is itself a
partial `MCSP` solver (both distinguish random from structured truth tables) —
then `H` and `L` coincide and HM fires. **I have a heuristic for why this should
be morally true, but no proof.** This single missing lemma is the whole gap to
(D).

---

## 5. Barrier audit (non-relativizing AND non-natural AND non-algebrizing)

The algorithmic method is the one program designed to clear all three. I check
this *specific* instantiation.

- **Non-relativizing.** ✅ Inherited. The connection uses the nondeterministic
  time hierarchy + the `#SAT` algorithm's exploitation of *internal* circuit
  structure (the PP). Oracle gates have no low-degree PP, so the construction
  cannot be made oracle-invariant. `[ESTABLISHED: Williams' method is
  non-relativizing.]`

- **Non-natural (Razborov–Rudich).** ✅ for Part I. The bound is
  diagonalization-through-a-SAT-algorithm; the hardness certificate is a single
  diagonal language pinned by the hierarchy, not a large+constructive property.
  `[ESTABLISHED: Williams 2011 argues non-naturalness.]`
  **Caveat for Part II:** HM proofs can re-introduce naturalness if the
  magnifying reduction contains a natural distinguisher; CHOPRS locality is
  partly a refined natural-proofs obstruction. My evasion (the global SAT
  channel, §2.1 Trap 2) is exactly the claim that *my* weak bound is not
  delivered by a natural/local distinguisher. `[NOVEL: unverified — the
  load-bearing barrier claim.]`

- **Non-algebrizing (Aaronson–Wigderson).** ✅ — *and this is why the brief and
  the prior `williams-...-scaling` §5c both insist on the COMBINATORIAL normal
  form.* The CLW probabilistic-polynomial + rectangular-MM engine is
  combinatorial: it enumerates explicit monomials and uses the specific
  `MOD_m`/Beigel–Tarui structure; it does **not** go through a
  low-degree-extension oracle the way algebrizing arguments do. The
  `williams-...-scaling` audit (its §5c, VERDICT-confirmed) feared algebrization
  *precisely once `C ⊇ TC0`* — i.e. when the speedup engine could carry the
  low-degree extension. **My evasion of that fear is the sparse-THR
  restriction:** sparse-THR does *not* give `C_sp ⊇ TC0` (TC0 needs unbounded-fan-in
  / large-weight majority), so the algebraic-oracle simulation that worried the
  prior attempt does not arise. The combinatorial CLW engine for `C_sp` is the
  ACC0-style multilinear/symmetric collapse, which is the canonical
  non-algebrizing case. `[ESTABLISHED for the sub-class by inheritance;
  the boundary at general/large-weight THR is exactly where algebrization
  re-threatens — consistent with Step 8.]`

**Net.** Part I (Proposition 7) clears all three barriers by inheritance from
Williams' method *and* dodges the prior attempt's specific algebrization fear via
sparsity. Part II is where a barrier (CHOPRS locality / natural-proofs
refinement) genuinely bites; my evasion is asserted, not proven.

---

## 6. Ruthless self-identification of the weakest step

Ranked, weakest first.

1. **WEAKEST: Step 11/12 — channel mismatch (= conservation-of-difficulty,
   resurfacing one level up).** Proposition 7 gives hardness of an `NQP`-diagonal
   language `H`; HM needs hardness of a *specific* magnifiable `L`
   (MCSP/MKtP/Search-MCSP). I have **no proof** `H = L`, and Step 12's
   "MCSP-is-the-SAT-subroutine" bridge is a heuristic. **This is almost certainly
   the true wall**, and — exactly as the VERDICT warns for the parent method — it
   is *the difficulty relocated, not reduced*: from "prove a strong bound" to
   "prove the weak bound is for the *right* language." If unbridgeable, only the
   modest Proposition 7 survives and there is no route to (D). I will not dress
   Step 12 as more than a heuristic.

2. **Step 3 — THR-composition sparsity bookkeeping.** The claim that substituting
   degree-`o(log n)` sparse-THR polynomials into the `ACC0` PP keeps sparsity
   `2^{polylog n}` is plausible but the exponent accounting `2^{o(polylog n)·D}`
   is the kind of thing that is off by a factor that kills the saving. I believe
   it survives for `#SAT` (quasipoly slack) but it almost certainly does **not**
   survive into the *near-linear-size PP* regime the strongest HM theorems want —
   compounding weakness #1 (HM may need a granularity Step 3 cannot deliver).

3. **CHOPRS-evasion claim (§2.1 Trap 2, §5).** "The algorithmic-method bound is
   non-local in the CHOPRS sense" is argued from proof structure (global
   `#SAT`/matrix product), not checked against CHOPRS's formal `(s,t)`-locality
   definition. The subtle danger: the easy-witness lemma's implicit
   *anti-checker* might itself be local, smuggling locality back in. Not ruled
   out.

4. **Easy-witness/non-vacuity port (Steps 5–6).** The `NEXP→NQP` descent is
   standard but parameter-sensitive; I assumed it ports to `C_sp` cleanly.

5. **Prior-art overlap (Step 9).** Williams 2014's linear-size `THR`-augmented
   result may quantitatively subsume Proposition 7, making it a re-derivation.

---

## 7. What must be true for it to go through; honest self-grade

**For Proposition 7 (the unconditional sub-class result):**
- (T1) Step 3 sparsity stays `2^{polylog n}` after THR substitution. *Plausible;
  needs careful constant tracking.*
- (T2) Step 4 rectangular-MM `#SAT` saving applies at this sparsity. *Established
  for this PP shape (CLW).*
- (T3) Murray–Williams descent ports to `C_sp`. *Plausible.*
- (T4) Proposition 7 is not already subsumed by Williams 2014. *Uncertain.*
If (T1)–(T3) hold, Proposition 7 is a real (if modest) lower bound; (T4)
determines whether it is *new*.

**For (D)/Claim B, additionally:**
- (T5) An HM theorem instantiates at `C = C_sp` with hard `L ∈ NQP`. *Plausible
  for the class side (projections-closure); unknown overall.*
- (T6) The algorithmic-method-hard language equals/reduces to a magnifiable `L`
  (Step 12's missing lemma). *No proof; heuristic only.* **Binding.**
- (T7) The weak bound's granularity (`n^{1+ε}`) matches HM *and* survives Step 3
  at near-linear size. *Currently fails per weakness #2.*
- (T8) CHOPRS locality genuinely does not apply to this channel. *Asserted, not
  verified.*

**Self-grade: `partial-conditional`.**
Rationale: I can defend a conditional reduction and a *plausible unconditional
weak lower bound for a restricted sub-class* (`ACC0 ∘ sparse-THR`), with barrier
inheritance for that part solid and the prior attempt's specific algebrization
fear genuinely dodged by sparsity. But the magnification payoff — the only thing
that would make this a route to P vs NP — rests on an unproven coincidence of two
hard-language channels (T6) and an unverified barrier-evasion (T8), and the
strongest HM regime is blocked by the very sparsity bookkeeping (T7/weakness #2)
that made Part I work. The two genuinely new ideas (sparsity-controlled THR
composition; the global-SAT-channel argument for CHOPRS evasion) are worth
recording. The chain does **not** close, and the place it fails (Step 11/12
channel mismatch) is conservation-of-difficulty resurfacing one level up —
exactly the trap the VERDICT flagged for the parent method. A sharpened,
honestly-bounded dead-end with one clearly-identified missing lemma.

## Adjudication (2026-05-30)

**Ruling: BROKEN.**

**Exact death point: Step 2 (line 197-201), propagating fatally through Step 3 and
Step 4/Lemma 4.** Step 2 asserts a single weight-`W` LTF has an *exact*
`SYM∘AND`/polynomial-threshold representation of degree `O(log W)`, claiming this
is where the `n^{o(1)}` sparsity hypothesis buys per-gate degree `δ = o(log n)`.
This degree bound is false. The `log W` quantity in the threshold literature
(Goldmann–Håstad–Razborov; Beigel–Reingold–Spielman) governs *simulation of a
threshold gate by other threshold/MAJ gates* (weight reduction), NOT the degree of
a polynomial computing the gate's 0/1 value. The true exact multilinear degree of
a weight-`W` LTF is `Θ(W)`; the best approximate (probabilistic) degree is `Θ(√k)`
for fan-in `k` — the very ABHR bound the author correctly cites in Step 8 for the
general case. With `k ≤ W = n^{o(1)}`, both give `δ = n^{o(1)}`, which is
super-polylogarithmic, not `o(log n)`.

Propagation: corrected `δ = n^{o(1)}` makes composed degree `D·δ = n^{o(1)}` (not
polylog) and, via the author's own `k^δ` blowup formula in Step 3,
`k^δ = (n^{o(1)})^{n^{o(1)}} = 2^{n^{o(1)}}` sparsity — *super-quasipolynomial*,
the same qualitative regime as the general-THR `2^{Ω(√n)}` case the author himself
concedes is fatal in Step 8. The Step 3 conclusion "F has a PP of degree polylog
and sparsity `2^{polylog n}` — the same class as plain ACC0" is therefore false.

**Internal contradiction pinning the kill.** Step 4 asserts the `#SAT` saving holds
whenever `S ≪ 2^{n/2}`. Step 8 asserts `S = 2^{Ω(√n)}` (which is also `≪ 2^{n/2}`)
*destroys* the saving. Both cannot hold. Step 8 is the correct reading of
Williams/CLW: the `2^n/n^{ω(1)}` saving requires *quasipolynomial* sparsity
`2^{polylog n}`, not merely sub-`2^{n/2}`. The corrected sparse-THR sparsity
`2^{n^{o(1)}}` sits on the wrong side of the real threshold. Lemma 4 fails for
`ACC0 ∘ sparse-THR`, so Proposition 7 — the only result the author believed was
unconditionally solid — collapses.

**Independent second kill (rigor):** the Steps 1-2 polynomials are
probabilistic/approximate (error `<1/3`); an exact `#SAT` count over all `2^n`
inputs forces error `<2^{-n}`, costing a `Θ(n)` degree factor and `2^{Ω(n)}`
sparsity. The author tracks only degree and monomial count, never reconciling
representation type (probabilistic-additive vs exact-threshold) nor
per-point-error vs all-points-exact. This is exactly the property that makes
Williams/CLW work for plain ACC0 (exact SYM outer, deterministic inner monomials)
and that the THR layer breaks.

**Barrier audit result: INCONCLUSIVE (no single barrier concretely triggered for
the sparse target; relativization cleanly evaded; naturalization/algebrization
evasions asserted not established).** Subordinate to the red-team: the barrier
audit's own closing note concedes the novel content is incomplete; the red-team
shows it is affirmatively wrong, which dominates "barriers inconclusive."

**Vote tally: 5/5 red-team BROKEN (fatal); barrier audit INCONCLUSIVE; referee
BROKEN.** The five red-team angles split between two genuinely independent kills:
two (barrier, rigor) reach the *unconditional core* (Step 2→3→4, Proposition 7);
three (literature, quantitative, circularity) kill the *magnification payoff*
(Step 11/12 H=L language-channel mismatch, which the author already concedes).
Either the core kill or the magnification kill alone suffices; the core kill is
the more damning because the author claimed Proposition 7 survives.

**Brokenness score: 7/10.** Not trivially circular or vacuous (it is a
serious, literate, honestly-bounded attempt that correctly identifies the
barrier landscape and openly disclaims the dream theorem). But the load-bearing
unconditional lemma rests on a concrete false degree bound and a flat internal
self-contradiction (Step 4 vs Step 8), so the part presented as an airtight new
theorem is wrong, not merely gapped. The magnification bridge is unproven by the
author's own admission. The conservation-of-difficulty tax the strategy promised
to "pay in full" is not in fact paid: the sparse restriction buys none of the
claimed degree reduction.

**Salvageable residue:**
1. The *framing* is sound and reusable: targeting NQP (Murray–Williams scale) to
   sit one rung above the NP-scale easy-witness vacuity cliff is a legitimate,
   non-vacuous choice (Step 6's witness-vs-index argument is correct).
2. The Circuit-SAT/counting channel as a candidate CHOPRS-locality evasion is a
   genuine idea worth separate investigation, independent of this construction.
3. The honest negative boundary (Step 8: general large-weight THR forces degree
   `Θ(√n)`, sparsity `2^{Ω(√n)}`) is correct and is in fact the true fate of the
   *sparse* case too once Step 2 is corrected — i.e. Step 8's own reasoning is the
   refutation of Step 3.
4. To salvage even Proposition 7 one would need a class where the bottom layer has
   genuinely `o(log n)` *exact* polynomial degree — e.g. AND/OR or constant-degree
   gates, not LTFs of any weight. That is a different (and far weaker) target than
   THR, and likely already subsumed by plain ACC0 results.
