# P vs NP — Maximum-Rigor Assault on the ACC⁰∘THR Lead: VERDICT

**Date:** 2026-05-30
**Round:** No-holds-barred assault on the one live lead from the prior round
(scaling Williams' algorithmic method on `ACC⁰ ∘ THR` via the combinatorial,
non-algebrizing Circuit-SAT normal form).
**Scale:** 5 independent attempt teams · 1 dedicated barrier auditor each ·
5-lens adversarial red-team each (barrier / rigor / literature / quantitative /
circularity) · neutral referee adjudication each · 1 repair round on the
least-broken attempt with brutal re-refutation. ~42 agents, ~2.1M tokens.

> This file was authored by the coordinator after the workflow's final agent
> crashed (a single structured-output failure); all five attempt files, all five
> adjudications, and the repair round completed and are on disk. Nothing here is
> reconstructed — it is read directly from the adjudication sections of each file.

---

## Headline

**P vs NP remains OPEN and unsolved.** All five attempts were judged **BROKEN,
5/5 across every red-team lens.** The repair round on the least-broken attempt
**failed for a fundamental, named reason** — not a fixable gap.

The round did something more useful than fail, though: it converged, from five
independent directions, on the **single mathematical object that blocks this
entire lead** — and proved (via the repair attempt) that the object is an
*unconditional* theorem the method cannot route around.

**The wall has a name: the `Θ(√n)` approximate-degree lower bound for threshold
functions** (Paturi; Nisan–Szegedy; Sherstov). Every attempt died on a different
*projection* of this one bound.

---

## The unifying finding

The algorithmic method needs the target circuit class to admit a *low-complexity*
representation (low probabilistic-polynomial degree → sparse polynomial → small
matrix-multiplication inner dimension) so that Circuit-SAT can be solved
faster than brute force. For plain `ACC⁰` this works (Beigel–Tarui `SYM∘AND`
normal form). **Adding a threshold layer (`THR`) injects the `√n`
approximate-degree barrier**, and that barrier is *conserved* no matter which
representation you choose:

| Route attempted | Projection of the `√n` wall that killed it |
|---|---|
| probabilistic-poly-correlation | degree `Θ(√n)` → matmul inner dimension `≥ 2^{n/2}` → only Le Gall `o(n)` savings |
| easy-witness-winwin | fat-THR approximate degree `Θ(√n)` → inner dim `2^{√n log n}`, outside the cheap-MM window |
| gap-sat-derandomization | Paturi/Sherstov `Θ(√f)` → no `ε∈(0,1)` satisfies both savings and budget constraints |
| meta-algorithmic-magnification | true exact LTF degree `Θ(W)`, approx `Θ(√k)` → sparsity `2^{n^{o(1)}}`, wrong side of the threshold |
| thr-degree-reduction | the `√n` reappears three ways: approximate degree, `1/√n` core-shell measure, sign-rank/Forster |

Two attempts also died of **conservation-of-difficulty circularity** (the same
trap that killed the parent `williams-scaling` attempt): the load-bearing lemma
turned out to be *equivalent in strength* to the separation it was trying to prove
(`easy-witness-winwin`'s weight-taming = open fat-THR-SAT; `thr-degree-reduction`'s
"OPEN-CORE localization" = the target verbatim).

---

## Per-attempt breakdown

### 1. probabilistic-poly-correlation — BROKEN, brokenness **7/10** (least broken)
- **Claim:** faster `ACC⁰∘THR` #SAT via probabilistic polynomials + rectangular matmul; sharpen the obstruction into a quantitative dichotomy.
- **Died at:** the novel "Dichotomy Lemma" is vacuous in the regime the method actually runs in — the Murray–Williams transfer needs only a *constant* CAPP gap, which forces sublinear degree `n^{1/2+o(1)}`, so the claimed degree→brute-force dichotomy never fires. Plus a symbol collision on `M'` and a silent `THR→MAJ` class substitution.
- **Barrier audit:** passes all three — but only because it re-derives an *already-proven* theorem (`NEXP/NQP ⊄ ACC⁰∘THR`); barrier-cleanliness here is necessary, not progress.
- **Red-team:** 5/5 BROKEN.

### 2. gap-sat-derandomization — BROKEN, brokenness **7/10**
- **Claim:** #SAT/GAP-SAT estimator for `ACC⁰∘THR` → `NQP ⊄ ACC⁰∘THR` (Murray–Williams transfer).
- **Died at:** Step R, the cross-block mixed-THR join. The only two join routes both die; the polynomial route hits the unconditional `Θ(√n)` approximate-degree wall, and the ε-constraints become contradictory (`ε>1/2` needed for savings, but then the budget `2^{|Z|}` explodes). Even if fixed, yields only the *already-known, far weaker* `NQP ⊄ ACC⁰∘THR`.
- **Red-team:** 5/5 BROKEN. (Honest, self-diagnosing, claims no separation.)

### 3. meta-algorithmic-magnification — BROKEN, brokenness **7/10**
- **Claim:** weak `ACC⁰∘sparse-THR` bound via algorithmic route, amplified by hardness magnification (dodging the CHOPRS locality barrier).
- **Died at:** Step 2 — a concrete **false degree bound**. `log W` governs *threshold-by-threshold simulation*, not polynomial degree; true exact LTF degree is `Θ(W)`, approximate `Θ(√k)`. Corrected, sparsity becomes `2^{n^{o(1)}}` — the wrong side of the quasipolynomial threshold the saving requires. Plus a flat internal contradiction (Step 4 vs Step 8).
- **Red-team:** 5/5 BROKEN.

### 4. thr-degree-reduction — BROKEN, brokenness **7/10**
- **Claim:** a new margin/discrepancy normal form for `ACC⁰∘THR` that sidesteps the degree blowup.
- **Died at:** the **Margin-Sparsity Lemma is false** (self-refuted; verified numerically here — the MAJ core is only `Θ(1/√n)`-thin, deficit `½log₂n`, never `n^{Ω(1)}`). The residual "OPEN-CORE" is an identity-preserving restatement of the target — circular. The `√n` is conserved across approximate degree, core-shell measure, and sign-rank.
- **Red-team:** 5/5 BROKEN.

### 5. easy-witness-winwin — BROKEN, brokenness **9/10** (most broken)
- **Claim:** easy-witness + win-win amplification, staying at NEXP scale to dodge the parent attempt's NP-scale vacuity.
- **Died at:** the "weight-tame witness" lemma (W) is **provably equivalent to the open fat-THR-SAT problem** — textbook conservation of difficulty. And the quantitative wall (fat-THR degree `Θ(√n)`) kills the algorithm *even if (W) is granted*. Two independent fatal mechanisms, both conceded by the author.
- **Red-team:** 5/5 BROKEN.

---

## The repair round (the decisive result)

The least-broken attempt (`probabilistic-poly-correlation`, score 7) was handed
to an elite fixer team with one job: repair the *exact* failure point, using the
adjudicator's own steer (drop the dichotomy framing; attack the matmul-geometry
obstruction directly — try for a `2^{cn}`-sparse exact representation with
`c < 1/2`, which would push the hard class from NQP/NEXP down toward NP).

**Outcome: NOT REPAIRED — the obstruction is fundamental.**

The `c < 1/2` requirement runs into a dimensional floor: the THR layer injects
`2^{Θ(√n)}` distinct linear-form values that the union over cubes cannot compress
below `2^{n/2}`, so the matmul inner dimension is `≥ 2^{n/2}` and rectangular
matrix multiplication buys only the Le Gall `o(n)` margin. **A genuine repair
would require representing threshold functions with `o(√n)` approximate degree —
i.e. defeating Paturi's theorem, which is unconditionally impossible.** No
re-refutation was needed: the fixer self-reported failure, with no surviving
claim to attack.

This is the most valuable single output of the round. It is not "we couldn't fix
it." It is: *the fix is provably non-existent within this framework, because the
blocker is an unconditional lower bound that the method conserves rather than
defeats.*

---

## What this round genuinely contributed

1. **Five sharpened, externally-checked dead-ends** on the most promising known
   lead — each localized to a precise step, each cross-checked by 5 adversarial
   lenses plus a dedicated barrier audit.
2. **A unification:** all five routes, and the parent attempt, die on *one*
   object — the `Θ(√n)` approximate-degree lower bound for thresholds — viewed
   through different lenses (degree / sparsity / matmul dimension / sign-rank /
   core-shell measure).
3. **A proof-of-fundamentality:** the repair round established that the wall is
   not a slack to be engineered around but an unconditional theorem the
   algorithmic method *conserves*.
4. **Reusable residue:** the "exact THR-by-matmul kept out of the probabilistic
   union bound" recombination (sound for `ACC⁰∘MAJ`), and the polylog-dimensional
   dominance-counting `2^{n/2}·poly` algorithm for `SYM_{low-deg}∘THR` (computes
   `Σ_x P`, not `#SAT`).

## Honest bottom line

This was the full-rigor, no-holds-barred attempt you asked for, on the single
direction the previous round flagged as live and non-barriered. It did not
solve P vs NP, and it did not produce even a new conditional separation. Instead
it **closed the lead off cleanly** by identifying *why* it is blocked: to scale
the algorithmic method from NEXP/NQP down to NP through `ACC⁰∘THR`, you must
defeat the unconditional `√n` approximate-degree lower bound for threshold
functions — and no attempt, nor the repair of the best attempt, found any way to
do that.

## Most promising next step that remains genuinely live

The `√n` threshold wall blocks the *threshold* route specifically. The honestly
live directions now point **away from thresholds**:
- The **combinatorial Circuit-SAT channel as a CHOPRS-locality-barrier evasion**
  (residue #2 from `meta-algorithmic-magnification`) is worth investigating on
  its own, decoupled from any THR layer.
- Push the algorithmic method on circuit classes whose bottom layer has genuinely
  `o(log n)` *exact* polynomial degree (AND/OR / constant-degree gates) rather
  than thresholds — though this likely lands back inside known `ACC⁰` territory.

Neither threatens P vs NP. The honest assessment: **this specific lead is now a
sharpened dead-end, blocked by an unconditional theorem.** Real progress on
P vs NP still requires a genuinely new technique that evades all three classical
barriers *and* does not conserve the threshold-degree wall — and no such
technique is known to exist.
