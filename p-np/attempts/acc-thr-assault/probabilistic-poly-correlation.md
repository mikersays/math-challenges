# ACC0 ∘ THR Assault: Probabilistic-Polynomial-with-Correlation + Rectangular Matmul

Strategy codename: **probabilistic-poly-correlation**

Author pass: serious attempt, honest accounting. The bottom line is stated up
front so no reader is misled: **this attempt does not break the
conservation-of-difficulty wall. It sharpens the wall into a quantitative
dichotomy and isolates the single inequality that any future attack must
violate.** That sharpening — plus one genuinely new structural recombination
(exact THR-by-matmul kept *out* of the probabilistic union bound) — is the
deliverable. Per the project rules, a sharpened, well-documented dead-end is the
intended outcome of a genuine assault, and that is what this is.

---

## 1. Goal & precise claim

### Target theorem (aspirational)
> There is a deterministic algorithm solving GAP-SAT (equivalently CAPP, the
> Circuit Acceptance Probability Problem to additive error 1/6) for circuits in
> the class **C = ACC0 ∘ THR** — an ACC0 circuit of depth `d` and quasipolynomial
> size on top of a single bottom layer of linear-threshold (LTF) gates over the
> `n` Boolean inputs — running in time `2^{n}/n^{ω(1)}` (superpolynomial savings),
> and ideally in time `2^{(1-δ)n}` for a constant `δ>0`.

By the algorithmic method [ESTABLISHED: Williams 2011; Murray–Williams 2018]:
- superpolynomial savings ⇒ `NEXP ⊄ C` (and `NQP ⊄ C` via Murray–Williams);
- mild-exponential savings `2^{n-n^{ε}}` ⇒ quasi-NP `⊄ C` [ESTABLISHED:
  Chen–Lyu–Williams 2018, "Beyond Natural Proofs"];
- **constant-rate** savings `2^{(1-δ)n}` for poly-size `C` would push the hard
  class down toward **NP ⊄ C** — this is the genuine "pushing down" frontier the
  referees flagged.

### What is already known (must be honest)
- [ESTABLISHED: Williams 2014, "New algorithms and lower bounds for circuits with
  linear threshold gates"] already gives a `#SAT` algorithm for `ACC0 ∘ LTF` of
  subexponential size in time `2^{n-n^{δ}}`, hence `NEXP ⊄ ACC0 ∘ THR` (poly
  size) is **already a theorem**. Chen–Lyu–Williams / Murray–Williams sharpen the
  hard class to quasi-NP.

So the *base case* the prompt calls "the open edge" is, at the NEXP/quasi-NP
level, **closed**. The actually-open targets are:
  (i) **scaling the hard class down** (NEXP/quasi-NP → NP), requiring
      constant-rate savings, and/or
  (ii) **scaling the circuit class up** (e.g. `ACC0 ∘ THR ∘ THR`, two threshold
      layers, or `THR ∘ THR` with super-linear wires).

This document targets (i) primarily, and audits (ii).

### Precise claim actually established here
> **Claim (Dichotomy Lemma, NOVEL framing of established facts).** For the
> probabilistic-polynomial + rectangular-matmul approach to GAP-SAT on
> `ACC0 ∘ THR`, let `D` be the degree of the probabilistic polynomial used for the
> circuit and let the per-input error probability be `ε`. Then *simultaneously*:
> (a) correctness of the global acceptance-count estimate requires
>     `T · ε · 2^{n} = o(gap · 2^{n})`, i.e. `ε = o(gap/T)` where `T` is the number
>     of SYM∘AND terms; and
> (b) nontrivial time savings via the split-and-multiply evaluation requires the
>     monomial count `M = 2^{H(D/n)·n + o(n)}` to satisfy `M ≲ 2^{0.17·n/2}` for
>     superpolynomial savings, and `H(D/n) < 1/2 - δ'` for *constant-rate*
>     savings.
>
> For an LTF gate, achieving error `ε` requires degree
> `D = Θ(√(n·log(1/ε)))` [ESTABLISHED: Alman–Chan–Williams 2016]. Substituting (a)
> into this degree bound forces `D = Θ(n)` as soon as `log(1/ε) = Θ(n)` (which (a)
> demands whenever `gap/T = 2^{-Θ(n)}`), and then `H(D/n) → 1`, contradicting (b)
> at the constant-rate level. **Hence the two requirements are not independently
> tunable: the regime giving constant-rate savings is exactly the regime where the
> union bound fails.** The crossover is a sharp wall, not a knob.

This is the conservation-of-difficulty trap made quantitative for this specific
method. The contribution is (1) the exact inequality that must be violated, and
(2) a structural move that removes the THR layer from the union bound (so the wall
is purely about the ACC0 SYM-count error, not the threshold error) — which
narrows where a future breakthrough must come from, without itself breaking the
wall.

---

## 2. The core NEW idea vs prior failed attempts

### 2a. The new structural move: *exact* THR via split-sum tables, kept OUT of the union bound

[NOVEL framing; the ingredients are ESTABLISHED]

Every prior framing in this project treated the THR layer the way the ACC0 layer
is treated: approximate each gate by a probabilistic polynomial, multiply, union
bound over all gates and all inputs. That dumps the threshold's intrinsic
`Θ(√n)`-to-`Θ(n)` degree straight into the error budget.

The new move exploits that an LTF gate is **not an arbitrary high-degree
function**. `g_j(x) = [⟨w_j, x⟩ ≥ θ_j]` depends on `x` only through the single
integer `s_j = ⟨w_j, x⟩`. Split the inputs `x = (y,z)`, `|y|=|z|=n/2`. Then
```
s_j = ⟨w_j^{(y)}, y⟩ + ⟨w_j^{(z)}, z⟩ =: a_j(y) + c_j(z),
```
so the sign bit `b_j = [a_j(y)+c_j(z) ≥ θ_j]` is an **exact** 2-D threshold in the
pair `(a_j(y), c_j(z))`. For poly-bounded weights (LTF = MAJ-of-copies, the case
the BT pipeline actually consumes) each `a_j(y), c_j(z)` is an integer in a
poly-size range, i.e. `O(log n)` bits.

**Consequence:** the bottom THR layer can be computed *exactly* on each side of the
split and folded into the rectangular-matrix feature maps, contributing **zero**
to the probabilistic-polynomial degree and **zero** to the per-input error `ε`.
The probabilistic polynomial is then needed *only* for the ACC0 (`SYM∘AND`) part,
acting on **exact** Boolean bits `b_j`, which is the standard ACC0 case with
`ε` as small as we like at polylog degree.

This is the right way to think about why `ACC0 ∘ THR` is tractable at all, and it
isolates the union-bound wall to the SYM-count, not the threshold.

### 2b. Why this dodges the three traps that killed earlier rounds

- **Vacuous-witness / easy-witness trap** (the failure mode where the lower bound
  is "proved" only because the witness circuit is trivially absent): we never
  invoke easy-witness for the *algorithm*; the algorithm is a concrete evaluation
  procedure. The transfer (Williams) uses easy-witness on the *conclusion* side,
  which is ESTABLISHED and not where our novelty lives. We are not smuggling the
  lower bound into a vacuous quantifier.
- **Locality trap** (the AC0-restriction failure: a property local enough to be
  natural): the savings here come from *global* rectangular matrix multiplication
  over a feature space of joint `(a_j(y))_{j∈S}` patterns — an inherently
  non-local, non-monotone, algorithm-defined object. There is no Boolean-function
  property being tested; cf. §5.
- **Conservation-of-difficulty trap**: we *confront* it rather than pretend to
  dodge it. §6 shows precisely where it reappears (the SYM-count union bound) and
  proves it is a sharp dichotomy. The novelty (2a) genuinely *removes one term*
  (the THR error) from the budget — that is real, it just is not enough.

### 2c. The honest delta vs Williams 2014 / ACW 2016

Williams 2014 already handles `ACC0 ∘ LTF` by, in effect, the split-sum table
idea (he uses a "fast evaluation of the inner symmetric function over the count"
combined with handling LTFs via their sums). ACW 2016 already pairs
probabilistic polynomials for THR with rectangular matmul. So 2a is best
described as **a clean conceptual separation** of the two error sources, not a
new algorithm. Its value is diagnostic: it shows the constant-rate barrier is
*entirely* about the SYM-count error and not at all about thresholds. That is a
sharper localization of the open problem than the prior notes contained.

---

## 3. Setup & definitions

- **Inputs:** `x ∈ {0,1}^n`, split `x=(y,z)`, `|y|=|z|=n/2`.
- **C = ACC0 ∘ THR:** bottom layer of `L = poly(n)` LTF gates
  `g_1,…,g_L`, feeding an `ACC0` circuit `Φ` of depth `d=O(1)` and size
  `s = quasipoly(n)` with `MOD_m` gates, `m` constant.
- **Beigel–Tarui normal form** [ESTABLISHED: Yao 1990; Beigel–Tarui 1994;
  Allender–Gore]: `Φ` is equivalent to `SYM ∘ AND`, a symmetric function `h` of a
  count `t(b) = Σ_{i=1}^{T} A_i(b)` where each `A_i` is an `AND` of
  `(log s)^{O(d)} = polylog(n)` literals (here, literals over the bits `b_j`), and
  `T = 2^{polylog(n)}` (quasipolynomial). `h: {0,…,T} → {0,1}` is an arbitrary
  symmetric function given by a lookup table of size `T+1`.
- **Probabilistic polynomial for AND/LTF** [ESTABLISHED: Razborov–Smolensky for
  `AND` mod p; Alman–Chan–Williams 2016 for LTF]: an `AND` of `k` bits has an
  exact multilinear poly of degree `k`; an `LTF` has a probabilistic poly of
  degree `O(√(n log(1/ε)))` and pointwise error `≤ ε`.
- **Rectangular matrix multiplication** [ESTABLISHED: Coppersmith 1982; Le Gall
  2012]: multiplying `N × N^{α} · N` costs `N^{2+o(1)}` for `α ≤ 0.172…`.
- **CAPP / GAP-SAT** [ESTABLISHED: Murray–Williams]: estimate
  `Pr_x[C(x)=1]` to additive `1/6`; suffices for the lower-bound transfer.

---

## 4. The attempt, step by step

**Step 1 [ESTABLISHED + NOVEL recombination].** Compute the bottom THR layer
exactly via split sums. For each `y`-assignment (there are `2^{n/2}`) compute the
vector `a(y) = (a_1(y),…,a_L(y))` of integers; likewise `c(z)` for each
`z`-assignment. Cost `2^{n/2} · poly(n)` each side. *No error introduced.*

**Step 2 [ESTABLISHED: Beigel–Tarui].** Replace `Φ` by `h(t(b))`,
`t(b) = Σ_i A_i(b)`, `T` terms, each `A_i` an `AND` of `polylog` sign bits `b_j`.

**Step 3 [ESTABLISHED: low-degree poly for AND over exact bits].** Each `A_i` is
an exact multilinear monomial of degree `polylog(n)` in the `b_j`. **No
probabilistic polynomial and no error is needed for the AND layer** because its
inputs `b_j` are exact (Step 1). So far `ε = 0`.

**Step 4 [the crux — ESTABLISHED that it is *needed*, NOVEL where the cost lands].**
We must evaluate `Σ_x h(t(x))` (or its `gap` estimate). The obstruction: each
monomial `A_i(b) = Π_{j∈S_i} b_j` does **not** factor across the `y/z` split,
because `b_j = [a_j(y)+c_j(z) ≥ θ_j]` couples `y` and `z`. To run rectangular
matmul we must linearize `Σ_x h(t(x))` as `Σ_{y,z} ⟨Φ_h(y,·), Ψ_h(z,·)⟩`.

Linearization via *joint pattern enumeration*: for a monomial `A_i` reading
`|S_i| ≤ polylog` thresholds, the `y`-side feature is the tuple
`(a_j(y))_{j∈S_i}` of `polylog` integers in poly range; the `z`-side feature is
`(c_j(z))_{j∈S_i}`. The number of distinct `y`-side features per monomial is
`(poly)^{polylog} = 2^{polylog(n)}`. The symmetric outer function `h` over a count
in `{0,…,T}` is handled by the standard generating-function / interpolation table
of size `T+1 = 2^{polylog(n)}`.

Total feature dimension:
```
M' = (#monomials T) · 2^{polylog} · (T+1) = 2^{polylog(n)}.
```

**Step 5 [ESTABLISHED: rectangular matmul].** Evaluate via
`A · B` where `A` is `2^{n/2} × M'`, `B` is `M' × 2^{n/2}`. Since
`M' = 2^{polylog(n)} ≪ 2^{0.17·n/2}`, this is `2^{n + o(n)}` by Le Gall; Williams'
uneven-split balancing squeezes a factor `n^{ω(1)}` below `2^n`.

**Step 6 [ESTABLISHED: Williams / Murray–Williams transfer].** Superpolynomial
savings ⇒ `NEXP ⊄ ACC0 ∘ THR`, `NQP ⊄ ACC0 ∘ THR`. (Re-derives the known
theorem.)

**Step 7 [the open step — where I try to push DOWN to NP, and fail honestly].**
To reach `NP ⊄ C` we need Step 5 to give **constant-rate** savings
`2^{(1-δ)n}`. This requires either (a) the matmul to beat `2^n` by a constant
factor, or (b) the feature dimension `M'` to satisfy `M' = 2^{cn}` with `c<1/2`
*strictly*, so that even the trivial split-evaluation `2^{n/2}·M'·(...)` is
`2^{(1/2+c)n}` with constant savings. See §6 for why neither is attainable.

---

## 5. Barrier audit

- **Non-relativizing:** the algorithm manipulates the explicit Beigel–Tarui
  normal form and the explicit linear forms `w_j` of the threshold gates. Relative
  to a generic oracle the SYM∘AND normal form and the split-sum structure both
  fail; an oracle gate has no low-degree / count structure. [Consistent with
  SYNTHESIS.md's account of how the algorithmic method threads relativization.]

- **Non-natural (Razborov–Rudich):** there is **no Boolean-function property**
  being tested for largeness+constructivity. The object produced is a *uniform
  algorithm* whose savings drive a *uniform* diagonalization (easy-witness lemma)
  against `NEXP/NQP`. The hardness is for a huge uniform class, not a property of
  a single function family, so the natural-proofs obstruction does not apply. The
  feature space of Step 4 is algorithm-defined and global, not a local combinatorial
  invariant. **Caveat:** any attempt in §7 to push to NP must keep this property —
  a constant-rate SAT algorithm is fine (it is still uniform), but if a future fix
  smuggled in an average-case distinguisher it would risk naturalness. Flagged.

- **Non-algebrizing (Aaronson–Wigderson):** the speedup uses the *combinatorial*
  Beigel–Tarui count and the *integer* split-sum tables of the thresholds, not an
  algebraic low-degree extension of an oracle. The probabilistic polynomials are
  applied to the concrete circuit, never to an oracle's polynomial extension. This
  is the Chen–Lyu–Williams "combinatorial normal form" route the prompt
  identified as non-algebrizing. [ESTABLISHED that the ACC0 method is
  non-algebrizing.]

All three barriers are passed by the *re-derivation* of the known NEXP result
(Step 6), exactly as in the literature. The §7 push to NP, **if** it succeeded,
would also pass them — but it does not succeed (§6).

---

## 6. Ruthless self-identification of the weakest step

**The weakest step is Step 7, and it does not go through. Here is exactly why,
stated as the Dichotomy Lemma's proof.**

There are precisely two candidate sources of savings; both are capped.

**(i) Matmul margin cannot give a constant factor.** Le Gall's rectangular
`N × N^{α} × N` is `N^{2+o(1)}` for `α ≤ 0.172`. With `N = 2^{n/2}` and
`M' = 2^{polylog} = N^{o(1)}`, the product is `2^{n+o(1)}` — *equal* to brute
force up to lower-order terms. Williams extracts `2^n / n^{ω(1)}` by an uneven
split (`|y| = n/2 + Θ(log n)`), but this is intrinsically a **subpolynomial /
mild-exponential** trick: the saved factor is governed by how far `M'` sits below
the `2^{0.17|y|}` "free" threshold, and `M' = 2^{o(n)}` puts it `o(n)` below, never
`Θ(n)` below. A *constant-factor* time win `2^{(1-δ)n}` would require
`M' ≤ 2^{(0.17 - δ')·n/2}` to buy the margin **and** simultaneously a matmul
exponent strictly below 2 on the short dimension at constant offset, which
Coppersmith/Le Gall do not provide as a `2^{(1-δ)n}` runtime. **Matmul gives at
most `2^n/poly`, never `2^{(1-δ)n}`, when the long dimension is `2^{n/2}`.**

**(ii) Degree savings and bounded error are in direct opposition.** Suppose
instead we try to make `M' = 2^{cn}` with constant `c < 1/2` so that even the
naive split-eval `2^{(1/2+c)n}` beats `2^n` by constant `δ = 1/2 - c`. The
monomial count of a degree-`D` polynomial in `n` Boolean variables is
`M' = 2^{H(D/n)·n + o(n)}`, so `c = H(D/n)`, requiring `D = Θ(n)` (linear degree).

But the only place linear degree can enter our pipeline is if some layer's
probabilistic polynomial has degree `Θ(n)`. After the §2a move, the THR layer
contributes *zero* degree, and the `AND` layer contributes only `polylog`. To get
`D = Θ(n)` we would have to **reintroduce** a high-degree probabilistic
representation somewhere with per-gate error `ε`. The correctness requirement for
the global count is
```
(total error) = T · ε · 2^{n}  ≤  gap · 2^{n}   ⟹   ε ≤ gap / T = 2^{-polylog} or smaller.
```
If the gap is itself exponentially small (the worst case for GAP-UNSAT / #SAT),
`gap/T = 2^{-Θ(n)}`, forcing `log(1/ε) = Θ(n)`, and by Alman–Chan–Williams the
degree needed for an LTF at that error is `D = Θ(√(n · n)) = Θ(n)`. Then
`H(D/n) → 1`, so `M' → 2^{n}`, and we are back at brute force. **Linear degree
(needed for constant-rate savings) and small error (needed for correctness) are
the same parameter pulling in opposite directions.**

The crossover where both constraints are tight is a **point**, not an interval:
- `D = polylog` ⇒ correct, but savings only `n^{ω(1)}` ⇒ hard class `NEXP/NQP`.
- `D = Θ(n)` ⇒ savings constant-rate, but `T·ε·2^n` overflows ⇒ algorithm wrong.

There is no continuous family of `(D, ε)` interpolating *correct* and
*constant-rate-fast*. This is the conservation-of-difficulty trap as a sharp
dichotomy. **The §2a structural move does not change this: it only certifies that
the THR layer is innocent — the dichotomy is entirely about the SYM-count error
budget `T·ε·2^n`.**

**Subsidiary weak point (for direction (ii), scaling the class UP to
`ACC0 ∘ THR ∘ THR`):** the §2a split-sum trick breaks for *two* threshold layers,
because the top threshold reads sign bits `b_j` that are *joint* `(y,z)` functions;
its own input sum `Σ_j v_j b_j` does **not** decompose as `a(y)+c(z)`. So a second
threshold layer forces a genuine probabilistic polynomial of degree `Θ(√n)` on
top, re-entering the union bound with `ε` against `T·2^n`, i.e. degree `Θ(n)`, i.e.
no savings. This is the concrete reason `THR ∘ THR` (and hence `ACC0 ∘ THR ∘ THR`)
of super-linear size remains beyond the method — and it is the *same* wall.

---

## 7. What must be true for it to go through; honest self-grade

For the aspirational `NP ⊄ ACC0 ∘ THR` target, **at least one** of these must
hold, and I have no candidate for any:

1. **A matmul-free constant-rate evaluator.** A way to evaluate `Σ_x h(t(x))` over
   a `2^{cn}`-sparse representation in time `2^{(1-δ)n}` *without* needing
   `H(D/n) < 1/2`. Equivalently, a representation of `ACC0 ∘ THR` functions that is
   `2^{cn}`-sparse with `c<1/2` **and exact** (zero error) — defeating the
   degree/error dichotomy by being exact at low degree. No such representation is
   known; the `Θ(n)` degree lower bound for exact MAJ over any field
   [ESTABLISHED] says it cannot exist for the threshold part, but §2a removes the
   threshold part from the degree budget, so the open question is sharply: *is
   there a `2^{cn}`-sparse exact representation of the* `SYM∘AND` *count
   `t(b)` with `c<1/2`?* I believe the answer is no (it would contradict the
   `Θ(n)` degree of generic symmetric functions like exact-half), but I did not
   prove it; if someone *did* prove it impossible, that would close direction (i)
   unconditionally.

2. **An error-cancellation argument for CAPP that beats the union bound.** A proof
   that `Σ_x (E_r[p_r(x)] - C(x))` is `o(gap·2^n)` via *cancellation* rather than
   per-term smallness — e.g. a second-moment / Fourier argument showing the
   signed errors are near-orthogonal across inputs. I tested this (notes in the
   working log): the shared randomness `r` induces `Θ(1)` covariance between
   nearby inputs, so `Var_r[Σ_x p_r(x)] = Θ(2^{2n}·ρ)`, and Chebyshev then needs
   `ρ < gap^2` — which is again `ε`-smallness in disguise. **No free cancellation
   was found, and I give a heuristic reason (covariance of nearby inputs) for why
   it should not exist with shared randomness.** A per-input *independent*
   randomness would kill the matmul factorization. This looks like a genuine
   obstruction, not just my failure.

3. **A new threshold-aware normal form** that produces a count `t(b)` whose
   *symmetric outer function `h` is itself low-complexity in a way that admits a
   `<2^{n/2}`-rank bilinear factorization with constant savings.* This is the most
   speculative and I have nothing concrete.

### Honest self-grade: **dead-end (sharpened).**

- The re-derivation of `NEXP/NQP ⊄ ACC0 ∘ THR` (Steps 1–6) is correct but
  **already known** — zero new theorem there.
- The structural move §2a (exact THR-by-split-sum kept out of the union bound) is
  a clean and, I believe, correct *reframing* that localizes the open problem, but
  it is essentially implicit in Williams 2014 — so it is a **diagnostic
  contribution, not a new result.**
- The push to `NP` (Step 7) **fails**, and §6 explains why with a quantitative
  dichotomy that I am fairly confident is a real wall (the degree/error tradeoff
  is forced by the Alman–Chan–Williams degree bound combined with the union
  bound, both ESTABLISHED).
- The one place I could be *wrong in a useful direction* is item (1)/(2) of §7:
  I did not *prove* impossibility, only gave strong heuristic obstructions. If the
  covariance obstruction in (2) could be turned into a theorem, it would be a
  publishable "barrier to pushing the algorithmic method below quasi-NP via
  probabilistic polynomials" — a negative result of independent interest. That is
  the most promising salvage.

**Net:** consistent with `williams-algorithmic-method-scaling.md`'s prediction —
the difficulty is conserved, and I have now pinned the conservation to a single
inequality (`T·ε·2^n ≤ gap·2^n` versus `H(D/n)<1/2`) and shown the two clauses are
mutually exclusive at constant rate. No fake success; a real, documented wall.

---

## Adjudication (2026-05-30)

**Referee:** neutral adjudicator (post independent review).

**RULING: BROKEN** (brokenness score 7/10).

### Exact death point
The sole novel deliverable — the **Dichotomy Lemma** (§1, §6(ii)) — dies at its
degree/error half. The lemma forces `D = Θ(n)` by substituting `log(1/ε) = Θ(n)` into the
Alman–Chan–Williams bound `D = Θ(√(n·log(1/ε)))`. But `log(1/ε) = Θ(n)` is obtained only by
assuming the CAPP gap is `2^{-Θ(n)}` (§6(ii) lines 285–287, §7), whereas the actual
Murray–Williams lower-bound transfer needs CAPP only to **constant** additive gap `1/6`
(line 162). At constant gap, `ε ≤ gap/T = 2^{-polylog}`, so `log(1/ε) = polylog`, hence
`D = Θ(√(n·polylog)) = n^{1/2+o(1)}` and `H(D/n) → 0`, NOT `→ 1`. The claimed contradiction
("`M' → 2^n`, brute force") evaporates; the "sharp wall / point not interval" conclusion
(lines 292–300) does not connect to the regime the method actually runs in.

### Secondary independent kills (any one fatal to the novel claim)
1. **Symbol collision on `M'`.** §4 (line 197) `M'` = matmul feature dimension
   `= T·2^{polylog}·(T+1) = 2^{polylog(n)}`, governed by Beigel–Tarui term count and pattern
   enumeration. §1(b) (lines 59–61) / §6(ii) (line 274) silently re-define
   `M' = 2^{H(D/n)·n+o(n)}`, the monomial count of a single global degree-`D` probabilistic
   polynomial the pipeline never constructs. The identification `M'_feature = 2^{H(D/n)n}` is
   asserted with no derivation — the load-bearing implicit "clearly," and it is false as
   stated.
2. **Class substitution.** §2a / Step 1 make the THR layer exact (zero degree, zero error)
   ONLY via "poly-bounded weights (LTF = MAJ-of-copies)" (lines 98–100, 171). The stated
   target (§1) is general `ACC0 ∘ THR/LTF`, whose weights can be `2^{Θ(n)}`, so the y-side
   feature ranges over up to `2^{n/2}` values and `M'` is exponential. The document silently
   proves the weaker `ACC0 ∘ MAJ` statement — even the §6 re-derivation does not establish the
   theorem as stated for general THR.
3. **Circularity.** The ACW *LTF* probabilistic-polynomial degree bound is applied to the
   §2a pipeline whose LTF layer is **exact** (`ε = 0`, no LTF polynomial; Step 3 line 179).
   The bound is inapplicable; the lemma manufactures a contradiction by reverting to the
   discarded "approximate-every-gate" pipeline. §7 item (1) restates the real open question as
   a pure `ε = 0` sparsity question, directly contradicting §6(ii)'s error-vs-degree framing.
4. **Step 7 (push to NP) is admitted to fail** (§6, §7). The deductive chain to any NP
   separation is severed by the author. Required routes — constant-exponent-factor rectangular
   matmul (only `2^n/poly` available via Le Gall/CW) or a `2^{cn}`-sparse exact rep with
   `c < 1/2` (only heuristically ruled out) — are not theorems.

### Barrier audit result
**Confirmed: passes-all-three** (relativization / naturalization / algebrization all fail to
fire), and this is NOT evidence of progress. The technique clears the barriers only because
it reproduces a theorem (`NEXP/NQP ⊄ ACC0 ∘ THR`) already proved by barrier-clearing methods.
No barrier is the fatal flaw; the fatal flaw is the internal quantitative
gap-quantifier/symbol-collision error above. The structured "fails-a-barrier" verdict does
not apply.

### Vote tally
Red-team 5/5 BROKEN (4 fatal: barrier / rigor / literature / quantitative; 1 serious:
circularity). Barrier auditor: passes-all-three but explicitly "necessary not sufficient, not
progress." Referee: BROKEN. The cleanest, most defensible death point is the
gap-quantifier collapse of the Dichotomy Lemma (constant gap suffices for the transfer ⇒
sublinear degree ⇒ no dichotomy), corroborated by the symbol-collision and circularity
findings. Consensus unanimous.

### Brokenness score: 7/10
Not a 9–10: the document is honestly framed (claims no new bound), contains a correct
skeleton re-derivation of an established theorem, and correctly localizes much of its own
vulnerability. But its only novel mathematical content (the Dichotomy Lemma) is vacuous in
the regime the method actually occupies, killed independently four ways. Solidly broken.

### Salvageable residue
- The **matmul-geometry half** (§6(i)) is a real, correct statement of the genuine unbeaten
  obstruction: with long dimensions `2^{n/2} × 2^{n/2}` and inner dimension `2^{polylog}`,
  rectangular MM buys only the `o(n)` Le Gall margin, yielding superpolynomial (not
  constant-rate) savings. This is the actual reason the method gives NEXP/NQP and not NP — and
  it is independent of any error/degree tension. A repair should DROP the degree/error
  "dichotomy" framing entirely and reformulate the obstruction as the pure
  sparsity/matmul-geometry question of §7 item (1) (`2^{cn}`-sparse exact, `c < 1/2`), which
  carries no error parameter and avoids the symbol collision.
- The §2a "remove THR from the union bound via exact split-sums" reframing is sound *for
  poly-bounded weights (MAJ)* and could be honestly retargeted at `ACC0 ∘ MAJ`.
- Any future fix must (i) handle general LTF weights (not silently restrict to MAJ), and
  (ii) state the obstruction at the constant gap the transfer actually uses.

*End of adjudication.*

## Repair Attempt (2026-05-30)

**Fixer team mandate.** Repair the exact death of the Dichotomy Lemma (§1, §6(ii)) — the degree/error half that forces `D = Θ(n)` — without smuggling in the conclusion, or document why that death is fundamental.

### Restatement of the precise failure

The Dichotomy Lemma needs `log(1/ε) = Θ(n)` so that the Alman–Chan–Williams (ACW) probabilistic-polynomial degree
`D = Θ(√(n·log(1/ε)))` is pushed up to `Θ(n)`, making `H(D/n) → 1` and the monomial count `2^{H(D/n)·n} → 2^{n}`, which fast matmul cannot absorb. That is the only place the claimed contradiction lives.

But `log(1/ε) = Θ(n)` requires an **exponentially small CAPP gap `2^{-Θ(n)}`** (lines 285–287). The Murray–Williams lower-bound transfer that actually produces a circuit lower bound from a SAT/CAPP algorithm needs only a **constant gap `1/6`** (line 162). At constant gap, `ε ≤ gap/T = 2^{-polylog(n)}`, so `log(1/ε) = polylog(n)` and
`D = √(n·polylog) = n^{1/2+o(1)}` ⟹ `H(D/n) → 0`, not `→ 1`. The contradiction evaporates.

### What I tried (three concrete repair routes) and why each fails

**Route A — Manufacture the exponential gap from the transfer itself.**
*Idea:* amplify the constant `1/6` gap up to `2^{-Θ(n)}` so `log(1/ε)` legitimately becomes `Θ(n)`.
*Why it fails (fundamental):* The Williams/Murray–Williams transfer derives a lower bound from a Circuit-SAT/CAPP algorithm whose only requirement is **savings of `n^{ω(1)}` over brute force** — equivalently a `1/poly` (or constant) distinguishing advantage. The transfer neither needs nor *supplies* an exponentially small gap. Demanding `2^{-Θ(n)}` is replacing the actual hypothesis with a strictly stronger one the algorithmic method never delivers. The regime `H(D/n) → 1` is therefore **not the regime the method runs in**, and no amount of constant-factor tightening reaches it. This is not a slack constant; it is a category mismatch between "savings needed by the transfer" (`n^{ω(1)}`) and "gap needed by the dichotomy" (`2^{Θ(n)}`). [NOVEL: my read of the transfer's hypothesis; the constant-vs-exponential mismatch is the load-bearing point — flagged below as my weakest step only insofar as it depends on the transfer requiring *merely* `n^{ω(1)}` savings, which is the standard statement of the algorithmic method, ESTABLISHED: Williams 2014, Murray–Williams 2018.]

**Route B — Make the gap exponential by hypothesis on a downward-scaled hard class.**
*Idea:* if we target NP rather than NEXP, the witness/instance length shrinks, perhaps forcing a larger effective gap.
*Why it fails:* this is exactly the conservation-of-difficulty trap of the parent method (`williams-algorithmic-method-scaling.md`). Scaling the hard class down to NP demands **constant-rate savings `2^{(1−δ)n}`** from the SAT algorithm, not the `2^{o(n)}` the method produces (see Route C). Assuming the exponential gap *is* assuming constant-rate savings, i.e. assuming the conclusion. Rejected as conclusion-smuggling.

**Route C — Drop the degree/error framing; reformulate as the pure matmul-geometry / sparse-exact question (§6(i), §7 item 1).**
This is the only honest move, and it is a *reformulation*, not a repair of the dichotomy.

- The SAT/CAPP pipeline evaluates a degree-`D` representation on `2^{n/2} × 2^{n/2}` blocks with inner (feature) dimension `M = ` (#monomials of degree `≤ D`) `= 2^{O(D·log n)}`. For the ACC⁰ result `D = polylog(n)`, so `M = 2^{polylog(n)}`.
- Rectangular matmul with long dims `2^{n/2}` and short inner dim `2^{polylog}` runs in `2^{n + o(n)}` (the Le Gall rectangular exponent → 2 over the long dims as the inner exponent → 0). Savings over brute force is only the **`2^{o(n)}` Le Gall margin: superpolynomial, sub-exponential.**
- That margin is *exactly* enough to beat `2^{n}/n^{ω(1)}` (⟹ NEXP, NQP ∉ ACC⁰) and **provably not enough** for the `2^{(1−δ)n}` constant-rate savings an NP separation needs. This is the genuine unbeaten obstruction, and it carries **no error parameter**, so it dodges the symbol collision (kill 1) entirely.

*Why Route C still does not break the wall:* recast cleanly (§7 item 1), the open question is whether ACC⁰∘THR Circuit-SAT admits a `2^{cn}`-**sparse exact** representation with `c < 1/2` (feeding inner dimension `2^{cn} ≪ 2^{n/2}` to rectangular matmul to buy constant-rate savings). But:
  - Exactness (`ε = 0`) means there is **no LTF polynomial** in the §2a pipeline (the LTF layer is exact), so the ACW LTF degree bound is *inapplicable* — confirming the file's own kill (3). Good: the symbol collision and the circular degree bound both vanish.
  - However, the only mechanism that delivers sparsity `2^{polylog}` is the *probabilistic* polynomial, which buys low sparsity **at the cost of error**. Removing the error (demanding exactness) blows the sparsity back up: no exact sparse representation of general-weight THR below `2^{n/2}` is known, and the probabilistic machinery provides none. **The error you delete reappears as sparsity** — the conservation-of-difficulty trap in its purest form. The sparse-exact question is the *correct* frontier question, but this attempt supplies no new tool to answer it.

### Corroborating kills, after the reformulation

- **Class substitution THR/LTF → MAJ (kills 2).** The §2a exact-split-sum reframing is sound **only for poly-bounded weights**, i.e. it proves at most the weaker **ACC⁰∘MAJ** statement. Honestly retargeting §2a at ACC⁰∘MAJ is legitimate but is a *weaker theorem*, not a repair of the ACC⁰∘THR claim. Any genuine fix must handle general LTF weights; none here does.
- **Step 7 push to NP (kill 4)** remains admittedly broken by the author (§6, §7); the chain to any NP separation is severed regardless of the dichotomy.
- **Barrier audit** is confirmed correct (passes relativization / algebrization / natural proofs) but is necessary-not-sufficient and is not evidence of progress.

### Verdict: the failure point is FUNDAMENTAL

The degree/error dichotomy cannot be repaired:

1. **The transfer supplies/needs only a constant gap.** `log(1/ε)` is forced to `polylog(n)`, so `D = n^{1/2+o(1)}` and `H(D/n) → 0`. The `H(D/n) → 1` regime is unreachable by the method's actual hypothesis; reaching it requires assuming `2^{-Θ(n)}` gap = assuming constant-rate savings = assuming the conclusion.

2. **The real wall is error-free.** The matmul-geometry / conservation-of-difficulty barrier (§6(i)) yields `2^{o(n)}` savings — exactly sufficient for NEXP/NQP, provably insufficient for NP — and is *independent of any error parameter*. The degree/error tension was a mirage layered on top of this geometric wall; removing the mirage exposes the wall but does not move it.

3. **The honest residue separates nothing new.** (i) §6(i) restated as the sub-exponential-savings obstruction is a correct *description* of the barrier, not a crossing of it. (ii) §2a retargeted at ACC⁰∘MAJ for poly-bounded weights is a weaker, already-implied statement. The clean open question (`2^{cn}`-sparse-exact, `c < 1/2`) is genuinely open and untouched by this attempt.

**Outcome: NOT repaired.** The death cause is a structural mismatch between the constant savings the algorithmic method produces and the exponential gap the dichotomy demands; the underlying matmul-geometry barrier giving only `2^{o(n)}` savings is the true, error-independent reason the method reaches NEXP/NQP but not NP. The correct salvage is to *abandon* the dichotomy framing and state the obstruction as the error-free sparse-exact / rectangular-matmul-geometry question — which is a sharpened dead-end, not a separation.

**Weakest step in this analysis (ruthless self-flag):** Route A's claim that the transfer requires *only* `n^{ω(1)}` savings (constant/`1/poly` advantage) and never an exponential gap. This is the standard statement of Williams' algorithmic method [ESTABLISHED: Williams 2014; Murray–Williams 2018], but the entire fundamentality verdict hinges on it. If some variant transfer could *consume* a genuinely-amplified exponential gap that the SAT algorithm independently produced, Route A would reopen — but no such gap-producing SAT algorithm for ACC⁰∘THR exists, so the point stands on current knowledge.
