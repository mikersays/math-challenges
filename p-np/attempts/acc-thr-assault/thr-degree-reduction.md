# THR Degree Reduction: A Margin-Stratified Combinatorial Normal Form for ACC0 ∘ THR Circuit-SAT

> Strategy tag: `thr-degree-reduction`
> Status: SERIOUS ATTEMPT — sharpened, partially-conditional, honest dead-end-with-residue.
> Author note on provenance: At authoring time the three context files (`VERDICT.md`,
> `williams-algorithmic-method-scaling.md`, `SYNTHESIS.md`) could not be read back through the
> tool relay (empty returns on every Bash/Read call). I therefore worked from the task brief's
> explicit restatement of those files (conservation-of-difficulty trap; locality trap;
> vacuous-witness trap; the three barriers; the CLW combinatorial normal form lead) plus my own
> knowledge of the literature. Where I rely on the brief's summary rather than a verified quote I
> flag it `[BRIEF]`. Every mathematical step is tagged `[ESTABLISHED: cite]` or `[NOVEL: unverified]`.

---

## 1. Goal & precise claim

**Target theorem (aspirational).** There is a constant `c > 0` and a function `s(n) = n^{1+c}`
(or at least `s(n) = poly(n)` with the exponent independent of depth) such that:

> **(SAT-goal)** Satisfiability of `ACC0 ∘ THR` circuits on `n` inputs of size `s(n)` and depth
> `d` is decidable deterministically in time `2^{n - n^{δ}}` for some `δ = δ(d) > 0`.

By the algorithmic method this would yield the **lower-bound corollary**:

> **(LB-goal)** `NEXP ⊄ ACC0 ∘ THR` of polynomial size, and (via the Murray–Williams
> scaling/`PCP`-of-proximity refinement) **`NQP = NTIME[2^{polylog n}] ⊄ ACC0 ∘ THR`**.

`ACC0 ∘ THR` = an `ACC0` circuit (constant depth, `AND/OR/MOD_m` gates, poly size) whose
*bottom layer* (closest to inputs) is a single layer of arbitrary **linear threshold gates** (THR:
`sign(Σ w_i x_i − θ)` with arbitrary integer weights). This class strictly contains `ACC0` and is
not known to have super-polynomial `NEXP` lower bounds; it is precisely the referee-flagged
frontier.

**What this document actually delivers.** Not the theorem. It delivers:

1. A genuinely new *normal form* — a **margin-stratified decomposition** of a single THR gate's
   contribution that replaces "approximate THR by a low-degree polynomial" (which fails: high
   margin ⇒ high degree) with "split inputs by the *realized margin* of each THR gate into
   `O(log s)` strata, on each of which the gate is **exactly computed** by a *small* object that is
   NOT a polynomial: a **prefix-sorted bucket comparator**."
2. A reduction of `ACC0 ∘ THR`-SAT to a **counting problem over a structured boolean matrix** that
   is amenable to the fast-rectangular-matrix-multiplication (`FRMM`) step of the CLW pipeline —
   *conditional* on a combinatorial lemma (the **Margin-Sparsity Lemma**) which I state precisely
   and then **show is false in general**, salvaging a weaker average-case / promise version.
3. A precise localization of WHY it does not currently close, and whether the residue collides with
   the THR lower-bound barriers (it grazes the Forster/sign-rank barrier; it does **not** trigger
   Natural Proofs; relativization/algebrization are evaded structurally).

**Honest one-line self-grade:** *partial-conditional* leaning toward *plausible-progress on the
normal form, dead-end on the SAT speedup as stated*. The Margin-Sparsity Lemma is false as
originally hoped; the salvage gives a SAT algorithm only for a *bounded-weight / bounded-margin-
spread* sub-class, which is already (essentially) known via different means. The new content that
survives is the **stratification normal form itself** and a clean statement of the exact
combinatorial obstruction.

---

## 2. The core NEW idea vs prior failed attempts

### 2.1 The standard pipeline and where THR breaks it

[ESTABLISHED: Williams 2011/2014 "Nonuniform ACC lower bounds"; Chen–Lyu–Williams (CLW) 2020
"Faster #SAT for ... via probabilistic polynomials and rectangular matmul"; Murray–Williams 2018
"Circuit lower bounds for nondeterministic quasi-polynomial time"]
The algorithmic-method SAT speedup for `ACC0` (and `ACC0 ∘ {a few THR-like layers}` in CLW) runs:

1. **Probabilistic polynomial / correlation step.** Replace the circuit `C` by a
   probabilistic polynomial `p` of degree `D` over a small field (or a `SYM∘AND` / linear-combination-
   of-ANDs form) that agrees with `C` on each input w.h.p. For `ACC0`, `D = polylog`. For a single
   `MAJ`/`THR` gate, the *exact* representation is fine (`SYM` of degree `n`), but the *low-error
   low-degree* approximation has degree `Θ(√n · log(1/ε))` for error `ε` over the *worst* margin —
   and crucially, **THR with large weights / small margin forces degree `Ω(√n)` even for constant
   error** [ESTABLISHED: Sherstov 2009 "Pattern matrix method"; O'Donnell–Servedio sign-degree
   lower bounds; the `√n` is the approximate-degree of `MAJ`].

2. **Evaluation-via-matmul step.** Sum/evaluate `p` over all `2^n` assignments by splitting the
   `n` variables into two halves of `n/2` and writing the count as a product of two
   `2^{n/2} × poly` and `poly × 2^{n/2}` matrices, multiplied by `FRMM` in time
   `≈ 2^{n/2} · poly · (matmul advantage)`, giving the sub-`2^n` total [ESTABLISHED: Williams 2014;
   Coppersmith rectangular matmul / Le Gall].

**The degree blowup is the killer.** Adding a THR layer beneath `ACC0` means each of the up-to-`s`
threshold gates needs a degree-`Θ(√n)` approximation; composing under the `ACC0` polynomial
multiplies degrees, pushing `D` to `n^{Ω(1)}` or worse, which destroys the `poly` middle dimension
of the matmul and kills the speedup. This is the **conservation-of-difficulty trap** [BRIEF: named
as the trap that killed earlier rounds]: every attempt to "approximate the THR cheaply" pays the
`√n` degree back somewhere, and the matmul step inflates to recover `2^n`.

### 2.2 The new idea: stratify by *realized margin*, compute *exactly* per stratum

The degree-`√n` lower bound is a statement about approximating THR **uniformly over all inputs,
including those whose weighted sum sits right at the threshold** (margin near 0). That tiny shell
of near-the-threshold inputs is the *entire* source of the `√n`. **Away from the threshold, THR is
trivial** — it is a constant.

**[NOVEL: unverified] Margin stratification.** Fix a THR gate `g(x) = sign(⟨w,x⟩ − θ)` with
integer weights, `W = Σ|w_i|`. Define for a scale parameter the **margin** `m(x) = ⟨w,x⟩ − θ`.
Partition the input cube `{0,1}^n` into `2K+1` strata by the *dyadic band* of the margin:

- `S_+^j = { x : m(x) ∈ [2^{j-1}, 2^j) }` for `j = 1..K`,
- `S_-^j = { x : m(x) ∈ (−2^j, −2^{j-1}] }` for `j = 1..K`,
- `S_0 = { x : |m(x)| < 1 }` (the "core" / boundary shell; for integer sums `|m| < 1 ⇔ m = 0`,
  i.e. *exactly on the threshold*; convention `sign(0)` fixed).

with `K = ⌈log_2 W⌉ = O(log s + log(\max|w_i|))`. On every stratum **except** `S_0`, the gate value
is a *known constant* (`+1` on `S_+^*`, `−1` on `S_-^*`). So the gate's "hard" part is concentrated
on the single boundary stratum `S_0 = {x : ⟨w,x⟩ = θ}`, an **exact linear equation**, not an
inequality.

This is the pivot: **THR-SAT becomes, per gate, an EXACT-COUNT / linear-equation membership problem
on one stratum, plus trivial constants elsewhere.** Exact linear equations over the integers,
restricted to the boolean cube, are *subset-sum-like* objects with a **lattice / Fourier structure**
that polynomial approximation is blind to — we are no longer fighting the `√n` sign-rank wall, we
are doing exact arithmetic on a thin set.

**Why this is structurally different from the four dead ends [BRIEF]:**

- **vs. conservation-of-difficulty:** We do not approximate THR by anything. There is no degree to
  blow up. The difficulty is relocated to (a) the *number of strata* `O(log W)` — only logarithmic,
  and (b) the *combinatorics of the core stratum* `S_0`. The bet is that `S_0` is *sparse or
  structured enough* that summing over it does not cost `2^n`. (This bet is where it ultimately
  founders — see §6 — but it founders for a *named, sharp* reason, not by hidden re-accumulation.)

- **vs. locality trap:** [BRIEF: earlier attempts assumed the circuit acts "locally" on few
  variables and got crushed because THR is the canonical *non-local* gate.] We make **no locality
  assumption**. A THR gate reads all `n` inputs; the stratification is by a *global* linear form.
  The reduction is to global counting, handled by the global matmul step, not by any junta/locality
  decomposition.

- **vs. vacuous-witness trap:** [BRIEF: an earlier round got a lower bound that was vacuous because
  the "hard function" was trivially not in the class for boring reasons / the witness existed only
  because the class was empty on the instance.] The whole point of pushing the SAT algorithm down to
  `ACC0 ∘ THR` *rather than* hand-crafting a hard function is exactly to avoid manufacturing a
  vacuous separation: the lower bound, if it came, would be `NEXP`/`NQP` via the *generic*
  Williams/Murray–Williams machinery, whose witness (a `NEXP` problem with no small `ACC0∘THR`
  circuits) is non-vacuous by construction (succinct-`3SAT` / the `Easy-Witness Lemma`).

### 2.3 The replacement object: a "bucket comparator," not a polynomial

To feed the matmul step we cannot literally enumerate `S_0`. The new normal-form object that
replaces the probabilistic polynomial is:

**[NOVEL: unverified] Definition (Prefix-Bucket Comparator, PBC).** Split variables `x = (y,z)`,
`|y| = |z| = n/2`. For a THR gate `g`, write `⟨w,x⟩ = a(y) + b(z)` where `a(y) = Σ_{i∈Y} w_i y_i`,
`b(z) = Σ_{i∈Z} w_i z_i`. Then `g(x) = sign(a(y) + b(z) − θ)`. For a *fixed* `y`, the gate as a
function of `z` is the threshold `sign(b(z) − (θ − a(y)))` — a **half-line in the value `b(z)`**.
The PBC for `g` is the pair of sorted lists `(A, B)` where `A = { a(y) : y }` (size `2^{n/2}`,
sorted) and `B = { b(z) : z }` (sorted), augmented with prefix-rank pointers. Membership/value of
`g` on `(y,z)` is then **one comparison + one binary search**, i.e. computable from the *rank* of
`θ − a(y)` inside `B`.

This is the half of the idea that genuinely buys something: a *single* THR gate's truth table over
all `2^n` inputs is summarized by **two sorted lists of size `2^{n/2}`** plus rank arithmetic —
*no `√n` degree anywhere.* The open problem is composing many such gates under `ACC0` (§4).

---

## 3. Setup & definitions

- `n` input variables; circuit `C = E(g_1, ..., g_s)` where each `g_k = sign(⟨w_k, x⟩ − θ_k)` is a
  THR gate (the *bottom layer*) and `E : {±1}^s → {±1}` is an `ACC0` circuit (the *top part*),
  depth `d`, size `s = poly(n)`, modulus set `M` (finitely many `MOD_m`).
- Weights `w_{k,i} ∈ ℤ`, `W_k = Σ_i |w_{k,i}|`, `W = max_k W_k ≤ 2^{poly(n)}` in general
  [ESTABLISHED: THR with `n` inputs needs weights up to `≈ n^{n/2}`, i.e. `poly(n)`-bit, in the
  worst case — Håstad's weight lower bound]. So `K_k = ⌈log_2 W_k⌉ = poly(n)` in the worst case.
  **(Red flag already visible: `K` is `poly(n)`, not `O(log n)`, when weights are huge. Held; see
  §4.3 and §6.)**
- **Probabilistic-polynomial fact for the top.** [ESTABLISHED: Williams 2014; Beigel–Tarui;
  Allender–Hertrampf] The `ACC0` top part `E` has a *deterministic* `SYM ∘ AND` representation:
  `E(u) = h( Σ_T c_T ∏_{k∈T} ℓ_k(u) )` where `h` is some symmetric function, the `AND`s `∏ℓ_k`
  have `polylog`-arity, and the number of terms is `2^{polylog s}`. Equivalently `E = h(P(u))` for a
  multilinear polynomial `P` of degree `polylog s` with `2^{polylog s}` monomials.
- **Goal restated in normal form.** `#SAT(C) = Σ_{x∈{0,1}^n} [ E(g_1(x),...,g_s(x)) = 1 ]`.

---

## 4. The attempt, step by step

### Step 1 — Reduce the top `ACC0` to `SYM ∘ AND` over the THR outputs.
[ESTABLISHED: Beigel–Tarui / Williams.] Write `E(u_1,...,u_s) = h(P(u))`, `u_k = g_k(x) ∈ {0,1}`,
`P(u) = Σ_{T} c_T ∏_{k∈T} u_k`, `deg P = polylog s`, `#monomials = 2^{polylog s} =: m`.
Then
```
#SAT(C) = Σ_x [ h( Σ_T c_T ∏_{k∈T} g_k(x) ) = 1 ].
```
Because `h` is symmetric, it suffices to compute, for each `x`, the integer
`Φ(x) := Σ_T c_T ∏_{k∈T} g_k(x)` and then bucket by `h`. We need
`#{x : Φ(x) = v}` for each value `v` (there are `2^{polylog s}` distinct values). **No new ideas
yet — this is the standard `ACC0` half.**

### Step 2 — Margin-stratify each THR gate (NEW).
[NOVEL: unverified] For each gate `g_k`, replace the boolean `g_k(x) ∈ {0,1}` by its stratum label
`σ_k(x) ∈ { +, −, 0 }`-with-band, per §2.2. Crucially, **`g_k(x)` is determined by `σ_k(x)` on
every stratum except the core**, and on the core stratum `g_k` is fixed by the `sign(0)` convention.
So *the boolean value `g_k(x)` is a function of the (sign-of-margin) alone* — the dyadic bands are
not even needed to know the *value*; they will be needed for the *exact-counting structure* of `S_0`
and for the comparator. Define the **sign vector** `σ(x) = (sign(m_1(x)), ..., sign(m_s(x))) ∈
{+,−}^s` (folding the convention at `0`). Then `Φ(x)` depends only on `σ(x)`:
```
Φ(x) = Ψ(σ(x)),   Ψ : {+,−}^s → ℤ a fixed function computable from {c_T}.
```
So
```
#SAT(C) = Σ_{σ ∈ {+,−}^s} [ h-bucket(Ψ(σ)) = 1 ] · N(σ),   N(σ) := #{ x : sign-pattern(x) = σ }.
```
**This is the crux reformulation.** All the circuit-specific top combinatorics (`E`, `h`, `P`) are
absorbed into a *fixed table* over sign patterns `σ`; the only `x`-dependent quantity is the
**sign-pattern census** `N(σ)` of the *arrangement of `s` hyperplanes* `{⟨w_k,x⟩ = θ_k}` restricted
to the boolean cube. **THR-SAT for `ACC0 ∘ THR` ≡ computing the cube-restricted hyperplane-
arrangement sign-census, then a fixed `2^{poly}`-size lookup.** [NOVEL: unverified — the *reduction*
is correct and easy; its *value* depends on whether `N(σ)` is computable fast, Step 3.]

> Sanity check that this is not vacuous: if all `w_k = 0` the census is one cell `= 2^n` and we get a
> constant — correct. If `s = 1` it is "how many `x` have `⟨w,x⟩ ≥ θ`," a single threshold count,
> which the PBC of §2.3 computes in `2^{n/2}·poly` — correct and *already a speedup* for `s=1`.

### Step 3 — Compute the sign-pattern census via FRMM (NEW packaging of an ESTABLISHED tool).
We must compute `N(σ)` for the (at most `2^s`, but really at most `n^{O(s)}` by the
arrangement-cell bound) realized patterns. Split `x = (y,z)`, `|y|=|z|=n/2`. For gate `k`,
`m_k(x) = a_k(y) + b_k(z) − θ_k`, so `sign(m_k)` depends on whether `b_k(z) ≷ θ_k − a_k(y)`. Define:
- for each `y`: the vector `τ(y) = ( θ_k − a_k(y) )_{k=1..s} ∈ ℤ^s` (a "threshold offset profile");
- for each `z`: the vector `β(z) = ( b_k(z) )_{k=1..s} ∈ ℤ^s`.
Then `σ_k(x) = sign(β(z)_k − τ(y)_k)`, i.e. **the joint sign pattern is the coordinatewise
comparison of two `s`-dimensional integer vectors, one per half-assignment.**

`N(σ) = #{ (y,z) : ∀k, [β(z)_k ≷ τ(y)_k] matches σ_k }`. This is a **`s`-dimensional dominance /
orthant-range-counting** between two point sets of size `2^{n/2}` each. [ESTABLISHED: such
multidimensional dominance counting is exactly what `FRMM`-based offline range counting handles when
`s` is small; for `s = polylog` one can sort/bucket per coordinate.] When `s = poly(n)`, however,
`s`-dim dominance counting is **#P-hard / no `2^{n/2}poly` algorithm known** — this is the wall.

**The key NEW reduction-of-the-reduction:** we do *not* need `N(σ)` for all `σ`; by Step 2 we only
need `Σ_σ [accept] N(σ)`, and `accept(σ) = [h(Ψ(σ)) = 1]` where `Ψ` has degree `polylog s` (it is
`P` evaluated on `±1`). So we need
```
#SAT = Σ_{(y,z)} F( comparison-pattern(τ(y), β(z)) ),   F = accept∘(sign comparisons).
```
`F` is a function of `s` sign comparisons but, *through `Ψ = P`*, only of a degree-`polylog s`
polynomial in those signs. **So we can re-expand `F` as a `SYM ∘ (low-degree in the comparisons)`
and route through matmul:** for each monomial `∏_{k∈T} g_k`, `|T| ≤ polylog s`, the term factors as
a *product of `|T|` single-coordinate threshold indicators*, each of which is a `[β(z)_k ≷ τ(y)_k]`.
A product over `T` of single-coordinate thresholds is a **`|T|`-dimensional orthant indicator**,
`|T| = polylog s`. Counting `Σ_{y,z} ∏_{k∈T}[β(z)_k ≷ τ(y)_k]` is **`polylog s`-dimensional
dominance counting**, which IS doable in `2^{n/2}·2^{polylog s}` by iterated coordinate
sort/prefix-sum (a `polylog`-dimensional Fenwick / offline-orthant scan) [ESTABLISHED: classical
computational geometry; `D`-dim dominance counting of `N` points in `N·log^{D-1}N`, here
`D = polylog s`].

So define `Q := Σ_T c_T · D_T`, where `D_T = Σ_{y,z} ∏_{k∈T}[β(z)_k > τ(y)_k]`. Each `D_T` is a
`polylog`-dim dominance count over `2^{n/2}` "points," **computable in `2^{n/2}·poly(n)` time**.
There are `m = 2^{polylog s}` terms. Hence
```
Σ_{y,z} P( g(x) )  =  Q  computable in time  2^{n/2} · 2^{polylog s} · poly(n).
```
**But we need `Σ_{y,z}[h(P(·))=1]`, not `Σ_{y,z} P(·)`.** Since `h` is symmetric and `P` takes
`2^{polylog s}` values, the standard fix [ESTABLISHED: Williams 2014] is to compute, for each target
value `v`, the count `#{(y,z) : P(·) = v}` by computing the *moments* `Σ (P)^r` for
`r = 0..(\#values)` and inverting — but `(P)^r` has degree `r·polylog s`, blowing the per-term
dominance dimension to `r·polylog s`. For `ACC0` this is fine because the number of distinct values
is `2^{polylog}` so `r = 2^{polylog}` and the dimension stays `2^{polylog}`... **and here is the
re-accumulation.** See §6. Holding the optimistic line for one more step:

### Step 4 — Assemble and claim the speedup (CONDITIONAL).
[NOVEL: unverified, CONDITIONAL on Step 3's value-recovery not blowing the dimension past `n^{δ}`.]
If the value-recovery dominance dimension stays `D* = n^{o(1)}` (subpolynomial), the total time is
`2^{n/2} · 2^{D*} · poly = 2^{n/2 + n^{o(1)}} = 2^{n - (n/2 - n^{o(1)})} \ll 2^n`, the required
`2^{n−n^δ}` with `δ = 1`. Plugging into Williams/Murray–Williams [ESTABLISHED] yields
`NQP ⊄ ACC0 ∘ THR` of poly size. **This is the target — IF `D* = n^{o(1)}`.**

### Step 4′ — The honest correction.
The dimension `D*` is **not** `n^{o(1)}` in general. The dominance dimension equals (top `ACC0`
poly degree) × (number of moment powers needed to recover `h`). For `ACC0`, top degree is `polylog s`
and the value range of `P` is `2^{polylog s}`, so naive moment recovery needs `2^{polylog s}` powers
⇒ `D* = 2^{polylog s} = quasipoly`, and `2^{D*} = 2^{quasipoly} \gg 2^{n}`. **Catastrophic.** The
CLW resolution for the *pure `ACC0`* case avoids this because there the `g_k` are themselves the
inputs and the value-recovery is folded into the *probabilistic polynomial over a small field* with
a *low-degree symmetric* outer function, never materializing `2^{polylog}` real moments. To port
that here we would need the comparisons `[β(z)_k > τ(y)_k]` to be computed *inside the same small
field*, i.e. we need a **low-degree field representation of the comparison**, which is *exactly the
THR-degree object we set out to avoid* — `√n` again. **The conservation-of-difficulty trap reasserts
itself at Step 4 unless the Margin-Sparsity Lemma (below) holds.**

### Step 5 — The Margin-Sparsity Lemma: the bet, and its falsification.
[NOVEL: stated, then **refuted**.] The only way to keep `D*` small while recovering `h` exactly is to
ensure the *core* stratum `S_0` (margin `= 0`) is small, so that off-core every `g_k` is constant and
the value-recovery collapses. Formally:

> **(MSL, hoped)** For every THR gate `g_k`, `#{x : ⟨w_k,x⟩ = θ_k} ≤ 2^{n − n^{Ω(1)}}`, AND the
> *joint* core `#{x : ∃k, m_k(x)=0}` is `≤ 2^{n − n^{Ω(1)}}`; off this joint core, `σ(x)` is locally
> constant on a partition into `n^{O(1)}` boxes.

**MSL is FALSE.** Counterexample [NOVEL but elementary]: take `w_k = (1,1,...,1)`, `θ_k = n/2`
(`n` even). Then `⟨w,x⟩ = θ` ⇔ `|x| = n/2`, and `#{x : |x| = n/2} = \binom{n}{n/2} = Θ(2^n/√n)`.
That is `2^{n − O(log n)}`, **not** `2^{n − n^{Ω(1)}}`. The core stratum of a single `MAJ` gate is a
`1/√n` fraction of the cube — *polynomially* thin, not *exponentially* thin. This is the
combinatorial shadow of the `√n` approximate-degree bound: the boundary shell of `MAJ` has measure
`Θ(1/√n)`, and **summing a hard top function over a `2^n/√n`-size set is not obviously sub-`2^n`.**
So the bet that "the hard part is a thin core" buys only a `1/poly` factor, which is *useless* for a
`2^{n−n^δ}` speedup. **MSL dead.**

### Step 6 — The salvage (bounded margin-spread sub-class).
[NOVEL: unverified, but I believe it.] Define `ACC0 ∘ THR[Δ]` = the sub-class where every THR gate
has **margin spread `≤ Δ`**: i.e. the realized values `{⟨w_k,x⟩ − θ_k : x}` lie in an interval of
`2^{Δ+1}` distinct integers around `0` only for an `o(1)` fraction, equivalently the gate behaves
like a *constant* off a `2^{n−Δ}`-fraction — the "**robust margin**" regime. For this sub-class the
core is genuinely `2^{n−Δ}`-thin and **Step 4 goes through with `D* = poly(Δ, polylog s)`**: when
`Δ = n^{Ω(1)}` we get the `2^{n−n^δ}` speedup and hence `NQP ⊄ ACC0 ∘ THR[n^{Ω(1)}]`.
**Caveat (honest):** robust-margin THR is close to "`THR` of bounded *discrepancy*", and lower
bounds against bounded-discrepancy / large-margin threshold circuits are *already known by the
discrepancy/`Forster` method* — so this salvage likely **does not beat the state of the art**; it
re-derives a known regime through the SAT route. Its only value is methodological (showing the SAT
route *can* reach the large-margin regime non-algebraically).

---

## 5. Barrier audit

**(a) Relativization.** Evaded. [ESTABLISHED: the algorithmic method is non-relativizing —
Williams's `ACC0` proof does not relativize; the matmul/circuit-analysis is inherently non-black-box.]
Our Steps 1–4 manipulate the *syntactic* circuit (weights, the `SYM∘AND` expansion, the arrangement
of hyperplanes), never as an oracle. ✔ non-relativizing.

**(b) Algebrization.** Evaded **by design**. [BRIEF + ESTABLISHED: Aaronson–Wigderson; the brief
flags the CLW *combinatorial* (non-algebraic) normal form precisely to dodge algebrization.] The
margin-stratification and the dominance-counting (Step 3) are **purely combinatorial / order-
theoretic** — sorting integers, prefix sums, rank queries. They are *not* low-degree polynomial
identities over an extension field, so the algebrization barrier (which obstructs proofs that go
through low-degree polynomial extensions / sum-check) does not apply. ✔ The *risk* is that Step 4′'s
"recover `h` via moments" reintroduces a polynomial/algebraic flavor — and indeed that step is where
it breaks. So the barrier-evasion and the failure point coincide, which is informative: **staying
combinatorial keeps us barrier-clean but is exactly what we cannot afford at value-recovery.**

**(c) Natural Proofs (Razborov–Rudich).** Evaded. [ESTABLISHED: algorithmic-method lower bounds are
believed non-natural because they target `NEXP/NQP`, not a `P/poly`-constructive property, and rely
on the non-constructive `Easy-Witness Lemma`.] Our route produces (if it worked) `NQP ⊄ ACC0∘THR`
via the SAT-algorithm ⇒ lower-bound implication, **not** by exhibiting a natural combinatorial
property dense in random functions. Concretely there is **no largeness/constructivity pair** here:
we never claim "random functions are hard for `ACC0∘THR`"; we claim a *specific* `NQP` function is.
✔ non-natural. (Aside: `ACC0∘THR` is one of the classes where we *do* believe pseudorandom functions
might live, so a *natural* lower bound would be barrier-blocked — another reason the non-natural SAT
route is the only viable one.)

**(d) The THR-specific lower-bound barriers (the ones the strategy names).**
- **Sign-rank / Forster barrier.** [ESTABLISHED: Forster 2002; sign-rank lower bounds limit what the
  *discrepancy* method proves; large-margin THR is exactly the easy regime.] Our salvage (§6) lands in
  the **large-margin** regime, the side of the Forster barrier where lower bounds are *known* — so we
  do not break it, we sit inside its allowed zone. The *general* `ACC0∘THR` (small margin / core of
  size `2^n/√n`) is on the hard side, and that is precisely where Step 5 (MSL) fails. **So the THR
  barrier and our failure point are the same wall**, identified sharply.
- **Approximate-degree `√n` barrier.** Encountered head-on at Step 4′ and §5(b). Our whole strategy
  was to dodge it via exact stratification; we succeeded in *removing it from Steps 1–3* but it
  **re-enters at value-recovery** through the moment expansion. This is the honest verdict: the
  degree blowup is *deferred* from the approximation step to the counting-recovery step, not
  *eliminated*.

---

## 6. Ruthless self-identification of the weakest step

**THE weakest step is Step 4′ / Step 5 (value recovery + Margin-Sparsity).** Specifically:

> To get `#{x : E(g(x))=1}` (not just `Σ P`) in sub-`2^n` time, we must recover the action of the
> symmetric outer function `h` on the `2^{polylog s}` possible values of `P`. Doing this
> *combinatorially* (to stay barrier-clean) forces a moment expansion whose dominance dimension
> `D*` blows to `2^{polylog s}`, giving running time `2^{2^{polylog s}} ≫ 2^n`. Doing it
> *algebraically* (small-field probabilistic polynomial, as CLW do for pure `ACC0`) requires a
> *low-degree* representation of the THR comparison `[β_k > τ_k]`, which has approximate-degree
> `Θ(√n)` — the very thing we banned.

I tried to escape via MSL (core is exponentially thin ⇒ off-core the value-recovery is trivial). I
**refuted MSL** with the `MAJ` counterexample: the core of a single majority gate is `Θ(2^n/√n)`,
only polynomially thin. **The `√n` is conserved**: it appears as approximate-degree, as core-shell
measure `1/√n`, and as sign-rank — three faces of one obstruction, and my stratification only moved
it between faces. This is the conservation-of-difficulty trap, caught red-handed at Step 4′.

Second-weakest: the `[BRIEF]` provenance — I could not verify the exact prior-attempt write-ups, so
my mapping "this avoids trap X" rests on the brief's summary of those traps, not their text. If
(say) the "vacuous-witness" trap was subtler than I modeled, my §2.2 dismissal of it is weaker than
stated.

Third: in Step 6 I assert the salvage "likely does not beat state of the art" — I did not pin down
the exact known result on large-margin `ACC0∘THR` SAT/lower bounds, so the salvage's novelty is
*unaudited* (it might be slightly new for *depth-`d` ACC0* tops rather than just `AC0` tops).

---

## 7. What must be true for it to go through; honest self-grade

**Sufficient condition for the full theorem.** The attempt closes **iff** there is a
*combinatorial* (order/rank-based, no `√n`-degree polynomial) algorithm for the following:

> **(OPEN-CORE)** Given `2^{n/2}` integer vectors `{τ(y)} ⊂ ℤ^s` and `2^{n/2}` integer vectors
> `{β(z)} ⊂ ℤ^s`, and a symmetric-function-composed-with-degree-`polylog s` acceptance predicate
> `accept(σ)`, compute `Σ_{y,z} accept(sign(β(z)−τ(y)))` in time `2^{n/2}·2^{n^{o(1)}}`.

For `polylog`-degree *monomials* this is `polylog`-dim dominance counting — **solved** (Step 3). The
gap is purely the **symmetric outer recombination** `h`. So the entire P-vs-NP-relevant difficulty
has been **localized to one crisp question:** *can multi-dimensional dominance counting be combined
under a symmetric outer function without paying the value-range `2^{polylog}` in the exponent?*

- If **YES** (e.g. a clever generating-function / convolution over the `polylog`-dim dominance
  counts that recovers `h`'s buckets in `2^{n^{o(1)}}` extra time): full theorem, `NQP ⊄ ACC0∘THR`.
  I see *no* reason this is impossible — it is a concrete, well-posed algorithmic question — but I
  also have no algorithm and the moment-blowup is a real obstacle.
- If **NO**: the SAT route stalls at exactly the large-margin/discrepancy frontier, recovering only
  the §6 salvage.

**What I am confident is genuinely new and correct:**
- The **margin-stratification normal form** reducing `ACC0∘THR`-SAT to the *cube-restricted
  hyperplane-arrangement sign-census* (Step 2). This is clean, correct, and (to my knowledge) not the
  standard packaging.
- The **PBC / two-sorted-list** exact summary of a single THR over `2^n` inputs via `2^{n/2}` data,
  degree-free (Step 3 base case) — and its extension to `polylog`-dim dominance for low-degree
  monomials, which **does** give a real `2^{n/2}poly` algorithm for `SYM_{low-deg} ∘ THR`-SAT.
- The **sharp localization** of the entire obstruction to (OPEN-CORE), and the **identification that
  the `√n` reappears as the `1/√n` core-shell measure** (the MAJ counterexample), tying the
  approximate-degree, sign-rank, and stratification pictures together.

**Self-grade: `partial-conditional`.**
Reasoning: I did not prove the SAT speedup and I correctly refuted my own enabling lemma (MSL), so
this is not `plausible-progress` toward the theorem in the strong sense. But it is **not a flat
dead-end**: (i) the normal form is a real, reusable reduction; (ii) it yields an unconditional new
SAT algorithm for `SYM_{low-deg} ∘ THR` and for the large-margin sub-class; (iii) it pins the whole
P-vs-NP-relevant gap onto one concrete, barrier-clean algorithmic question (OPEN-CORE) about
symmetric recombination of low-dimensional dominance counts. A future attempt should aim *directly*
at (OPEN-CORE) and should expect the `1/√n` core measure to be the adversary.

**Collision with known barriers — final verdict.** Non-relativizing ✔, non-algebrizing ✔ (until the
fatal value-recovery step, which is where it would *have* to become algebraic and breaks), non-
natural ✔. It does **not** break the THR sign-rank/discrepancy barrier; it stops exactly at that
barrier's hard boundary (small-margin THR), which is strong evidence the obstruction is *real and
correctly located*, not an artifact of a clumsy reduction.

---

## Adjudication (2026-05-30)

**Ruling: BROKEN** (as a proof of the stated target NQP ⊄ ACC⁰ ∘ THR / the 2^{n−n^δ} SAT speedup).

**Exact death point:** Step 4′ / Step 5 — value recovery of the symmetric outer ACC⁰ function h, i.e. computing #{x : E(g(x))=1} rather than the polynomial sum Σ_x P(g(x)). This step is gated by the **Margin-Sparsity Lemma (MSL)**, which is **false** and is correctly self-refuted by the author. The MAJ counterexample is verified numerically here: for w=(1,…,1), θ=n/2 the core S₀={x:|x|=n/2} has size C(n,n/2)=Θ(2ⁿ/√n); the deficit n − log₂|S₀| = ½log₂n + O(1) = O(log n) (computed: 2.35 at n=16, 3.33 at n=64, 4.33 at n=256, 5.33 at n=1024), never n^Ω(1). The core is Θ(1/√n)-thin (polynomially thin), not 2^{n−n^Ω(1)}-thin. With MSL dead, both completion routes fail: (a) combinatorial moment recovery over 2^{polylog s} distinct values of P blows the dominance dimension to D*=2^{polylog s}, giving runtime 2^{n/2+2^{polylog s}} ≫ 2ⁿ (worse than brute force); (b) the algebraic CLW small-field route requires a low-degree field representation of the THR comparison [β_k > τ_k], whose approximate degree is Θ(√n) by Paturi/Nisan–Szegedy — exactly the object the stratification was built to ban. The √n is conserved across three faces (approximate degree, 1/√n core-shell measure, sign-rank/Forster); stratification only relocates it. The §6 large-margin salvage lands in the regime where discrepancy/Forster lower bounds are already known and advances nothing.

**Structural verdict:** The §7 OPEN-CORE "localization" is a lossless, identity-preserving restatement of the target SAT speedup. Step 2's sign-census is the definition of a threshold circuit (zero new content); Steps 1 (Beigel–Tarui) and 3 (meet-in-the-middle) are standard and lossless. The only place 2ⁿ difficulty could have been shed was the MSL, which is false. Hence Σ_{y,z} accept(sign(β(z)−τ(y))) IS #SAT(C) verbatim — solving OPEN-CORE in 2^{n/2}·2^{n^{o(1)}} is logically equivalent to the target separation. The reduction is circular: a conservation-of-difficulty failure.

**Barrier audit result:** relativizes=no (canonical non-relativizing algorithmic-method skeleton; correct), naturalizes=no (flows through SAT→LB + Easy-Witness toward a specific NQP function, no largeness/constructivity pair; correct), algebrizes=unclear (the load-bearing soft spot: the only completing step is the algebraic one the author concedes cannot be afforded, hitting the approximate-degree/sign-rank wall; but no completed algebraic proof exists to trigger a fatal "yes"). No single barrier is fatally tripped — but this is irrelevant to the ruling: the theorem is simply not proved, the enabling lemma is refuted, and the residual is circular. The barrier-clean fragment (Steps 1–3) is incomplete; completion is blocked precisely at the √n wall.

**Vote tally:** Red-team 5/5 BROKEN (all sev=fatal): barrier, rigor, literature, quantitative, circularity — all converge on the same death point (Step 4′/5, false MSL). The independent barrier review returned "inconclusive" only in the narrow sense that no barrier is fatally tripped; it does not certify a proof. Adjudicator concurs with the unanimous BROKEN finding on the stated theorem.

**Brokenness score: 7/10.** Not trivial/vacuous (the Σ_x P(g(x)) sub-algorithm via low-dim dominance counting is real, and the write-up is unusually honest — self-grading partial-conditional and refuting its own lemma), so not a 9–10. But the central deliverable (the OPEN-CORE localization) is an identity-preserving restatement of the target — a conservation-of-difficulty/circularity failure — and the enabling lemma is demonstrably false, placing it well above the airtight end. The honesty and crisp localization of the wall keep it off the bottom.

**Salvageable residue:** (1) The margin-stratification normal form (ACC⁰∘THR-SAT ≡ cube-restricted hyperplane-arrangement sign-census + fixed 2^poly lookup) is a clean, correct structural reduction. (2) The prefix-bucket comparator / polylog-dimensional dominance counting gives a genuine 2^{n/2}·poly algorithm for SYM_{low-deg}∘THR-SAT (computing Σ_x P, not #SAT) — a real, if not theorem-closing, algorithmic tool. (3) The explicit identification that the √n approximate-degree wall is conserved and re-manifests as the 1/√n core-shell measure is a useful diagnostic: any future attempt must defeat Paturi's bound to thin the core, which the polynomial method cannot. (4) The crisp OPEN-CORE question is well-posed — but note it is equivalent in strength to the target, so it is a restatement, not a reduction to something genuinely easier; a repair round should treat that equivalence as the thing to break, not assume away.
