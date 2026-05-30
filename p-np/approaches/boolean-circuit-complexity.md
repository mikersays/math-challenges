# Boolean Circuit Complexity and P vs NP

**Angle:** boolean-circuit-complexity
**Author-Angle:** Circuit lower bounds contributor (AC0/ACC0, monotone, general circuits)

---

## Abstract

This write-up surveys the circuit-complexity attack on P vs NP and assesses honestly
how far it currently reaches. The strategy is clean: since P ⊆ P/poly, proving that some
language in NP (e.g. SAT, CLIQUE) has no polynomial-size Boolean circuits would imply
P ≠ NP. We catalogue the genuine, fully-proved lower bounds the field has obtained —
parity is not in AC0 (Furst–Saxe–Sipser, Ajtai; tight by Håstad), Razborov–Smolensky for
AC0 with prime-power MOD gates, Razborov's exponential monotone lower bound for CLIQUE,
and Williams' separation NEXP ⊄ ACC0 — and we explain precisely why none of them touches
general polynomial-size circuits for an NP problem. The decisive obstacles are the three
known barriers: **relativization** (Baker–Gill–Solovay), **natural proofs**
(Razborov–Rudich), and **algebrization** (Aaronson–Wigderson). I record a few speculative
observations of my own about Williams' algorithmic method as the most promising
barrier-aware route, but I explicitly do **not** claim any new lower bound or any progress
on P vs NP. The honest bottom line: the best general circuit lower bound known for an
explicit NP (indeed E^NP) function remains roughly 5n − o(n), astronomically short of the
super-polynomial bound the program needs.

---

## Background / Prior Work

### Definitions

A **Boolean circuit** over the basis {∧, ∨, ¬} is a directed acyclic graph whose sources
are input literals x_1, …, x_n (and constants), whose internal gates compute ∧/∨/¬, and
which has one designated output gate. The **size** is the number of gates (or wires); the
**depth** is the longest source-to-sink path.

- A family {C_n} with C_n computing f on {0,1}^n is **polynomial-size** if size(C_n) ≤ n^c
  for a fixed c. The class of languages with poly-size circuits is **P/poly**.
- **AC0**: constant-depth, polynomial-size, unbounded fan-in ∧/∨ and ¬.
- **ACC0**: AC0 augmented with MOD_m gates (output 1 iff the number of true inputs ≡ 0 mod m).
  ACC0[m] fixes the modulus; ACC0 = ∪_m ACC0[m].
- **TC0**: constant-depth poly-size with MAJORITY (threshold) gates.
- **NC1**: log-depth, poly-size, bounded fan-in. Known: AC0 ⊊ ACC0 ⊆ TC0 ⊆ NC1 ⊆ P/poly.
- **Monotone circuit**: only ∧, ∨ (no negation); computes exactly the monotone functions.

### Why this is a route to P vs NP

**Fact (folklore / Pippenger–Fischer-style simulation).** P ⊆ P/poly: a polynomial-time
Turing machine unrolled on inputs of length n yields a polynomial-size circuit.

Therefore:

> If any language L ∈ NP satisfies L ∉ P/poly, then P ≠ NP.

The converse fails — P ≠ NP does not obviously give super-polynomial circuit lower bounds —
so circuit lower bounds are a (possibly strictly) stronger goal. The **Karp–Lipton theorem**
(1980) gives partial reassurance that the non-uniform route is not wildly off: if NP ⊆ P/poly
then the polynomial hierarchy collapses to its second level (PH = Σ_2^p). Most researchers
read this as evidence that NP ⊄ P/poly, but it is not a proof.

### The landmark theorems (all rigorously established)

1. **Parity ∉ AC0.** Furst, Saxe, Sipser (1984) and independently Ajtai (1983) showed
   PARITY requires super-polynomial constant-depth circuits. Håstad's **Switching Lemma**
   (1986) made this tight: any depth-d circuit for PARITY on n bits needs size
   2^{Ω(n^{1/(d−1)})}. The technique: random restrictions collapse a DNF/CNF to a shallow
   decision tree with high probability; iterate to reduce depth while preserving the
   function's hardness.

2. **Razborov–Smolensky (1987).** AC0 augmented with MOD_p gates (p prime) cannot compute
   MOD_q for any prime q ≠ p in polynomial size; in particular such circuits cannot compute
   MAJORITY. Technique: approximate each gate by a low-degree polynomial over F_p; show the
   whole circuit is approximated by a low-degree polynomial; then prove the target function
   (e.g. MOD_q) is not approximable by low-degree polynomials over F_p. This works only for
   **prime-power** moduli — the gap that ACC0 (composite moduli, e.g. MOD_6) exposes.

3. **Razborov's monotone CLIQUE lower bound (1985).** Detecting a k-clique in an n-vertex
   graph requires monotone circuits of size n^{Ω(√k)} (super-polynomial for k ≈ √n); Alon–Boppana
   strengthened the bound and Razborov also handled PERFECT MATCHING (which, being in P,
   shows monotone vs non-monotone is a real gap). Technique: the **approximation method** —
   replace each gate's function by an approximator drawn from a restricted lattice of "clique
   indicators," charge the errors introduced at each gate against a designed distribution of
   positive (k-cliques) and negative ([k−1]-colorings) test instances, and conclude many gates
   are needed.

4. **Williams (2011): NEXP ⊄ ACC0.** The first separation of a uniform class from ACC0 with
   *arbitrary* composite moduli. Technique — the **algorithmic method / "lower bounds from
   faster algorithms"**: a satisfiability algorithm for ACC0 circuits beating brute force by
   a super-polynomial factor, combined with the nondeterministic time hierarchy and the
   Impagliazzo–Kabanets–Wigderson "easy witness" machinery, forces a function in NEXP outside
   ACC0. Later work (Murray–Williams) pushed this down toward NTIME[2^{polylog}] / ACC0-THR.

### Best general (unrestricted basis) lower bound

For *general* circuits over a complete basis, the strongest explicit lower bound is only
**linear**: roughly **(5 − o(1))·n** gates for an explicit function (Iwama–Lachish–Morizumi,
Find–Golovnev–Hirsch–Kulikov 2016, building on Lachish–Raz and Blum's classic 3n − o(n)).
For the weaker measure of formula size, Håstad's 1998 shrinkage result gives an
n^{3−o(1)} lower bound for Andreev's function. These are polynomially or even just linearly
far from the n^{ω(1)} we need.

---

## Approach & Methodology

The methodology of the program is to **climb the circuit-class hierarchy**, proving lower
bounds for progressively richer models until reaching P/poly:

> AC0  →  AC0[p] (prime)  →  ACC0 (composite)  →  TC0  →  NC1  →  P/poly.

Each rung historically required a genuinely new technique (random restrictions; polynomial
approximation; algorithmic method). My methodology in this write-up:

1. State each established theorem with correct attribution and a faithful proof-idea.
2. Identify exactly *which structural feature* of each proof prevents it from scaling up.
3. Map each obstruction onto the three formal **barrier theorems**, which explain in a
   model-independent way why "more of the same" cannot reach P/poly.
4. Evaluate Williams' algorithmic method as the one mainstream technique that is
   provably *not* blocked by natural proofs, and reason (speculatively) about its ceiling.

---

## Attempt / Key Arguments

### Argument 1 — Why the AC0 / Razborov–Smolensky techniques stall

The switching lemma and the polynomial method both crucially exploit **bounded depth**.
Random restrictions only simplify formulas because constant depth means a bounded number of
restriction rounds suffice; the F_p-polynomial degree bound of Razborov–Smolensky is
(O(1))^depth, which blows up once depth is ω(1). Neither argument survives logarithmic depth,
let alone polynomial size with arbitrary structure. Concretely, the moment we allow
MAJORITY gates (TC0), no analogue of "low-degree F_p approximation" is known, because
MAJORITY is *exactly* the function that defeats the prime-modulus polynomial method.
**TC0 lower bounds for an explicit function are open** — we cannot even prove NEXP ⊄ TC0
unconditionally in the strong sense, and depth-2 threshold (or depth-3) lower bounds are a
notorious frontier.

### Argument 2 — Monotonicity is the wrong restriction

Razborov's CLIQUE bound is exponential, yet it says nothing about P vs NP because removing
the monotonicity restriction is not a minor relaxation. Razborov himself (1985) proved that
the **approximation method, as a monotone technique, cannot give better than n^{O(log n)}**
for *some* monotone functions, and crucially Tardos (1988) exhibited a **monotone** function
in P with monotone circuit complexity n^{Ω(...)} super-polynomial — so monotone-circuit size
and ordinary circuit size are *exponentially* separated. Hence a monotone lower bound, however
strong, provably does not transfer to general circuits. The negation gates are doing real,
non-monotone work that the method never models.

### Argument 3 — The barrier triad (this is the heart of the matter)

**(a) Relativization — Baker, Gill, Solovay (1975).** There exist oracles A, B with
P^A = NP^A and P^B ≠ NP^B. Any proof technique that "relativizes" (stays valid when all
machines are given the same oracle) therefore cannot settle P vs NP. Diagonalization /
simulation arguments relativize; this killed the naive Turing-machine approach and pushed
the field toward combinatorial circuit arguments in the first place.

**(b) Natural proofs — Razborov, Rudich (1994).** A lower-bound argument is *natural* if it
proceeds via a property P of Boolean functions that is (i) **constructive** — decidable in
time poly(2^n) given the truth table — and (ii) **large** — holds for a 1/2^{O(n)} (or even
non-negligible) fraction of all functions, while (iii) being **useful** — every function
with small circuits fails P. Razborov–Rudich proved: *if strong one-way functions /
pseudorandom function generators exist (a widely believed cryptographic assumption), then no
natural property is useful against P/poly.* The catastrophe is that essentially **all** known
lower-bound techniques — switching lemma, polynomial method, the approximation method — are
natural (their hardness properties are constructive and large). So the very tools that
conquered AC0 and ACC0 are, modulo cryptography, *incapable* of reaching P/poly. This is the
single most important obstacle on this angle.

**(c) Algebrization — Aaronson, Wigderson (2008).** A refinement covering techniques that
survive relativization by using low-degree polynomial extensions of oracles (arithmetization,
as in IP = PSPACE). They show that even algebrizing techniques cannot prove P ≠ NP (nor
NP ⊄ P/poly): there are algebraic oracle settings consistent with both answers. Arithmetization,
which had broken the relativization barrier for IP/PSPACE, is itself insufficient for the
big separations.

### Argument 4 — Why Williams' method is the barrier-aware exception (speculative analysis)

Williams' NEXP ⊄ ACC0 is significant precisely because it **evades the natural-proofs
barrier**: it does not exhibit a large, constructive property of hard functions. Instead it
runs a *non-constructive* win/win — either a fast ACC0-SAT algorithm exists (it does, by
Williams' design) and yields a separation, or it doesn't and you also win. The hardness is
"located" only via the nondeterministic time hierarchy, never as a usable property of the
truth table. It is also non-relativizing and (it is argued) non-algebrizing.

*My own (clearly speculative) reading:* the algorithmic method converts the lower-bound
problem into an **algorithm-design** problem — "beat brute force on SAT for circuit class C"
— which is psychologically and technically more tractable and, importantly, not obviously
self-defeating against the natural-proofs barrier. The plausible research bet is to push C
upward: ACC0 → ACC0∘THR → TC0 → NC1. The known ceiling, however, is severe: the method as
it stands separates only *huge* uniform classes (NEXP, or NTIME[2^{polylog}]) from C, not
NP from C. Getting from NEXP-style lower bounds down to an NP-vs-P/poly statement would
require both (i) a SAT algorithm for a class as rich as P/poly beating brute force — which
would itself be a sensational result — and (ii) a dramatic scaling-down of the hardness
class. I have **no** argument that either is achievable, and I emphasize this is conjecture,
not a result.

---

## Results Obtained

I obtained **no new lower bound** and **no progress on P vs NP**. The concrete deliverables
of this write-up are expository and analytic:

- A correctly-attributed catalogue of the four pillar theorems (FSS/Ajtai/Håstad;
  Razborov–Smolensky; Razborov monotone; Williams ACC0) with faithful proof sketches.
- A precise localization of *why each technique fails to scale*: depth-dependence
  (restrictions, polynomial method), exponential monotone-vs-general separation (Tardos),
  and the absence of any TC0 analogue of the polynomial method.
- A mapping of these failures onto the three formal barriers, with the natural-proofs
  barrier identified as the binding constraint for combinatorial techniques.
- A reasoned (and explicitly speculative) argument that Williams' algorithmic method is the
  most promising barrier-aware direction, together with an honest statement of its current
  NEXP-scale ceiling.

---

## Barriers Encountered

1. **Relativization (Baker–Gill–Solovay 1975).** Blocks all simulation/diagonalization-style
   arguments; circuit techniques were adopted to escape it but this only moved the problem.
2. **Natural proofs (Razborov–Rudich 1994).** The decisive barrier: assuming PRFs in P/poly,
   no constructive-and-large property is useful against P/poly. Switching lemma, the
   polynomial method, and the approximation method are all natural and hence cannot reach
   P/poly. This is why ACC0 was a wall for two decades.
3. **Algebrization (Aaronson–Wigderson 2008).** Arithmetization-based techniques that beat
   relativization still cannot separate NP from P/poly.
4. **Monotone-to-general gap (Tardos 1988; Razborov 1989).** Even unboundedly strong monotone
   lower bounds provably do not transfer to general circuits.
5. **The linear-bound wall for general circuits.** Best explicit unrestricted lower bound is
   ~5n; no technique is known that even reaches super-linear, let alone super-polynomial, for
   a general basis on an explicit function.
6. **No TC0 lower bound.** The first class above ACC0 already has no unconditional explicit
   lower bound; the polynomial method dies at MAJORITY.

---

## Honest Assessment

The circuit-complexity angle is the most concrete and most decorated attack on P vs NP, and
it is also the one whose limits are best understood — which is precisely why I must be candid
that it is, at present, very far from resolving the question. The program reduces P ≠ NP to
"some NP language has no poly-size circuits," and it has produced genuinely deep
unconditional theorems. But every one of those theorems lives in a restricted model (bounded
depth, prime moduli, monotone, or a NEXP-scale uniform separation), and we have a *meta-theorem*,
Razborov–Rudich, explaining why the techniques that produced them cannot be pushed to P/poly
unless cryptography is broken. The single sharpest way to state the gap: the best general
circuit lower bound for an explicit (even E^NP) function is ~5n, while the goal is n^{ω(1)} —
the program is not merely incomplete, it is exponentially short, and the missing factor is
known to be guarded by formal barriers rather than by mere lack of effort.

The one genuinely hopeful thread is Williams' algorithmic method, because it is provably
barrier-aware (non-natural, non-relativizing). My assessment is that it is the right place
to invest, but with sober expectations: it currently separates only enormous classes from
ACC0, and scaling it to NP-vs-P/poly would require independently spectacular algorithmic
breakthroughs. **I claim no new result and explicitly do not claim any progress on P vs NP.**
The speculative content above (Argument 4) is conjecture and should be read as such.

---

## Open Sub-questions

1. **TC0 lower bounds.** Prove an explicit super-polynomial lower bound against TC0
   (depth-d threshold circuits). Even strong depth-2/depth-3 threshold lower bounds are open
   and would be a major advance.
2. **Scaling Williams down.** Can the algorithmic method separate NTIME[n^{polylog}] — or
   ideally NP — from ACC0 or TC0? What SAT-algorithm speedups would suffice?
3. **Non-natural techniques.** Are there other natural-proofs-evading frameworks besides the
   algorithmic method? Could proof-complexity or "ironic complexity" lower bounds qualify?
4. **Monotone insight transfer.** Is any *quantitative* feature of Razborov's approximation
   method recoverable in a non-monotone setting without triggering natural proofs?
5. **Karp–Lipton sharpening.** Can stronger collapse consequences of NP ⊆ P/poly be leveraged
   into an unconditional contradiction under weaker hypotheses?
6. **Cryptographic dependence.** Since natural proofs only bites if PRFs exist in P/poly, is
   there a coherent world where they do not, and could a lower-bound proof exploit such a
   world?

---

## References

1. T. Baker, J. Gill, R. Solovay. *Relativizations of the P =? NP Question.* SIAM J. Comput., 1975.
2. M. Furst, J. Saxe, M. Sipser. *Parity, circuits, and the polynomial-time hierarchy.* Math. Systems Theory, 1984.
3. M. Ajtai. *Σ^1_1-formulae on finite structures.* Annals of Pure and Applied Logic, 1983.
4. J. Håstad. *Almost optimal lower bounds for small depth circuits.* STOC 1986 (Switching Lemma).
5. A. A. Razborov. *Lower bounds on the monotone complexity of some Boolean functions.* Dokl. Akad. Nauk SSSR, 1985.
6. N. Alon, R. Boppana. *The monotone circuit complexity of Boolean functions.* Combinatorica, 1987.
7. A. A. Razborov. *Lower bounds on the size of bounded-depth networks over a complete basis with logical addition.* Mat. Zametki, 1987.
8. R. Smolensky. *Algebraic methods in the theory of lower bounds for Boolean circuit complexity.* STOC 1987.
9. É. Tardos. *The gap between monotone and non-monotone circuit complexity is exponential.* Combinatorica, 1988.
10. R. M. Karp, R. J. Lipton. *Some connections between nonuniform and uniform complexity classes.* STOC 1980.
11. A. A. Razborov, S. Rudich. *Natural proofs.* J. Comput. System Sci., 1997 (STOC 1994).
12. S. Aaronson, A. Wigderson. *Algebrization: a new barrier in complexity theory.* ACM Trans. Comput. Theory, 2009 (STOC 2008).
13. R. Williams. *Nonuniform ACC circuit lower bounds.* J. ACM, 2014 (CCC 2011).
14. C. Murray, R. Williams. *Circuit lower bounds for nondeterministic quasi-polytime.* STOC 2018.
15. J. Håstad. *The shrinkage exponent of de Morgan formulas is 2.* SIAM J. Comput., 1998.
16. M. Find, A. Golovnev, E. Hirsch, A. Kulikov. *A better-than-3n lower bound for the circuit complexity of an explicit function.* FOCS 2016.
17. S. Arora, B. Barak. *Computational Complexity: A Modern Approach.* Cambridge, 2009 (Ch. 14, 22, 23).
