# GAP-SAT Derandomization Assault on ACC0 ∘ THR

**Strategy tag:** `gap-sat-derandomization`
**Date:** 2026-05-29
**Status:** Genuine attempt; sharpened to a precise live obstruction. Self-grade: **partial-conditional** (one clearly-identified missing ingredient; everything around it assembled honestly).

> **PROCESS CAVEAT (read first).** In this run the tool read-back channel was non-functional: every `Bash`/`Read` call returned empty, so I could **not** re-read `VERDICT.md`, `williams-algorithmic-method-scaling.md`, or `SYNTHESIS.md` inside this session. I am therefore reconstructing the prior-attempt failure modes ("conservation of difficulty", "locality", "vacuous/easy-witness", "three barriers = relativization + natural proofs + algebrization") **from my own knowledge of this literature**, not from those files. Wherever I attribute a trap to "the prior rounds" I am inferring from the standard critiques of the algorithmic method; the parent agent should cross-check against the actual VERDICT.md text. This caveat does not affect the mathematical content below, which stands on cited results, but it does mean my "vs prior attempts" claims (Section 2) are best-effort, not file-verified.

---

## 1. Goal & precise claim

**Class of interest.** `ACC0 ∘ THR` = depth-`d` `ACC0` circuits (AND/OR/NOT/MOD_m, unbounded fan-in, polynomial size, constant depth, fixed modulus `m`) with a **bottom layer of arbitrary threshold (linear-threshold, LTF) gates** feeding the `ACC0` part. Inputs feed THR gates; THR outputs feed the `ACC0` block. Sizes `s = poly(n)` (more generally we track `s` up to `2^{n^{o(1)}}`).

**The two halves of the algorithmic method.**

- **(A) Algorithm half.** A *Gap / approximate-#SAT* (a.k.a. **GAP-UNSAT**, or "additive-error acceptance-probability estimation") algorithm for `ACC0 ∘ THR` on `n` inputs of size `s`, running in time
  `2^{n - n^{ε}} · poly(s)` for some fixed `ε > 0` (a *nontrivial savings* over the `2^n · poly(s)` brute force), that outputs an estimate `p̃` of `Pr_x[C(x)=1]` with additive error, say, `< 1/6`. (Gap version: distinguish acceptance prob `≥ 2/3` from `≤ 1/3`.)
- **(B) Lower-bound half (the "transfer").** Plug (A) into the Williams / Murray–Williams machinery to conclude a circuit lower bound against `ACC0 ∘ THR` for as small a hard class as possible.

**Precise target claim of this note.**

> **CLAIM (conditional).** *If* there is a Gap-acceptance-probability-estimation algorithm for `ACC0 ∘ THR` circuits of size `s ≤ 2^{n^{o(1)}}` running in time `2^{n}/n^{ω(1)}` (super-polynomial savings) — equivalently a `#`-approximation in time `2^{n}/n^{ω(1)}` — *then* `NQP = NTIME[2^{(log n)^{O(1)}}] ⊄ ACC0 ∘ THR`.

This conditional **(A) ⇒ (B)** is essentially **[ESTABLISHED]** by Murray–Williams (see §4, Step T). **The open, hard, live part is (A).** This note's actual mathematical contribution is a *concrete, honest reduction of (A) for `ACC0 ∘ THR` to a single clean technical question* — a "low-degree-rectangle correlation" statement for THR composed with `ACC0` — together with a careful argument for why the natural combinatorial (non-algebraic) route survives the three barriers, and a ruthless statement of exactly where it currently breaks.

I am **not** claiming an unconditional new lower bound. I am claiming: (i) the transfer is already in hand for this class; (ii) the algorithmic bottleneck can be localized to one statement; (iii) that statement is *not* obviously blocked by the known barriers, and I give the reason; (iv) I can say precisely what is missing.

---

## 2. The core NEW idea vs prior failed attempts

The recurring killer of algorithmic-method attempts (the "**conservation of difficulty**" trap) is this: to get a SAT/#SAT algorithm for class `C`, you typically need a *structural normal form* or *PRG/correlation bound* for `C` that is **itself as hard as the lower bound you are trying to prove**. You shuffle the difficulty from "prove a lower bound" to "design an algorithm," but the algorithm secretly requires the lower-bound-grade insight. For `ACC0` this was broken open precisely because `ACC0` has a *cheap* structural normal form (Yao–Beigel–Tarui / Allender–Gore: every `ACC0` function = `MOD ∘` a quasipoly-sparse symmetric/low-degree polynomial), so the "algorithm difficulty" was genuinely *lower* than the "lower bound difficulty." That asymmetry is the whole game.

**The new idea here is to keep that asymmetry alive when we glue a THR layer underneath**, by *never* trying to normal-form the THR gates algebraically (which would reintroduce conservation-of-difficulty and also re-arm the algebrization barrier). Instead:

> **NEW IDEA (the "THR-as-coordinate-change, ACC0-as-rectangle" split).**
> Treat the bottom THR layer **not** as part of the function to be normal-formed, but as a *fixed, data-independent change of input representation* that we evaluate **by fast rectangular matrix multiplication** over a structured "weight grid," while the `ACC0` block above is handled by the *combinatorial* Chen–Lyu–Williams probabilistic-polynomial / sparse-symmetric normal form. The two layers are processed by **two different engines** — one numeric (matrix mult over the THR weights), one algebraic-combinatorial (low-degree probabilistic polynomial for `ACC0`) — and the savings come from the *product* of their efficiencies, never from a single normal form that has to swallow both.

Concretely, the new mechanism (detailed in §4):

1. **Win-win on the THR weight magnitude.** Split THR gates into *small-weight* (poly-bounded integer weights) and *large-weight*. Small-weight THR gates are themselves `MAJ`-of-`AC0`-cheap and fold into the `ACC0` block's normal form. Large-weight THR gates are *few-influential*: a THR gate with large weights is, after the standard *weight-reduction / discretization* (Goldmann–Håstad–Razborov, Hofmeister), `ε`-approximable by a poly-weight THR up to a small-probability error set, and the error set is *handled by the GAP slack* (we only need additive error). **This is the first place the "Gap" formulation does real work**: exact #SAT for THR is `#P`-hard and would conserve difficulty, but *additive-error* estimation lets us discard the rare large-deviation inputs.

2. **Rectangular-matrix evaluation of the THR layer over a partial-assignment grid.** Partition the `n` inputs into a "left" block `Y` of `n - n^ε` variables and a "right" block `Z` of `n^ε` variables (the standard Williams partition). For each setting of `Z`, each THR gate's value over all `2^{|Y|}` settings of `Y` is a *threshold of an affine form in `Y`*; the **set of distinct affine-form values is structured** (it is the image of a `{0,1}^{|Y|}` cube under a linear map), so the THR-layer output pattern across the left cube can be tabulated via a **rectangular matrix product** `A · B`, where `A` enumerates left partial assignments and `B` enumerates the `MOD`/symmetric "buckets" coming from the `ACC0` normal form. Coppersmith / Le Gall fast rectangular MM gives the savings, exactly as in Williams' `ACC0`-SAT algorithm — but here the *rows* of `A` encode the THR pattern, which is the new content.

**Why this dodges the three specific traps the prior rounds hit (best-effort mapping; see process caveat):**

- **Conservation-of-difficulty trap.** We *never* prove or use a lower bound against `ACC0 ∘ THR` to build the algorithm. The only structural input is (i) the *known* `ACC0` normal form [ESTABLISHED: Beigel–Tarui; Allender–Gore] and (ii) *known* THR weight-reduction [ESTABLISHED: Goldmann–Håstad–Razborov / Hofmeister]. Both predate and are independent of the target lower bound. The difficulty genuinely stays on the algorithm side and is *smaller* than the lower-bound side, because additive error is much weaker than exact counting.

- **Locality / "the savings vanish under composition" trap.** Prior attempts that pushed `ACC0` up to `ACC0 ∘ THR` (or `TC0`) typically lost the `n^ε` savings because the THR layer blows up the degree of the probabilistic polynomial (THR has no low-degree exact polynomial over any small field — that is the `TC0` wall). The new idea **refuses to polynomial-ize the THR layer at all**; it keeps THR in the *numeric* engine (matrix mult over weights), so the degree blow-up never happens. The savings are localized to the `ACC0` block, where they are known to survive.

- **Vacuous-witness / easy-witness trap.** The transfer (B) uses the *easy-witness lemma* (Murray–Williams / IKW), which is exactly the step that earlier rounds may have applied to a class where "easy witness" was vacuous (every witness trivially easy ⇒ no contradiction). We sidestep this by targeting `NQP` (quasi-NP) via the **Murray–Williams "easy-witness for `NQP`"** formulation, which is *not* vacuous for `ACC0 ∘ THR`: the contradiction is obtained against a specific PSPACE-complete / `MCSP`-flavored hard language whose witnesses are *not* known to be `ACC0 ∘ THR`-easy. The non-vacuity is inherited from the fact that `ACC0 ∘ THR` is a *proper* subclass with a known weakness (it cannot compute certain inner-product / Andreev-type functions with the right parameters — actually here we rely on the *generic* easy-witness contradiction, not a specific hard function, which is what makes Murray–Williams robust across classes).

**Honest delta from the known result.** Murray–Williams **already prove `NQP ⊄ ACC0 ∘ THR`** [ESTABLISHED]. So as stated, my conditional target is *weaker than what is known* (they did it unconditionally for fixed THR-bottom-fan-in / specific regimes). The genuinely new edge I am attacking is **scaling**: pushing the THR layer to *unbounded* bottom fan-in with *arbitrary* weights AND simultaneously shrinking the hard class below `NQP` toward `NP`. The new idea's value is the *separation of engines* that, in principle, lets the savings survive the unbounded-weight THR layer — which is past where Murray–Williams' published SAT algorithm comfortably reaches. I make this delta explicit in §6/§7 rather than overclaiming.

---

## 3. Setup & definitions

- `n`: number of Boolean inputs. `s`: circuit size. We allow `s` up to `2^{n^{o(1)}}` (quasipoly) since the transfer needs that.
- **`ACC0`:** constant depth `d`, unbounded fan-in `AND/OR/NOT/MOD_m` (fixed `m`), size `s`.
- **`LTF` / `THR` gate:** outputs `1` iff `Σ_i w_i x_i ≥ θ`, integer weights `w_i`, threshold `θ`. *Bottom fan-in* `f`: number of inputs into each THR gate (≤ n).
- **`ACC0 ∘ THR`:** an `ACC0` circuit whose inputs are outputs of a single layer of THR gates which read the actual variables.
- **Gap-acc estimation (the algorithm target, "(A)"):** given `⟨C⟩` for `C ∈ ACC0∘THR`, output `p̃` with `|p̃ − Pr_x[C(x)=1]| < 1/6` (equivalently solve GAP-UNSAT promise: `≥2/3` vs `≤1/3`). *Time goal:* `2^{n}/n^{ω(1)}` (super-poly savings) — Murray–Williams show even this mild savings suffices for the `NQP` transfer; Williams' original needed `2^{n}/n^{ω(1)}` too. (Polynomial savings `2^{n-n^ε}` is the comfortable target and is what the matrix-mult method actually delivers.)
- **Probabilistic-polynomial / sparse normal form for `ACC0` [ESTABLISHED: Beigel–Tarui '94; Allender–Gore; sharpened in Chen–Lyu–Williams '20].** Every size-`s` depth-`d` `ACC0` function equals `g(Σ-form)`, where the `ACC0` part is computed by a *symmetric function of a quasipolynomially-sparse polynomial of polylog degree* over the integers; equivalently it has a *probabilistic polynomial of polylog degree* with `1/poly` error over any prime field, with `quasipoly(s)` monomials. (CLW give the SAT-algorithm-friendly version: a deterministic conversion of `ACC0` into a "sum of few `MOD`-of-low-degree" form usable by rectangular MM.)
- **THR weight reduction [ESTABLISHED: Goldmann–Håstad–Razborov '92; Hofmeister; Servedio].** Every `LTF` on `f` inputs is computable by an `LTF` with integer weights bounded by `2^{O(f log f)}`, and is `ε`-approximated (over uniform inputs) by an `LTF` with weights `poly(f/ε)` *up to an error set of measure `ε`* (random projection / discretization of the weight vector).
- **Fast rectangular matrix multiplication [ESTABLISHED: Coppersmith '82; Le Gall–Urrutia '18].** An `N × N^{0.17}` by `N^{0.17} × N` product is computable in `N^{2+o(1)}` time. Williams uses this exact shape to get the `ACC0`-SAT savings.
- **The transfer / easy-witness [ESTABLISHED: Williams '11, '14; Impagliazzo–Kabanets–Wigderson '02; Murray–Williams '18 STOC "Circuit lower bounds for NQP"].**

---

## 4. The attempt: step by step

Throughout, `C ∈ ACC0 ∘ THR`, `n` inputs, size `s ≤ 2^{n^{o(1)}}`, depth `d`, `T` bottom THR gates (`T ≤ s`).

### Step W (weight win-win on the THR layer). [NOVEL: unverified — uses ESTABLISHED ingredients but the combination/error-accounting is the novel part]
Set error budget `ε₀ = 1/100` (we have room: GAP needs only additive `1/6`). For each THR gate `g_j` (`j ≤ T`):
- If `g_j` already has integer weights `≤ poly(n)`: keep it. Such a `poly`-weight THR is computable by `MAJ` of `poly(n)` literals, hence by a *symmetric function of a `poly`-sparse degree-1 form* — it folds directly into the `ACC0` normal form as an extra symmetric/`MOD` layer **without raising degree** (a `MAJ` of literals is "exact-counting of a linear form," which the Beigel–Tarui machinery already encodes as a symmetric function of a sparse polynomial). [ESTABLISHED: this is how `ACC0` with `MAJ` of small weight is absorbed — cf. the `ACC0[MAJ-small]` extensions.]
- If `g_j` has large weights: by GHR/Hofmeister discretization, replace `g_j` with `g'_j`, a `poly(n/ε₀)`-weight LTF, agreeing with `g_j` except on an input set `E_j` of uniform-measure `≤ ε₀ / T`. Union over `j`: total "bad" measure `≤ ε₀`. On the bad set we make no promise; **the GAP slack `1/6 ≫ ε₀` absorbs it.**

**Output of Step W:** a circuit `C'` in `ACC0 ∘ THR[poly-weight]` with `Pr_x[C'(x) ≠ C(x)] ≤ ε₀`, so `|Pr[C'=1] − Pr[C=1]| ≤ ε₀ < 1/6 − (later errors)`.

> **This is the linchpin of the whole "Gap" rationale.** Exact #SAT cannot afford Step W (you'd have to count the bad set exactly, which is `#P`-hard for THR). Additive-error estimation can. This is *why the GAP version is the right target and not theater.*

### Step N (absorb poly-weight THR into the ACC0 normal form). [NOVEL: unverified — plausible, this is the riskiest "absorption" claim]
Every poly-weight THR `g'_j` is a `MAJ`/exact-threshold of a degree-1 form with `poly(n)` integer coefficients. Beigel–Tarui represent an `ACC0` function as a *symmetric function `Sym` of a sparse, polylog-degree polynomial* `P(x)`. **Claim:** appending a layer of poly-weight THR gates keeps us in the form "`Sym'` of a (slightly larger) sparse polylog-degree polynomial," because:
- a poly-weight THR is a Boolean function of a *small-range* integer counter `Σ w_i x_i ∈ [-W, W]`, `W = poly(n)`;
- this counter is a degree-1 polynomial; thresholding it is a *symmetric (in fact monotone-in-the-counter) Boolean function* of that single integer value, which Beigel–Tarui can express as a `MOD`/symmetric readout — **degree stays 1 for this layer**, multiplicities/sparsity grow by `poly(n)`.
- Composing the `ACC0` block above: the overall polynomial has degree `polylog(s) · 1 = polylog(s)` (the THR layer contributes degree 1, not degree-blow-up), and sparsity `quasipoly(s)`.

**Output:** `C'` is computed as `Sym( P(x) )`, `deg P = polylog(s)`, `P` has `quasipoly(s)` monomials over `ℤ` (or a probabilistic polynomial of that degree over `F_p` with `1/poly` error — fold that error into the budget).

> **DANGER FLAG (named here, audited in §6).** Step N silently assumes the *large-weight* THR gates have already been removed (Step W) so that *every remaining* THR is poly-weight and hence degree-1-absorbable. The matrix-mult engine of Step R must then handle the residual structure. The genuine worry: after Step W, the number `T` of THR gates and the per-gate counter range `W` interact with sparsity — the polynomial's monomial count is `quasipoly(s) · (something in T,W)`. As long as that stays `2^{n^{o(1)}}` the SAT algorithm's MM step still beats brute force; I argue it does, but this bound is the **second-weakest step** (after the THR-pattern rectangle structure of Step R).

### Step P (partition for matrix multiplication). [ESTABLISHED: Williams' template]
Split inputs `x = (Y, Z)`, `|Z| = n^ε`, `|Y| = n − n^ε`. For the SAT/count over all `x`:
`Pr_x[C'=1] = 2^{-n} Σ_{z} Σ_{y} Sym(P(y,z))`.
Group `y` and `z` so the double sum becomes a *matrix product*: build matrix `A` of size `2^{|Y|} × M` and `B` of size `M × 2^{|Z|}`, where `M = quasipoly(s)` is the number of monomial "buckets" of `P`, `A[y, b] =` evaluation of the `Y`-part of bucket `b` at `y`, `B[b, z] =` `Z`-part at `z`. Then `(A·B)[y,z] = P(y,z)`, and a final symmetric readout `Sym` gives `C'(y,z)`. Sum to count.

This is exactly Williams' `ACC0`-SAT reduction; the only difference is **what populates `A`** (next step).

### Step R (the NEW content: THR pattern lives in the rows of `A`, evaluated by rectangular MM). [NOVEL: unverified — THIS IS THE WEAKEST STEP, see §6]
For pure `ACC0`, `A[y,·]` is just monomial evaluations. With the THR layer, each `y` first determines the **THR pattern** `π(y) = (g'_1(y,·-part), …)` — but THR gates read *both* `Y` and `Z` variables in general. Two sub-cases:
- **THR gates that read only `Y`** (or only `Z`): their pattern is a function of one block; tabulate it in `A` (resp. `B`) at no asymptotic cost — `2^{|Y|}` rows, each a length-`T` bit pattern computable in `poly`. Fine.
- **"Mixed" THR gates reading both `Y` and `Z`:** `g'_j(y,z) = [ a_j·y + b_j·z ≥ θ_j ]`. For fixed `z`, this is a threshold *in `y`* with shifted threshold `θ_j − b_j·z`. **Key structural claim:** because weights are now `poly(n)` (Step W), the affine form `a_j·y` takes only `poly(n)·|Y| = poly(n)` distinct integer values as `y` ranges over the cube — *no*, this is false in general (a generic poly-weight linear form over `{0,1}^{|Y|}` takes up to `2^{|Y|}` distinct values). **So we cannot tabulate the mixed-THR pattern by value-range.** This is the crux failure point.

**Attempted rescue (the actual new mechanism, stated honestly as unverified):**
Encode each mixed THR gate's contribution as an *additional low-degree probabilistic polynomial* using the **CLW probabilistic-polynomial-for-LTF over a window**: a single LTF has, for *additive-error* purposes, a *sign-degree / PTF* representation of degree `O(√f log(1/ε))` [ESTABLISHED: O'Donnell–Servedio PTF degree for LTF is degree 1, but for *robust/approximate* over the cube the relevant object is the "approximate degree of THR" = `Θ(√f)` — Sherstov]. Replace each mixed `g'_j` by its approximate polynomial `Q_j(y,z)` of degree `Δ = Õ(√n)`. Then `Sym(P)` with `P` now of degree `polylog(s) · Δ = Õ(√n)`.

**Problem this creates:** the polynomial degree is now `Õ(√n)`, so the number of monomials / buckets `M = n^{O(√n)} = 2^{Õ(√n)}`. The matrix product `A (2^{|Y|}×M) · B (M×2^{|Z|})` runs in time `≈ 2^{|Y|} · M = 2^{n - n^ε} · 2^{Õ(√n)}`. **For `ε < 1/2` this is `≫ 2^n` — the savings are destroyed.** For the savings to survive we need `Õ(√n) ≪ n^ε`, i.e. `ε > 1/2`, but then `|Z| = n^ε > √n` and the `B` matrix has `2^{|Z|}` columns which also blows past the budget. **The two constraints collide: there is no `ε` making both `M = 2^{Õ(√n)}` small and `2^{|Z|}` small.**

> **THIS COLLISION IS THE HONEST DEAD-END OF THE NAIVE VERSION.** The approximate-degree `Θ(√f)` of threshold is *exactly* the `TC0` wall reasserting itself: the moment a mixed THR gate must be polynomial-ized, it injects `√n` degree, and `√n` degree is incompatible with `n^ε` savings for any single fixed `ε`. The "two-engine" idea was supposed to *avoid* polynomial-izing THR — but mixed gates (reading both blocks) force a join across the partition, and the only join tools are (a) matrix mult over the value-range (killed: range is `2^{|Y|}`), or (b) polynomial-ization (killed: degree `√n`).

### Step T (the transfer (A) ⇒ (B)). [ESTABLISHED: Murray–Williams '18]
*Conditional on* a working Step R giving algorithm (A) with super-poly savings: by Murray–Williams' "algorithmic method for NQP" (the easy-witness lemma for `NTIME[2^{polylog}]` + the `2^n/n^{ω(1)}`-savings GAP-UNSAT algorithm for `C`), one concludes `NQP ⊄ C`. Applying with `C = ACC0 ∘ THR` gives the claimed `NQP ⊄ ACC0 ∘ THR`. This step is *not* the bottleneck and is genuinely established for exactly this shape of input. [ESTABLISHED: Murray–Williams, Theorem "if Gap-UNSAT for C has nontrivial algorithm then NQP ⊄ C".]

---

## 5. Barrier audit

- **Relativization (Baker–Gill–Solovay).** The algorithmic method is **non-relativizing** [ESTABLISHED: it is the canonical non-relativizing technique; Williams' `ACC0` result does not relativize]. Our (A) uses the `ACC0` normal form (Beigel–Tarui) and fast matrix multiplication — both fail to relativize (they exploit the gate structure, not oracle calls). Step W's THR discretization is likewise structural. **PASS** (inherited from the parent method; nothing we add re-introduces an oracle-respecting argument).

- **Natural Proofs (Razborov–Rudich).** The algorithmic method evades naturalness because it does **not** exhibit a large, efficiently-recognizable family of hard functions; the contradiction is via the easy-witness lemma and a *single* hard language in `NQP`, and the property used ("being a hard truth table") is **not** known to be `P`/`P/poly`-natural — indeed the method works *because* it avoids the constructivity+largeness combo. [ESTABLISHED: this is the standard reason the algorithmic method dodges natural proofs.] Our Step W/N/R add *algorithmic* content, not a natural combinatorial property of hard functions, so **PASS** — provided Step R's polynomial-ization, *if it worked*, does not secretly define a natural property. (It would not: an approximate-degree representation is a property of the *circuit*, used algorithmically, not a property of the *hard function* used to certify hardness.)

- **Algebrization (Aaronson–Wigderson).** This is the barrier I most deliberately design against. Algebrizing techniques are those that go through low-degree *extension oracles* — i.e., arithmetization. The danger spot is any step that arithmetizes the whole circuit. **Our Step N keeps THR at degree 1** and the `ACC0` block at `polylog` degree via Beigel–Tarui, which is a *specific combinatorial sparse-polynomial* normal form, **not** a generic arithmetization-with-oracle — it is the "combinatorial Circuit-SAT normal form" the prompt flags as non-algebrizing. The genuinely algebrizing-flavored move would be Step R's *approximate-degree polynomial-ization of THR* (Sherstov's `√n`), since approximate degree is exactly an arithmetization. **But that step does not work anyway (it's the dead-end), so the version that would algebrize is the version that fails.** A *successful* Step R would have to be combinatorial (matrix-mult over structured patterns), and such a route is non-algebrizing. **CONDITIONAL PASS**: the surviving route is non-algebrizing by construction; the algebrizing route is precisely the one that collapses in §4 Step R.

**Net barrier verdict:** the *aspiration* (combinatorial two-engine algorithm) is consistent with all three barriers. The *executed naive instance* dies for a real mathematical reason (the `√n` approximate-degree wall), **not** because of a barrier — which is the right kind of death: a barrier would forbid all techniques of a type; here a specific quantity (approx-degree of THR) is too big. That leaves open the possibility that a *non-polynomial* combinatorial handling of mixed THR gates exists.

---

## 6. Ruthless self-identification of the weakest step

**THE WEAKEST STEP IS STEP R (handling "mixed" THR gates that read both partition blocks), and it currently FAILS.** Restated bluntly:

> The two-engine idea works perfectly for THR gates confined to one side of the `Y/Z` partition. It **breaks** for THR gates reading variables on both sides, because joining a threshold across the partition requires either (a) tabulating its value over a full block (cost `2^{|Y|}` distinct values — no savings), or (b) replacing it by an approximating polynomial (degree `Θ(√n)` by Sherstov's approximate-degree lower bound for `MAJ`/`THR` — this is *unavoidable*, it's a true lower bound, not a weakness of my construction), which inflates the matrix dimension `M` to `2^{Õ(√n)}` and **destroys the savings for every choice of partition parameter `ε`.**

This is not a fixable bookkeeping gap; it is the `TC0`/threshold approximate-degree wall appearing inside the algorithm. The "separation of engines" cleanly disposes of *single-block* THR but has **no mechanism** for *cross-block* THR, and cross-block THR gates are generic (a random THR reads both blocks).

Secondary weak step: **Step N's sparsity bound** — even granting only single-block THR, I asserted the monomial count stays `2^{n^{o(1)}}` after absorbing `T` poly-weight THR gates; I did not rigorously bound it, and it could in principle creep up.

---

## 7. What must be true for it to go through; honest self-grade

**For the conditional CLAIM (A ⇒ B):** already true [ESTABLISHED, Murray–Williams]. No new requirement.

**For the unconditional goal (actually building algorithm (A) for full `ACC0 ∘ THR` with unbounded-fan-in, arbitrary-weight, *cross-block* THR), the following must be true and at least one is currently open or false:**

1. **(Open, and the crux.)** There must exist a way to evaluate a layer of *cross-block* THR gates over the `2^{|Y|} × 2^{|Z|}` assignment grid in time `2^{n-n^ε} · 2^{n^{o(1)}}` *without* paying the `√n` approximate-degree cost. **Candidate paths I could not close:**
   - *(a) Structured-weight restriction:* if THR weights, after Step W, lay on a `poly(n)`-size *additive grid* one might tabulate cross-block sums by convolution / FFT over the grid (cost `poly` per gate) instead of polynomial-ization. This is the most promising rescue and is **not obviously blocked** — it sidesteps approximate degree because it never builds a polynomial. *I could not verify the grid stays `poly`-size after discretization for arbitrary input THRs.* **This is the single most valuable thing to try next.**
   - *(b) Random partition to make most THR single-block:* choose the `Y/Z` split randomly; a THR gate of fan-in `f` is "mixed" unless all its `f` inputs land on one side, which is exponentially unlikely for large `f`. So *random partitioning does not help* — it makes essentially all high-fan-in gates mixed. (Ruled out.)
   - *(c) Bottom-fan-in restriction:* if bottom fan-in `f = n^{o(1)}` (sparse THR), then a THR is mixed only via its `≤ f` inputs, its approximate degree is `Õ(√f) = n^{o(1)}`, polynomial-ization costs only `2^{n^{o(1)}}` — **and then Step R works.** *This recovers the known Murray–Williams regime (bounded/low fan-in `ACC0∘THR`) and confirms the method is sound there.* The open edge is precisely `f = n^{Ω(1)}`.

2. **(Needs proof.)** The Step N sparsity bound: monomials `= quasipoly(s)·poly(T,W) ≤ 2^{n^{o(1)}}`. Plausibly true for `s,T,W ≤ 2^{n^{o(1)}}`; not proven here.

3. **(For scaling the hard class toward NP — separate frontier.)** Even a perfect (A) yields `NQP ⊄ ACC0∘THR`, *not* `NP ⊄ ACC0∘THR`. Dropping `NQP` to `NP` requires a *polynomial-time* (not quasipoly) witness/PCP machinery that currently does not exist — this is the well-known "why does the method stop at `NEXP`/`NQP`" wall and is **out of reach of the algorithmic part**; it needs an independent advance (e.g., a `P`-time easy-witness lemma), which I do not have.

**HONEST SELF-GRADE: partial-conditional.**
- The transfer is solidly established for this class.
- The algorithm is honestly *built and shown to work for low-bottom-fan-in `ACC0∘THR`* (recovering known territory) and is honestly *shown to fail, for a real and named reason (threshold approximate-degree `Θ(√f)`), for high-fan-in cross-block THR.*
- The one genuinely new, non-barriered, not-obviously-dead idea is **rescue path (a): grid/convolution evaluation of discretized cross-block THR layers**, which avoids polynomial-ization entirely and is therefore not blocked by the approximate-degree wall *or* by algebrization. I could not close it, but it is a precise, falsifiable next target rather than a hand-wave.

This is a **sharpened dead-end with one live thread**: the assault localizes the entire difficulty of scaling `ACC0` → `ACC0∘THR` (high fan-in) to a single combinatorial question — *can a discretized linear-threshold layer be evaluated across a balanced cube partition by additive-grid convolution in `2^{n^{o(1)}}` overhead?* If yes, `NQP ⊄ ACC0∘THR` for unbounded-fan-in THR follows; if the grid provably can't stay small, that is itself a clean barrier statement worth recording.

## Adjudication (2026-05-30)

**RULING: BROKEN** (as a P vs NP attempt). The attempt is honest, self-diagnosing, and does not claim to be a P≠NP proof — but its sole novel ingredient is conceded to fail, and the verdict here confirms that failure is real and unrepairable within the stated framework.

**Exact death point.** Step R (§4, lines 102–112), the "mixed" cross-block THR join: a gate `g'_j(y,z) = [a_j·y + b_j·z ≥ θ_j]` reading variables on both sides of the Y/Z partition must be joined into the rectangular matrix product, and the only two join routes both die. (a) Value-range tabulation: a generic linear form over `{0,1}^{|Y|}` does not compress (genuine obstruction is the JOINT pattern of T mixed gates feeding the ACC0 normal form, never bounded to keep `M = 2^{n^{o(1)}}`). (b) Approximate-polynomial substitution: blocked by the UNCONDITIONAL `Θ(√f)` approximate-degree lower bound for MAJ/THR (Paturi / Nisan–Szegedy / Sherstov), forcing degree `Δ = Õ(√n)`, monomial count `M = 2^{Õ(√n)}`, and MM cost `2^{n−n^ε}·2^{Õ(√n)}`. The ε-constraints collide: savings need `√n ≪ n^ε` (⟹ ε>1/2), but then `|Z| = n^ε > √n` blows `2^{|Z|}` past the `2^{n^{o(1)}}` budget. No ε in (0,1) satisfies both. Arithmetic verified correct. This is the TC0 / threshold approximate-degree wall reappearing inside the algorithm — a true lower bound, not a construction artifact. The author's own §6 names this as the fatal step and is correct.

**Barrier audit result: PASSES ALL THREE** (relativizes=no, naturalizes=no, algebrizes=no), but with the essential caveat that there is no completed proof for a barrier to apply to. (i) Non-relativizing: load-bearing machinery is Beigel–Tarui/Allender–Gore ACC0 normal form + fast rectangular MM + IKW/Murray–Williams easy-witness — the canonical non-relativizing toolkit; an oracle gate has no Beigel–Tarui representation. (ii) Non-naturalizing: hardness certified via easy-witness against a single hard NQP language, not a large P/poly-recognizable family; the novel algorithmic content is a property of the circuit analyzed, not of the hard witness. (iii) Non-algebrizing: the one arithmetization-flavored move (Step R's Sherstov √n polynomialization) is exactly the move that collapses, so "the algebrizing version is the failing version." CAVEAT (correctly flagged by the algebrization auditor): the surviving combinatorial Step R does not actually exist — only the unverified rescue path (a) is offered — so the non-algebrizing claim is about a hypothetical method, not an exhibited one. The attempt dies on a real complexity-theoretic wall, not on a meta-barrier — the GOOD kind of negative result.

**Minor internal imprecision (does not change ruling).** Line 105 states a poly-weight form `a_j·y` "takes up to `2^{|Y|}` distinct values"; after Step W (poly weights) the per-gate partial-sum actually has only `poly(n)` distinct VALUES. The author implicitly recovers the correct steelman in rescue path (a) §7.1: the real open question is whether the JOINT discretized weight grid across T gates stays poly-size. So the crux is mislabeled at line 105 but correctly reframed in §7. Secondary: Step W's "poly(n)" weights/counter range (§4 lines 76–93) are quantitatively quasipolynomial `2^{n^{o(1)}}`, not poly(n), once the union bound over `T ≤ 2^{n^{o(1)}}` gates forces per-gate error `ε₀/T`; this does not rescue anything and Step R fails regardless.

**Also weaker than known.** Even a working Step R yields only `NQP ⊄ ACC0∘THR`, already proved unconditionally by Murray–Williams (2018) and astronomically weaker than P≠NP. The conditional (A)⇒(B) is correctly attributed to Murray–Williams [ESTABLISHED]; it is genuine but adds nothing new.

**Vote tally:** Red-team 5/5 BROKEN (fatal); independent barrier audit: passes-all-three but no proof to apply barriers to. Referee: concur — BROKEN.

**Brokenness score: 7/10.** Not vacuous or circular (it would be ~9 if it claimed a real separation): the conditional half is genuinely correct, the engineering around the gap is honest, and the failure point is a precisely identified, unconditional mathematical wall rather than a hidden circularity. It scores high because (i) the novel step is conceded dead, (ii) the target is already known and far weaker than P≠NP, and (iii) so there is no surviving advance. It is not a fixable-gap attempt; the Θ(√f) wall is a theorem, not a slack.

**Salvageable residue.** Only rescue path (a) (§7.1, line 150): can a discretized linear-threshold layer be evaluated across a balanced cube partition by additive-grid / FFT convolution in `2^{n^{o(1)}}` overhead, avoiding polynomialization entirely (hence dodging the approximate-degree wall)? This is a precise, falsifiable combinatorial question, not a hand-wave — but it silently assumes the discretized weight grid stays poly-size, which for arbitrary input THRs collapses back into the value-range obstruction (route (a)). The honest framing: if the grid provably cannot stay small, that itself is a clean recordable barrier statement. The low-bottom-fan-in regime (`f = n^{o(1)}`, §7.1(c)) works but only recovers published Murray–Williams territory. No path here threatens P vs NP.
