# Propositional Proof Complexity and the NP vs coNP Program — Proof-Complexity Angle

## Abstract

This write-up surveys and advances the proof-complexity attack on the P vs NP
question, routed through its close relative NP vs coNP. The central organizing
result is the Cook–Reckhow theorem: **NP = coNP if and only if there exists a
polynomially bounded propositional proof system.** This reduces a separation
question to proving super-polynomial lower bounds on proof length for *every*
propositional proof system, for some sequence of tautologies. I lay out the
established lower-bound hierarchy (Resolution, Cutting Planes, bounded-depth
Frege, Polynomial Calculus), present a worked proof sketch of the exponential
Resolution lower bound for the pigeonhole principle via the
bottleneck-counting/width method, and assess honestly how far the program
reaches. The candid conclusion: the program is the most *barrier-resistant*
known route to NP ≠ coNP (it provably sidesteps relativization and is widely
believed to evade natural proofs), but it is stalled at the same frontier that
has blocked it since the late 1990s — **no super-polynomial lower bound is known
for Frege systems, let alone for all proof systems**, and bridging from the
weak systems we can handle to strong systems appears to require genuinely new
hardness ideas. This is a survey-plus-analysis contribution, not a claimed
resolution.

## Background / Prior Work

### Definitions

A **propositional proof system** (Cook–Reckhow, 1979) is a polynomial-time
computable surjective function `P : {0,1}* → TAUT`, where `TAUT` is the set of
propositional tautologies (in some fixed encoding). If `P(w) = τ`, then `w` is a
`P`-proof of the tautology `τ`. Two requirements are packed in:

- **Soundness + completeness**: the range of `P` is exactly `TAUT` (every output
  is a tautology, and every tautology has a preimage).
- **Polynomial-time verifiability**: given `w` and `τ`, checking `P(w) = τ`
  is feasible.

A proof system `P` is **polynomially bounded** if there is a polynomial `p`
such that every tautology `τ` has a `P`-proof of length at most `p(|τ|)`.

Standard concrete systems, in increasing strength (each *p-simulates* the
weaker — can translate proofs with at most polynomial blowup):

- **Resolution**: refutes an unsatisfiable CNF by the resolution rule
  `(A ∨ x), (B ∨ ¬x) ⊢ (A ∨ B)`, deriving the empty clause. Lines are clauses.
- **Polynomial Calculus (PC / PCR)**: works over a field; lines are polynomials,
  rules are linear combination and multiplication by variables; refutation =
  deriving `1` from the polynomial encoding of the clauses (Clegg–Edmonds–Impagliazzo).
- **Cutting Planes (CP)**: lines are linear integer inequalities; rules are
  addition and division-with-rounding; refutes by deriving `0 ≥ 1`.
- **Bounded-depth Frege (AC⁰-Frege)**: Frege proofs where every formula has
  depth bounded by a constant; tightly linked to AC⁰ circuit lower bounds.
- **Frege**: textbook propositional calculus — a finite set of axiom schemes and
  modus ponens, lines are arbitrary formulas.
- **Extended Frege (EF)**: Frege plus the extension rule, allowing abbreviation
  of formulas by new variables; equivalent in power to reasoning with circuits.

### Key established theorems

- **[ESTABLISHED] Cook–Reckhow (1979).** `NP = coNP` iff there is a polynomially
  bounded propositional proof system. *Proof idea:* `TAUT` is coNP-complete; a
  proof system is exactly an NP-style verifier for `TAUT` once proofs are short.
  A polynomially bounded `P` puts `TAUT ∈ NP`, hence `coNP ⊆ NP`, hence
  `NP = coNP`; conversely an NP algorithm for `TAUT` yields short certificates,
  i.e. a polynomially bounded system. This is the foundation of the whole
  program. Note `P = NP ⇒ NP = coNP`, so super-polynomial lower bounds against
  all proof systems would also imply `P ≠ NP`.

- **[ESTABLISHED] Haken (1985).** Resolution requires `2^{Ω(n)}`-size
  refutations of the pigeonhole principle `PHP^{n+1}_n`. First super-polynomial
  lower bound for a natural system on natural tautologies.

- **[ESTABLISHED] Ben-Sasson–Wigderson (2001).** Size–width tradeoff: any
  Resolution refutation of an unsatisfiable CNF in `n` variables of width `w`
  needs size `2^{Ω((w − w_0)²/n)}` (where `w_0` is the initial clause width).
  Reduces size lower bounds to *width* lower bounds — the cleanest modern proof
  of Haken's result, and the workhorse for Resolution lower bounds.

- **[ESTABLISHED] Urquhart (1987); Chvátal–Szemerédi (1988).** Exponential
  Resolution lower bounds for random `k`-CNFs and for Tseitin tautologies on
  expander graphs.

- **[ESTABLISHED] Pudlák (1997).** Exponential lower bounds for Cutting Planes,
  via monotone interpolation reducing to monotone circuit lower bounds
  (clique–coclique).

- **[ESTABLISHED] Razborov (1998); Impagliazzo–Pudlák–Sgall (1999).** Degree and
  size lower bounds for Polynomial Calculus (PHP, Tseitin, random CNFs).

- **[ESTABLISHED] Ajtai (1994); Pitassi–Beame–Impagliazzo; Krajíček–Pudlák–Woods
  (1991–95).** Bounded-depth Frege requires super-polynomial (indeed
  `exp(n^{Ω(1/d)})`, Håstad-type) refutations of `PHP`. Built on the AC⁰
  switching lemma.

- **[ESTABLISHED] Feasible interpolation (Krajíček; Bonet–Pitassi–Raz).**
  Resolution and CP admit feasible interpolation, which yields lower bounds from
  circuit lower bounds — *but* Bonet–Pitassi–Raz (1997) showed (under crypto
  assumptions) that Frege and even `TC⁰`-Frege do **not** admit feasible
  interpolation, closing this avenue for strong systems.

The frontier, unchanged in spirit for ~25 years: **no super-polynomial size
lower bound is known for Frege or Extended Frege on any tautology family.**
Even AC⁰-Frege with counting gates (`AC⁰[p]`-Frege) is open in general.

## Approach & Methodology

The strategy has three layers.

1. **Reduce the target.** By Cook–Reckhow, proving `NP ≠ coNP` (a consequence of
   `P ≠ NP`) is equivalent to: *for every propositional proof system `P`, there is
   a family of tautologies requiring super-polynomial `P`-proofs.* This is a
   universally-quantified lower-bound statement — exactly the form proof
   complexity is built to attack, one system at a time, climbing the
   p-simulation hierarchy.

2. **Climb the hierarchy.** Establish lower bounds for ever-stronger systems:
   Resolution → PC/CP → bounded-depth Frege → Frege → Extended Frege. Each rung
   has historically demanded a new combinatorial or algebraic technique (width,
   interpolation, switching lemmas, Nullstellensatz degree). The hope is that the
   sequence converges on a *uniform* method.

3. **Identify hard tautology families.** The recurring candidates — `PHP`,
   Tseitin/parity over expanders, random `k`-CNF, the
   **weak pigeonhole principle**, and proof-theoretic statements like
   consistency/reflection formulas — are believed hard for strong systems and
   double as the test bed for any new technique.

Why this could separate P and NP: a lower bound against *all* proof systems is
literally equivalent to `NP ≠ coNP`. Unlike circuit complexity (which targets
`P ≠ NP` through machine-independent hardness), proof complexity attacks the
logical "core" of nondeterminism — the asymmetry between guessing a witness and
certifying its absence. It is also the angle with the cleanest barrier story
(see Barriers).

## Attempt / Key Arguments

I give a self-contained proof sketch of the Resolution `PHP` lower bound via the
modern size–width route, then describe my own (clearly-marked speculative)
attempt to push toward stronger systems and why it stalls.

### A. [ESTABLISHED — reproduced sketch] Exponential Resolution lower bound for PHP

**Setup.** `PHP^{m}_n` (here `m = n+1`) says `m` pigeons map injectively into
`n` holes; it is false, so its CNF encoding `¬PHP` is unsatisfiable. Variables
`x_{i,j}` = "pigeon `i` in hole `j`". Clauses: each pigeon in some hole
(`⋁_j x_{i,j}`, width `n`), no two pigeons share a hole
(`¬x_{i,j} ∨ ¬x_{i',j}`).

**Width lower bound (the heart).** Define the width `w(π)` of a refutation `π`
as the maximum number of literals in any clause of `π`. Claim: any Resolution
refutation of `¬PHP^{n+1}_n` has width `≥ n/ c` for a constant `c` (in fact
`Ω(n)`).

*Argument via the standard "fat clause / progress measure" method.* Assign to
each clause `C` a complexity `μ(C)` = the minimum number of the pigeonhole axiom
clauses whose conjunction implies `C` (a sub-additive measure: `μ` of a
resolvent is at most the sum of `μ` of its parents). The empty clause requires
`μ ≥ n+1` (you need essentially all pigeon-axioms to derive a contradiction),
while each input clause has `μ ≤ 1`. By sub-additivity and the binary-tree
structure of derivations, some clause in `π` has `μ` in the "medium" range
`[(n+1)/3, 2(n+1)/3]`. A combinatorial lemma (using that any small set of
pigeon constraints is satisfiable — a matching argument on bipartite expansion)
shows any clause of medium `μ` must mention `Ω(n)` distinct variables, i.e. be
wide. Hence `w(π) = Ω(n)`.

**From width to size (Ben-Sasson–Wigderson).** The size–width theorem states:
`size(π) ≥ exp( Ω( (w*(¬PHP) − w_0)² / V ) )`, where `w*` is the minimal
refutation width, `w_0` the max axiom width, and `V` the number of variables.
For `PHP^{n+1}_n`, `w* = Ω(n)`, `w_0 = n`, `V = (n+1)n`. The clean way to get an
exponential bound is to first restrict to the relevant subformula or to use the
Haken bottleneck count directly; the upshot established in the literature is

  `size(π) ≥ 2^{Ω(n)}`.

**Bottleneck-counting (Haken's original).** Alternatively: consider random
restrictions corresponding to partial matchings. A clause is a "bottleneck" for
a restriction if it is the last large clause falsified along the path the
restriction induces through the refutation DAG. One shows (i) every restriction
hits some wide clause, and (ii) each wide clause is a bottleneck for only an
exponentially small fraction of restrictions. Counting restrictions
(`≈ n!/(n−k)!` partial matchings) against the per-clause bound forces
`2^{Ω(n)}` clauses. Both routes are fully rigorous and published; I reproduce
the structure, not new mathematics. **[ESTABLISHED]**

### B. [ESTABLISHED, recalled] Why the same techniques die at Frege

Each lower-bound technique above exploits a *locality* or *low-complexity*
feature absent in strong systems:

- Width/bottleneck arguments rely on clauses being *local* (Resolution lines are
  clauses). Frege lines are arbitrary formulas — no width measure constrains them.
- Feasible interpolation reduces proof lower bounds to *monotone/Boolean circuit*
  lower bounds. Bonet–Pitassi–Raz showed Frege does not have feasible
  interpolation under crypto assumptions, so this bridge is provably unavailable
  for strong systems.
- Switching-lemma arguments (bounded-depth Frege) collapse once formulas have
  unbounded depth; there is no analogue of the AC⁰ switching lemma for general
  formulas — which is the same wall as `NC¹` vs `AC⁰` in circuit complexity.

### C. [ATTEMPT — gap is fundamental, not a fixable step] A speculative bridge via "effective interpolation modulo a hard bit"

*Idea.* Frege lacks feasible interpolation only because the interpolant could be
cryptographically hard to compute. Suppose we restrict attention to tautology
families `A_n(p,q) → B_n(p,q)` where the disjoint variable split `(p,q)` is
*forced by a combinatorial structure* (e.g. a graph cut) such that any
interpolant computes a function known to be hard for `P/poly` unconditionally.
Then a short Frege proof would yield a small circuit for a function with no small
circuit — contradiction.

*Where it stalls.* This is exactly the strategy that *succeeds* for Resolution/CP
(monotone interpolation) and *provably fails* for Frege: the Bonet–Pitassi–Raz
construction shows that for Frege, short proofs do **not** force small
interpolating circuits at all — the interpolation theorem itself is false for
Frege under standard assumptions. So there is no "hard bit" to exploit; the
implication "short proof ⇒ small circuit" simply does not hold. My attempt
silently assumes the interpolation theorem it needs. **The gap is not at a step;
the premise is known-false for the target systems.** I record this as a negative
result: *interpolation-based methods cannot, even in principle, reach Frege.*
This matches the community consensus and is logged as a confirmed dead-end for
this sub-idea.

### D. [SPECULATION] The proof-theoretic / bounded-arithmetic angle

A more promising-in-principle direction (Krajíček, Pudlák): proof systems
correspond to fragments of **bounded arithmetic** (`EF ↔ S¹₂`, etc.). A
super-polynomial Frege/EF lower bound is essentially a *consistency-strength* or
*independence* statement. The candidate hard tautologies become formalized
combinatorial principles (e.g. the weak pigeonhole principle `WPHP`, or
`τ`-formulas encoding "this small circuit does not compute SAT"). The deep
obstacle (Razborov's program on `pseudorandom generators` for proof complexity,
and the **proof complexity generators conjecture**) is that proving such lower
bounds appears to require, or to entail, strong circuit lower bounds and/or the
existence of hard pseudorandom generators — i.e., it is *not obviously easier*
than the circuit-complexity route it was meant to bypass. I mark this as the most
credible long-term line but currently **speculative and open**.

## Results Obtained

- **[ESTABLISHED, surveyed]** A precise statement and proof idea of the
  Cook–Reckhow equivalence anchoring the program: `NP = coNP ⇔` a polynomially
  bounded proof system exists.
- **[ESTABLISHED, reproduced]** A coherent proof sketch of the `2^{Ω(n)}`
  Resolution lower bound for `PHP^{n+1}_n` via both the progress-measure/width
  method and Haken's bottleneck counting, plus the Ben-Sasson–Wigderson
  size–width reduction.
- **[ESTABLISHED, surveyed]** A correct map of the known lower-bound frontier:
  exponential bounds hold for Resolution, PC/PCR, Cutting Planes, and
  bounded-depth Frege; **nothing super-polynomial is known for Frege or EF.**
- **[NEGATIVE RESULT]** Confirmation (consistent with Bonet–Pitassi–Raz) that
  feasible-interpolation-based attacks — including my "hard-bit" variant in
  §C — cannot reach Frege, because Frege provably lacks feasible interpolation
  under standard cryptographic assumptions. This sub-idea is a dead end and is
  recorded as such.
- **[ASSESSMENT]** Identification of the bounded-arithmetic / proof-complexity-
  generators direction (§D) as the most credible remaining path, together with
  the observation that it appears to re-import the difficulty of circuit lower
  bounds rather than circumvent it.

No new unconditional lower bound is claimed. No progress toward resolving
P vs NP is claimed beyond surveying and stress-testing the route.

## Barriers Encountered

- **Relativization (Baker–Gill–Solovay).** *Largely evaded.* Propositional proof
  complexity is a finite, non-uniform, oracle-free setting: a Resolution or Frege
  refutation of a fixed CNF makes no oracle queries, and lower-bound proofs
  (width, switching lemmas, counting) are combinatorial facts about finite
  objects. This is the central *strength* of the angle — it provably is not
  obstructed by the relativization barrier that blocks naive diagonalization.

- **Natural Proofs (Razborov–Rudich).** *Partially evaded / subtle.* The
  Razborov–Rudich barrier targets `P/poly`-natural combinatorial properties used
  for *circuit* lower bounds and presumes pseudorandom functions exist. Proof-
  complexity lower bounds are not obviously "natural" in the technical sense:
  many (e.g. interpolation-based, or arithmetic-degree-based) are not
  large/constructive properties of truth tables. However — and this is the
  honest caveat — Razborov's later work shows that proving lower bounds for
  *strong* systems (EF) is tied to the existence of hard pseudorandom generators
  (the proof-complexity-generators program), which re-introduces a
  natural-proofs-flavored obstruction at the top of the hierarchy. So the barrier
  is dodged for weak systems but reasserts itself, in modified form, exactly
  where we are stuck.

- **Algebrization (Aaronson–Wigderson).** *Not the operative obstruction.*
  Algebrization concerns oracle/algebraic-extension techniques for uniform
  complexity. Finite propositional lower bounds are not algebrizing arguments in
  that sense, so this barrier is not what blocks Frege bounds.

- **Angle-specific obstruction: feasible interpolation fails for strong systems.**
  Bonet–Pitassi–Raz (under crypto assumptions) kills the single most successful
  technique (interpolation → circuit lower bounds) for Frege and `TC⁰`-Frege.
  This is the concrete wall §C runs into.

- **Angle-specific obstruction: equivalence to circuit hardness.** The
  bounded-arithmetic correspondence suggests EF lower bounds may be *equivalent
  to or harder than* the very circuit lower bounds the program hoped to bypass
  (cf. EF reasons about `P/poly`). This is the deep, currently-unbroken wall.

## Honest Assessment

The proof-complexity angle is, in my assessment, the **most barrier-resistant
known route toward `NP ≠ coNP`** and hence toward `P ≠ NP`: it provably escapes
relativization, and for weak systems it escapes natural proofs and algebrization
as well. It has delivered the field's cleanest unconditional lower bounds
(Haken, Ben-Sasson–Wigderson, Ajtai, Pudlák, Razborov). That is real, durable
progress.

But it is **stalled at the Frege barrier and has been for roughly 25 years.** The
program requires lower bounds for *every* proof system; we cannot prove a single
super-polynomial lower bound for *Frege*, a system far weaker than "all systems."
Every technique that works (width, switching lemmas, interpolation) exploits a
structural weakness — locality, bounded depth, computable interpolants — that
strong systems simply lack. My own §C attempt to engineer around the
interpolation failure does not work even in principle, because the enabling
theorem is known-false for Frege. The most credible remaining direction (§D,
bounded arithmetic + proof-complexity generators) appears to re-import the full
difficulty of circuit lower bounds, so it is not a shortcut.

Net: this angle has **not** resolved, and is **not close to resolving**, P vs NP.
It is a healthy, active, theorem-producing program whose frontier coincides with
one of the deepest open problems in the field (Frege lower bounds). I claim no
resolution and no new unconditional bound — only a faithful map of where the
route reaches and a confirmed dead-end for the interpolation sub-idea.

## Open Sub-questions

- Prove *any* super-polynomial size lower bound for Frege on *any* explicit
  tautology family (the central open problem of the field).
- Prove a super-polynomial lower bound for `AC⁰[p]`-Frege (constant-depth Frege
  with mod-`p` gates) — the natural next rung above bounded-depth Frege, open
  even for `p = 2`.
- Establish (or refute) Razborov's proof-complexity-generators conjecture, which
  would yield EF lower bounds.
- Find a hard-tautology family for which short EF proofs would *provably*
  contradict an *unconditional* circuit fact — i.e. an interpolation substitute
  that survives the Bonet–Pitassi–Raz obstruction.
- Clarify the exact logical relationship: does an EF lower bound imply a
  super-polynomial circuit lower bound? (Pin down whether §D is strictly harder
  than the circuit route.)
- Lower bounds for the weak pigeonhole principle `WPHP^{2n}_n` in strong systems,
  given its connection to formalizing pseudorandomness in bounded arithmetic.

## References

1. S. A. Cook and R. A. Reckhow, "The Relative Efficiency of Propositional Proof
   Systems," *Journal of Symbolic Logic* 44(1), 1979, 36–50.
2. A. Haken, "The Intractability of Resolution," *Theoretical Computer Science*
   39, 1985, 297–308.
3. E. Ben-Sasson and A. Wigderson, "Short Proofs Are Narrow — Resolution Made
   Simple," *Journal of the ACM* 48(2), 2001, 149–169.
4. A. Urquhart, "Hard Examples for Resolution," *Journal of the ACM* 34(1), 1987,
   209–219.
5. V. Chvátal and E. Szemerédi, "Many Hard Examples for Resolution," *Journal of
   the ACM* 35(4), 1988, 759–768.
6. P. Pudlák, "Lower Bounds for Resolution and Cutting Plane Proofs and Monotone
   Computations," *Journal of Symbolic Logic* 62(3), 1997, 981–998.
7. A. A. Razborov, "Lower Bounds for the Polynomial Calculus," *Computational
   Complexity* 7, 1998, 291–324.
8. R. Impagliazzo, P. Pudlák, J. Sgall, "Lower Bounds for the Polynomial Calculus
   and the Gröbner Basis Algorithm," *Computational Complexity* 8, 1999, 127–144.
9. M. Ajtai, "The Complexity of the Pigeonhole Principle," *Combinatorica* 14(4),
   1994, 417–433.
10. J. Krajíček, P. Pudlák, A. Woods, "An Exponential Lower Bound to the Size of
    Bounded Depth Frege Proofs of the Pigeonhole Principle," *Random Structures &
    Algorithms* 7(1), 1995, 15–39.
11. P. Beame, R. Impagliazzo, J. Krajíček, T. Pitassi, P. Pudlák, "Lower Bounds on
    Hilbert's Nullstellensatz and Propositional Proofs," *Proc. London Math. Soc.*
    73(3), 1996, 1–26.
12. M. Bonet, T. Pitassi, R. Raz, "No Feasible Interpolation for TC⁰-Frege
    Proofs," *FOCS* 1997, 254–263.
13. M. Clegg, J. Edmonds, R. Impagliazzo, "Using the Groebner Basis Algorithm to
    Find Proofs of Unsatisfiability," *STOC* 1996, 174–183.
14. J. Krajíček, *Bounded Arithmetic, Propositional Logic, and Complexity
    Theory*, Cambridge University Press, 1995.
15. J. Krajíček, *Proof Complexity*, Cambridge University Press, 2019.
16. A. A. Razborov, "Pseudorandom Generators Hard for k-DNF Resolution and
    Polynomial Calculus Resolution," *Annals of Mathematics* 181(2), 2015,
    415–472.
17. S. Buss, "Towards NP–P via Proof Complexity and Search," *Annals of Pure and
    Applied Logic* 163(7), 2012, 906–917.
18. T. Baker, J. Gill, R. Solovay, "Relativizations of the P =? NP Question,"
    *SIAM J. Computing* 4(4), 1975, 431–442.
19. A. A. Razborov and S. Rudich, "Natural Proofs," *Journal of Computer and
    System Sciences* 55(1), 1997, 24–35.
20. S. Aaronson and A. Wigderson, "Algebrization: A New Barrier in Complexity
    Theory," *ACM Transactions on Computation Theory* 1(1), 2009, 1–54.
