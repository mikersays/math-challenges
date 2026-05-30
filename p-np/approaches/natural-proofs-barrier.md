# The Natural Proofs Barrier

**Author-Angle:** natural-proofs-barrier (Razborov–Rudich barrier; largeness + constructivity, the PRF/OWF connection, and what a non-naturalizing proof must look like)

---

## Abstract

The Natural Proofs barrier of Razborov and Rudich (1994/1997) is the second of the three
classical "barriers" to resolving **P vs NP** (after relativization, and before
algebrization). It explains, in a precise and quantitative way, why essentially every
combinatorial circuit lower bound proved before 1994 — and a large fraction proved since —
cannot, by itself, separate **P** from **NP**. The key insight is that these proofs all
exhibit a *combinatorial property of Boolean functions* that is simultaneously **constructive**
(efficiently testable) and **large** (true of a random function), and that any such property
yields a distinguisher against pseudorandom function generators. If strong one-way functions
(equivalently, exponentially hard PRFs in the sense required) exist — a hypothesis weaker than
or comparable to most cryptographic assumptions — then no natural property can separate **P**
from **NP**. This write-up formalizes largeness and constructivity, gives the proof of the main
theorem at the level of a careful sketch, surveys why classic lower-bound techniques are
natural, makes the cryptographic connection explicit, and analyzes what a *non-naturalizing*
proof must look like (and which modern techniques such as `MCSP`-based arguments, algebraic /
GCT methods, and ironic complexity / "hardness magnification" appear to evade the barrier and
why even those have not closed the gap).

**Status disclaimer.** Nothing here resolves P vs NP. The barrier is itself a *conditional
impossibility theorem about proof techniques*, not a separation. My own contributions below are
explicitly flagged as **[SPECULATIVE]**; the rest are established results with attributions.

---

## Background / Prior Work

### The lower-bound program before 1994

By the early 1990s circuit complexity had produced a string of celebrated unconditional lower
bounds against *restricted* circuit classes:

- **Parity is not in AC⁰** (constant-depth, unbounded fan-in, poly-size). Furst–Saxe–Sipser
  (1984) gave a superpolynomial bound; **Yao (1985)** and **Håstad (1986/87)** improved this to
  the tight exponential bound `2^{Ω(n^{1/(d-1)})}` for depth `d`, via the **Switching Lemma**.
- **Razborov (1985):** the `n`-clique function requires monotone circuits of size `n^{Ω(log n)}`;
  **Alon–Boppana (1987)** strengthened this to `2^{Ω((n/log n)^{1/3})}`.
- **Razborov (1987) / Smolensky (1987):** `MOD_p` is not in `AC⁰[q]` for distinct primes `p, q`,
  via the *polynomial method* (low-degree approximation over `F_q`).
- **Razborov (1989):** the *approximation method* / method of approximations, abstracting the
  monotone bounds.

These results raised the hope that the same toolkit, pushed harder, would yield a superpolynomial
bound for an explicit function against *general* (unrestricted, poly-size) circuits — which would
prove `NP ⊄ P/poly` and hence `P ≠ NP`.

### The barrier

**Razborov and Rudich**, "Natural Proofs," STOC 1994; *J. Comput. Syst. Sci.* 55(1):24–35, 1997,
showed this hope is in tension with cryptography. They isolated the common structural form of
the above proofs — a *natural property* — and proved that no natural property can separate a
class as expressive as `P/poly` from `NP`, *provided* sufficiently strong pseudorandom function
generators exist. They received the 2007 Gödel Prize for this work.

### Relation to the other barriers

- **Relativization** (Baker–Gill–Solovay, 1975): there exist oracles `A, B` with `P^A = NP^A`
  and `P^B ≠ NP^B`. Hence any proof technique that relativizes cannot settle P vs NP.
- **Algebrization** (Aaronson–Wigderson, 2008): a refinement covering arithmetization-based
  techniques (e.g. `IP = PSPACE`); these "algebrize," and algebrizing techniques provably cannot
  resolve P vs NP either.
- **Natural proofs** is *independent* of relativization: it constrains *combinatorial* techniques
  (which often do *not* relativize, e.g. the Switching Lemma) but which share the
  largeness+constructivity structure. A proof must dodge *all three* barriers.

---

## Approach & Methodology

The methodology of this angle is not to attempt a separation but to **map the obstruction
precisely**: (1) state the definitions formally; (2) reconstruct the proof of the impossibility
theorem; (3) audit known techniques against the definition to see which are "natural"; (4) make
the reduction to cryptographic primitives explicit; and (5) characterize the logical shape of
any technique that *escapes* the barrier, and stress-test candidate escape routes.

---

## Attempt / Key Arguments

### 1. Formal definitions

Let `F_n` denote the set of Boolean functions `{0,1}^n → {0,1}`; `|F_n| = 2^{2^n}`. The truth
table of `f ∈ F_n` has length `N = 2^n`. A *combinatorial property* is a sequence
`C = {C_n}_{n}` with `C_n ⊆ F_n`; we say `f` *has the property* if `f ∈ C_n`.

A proof that some explicit `g ∈ NP` is hard for a circuit class `Λ` (e.g. `Λ = P/poly`) is said
to be **`Λ`-natural** if it proceeds by exhibiting a property `C` such that:

- **(Usefulness against `Λ`).** Every `f ∈ C_n` has circuit complexity larger than what `Λ`
  permits; concretely, for all but finitely many `n`, no `f ∈ C_n` is computable by a circuit of
  the size bound defining `Λ`. (So if the target `g` has the property, `g ∉ Λ`.)

- **(Constructivity).** The predicate "is the truth table `T ∈ {0,1}^N` in `C_n`?" is decidable
  in time polynomial in the *truth-table length* `N = 2^n`, i.e. in time `2^{O(n)}`. Razborov–Rudich
  call this `P/poly-natural` when, more strongly, membership is decidable by circuits of size
  `poly(N) = 2^{O(n)}`. (Some authors call this `Γ`-constructivity for a complexity class `Γ`;
  the canonical case is `Γ = P` in the truth-table length.)

- **(Largeness).** `C_n` contains a non-negligible fraction of all functions:
  `|C_n| / |F_n| ≥ 2^{-O(n)} = N^{-O(1)}`. (Even `≥ 1/2^{N^{o(1)}}` suffices for the strongest
  forms; the standard statement uses the inverse-polynomial-in-`N` threshold.)

A property is **natural** if it *contains* a constructive, large subproperty `C* ⊆ C` that is
still useful against `Λ`. (This "contains a subproperty" framing matters: a proof can be natural
even if the property literally used is not large, as long as it can be *thinned* to a large,
constructive, still-useful core. This is what makes the barrier bite on real proofs.)

> **Established (Razborov–Rudich 1994/97).** The three conditions — useful, constructive, large
> — are exactly what is needed to turn a lower-bound proof into a *statistical test* (a
> distinguisher) that separates "hard" truth tables from random ones.

### 2. The main theorem

Recall the cryptographic objects. A **pseudorandom function generator (PRF)** is a family
`{f_k}` with key `k ∈ {0,1}^s` computing `f_k : {0,1}^n → {0,1}` such that (i) `f_k` is
computable in time/size `poly(n)` given `k`, and (ii) no adversary running in time `2^{n^{O(1)}}`
(or in the size class corresponding to `Λ`) can distinguish oracle access to `f_k` (random `k`)
from a truly random function with advantage better than `2^{-n^{ω(1)}}`. PRFs with such
*exponential* hardness follow from exponentially-hard **one-way functions** via the
**GGM construction** (Goldreich–Goldwasser–Micali, 1986) composed with the
**Håstad–Impagliazzo–Levin–Luby** PRG construction (HILL, 1999) from any OWF; one needs the
hardness scaled so the adversary class matches `Λ`.

> **Theorem (Razborov–Rudich, 1994/97).**
> Suppose there exist pseudorandom function generators that are hard against circuits of size
> `2^{n^{ε}}` for some `ε > 0` (equivalently, sufficiently strong one-way functions exist).
> Then there is **no `P/poly`-natural property useful against `P/poly`**. In particular, no
> natural proof can show `NP ⊄ P/poly`.

**Proof sketch.** Suppose `C` is `P/poly`-natural and useful against `P/poly`. We build a
distinguisher `D` breaking the PRF. By largeness, a uniformly random truth table lands in `C_n`
with probability `≥ N^{-O(1)}`, which is non-negligible. By usefulness, *no* small-circuit
function lies in `C_n`; in particular the PRF functions `f_k`, which have `poly(n)`-size circuits,
satisfy `f_k ∉ C_n` for all `k` (for large `n`). By constructivity, `D` can, given a length-`N`
truth table, decide membership in `C_n` in time/size `poly(N) = 2^{O(n)}`.

Now `D` queries its oracle at all `N = 2^n` points to assemble a truth table `T` and outputs
`1` iff `T ∈ C_n`:

- If the oracle is a **truly random** function, `Pr[D = 1] = |C_n|/|F_n| ≥ N^{-O(1)}` (largeness).
- If the oracle is `f_k` for random `k`, `Pr[D = 1] = 0` (usefulness: `f_k` has small circuits, so
  `f_k ∉ C_n`).

Thus `D` distinguishes with advantage `≥ N^{-O(1)} = 2^{-O(n)}`, running in size `2^{O(n)}`. This
contradicts the assumed `2^{n^{ε}}`-hardness of the PRF (choose parameters so the PRF's input
length is `m` with `n = m^{ε/2}`, say, so that `2^{O(n)}` is sub-`2^{m^{ε}}` while the advantage
`2^{-O(n)}` exceeds the allowed `2^{-m^{ω(1)}}`). ∎ (sketch)

The quantitative bookkeeping — matching the distinguisher's size `2^{O(n)}` and advantage
`2^{-O(n)}` against the PRF's security parameters — is the technical heart; the conceptual content
is the three bullet points.

### 3. Why classic techniques are natural

The barrier's force comes from the fact that the pre-1994 toolkit *is* natural. Auditing:

- **Håstad Switching Lemma / AC⁰ bounds.** The property "`f` is not well-approximated by a small
  decision tree after random restriction" (equivalently "`f` has high average sensitivity / large
  high-degree Fourier mass") is **large** (a random function has near-maximal sensitivity and
  spread Fourier spectrum) and **constructive** (Fourier coefficients of a length-`N` truth table
  are computable in `Õ(N)` time by FFT). Parity has the property; so do most functions.

- **Razborov–Smolensky polynomial method.** The property "`f` cannot be approximated to error
  `< 1/2 - 1/poly` by a degree-`d` polynomial over `F_p`" is **large** (random functions have no
  low-degree approximant) and **constructive** (least-squares / linear-algebra over `F_p` on the
  truth table is polynomial in `N`).

- **Razborov monotone / approximation method.** The combinatorial invariant tracked (closure
  under the approximating sunflower-based operations, or the "many minterms/maxterms in general
  position" condition) is again a property held by random monotone functions and checkable from
  the truth table in `poly(N)` time.

- **Communication-complexity-based bounds (Karchmer–Wigderson) and the formula-size lower
  bounds derived from them** similarly exhibit large, constructive invariants.

In each case the proof does not merely show *one* function is hard; it shows a *random* function
is hard, via an *efficiently checkable* certificate. That is precisely naturalness.

> **Caveat (established, important).** Naturalness is about the proof *technique*, not the target
> theorem. There is no contradiction with the proofs being correct: they are correct lower bounds
> against *restricted* classes `Λ` for which no strong PRF exists *inside* `Λ` (e.g. `AC⁰` cannot
> even compute parity, let alone a PRF). The barrier says: scale the *same* technique up to
> `P/poly`, where strong PRFs plausibly *do* live, and it must fail.

### 4. The cryptographic connection, stated as an equivalence-flavored picture

- **Useful + large + constructive ⇒ distinguisher** (above). So natural lower bounds for `P/poly`
  *would refute the existence of strong PRFs/OWFs*.
- Conversely, the existence of a constructive large useful property is essentially the statement
  that one can *efficiently certify hardness on average*, which is exactly what a successful
  cryptographic distinguisher needs. Razborov–Rudich phrase the upshot as a dichotomy: either
  strong one-way functions do **not** exist (a world where much of cryptography collapses), or the
  natural-proofs route to `NP ⊄ P/poly` is closed.
- This couples the **P vs NP** lower-bound program to cryptographic hardness in a way that is
  philosophically striking: *proving* circuits are weak (no small circuits for `NP`) is obstructed
  by *believing* circuits are strong (they can compute hard-to-distinguish pseudorandom functions).

### 5. What a non-naturalizing proof must look like

To separate `P` from `NP` (or even prove `NP ⊄ P/poly`), a proof must **violate at least one** of
{largeness, constructivity, usefulness-as-stated} — and since usefulness is the *goal*, in
practice it must sacrifice **largeness** or **constructivity**:

1. **Non-large (special-structure) properties.** The proof exploits a property that holds for the
   *specific* target function (e.g. via its algebraic/symmetry structure) but is *false for random
   functions*. This is the route of **Geometric Complexity Theory** (Mulmuley–Sohoni): use
   representation theory and algebraic geometry of the orbit closures of the determinant and
   permanent, properties that are emphatically *not* shared by random polynomials. GCT is widely
   believed to evade naturalness precisely because its invariants are non-large.
   **[SPECULATIVE assessment]:** GCT's escape is real *in principle* but has so far produced no
   superpolynomial bound; recent "no-go" results (e.g. on occurrence vs. multiplicity obstructions,
   Bürgisser–Ikenmeyer–Panova 2019) show the *naive* GCT obstruction strategy fails, so even the
   non-natural route is hard.

2. **Non-constructive properties.** The hardness certificate is not checkable in `2^{O(n)}` time.
   This is the lever behind **`MCSP`-centric and meta-complexity arguments**: the Minimum Circuit
   Size Problem `MCSP` asks, given a truth table and a size bound `s`, whether the function has a
   circuit of size `≤ s`. A natural property is, almost by definition, a `poly(N)`-time algorithm
   that solves a promise version of co-`MCSP`. So an unconditional `NP`-hardness or strong lower
   bound for `MCSP` would either (a) be non-natural, or (b) collapse cryptography — making `MCSP`
   the formal "interface" between the barrier and the separation. Williams, Hirahara, and others
   have built **hardness magnification**: extremely weak-looking lower bounds for `MCSP`-style
   problems would magnify to `P ≠ NP`-flavored separations — but the weak bounds themselves remain
   open and are *suspected* to require non-natural arguments.

3. **Williams' `ACC⁰` program (2011), a partial real-world escape.** Ryan Williams proved
   `NEXP ⊄ ACC⁰` by combining a non-trivial `ACC⁰`-`SAT` algorithm with the *algorithmic method*:
   a fast satisfiability algorithm for a circuit class implies a lower bound against it. This proof
   is *not* known to be natural in the Razborov–Rudich sense (it does not present a large,
   constructive property; it leverages a specific algorithm and a "win-win" with `NEXP`'s
   completeness). It is the leading example that the algorithmic method can sidestep the barrier —
   yet it lands at `NEXP`, far above `NP`, and scaling it down to `NP` vs `P/poly` is exactly the
   open frontier.

> **[SPECULATIVE — my synthesis]:** The three known escape hatches each pay a steep, currently
> unmet price. GCT abandons largeness but needs deep algebraic-geometry obstructions that
> demonstrably resist the obvious constructions. Meta-complexity/`MCSP` abandons constructivity
> but the magnifiable weak bounds are themselves open and may re-encounter the barrier in disguise
> (a "naturalization of meta-complexity"). The algorithmic method abandons the
> property-presentation form entirely but only reaches `NEXP`. A plausible reading is that a
> successful separation will be **simultaneously non-relativizing, non-algebrizing, and
> non-natural**, most likely by being **non-constructive via meta-complexity** *and* exploiting a
> *win-win algorithmic* step — i.e. a hybrid of the Williams method and Hirahara-style
> meta-complexity, rather than any single one. I emphasize this is a research conjecture about
> *proof shape*, not a result.

---

## Results Obtained

1. A precise, self-contained statement of **largeness, constructivity, usefulness** with the
   correct quantitative thresholds (advantage `2^{-O(n)}`, distinguisher size `2^{O(n)}`,
   truth-table length `N = 2^n`).
2. A complete **proof sketch** of the impossibility theorem and an explicit account of the
   parameter matching against `2^{n^ε}`-hard PRFs.
3. An **audit** showing the Switching Lemma, polynomial method, monotone/approximation method,
   and KW-communication bounds are all natural, with the "thinning to a large constructive core"
   argument made explicit and the crucial caveat that naturalness is a property of *technique
   scaled to `P/poly`*, not of the (correct) restricted-class theorems.
4. A clear statement of the **cryptographic dichotomy** (strong OWFs/PRFs vs. natural separation)
   and the role of **GGM + HILL** in supplying the needed PRFs from OWFs.
5. A structured **taxonomy of escape routes** (non-large = GCT; non-constructive = meta-complexity
   / `MCSP` / hardness magnification; property-free = algorithmic method / Williams) with honest
   notes on why each remains stuck.

---

## Barriers Encountered

- **The barrier is conditional, but on a *plausible* hypothesis.** The impossibility holds only
  if strong PRFs/OWFs exist. One *could* try to separate by *disproving* strong OWFs — but that
  would itself be a revolution and there is no evidence for it; most experts believe OWFs exist.
- **Self-referential obstruction for this very angle.** Studying the barrier does not produce a
  separation; by design it tells us which proofs *cannot* work. The angle is fundamentally a
  *negative* result and cannot, on its own, close the gap.
- **Escape routes inherit other barriers.** Meta-complexity arguments must still avoid
  relativization/algebrization; GCT must produce explicit representation-theoretic obstructions
  that recent no-go theorems (Bürgisser–Ikenmeyer–Panova) show do not exist in the simplest form.
- **Quantitative fragility.** The exact thresholds (how large is "large enough," how constructive
  is "constructive enough") matter; weakening constructivity to, say, `quasi-poly(N)` or
  `NP`-checkability changes which proofs are caught, and the literature contains subtle variants
  (e.g. properties constructive in `P^{NP}` or against `Λ`-circuits) that are easy to misstate.
- **Even the partial escape (Williams) does not scale.** `NEXP ⊄ ACC⁰` is real and non-natural,
  but extending the algorithmic method to `NP` vs `P/poly` requires `SAT` algorithms for general
  poly-size circuits beating brute force by enough, which is itself essentially open.

---

## Honest Assessment

This angle is, in my judgment, the most important *meta-mathematical* lesson in complexity theory
and one of the strongest reasons P vs NP has resisted attack — but it is **not a path to a
separation**, and it was never intended as one. What it delivers is a sharp diagnostic: any claimed
proof of `NP ⊄ P/poly` should be checked against largeness and constructivity *first*, because if
it is natural it is almost certainly wrong (modulo the collapse of cryptography). As a contribution
to the collaborative P vs NP program, the realistic value of this angle is (i) to **filter** other
researchers' attempts, (ii) to **point** the program toward the genuinely barrier-evading methods
(meta-complexity / `MCSP`, GCT, the algorithmic method), and (iii) to **clarify** that the eventual
proof must be non-constructive or non-large in a controlled, structure-exploiting way.

How far does it get us toward resolving P vs NP? Honestly: it gets us *zero distance toward a yes
or no answer*, while getting us substantial distance toward *not wasting effort*. The barrier is a
fence, not a road. The frontier — magnifiable meta-complexity lower bounds, scaling the algorithmic
method below `NEXP`, and concrete GCT obstructions — is exactly where the barrier *stops* helping
and unsolved mathematics begins. My speculative synthesis (a Williams × Hirahara hybrid) is a guess
about proof shape, not progress, and I flag it as such. I claim no resolution of P vs NP.

---

## Open Sub-questions

1. **Is `MCSP` `NP`-hard?** A robust unconditional `NP`-hardness for `MCSP` would, via the
   property/algorithm duality, force either non-natural techniques or a cryptographic collapse —
   pinning down exactly which.
2. **Can hardness magnification be "de-magnified" by the barrier?** Do the weak `MCSP`-style
   lower bounds that magnify themselves require natural arguments, re-importing the obstruction?
3. **Quantitative tightening:** what is the *weakest* cryptographic assumption (e.g. average-case
   hardness short of full OWFs, or hardness of specific problems) that already implies "no natural
   proofs"? How does the threshold trade off against the largeness/constructivity parameters?
4. **Below `NEXP`:** what `SAT`-algorithm improvement for poly-size circuits would scale Williams'
   algorithmic method to a `P/poly` lower bound for an `NP` (or `NEXP`-then-`NP`) language?
5. **GCT after the no-go theorems:** are there *multiplicity* obstructions (as opposed to
   occurrence obstructions) that survive Bürgisser–Ikenmeyer–Panova and are still large-evading?
6. **Is there a "fourth barrier"** that captures meta-complexity attempts the way naturalness
   captured combinatorial ones — i.e. a precise sense in which even `MCSP`-based proofs could be
   self-defeating?

---

## References

1. A. A. Razborov and S. Rudich. *Natural Proofs.* STOC 1994; *Journal of Computer and System
   Sciences*, 55(1):24–35, 1997. (Gödel Prize 2007.)
2. T. Baker, J. Gill, R. Solovay. *Relativizations of the P =? NP question.* SIAM J. Comput.,
   4(4):431–442, 1975. (Relativization barrier.)
3. S. Aaronson and A. Wigderson. *Algebrization: A New Barrier in Complexity Theory.* STOC 2008;
   ACM Trans. Comput. Theory, 1(1), 2009. (Algebrization barrier.)
4. M. Furst, J. Saxe, M. Sipser. *Parity, circuits, and the polynomial-time hierarchy.* 1984.
5. J. Håstad. *Almost optimal lower bounds for small depth circuits.* STOC 1986; *Computational
   Limitations of Small-Depth Circuits*, MIT Press, 1987. (Switching Lemma.)
6. A. A. Razborov. *Lower bounds on the monotone complexity of some Boolean functions.* 1985.
7. N. Alon, R. Boppana. *The monotone circuit complexity of Boolean functions.* Combinatorica,
   1987.
8. A. A. Razborov. *Lower bounds on the size of bounded-depth networks over a complete basis with
   logical addition.* 1987. R. Smolensky. *Algebraic methods in the theory of lower bounds for
   Boolean circuit complexity.* STOC 1987. (Polynomial method.)
9. O. Goldreich, S. Goldwasser, S. Micali. *How to construct random functions.* JACM 33(4), 1986.
   (GGM / PRFs.)
10. J. Håstad, R. Impagliazzo, L. Levin, M. Luby. *A pseudorandom generator from any one-way
    function.* SIAM J. Comput., 28(4), 1999. (HILL.)
11. R. Williams. *Nonuniform ACC circuit lower bounds.* JACM 61(1), 2014 (STOC 2011).
    (Algorithmic method; `NEXP ⊄ ACC⁰`.)
12. K. Mulmuley, M. Sohoni. *Geometric Complexity Theory I.* SIAM J. Comput., 31(2), 2001.
13. P. Bürgisser, C. Ikenmeyer, G. Panova. *No occurrence obstructions in geometric complexity
    theory.* JAMS 32, 2019.
14. S. Hirahara. *Meta-computational lower bounds / NP-hardness of MCSP under randomized
    reductions.* FOCS 2018 and subsequent. (Meta-complexity.)
15. I. C. Oliveira, R. Santhanam, et al. *Hardness magnification* line of work, c. 2018–2019.
16. S. Arora, B. Barak. *Computational Complexity: A Modern Approach.* Cambridge, 2009.
    (Textbook treatment of all three barriers, Ch. 22–23.)
