# P vs NP — Research Swarm Synthesis

**Date:** 2026-05-29
**Coordinator:** Lead synthesis over 8 expert sub-team write-ups in [`approaches/`](approaches/)
**Bottom line, stated up front:** P vs NP remains **OPEN**. This swarm did **not** resolve it, did not prove P = NP or P ≠ NP, and produced **no new unconditional separation or collapse**. What follows is an honest, unified map of where the problem stands, what the three classical barriers collectively forbid, and what a future proof would have to look like.

---

## 1. The problem and the consensus framing

P vs NP asks whether every problem whose solutions can be *verified* in polynomial time can also be *solved* in polynomial time. The near-universal expectation in the field is **P ≠ NP**, but no proof exists in either direction, and — critically — we now have *meta-theorems* (barriers) proving that entire families of natural proof techniques **cannot** settle the question.

Two complementary ways to attack the problem organize the eight approaches:

- **Lower-bound / separation program (toward P ≠ NP):** show some NP problem cannot be solved by any small circuit or fast algorithm. This is where six of the eight teams worked (circuit complexity, natural proofs, proof complexity, GCT, algebraic VP-vs-VNP, diagonalization).
- **Upper-bound / collapse program (toward P = NP):** find a polynomial algorithm for an NP-complete problem (the algorithms team).

The defining feature of the modern era is that **we understand our own failure with unusual precision.** The barriers below are not excuses; they are theorems about which proofs are even *possible*.

---

## 2. The three barriers, mapped onto the approaches

A correct proof of P ≠ NP must **simultaneously** evade all three barriers below (and any later ones). No known technique does.

### Barrier 1 — Relativization (Baker–Gill–Solovay, 1975)
There exist oracles A and B with **Pᴬ = NPᴬ** (e.g. A = TQBF/PSPACE) and **Pᴮ ≠ NPᴮ** (an adversarial sparse oracle). Therefore any proof that works unchanged when both machines are given the same oracle — i.e. any argument that treats computation as a black box / depends only on the oracle-query transcript — **cannot** decide P vs NP, because it would have to give the same verdict in both oracle worlds.

| Approach | Hit by relativization? |
|---|---|
| diagonalization-relativization | **Yes, fatally.** Pure diagonalization + simulation relativizes. The one non-relativizing engine compatible with diagonalization is arithmetization — which then algebrizes (Barrier 3). |
| boolean-circuit-complexity | Black-box/simulation arguments relativize; the productive restricted-model bounds are non-relativizing but are blocked elsewhere. |
| algorithms-and-upper-bounds | Brute-force-search / NP-oracle algorithms relativize and cannot collapse P and NP. |
| algebrization-barrier | Catalogs and subsumes this barrier. |
| proof-complexity | **Evades it** — finite, oracle-free combinatorial setting (the angle's central strength). |
| GCT, algebraic VP-vs-VNP | Not the binding constraint (fixed algebraic model, no oracles), but complicate any unconditional transfer to the Boolean world. |

### Barrier 2 — Natural Proofs (Razborov–Rudich, 1994/1997)
If strong pseudorandom functions / one-way functions exist (a widely believed cryptographic hypothesis), then **no "natural" property can prove NP ⊄ P/poly.** A property is *natural* if it is **Useful** (no small-circuit function has it), **Large** (a random function has it with non-negligible probability ≥ 2^−O(n)), and **Constructive** (decidable in time poly in the truth-table length 2ⁿ). Such a property mechanically yields a distinguisher that breaks any PRF — so under cryptography, it cannot exist.

| Approach | Hit by natural proofs? |
|---|---|
| boolean-circuit-complexity | **Yes.** The switching lemma, polynomial method, and approximation method are all natural — exactly why they stop at restricted models and cannot reach P/poly. |
| natural-proofs-barrier | Formalizes this barrier; its job is to *filter* other attempts. |
| algorithms-and-upper-bounds | A natural+large+constructive structure exploited for fast SAT would break PRGs; a real poly SAT algorithm must be non-natural. |
| algebraic VP-vs-VNP | Has its **algebraic analogue** (Forbes–Shpilka–Volk; Grochow–Kumar–Saks–Saraf): rank/derivative measures are large for random polynomials too. |
| GCT | **Designed to evade it** by sacrificing largeness — but ran into a new, GCT-internal no-go (BIP). |
| proof-complexity | Re-asserts at the top of the hierarchy (Razborov's proof-complexity-generators tie EF bounds to hard PRGs); evaded for weak systems. |
| Williams' algorithmic method (cross-cutting) | **Genuinely evades it** — but only reaches NEXP/NTIME, not NP. |

### Barrier 3 — Algebrization (Aaronson–Wigderson, 2008/2009)
The natural fix for relativization — arithmetizing the oracle so the prover may query a low-degree polynomial extension Ã — beats relativization (it explains IP = PSPACE, MIP = NEXP, MAᴇxᴘ ⊄ P/poly, PCP). But Aaronson–Wigderson construct algebraic oracles on **both** sides of P vs NP: NPᴬ ⊄ P^Ã and NP^B̃ ⊆ Pᴮ. So **arithmetization-plus-relativizing techniques still cannot decide P vs NP.** The decisive obstruction is a communication-complexity lower bound: the deterministic poly-time side cannot extract NP-hard information even when handed Ã.

| Approach | Hit by algebrization? |
|---|---|
| diagonalization-relativization | **Yes** — the only diagonalization-compatible non-relativizing engine (arithmetization) algebrizes. |
| boolean-circuit-complexity | Arithmetization-based separations of NP from P/poly are blocked. |
| algebrization-barrier | Establishes this barrier; robust to definitional variants (IKK 2009; affine relativization). |
| algorithms-and-upper-bounds | Current algebraic/polynomial-method algorithms algebrize. |
| proof-complexity | Not operative for finite propositional lower bounds (addressed and set aside). |
| GCT, algebraic VP-vs-VNP | Not directly obstructive, but any unconditional "VP ≠ VNP ⇒ P ≠ NP" transfer must avoid algebrizing techniques. |

### What the three barriers collectively rule out
Taken together, the barriers eliminate essentially the **entire pre-2000 toolkit** as a route to P vs NP:

- **diagonalization + simulation** (relativizes),
- **arithmetization / interactive-proof algebra** (algebrizes),
- **combinatorial circuit lower bounds** — switching lemma, polynomial method, approximation method, monotone/communication bounds (natural, and additionally capped by the **monotone-to-general gap**, Tardos 1988),
- **brute-force and current algebraic SAT algorithms** (relativize / algebrize / would be natural).

A valid proof must be **non-relativizing AND non-natural AND non-algebrizing** at once. **No currently known technique satisfies all three.** It is not even known that algebrization is the *last* barrier.

---

## 3. Where each approach actually stands (quantified)

- **Boolean circuit complexity.** Goal: super-polynomial (nᵒ⁽¹⁾) lower bound for an NP function. Best general-basis bound for *any* explicit function (even Eᴺᴾ): **~5n gates.** The deficit is exponential and barrier-guarded. Spectacular bounds exist only in restricted models (parity ∉ AC⁰; Razborov–Smolensky; Razborov's n^Ω(√k) monotone CLIQUE; Williams' NEXP ⊄ ACC⁰). No unconditional lower bound is known even for the first class above ACC⁰ (TC⁰), because the polynomial method dies at MAJORITY.

- **Algebraic complexity (VP vs VNP).** Believed *strictly easier* than P vs NP, and home to the only super-polynomial *general* bound known (Limaye–Srinivasan–Tavenas 2021, constant depth). But the dominant shifted-partial-derivatives method is **provably capped at the depth-4 chasm**: the depth-reduction exponent n^O(√d) coincides with the lower-bound exponent n^Ω(√d), and the measure is capped there (Efremenko–Garg–Kayal–Saptharishi). General-circuit bounds remain near Ω(n log n); dc(permₙ) ≥ n²/2 (Mignon–Ressayre). And even a full VP ≠ VNP yields P ≠ NP only **conditionally** (GRH / derandomization; Bürgisser, Kabanets–Impagliazzo).

- **Geometric Complexity Theory.** Reduces lower bounds to an orbit-closure non-containment, thence to a representation-multiplicity inequality m_λ(X) > m_λ(Y) — correct and conceptually deep. But the **occurrence-obstruction version is dead** (Bürgisser–Ikenmeyer–Panova, FOCS 2016 / JAMS 2019: such obstructions *provably do not exist* in the padded perm-vs-det setting). Only the strictly harder multiplicity-obstruction route survives, with no candidate family, and it has not even reproduced the Ω(n²) Mignon–Ressayre bound. Plethysm/Kronecker coefficients are #P-/NP-hard with no positive combinatorial rule.

- **Proof complexity.** Most barrier-resistant route: by Cook–Reckhow, NP = coNP iff a polynomially bounded proof system exists, so P ≠ NP reduces to super-polynomial lower bounds against **every** proof system. Provably escapes relativization (and, for weak systems, naturalness/algebrization), and produced the cleanest unconditional bounds (Haken; Ben-Sasson–Wigderson; Ajtai; Pudlák; Razborov). **Stalled ~25 years at the Frege barrier** — no super-polynomial bound for Frege or Extended Frege on any tautology family. Feasible interpolation provably fails for strong systems (Bonet–Pitassi–Raz), and via bounded arithmetic, EF bounds appear equivalent to or harder than the circuit bounds the program hoped to bypass.

- **Diagonalization / relativization.** The source of all our *unconditional* separations (hierarchy theorems) — but those require a **constructible resource gap** that P vs NP lacks (both polynomial). In isolation, provably cannot resolve P vs NP.

- **Algorithms / upper bounds.** Every sub-2ⁿ SAT algorithm (Schöning, PPSZ/Hertli ~1.308ⁿ, branch-and-reduce, meet-in-the-middle, subset DP) achieves only a **width-local, constant-factor** exponent gain that degrades to base 2 as clause width grows — exactly as SETH predicts. No mechanism exploits a *global* invariant to collapse search to polynomial. The most this angle could plausibly reach short of P = NP is refuting SETH, which would leave the polynomial barrier untouched.

---

## 4. Most promising directions

None is close to a resolution; these are the threads that are *not yet known to be dead* and that demonstrably evade at least one classical barrier.

1. **Williams' algorithmic method (lower bounds from faster algorithms).** The strongest barrier-aware engine we have: provably **non-natural and non-relativizing**, and it produced NEXP ⊄ ACC⁰ via a SAT-algorithm-to-lower-bound connection. The catch is scale: it currently separates only enormous classes (NEXP / NTIME[2^polylog]). Pushing it down to NP vs P/poly requires independently spectacular SAT-algorithm improvements — but it is the clearest existence proof that barrier-evading lower bounds are possible.

2. **Meta-complexity / MCSP and Hirahara-style worst-case-to-average-case machinery.** Sacrifices *constructivity* (the Razborov–Rudich exit), and connects circuit lower bounds to the hardness of the Minimum Circuit Size Problem. The magnifiable weak lower bounds are themselves open and may re-encounter a disguised naturalness obstruction, but the framework is genuinely barrier-aware.

3. **Geometric Complexity Theory — multiplicity-obstruction (non-padding) reformulation.** The occurrence version is provably empty (BIP), so GCT can only progress by sacrificing largeness *and* finding the harder multiplicity obstructions, which needs **new positive results on plethysm/Kronecker coefficients** or a non-padding reformulation that does not currently exist. High-risk, but it is the deepest barrier-aware program and yields real mathematics regardless.

4. **Algebraic lower bounds beyond the depth-4 chasm.** VP ≠ VNP is believed easier than P vs NP and is where unconditional progress is most active, but a *new measure* beyond shifted partial derivatives is needed (the current one is provably capped), plus an unconditional transfer to the Boolean world to remove the GRH/derandomization caveat.

5. **Proof-complexity generators / bounded arithmetic toward Frege.** The most barrier-resistant route in principle; the live direction (proof-complexity generators) appears to re-import full circuit-lower-bound difficulty, so it is a reframing rather than a shortcut — but it is the one route that has *cleanly* escaped relativization.

6. **Speculative cross-cuts flagged by the teams (proof-shape conjectures, not progress):** a Williams (algorithmic) × Hirahara (meta-complexity) hybrid escaping via non-constructivity plus a win-win algorithmic step.

**Unifying observation:** every live direction works by *deliberately giving up one of the three "natural" properties or one barrier-triggering feature* — Williams (non-natural via algorithm-to-lower-bound), meta-complexity (non-constructive), GCT (non-large) — while trying to retain enough structure to certify hardness. The eventual proof, if it exists, will almost certainly be **structure-exploiting in a way not captured by an oracle transcript, its low-degree extension, or a large+constructive combinatorial property.**

---

## 5. Honest overall conclusion

**P vs NP remains OPEN.** This research swarm did not resolve it and made **no progress on the question itself** in the sense of moving the bound. What the swarm produced is **diagnostic value**: a precise, unified account of why every mature technique stops where it does, and an operational test any future proof must visibly pass.

Concretely:

- We have **no** unconditional super-polynomial circuit lower bound for any explicit NP problem on a general basis (best ~5n).
- We have **no** super-polynomial lower bound for Frege.
- We have **no** super-polynomial lower bound for general arithmetic circuits (stuck near Ω(n log n)).
- The occurrence-obstruction form of GCT is **provably impossible**.
- Every known SAT algorithm is **width-local** and degrades to brute force, consistent with SETH.
- All of the above is **fenced** by relativization, natural proofs, and algebrization, which jointly rule out the entire classical toolkit.

**What real progress would require:**

1. A **single technique that is simultaneously non-relativizing, non-natural, and non-algebrizing** (and robust to whatever the next barrier turns out to be) — to date, none is known.
2. A concrete realization of one of the barrier-aware directions, most plausibly **scaling the algorithmic method below NEXP** (via genuinely faster SAT/CircuitSAT algorithms) or **a meta-complexity hardness-magnification result** that survives a naturalness re-check.
3. For the algebraic routes, **new positive representation-theory results** (plethysm/Kronecker positivity) or a **new algebraic complexity measure** beyond the depth-4 chasm — plus an **unconditional VP≠VNP ⇒ P≠NP transfer** that removes the GRH/derandomization assumption.
4. Honesty in the other direction: **P = NP is not refuted.** The barriers are symmetric — they block the P ≠ NP lower-bound program as firmly as they block fast algorithms — so the upper-bound camp can be judged *unlikely on the weight of evidence*, not dismissed rigorously.

The contribution of this swarm is a faithful map of the frontier and a sharp statement of the entry criterion for any future attempt. The mathematics needed to cross that frontier does not yet exist.

---

### Index of approach write-ups
See [`README.md`](README.md) for the linked table. Detailed write-ups (one per sub-team) are in [`approaches/`](approaches/).
