# Diagonalization, Hierarchy Theorems, and the Relativization Barrier

**Author-Angle:** Research angle "diagonalization-relativization" — time/space hierarchy
theorems, diagonalization attempts on P vs NP, and the Baker–Gill–Solovay
relativization barrier.

---

## Abstract

Diagonalization is the technique that established essentially every unconditional
separation we have between complexity classes: the time and space hierarchy
theorems, the existence of undecidable problems, and the nondeterministic time
hierarchy. It is natural to ask whether a sufficiently clever diagonal argument
could separate P from NP. This write-up surveys what diagonalization *does* prove,
states the hierarchy theorems precisely with proof sketches, and then explains the
central obstruction: the Baker–Gill–Solovay (1975) theorem exhibiting oracles
\(A\) and \(B\) with \(P^A = NP^A\) and \(P^B \neq NP^B\). Because the standard
diagonalization/simulation toolkit *relativizes* (it holds verbatim relative to any
oracle), no such argument can settle P vs NP, which must therefore go one way for
\(A\) and the other for \(B\). I then examine the most credible candidates for
*non-relativizing* techniques — arithmetization (IP = PSPACE), the local-checkability
results behind PCP, and Mulmuley–Sohoni geometric complexity theory — and assess how
much daylight they actually create. My honest conclusion: pure diagonalization is a
dead end for P vs NP, and even the known non-relativizing tools have not been combined
into anything that evades the *algebrization* refinement of the barrier
(Aaronson–Wigderson 2008). I claim no resolution and identify the precise points
where the line of attack fails.

---

## Background / Prior Work

### Diagonalization, in one sentence

Diagonalization builds an object (a language, a machine) that differs from every member
of an enumerated family at some controlled input, by simulating the \(i\)-th member and
deliberately disagreeing with it. Cantor's uncountability proof, the undecidability of
the halting problem, and the complexity hierarchy theorems are all instances.

### The hierarchy theorems (established)

These are the high-water mark of what diagonalization proves unconditionally about
*time-bounded* and *space-bounded* computation.

**Deterministic Time Hierarchy Theorem (Hartmanis–Stearns 1965; sharpened by
Hennie–Stearns 1966).** If \(f, g\) are time-constructible and
\(f(n)\log f(n) = o(g(n))\), then
\[
\mathrm{DTIME}(f(n)) \subsetneq \mathrm{DTIME}(g(n)).
\]
The \(\log\) factor is the cost of a universal Turing machine simulating an arbitrary
machine with a clock. A corollary:
\(P \subsetneq \mathrm{EXP}\), where
\(\mathrm{EXP} = \bigcup_c \mathrm{DTIME}(2^{n^c})\).

**Space Hierarchy Theorem (Stearns–Hartmanis–Lewis 1965).** If \(f, g\) are
space-constructible and \(f(n) = o(g(n))\), then
\(\mathrm{DSPACE}(f) \subsetneq \mathrm{DSPACE}(g)\). No log factor is needed because a
universal machine simulates space with only constant-factor overhead.

**Nondeterministic Time Hierarchy Theorem (Cook 1972; Seiferas–Fischer–Meyer 1978).**
If \(f(n+1) = o(g(n))\) and \(g\) is time-constructible, then
\(\mathrm{NTIME}(f) \subsetneq \mathrm{NTIME}(g)\). This is subtler than the
deterministic case: a nondeterministic machine cannot simply "flip its answer" by
simulation, because complementing a nondeterministic computation is not obviously cheap
(this is exactly the \(NP\) vs \(coNP\) issue in miniature). The proof uses a *delayed
diagonalization* / *lazy diagonalization* technique that spreads the disagreement over a
range of input lengths and complements only at the top of a padded interval.

**Consequence we care about.** The hierarchy theorems give
\(P \subsetneq \mathrm{EXP}\) and \(NP \subsetneq \mathrm{NEXP}\), and via
nondeterministic-time results plus translation/padding arguments one gets statements
like \(NP \neq \mathrm{NEXP}\). But none of these touches P vs NP, because P and NP are
defined by polynomial bounds that are *too close together* on the relevant scale: there
is no constructible separation between "polynomial time" and "polynomial-time
verification of a polynomial certificate" that a counting/clock argument can exploit.

### The relativization barrier (established)

**Theorem (Baker–Gill–Solovay 1975).** There exist oracles \(A\) and \(B\) such that
\[
P^A = NP^A \qquad\text{and}\qquad P^B \neq NP^B.
\]

- For \(A\): take any \(\mathrm{PSPACE}\)-complete oracle, e.g. \(A = \mathrm{TQBF}\).
  Then \(P^A = \mathrm{PSPACE} = NP^A\), because polynomial space is closed under the
  nondeterministic-polynomial-time access pattern and a polynomial-space machine can
  itself answer the oracle queries. Concretely \(NP^{\mathrm{PSPACE}} \subseteq
  \mathrm{NPSPACE} = \mathrm{PSPACE}\) (Savitch) \(\subseteq P^{\mathrm{PSPACE}}\), and
  the reverse inclusion is trivial.

- For \(B\): build \(B\) by diagonalization so that the "needle in a haystack" language
  \(L_B = \{\,1^n : \exists x \in B,\ |x| = n\,\}\) is in \(NP^B\) (guess the witness
  \(x\) and query) but not in \(P^B\). A deterministic polynomial-time machine making at
  most \(n^k\) queries on input \(1^n\) cannot probe more than \(n^k < 2^n\) of the
  \(2^n\) strings of length \(n\); we reserve an unqueried string to set \(B\)'s answer
  adversarially, defeating the machine. Enumerating all poly-time oracle machines and
  handling each at a sufficiently large, fresh \(n\) yields \(B\) with
  \(L_B \in NP^B \setminus P^B\).

**Why this is a barrier.** Call a proof technique *relativizing* if, whenever it
establishes an inclusion or separation between two classes, the same proof establishes
the corresponding statement with every class equipped with an arbitrary oracle \(O\).
The defining feature of diagonalization-plus-simulation is precisely that it relativizes:
a universal machine simulating another machine works identically when both are granted
the same oracle tape, because simulation is *oracle-agnostic* — it copies query/answer
behavior verbatim. Therefore **any** proof of \(P = NP\) or \(P \neq NP\) built from
relativizing ingredients would relativize, and so would have to hold relative to both
\(A\) and \(B\) — contradicting BGS. Hence no relativizing technique can resolve P vs NP.

This was the field's first formal "no-go" result, predating and motivating the
later Natural Proofs barrier (Razborov–Rudich 1997) and the algebrization barrier
(Aaronson–Wigderson 2008).

---

## Approach & Methodology

My methodology was deliberately destructive: rather than hunt for a clever diagonal
argument, I tried to characterize *exactly which property* of diagonalization makes it
relativize, and then ask whether any known or conceivable technique violates that
property while remaining a recognizable "diagonalization."

1. **Pin down the relativization-invariant.** Identify the abstract feature shared by
   all hierarchy-theorem proofs that forces relativization (answer: oracle-agnostic
   simulation + a counting/timing argument that ignores the *internal structure* of the
   machine other than its I/O behavior).

2. **Stress-test against non-relativizing results.** Examine the three known families of
   non-relativizing techniques — arithmetization (IP = PSPACE; Shamir 1992, Lund–
   Fortnow–Karloff–Nisan 1992), PCP/local checking (Arora et al. 1998), and GCT
   (Mulmuley–Sohoni) — and ask whether any of them is "a diagonalization in disguise" or
   could be married to a diagonal argument.

3. **Confront the algebrization refinement.** Test whether the most promising
   combination — diagonalize but allow the simulator to use arithmetized (low-degree
   extension) oracle access — escapes the barrier, using the Aaronson–Wigderson framework.

---

## Attempt / Key Arguments

### Argument 1: Why naive diagonalization on P vs NP cannot work

Suppose we try to diagonalize against all polynomial-time deterministic machines
\(M_1, M_2, \dots\) to build an NP language \(L\) not in P. To put \(L\) in NP we must be
able to *verify* membership with a short certificate in polynomial time. To diagonalize
against \(M_i\) we must, on some input, simulate \(M_i\) and output the opposite answer.
But:

- The simulation of a polynomial-time machine takes polynomial time, so the diagonal
  machine itself runs in (deterministic) polynomial time on that input — it lands in P,
  not in a class provably above P. There is no "free" time budget the way there is in the
  Time Hierarchy Theorem, where the diagonalizer is given a *strictly larger* time bound
  than the machines it kills. P-vs-NP has no such gap to exploit: both sides are
  polynomial.
- Worse, the entire construction relativizes. Equip every machine with oracle \(A =
  \mathrm{TQBF}\); the construction runs identically and, if it "proved" \(P \neq NP\), it
  would prove \(P^A \neq NP^A\), false. QED that this style cannot work.

This is not a failure of cleverness; it is structural. The hierarchy theorems separate
classes *only across a constructible resource gap*, and P vs NP has no gap.

### Argument 2: Locating the relativization-invariant precisely

Every relativizing proof has the form: *for all oracle machines \(M\), property
\(\Phi(M)\) holds*, where \(\Phi\) depends on \(M\) **only through its oracle-query
transcript** (the function mapping query strings to behavior), not through any
finer structural object (its circuit, its low-degree polynomial encoding, its
combinatorial design). Diagonalization, simulation, and Savitch-style recursion all have
this form. BGS shows that any \(\Phi\) of this form is consistent with both
\(P^A = NP^A\) and \(P^B \neq NP^B\). **Conclusion:** to beat the barrier, a proof must
extract and use information about a machine/circuit that is *not* a function of its
oracle transcript. This is the criterion I used to evaluate every candidate below.

### Argument 3: Do the known non-relativizing techniques help?

- **Arithmetization (IP = PSPACE).** This is genuinely non-relativizing: Fortnow–Sipser
  (1988) exhibited an oracle \(O\) with \(coNP^O \not\subseteq IP^O\), so the *theorem*
  IP = PSPACE fails relative to some oracles, proving its proof does not relativize. The
  trick is to treat a Boolean formula as a low-degree polynomial over a field and exploit
  algebraic identities (Schwartz–Zippel) — using the *formula's structure*, not just its
  I/O. This is exactly the kind of structure-sensitive move Argument 2 demands.
  *However*: arithmetization has so far only produced collapses/equalities among
  PSPACE-level classes and counting classes, not a separation at the P/NP boundary, and
  it does not obviously combine with diagonalization to *separate* P from NP.

- **PCP / local checkability.** Also non-relativizing, and it gives a structure-sensitive
  re-characterization of NP. But PCP is about *hardness of approximation* given P ≠ NP
  (or NP-completeness), not about proving P ≠ NP. It assumes, rather than establishes, the
  separation.

- **Geometric Complexity Theory (Mulmuley–Sohoni).** Aims to separate complexity classes
  via algebraic geometry and representation theory of the *symmetric/general linear
  group*, attacking permanent vs determinant. This is the program explicitly designed to
  be non-relativizing *and* non-natural. It is not a diagonalization, and it remains very
  far from any concrete lower bound (recent work even shows the hoped-for
  "occurrence obstructions" do not suffice, Bürgisser–Ikenmeyer–Panova 2019).

### Argument 4: The killer — algebrization (the speculative combination fails)

The single most natural "non-relativizing diagonalization" idea is: *diagonalize, but let
the simulator query a low-degree extension of the oracle* (i.e., give the diagonalizer the
arithmetization power that made IP = PSPACE work). Aaronson and Wigderson (2008)
formalized exactly this as **algebrization**: a statement \(C \subseteq D\) algebrizes if
\(C^O \subseteq D^{\tilde O}\) for all oracles \(O\) and all low-degree extensions
\(\tilde O\) of \(O\) (and dually for separations). They proved:

1. All the known non-relativizing results (IP = PSPACE, MIP = NEXP, PCP theorem,
   NEXP ⊄ P/poly-style results) **do** algebrize.
2. **Any** resolution of P vs NP must be **non-algebrizing**: they construct algebraic
   oracles relative to which the algebrized versions of \(P = NP\) and \(P \neq NP\) each
   hold, so even arithmetization-augmented diagonalization cannot decide P vs NP.

Concretely, they show there is an algebraic oracle under which \(NP \subseteq P\)
(algebrized) and another under which \(NP \not\subseteq P\) (algebrized). Since the only
non-relativizing engine anyone knows how to bolt onto a diagonal argument is
arithmetization, and that engine algebrizes, the speculative combination I most wanted to
try is provably insufficient. This is where my line of attack terminates.

---

## Results Obtained

- **Restatement and proof sketches** of the deterministic/nondeterministic time and space
  hierarchy theorems and their corollaries (\(P \subsetneq \mathrm{EXP}\),
  \(NP \subsetneq \mathrm{NEXP}\)), confirming the *scope* of diagonalization: it
  separates across constructible resource gaps only.
- **A clean statement** of the BGS oracles with correct constructions
  (\(A = \mathrm{TQBF}\) gives the collapse; an adversarial sparse \(B\) gives the
  separation).
- **A precise characterization** (Argument 2) of the relativization-invariant: relativizing
  proofs use machines only through their oracle transcripts. This is the operational test a
  non-relativizing technique must pass.
- **A negative meta-result, restated from the literature:** the only non-relativizing tool
  compatible with diagonalization (arithmetization) algebrizes, and Aaronson–Wigderson
  prove no algebrizing technique resolves P vs NP. Hence the diagonalization angle,
  even maximally augmented, is barred.

I produced **no new separation and no new collapse.** Everything established here is
either textbook or a faithful re-derivation of the barrier results.

---

## Barriers Encountered

1. **No resource gap.** P and NP are both polynomial; the hierarchy-theorem engine needs
   a constructible gap between the diagonalizer's budget and its victims' budgets, and
   there is none here.
2. **Relativization (Baker–Gill–Solovay 1975).** Pure diagonalization/simulation
   relativizes; the BGS oracles \(A, B\) force any relativizing proof to be wrong for at
   least one of them. This kills the entire naive program.
3. **Algebrization (Aaronson–Wigderson 2008).** The natural fix — arithmetize the
   oracle so the diagonalizer can exploit low-degree structure — still fails, because the
   resulting technique algebrizes and AW exhibit algebraic oracles on both sides of P vs NP.
4. **Natural Proofs (Razborov–Rudich 1997), adjacent.** Although this barrier targets
   circuit-lower-bound combinatorics rather than diagonalization per se, any attempt to
   convert a diagonal argument into an explicit combinatorial property of hard functions
   risks tripping it too, under the assumption that strong pseudorandom functions exist.

---

## Honest Assessment

Diagonalization is, bluntly, the wrong tool for P vs NP, and this has been understood
since 1975. The technique is supremely powerful for separating classes that differ by a
constructible amount of a resource (time, space, alternations), and it remains the only
source of the unconditional separations we possess (the hierarchy theorems). But P and NP
are separated — if at all — by something subtler than a resource budget, and the
relativization barrier proves that no oracle-agnostic argument can detect it.

The one intellectually live question on this angle is whether a *non-relativizing*
diagonalization is conceivable. My assessment is: not with any tool currently known.
The only non-relativizing engine that meshes with diagonalization is arithmetization,
and the algebrization barrier closes that door. A genuinely new idea would have to use a
machine's or circuit's structure in a way that is simultaneously (a) not captured by its
oracle transcript (to beat relativization), (b) not captured by a low-degree extension of
that transcript (to beat algebrization), and (c) not a "natural property" in the
Razborov–Rudich sense. No one has exhibited such a technique. GCT is the most serious
attempt to be non-relativizing-and-non-natural, but it is not a diagonalization and is
itself far from a concrete bound, with recent results dimming its most optimistic form.

I want to be unambiguous: **I have not resolved P vs NP, made no progress toward
resolving it, and believe the diagonalization-relativization angle in isolation cannot
resolve it.** Its value is diagnostic — it sharply delimits what kinds of proofs are even
possible, and any future proof must visibly violate the invariant identified in
Argument 2. That negative knowledge is the contribution.

---

## Open Sub-questions

1. **A structural diagonalization?** Is there a coherent notion of "diagonalizing against
   the *circuits/encodings* of machines" rather than against their I/O behavior, that
   provably does not relativize *and* does not algebrize? Argument 2 says this is the
   target; no construction is known.
2. **Beyond algebrization.** What is the next refinement after algebrization? Are there
   oracle models that capture *all three* known barriers at once (relativization,
   algebrization, natural proofs), and would a technique evading that combined model
   suffice? (Cf. work on "ironic complexity" and the limits of the barrier-stacking
   approach.)
3. **Nondeterministic hierarchy leverage.** The NTIME hierarchy uses lazy
   diagonalization with a genuine asymmetry between guessing and complementing. Is there
   any padding/translation argument that pushes an NTIME-hierarchy separation *down* to the
   polynomial regime under a plausible, non-relativizing structural hypothesis?
4. **GCT vs diagonalization.** Could GCT-style representation-theoretic obstructions ever
   be reformulated as a (non-relativizing) diagonal argument, giving the best of both? At
   present these look methodologically disjoint.

---

## References

1. J. Hartmanis and R. E. Stearns, "On the computational complexity of algorithms,"
   *Trans. AMS*, 1965. (Deterministic time hierarchy.)
2. F. C. Hennie and R. E. Stearns, "Two-tape simulation of multitape Turing machines,"
   *J. ACM*, 1966. (The \(\log\) factor.)
3. R. E. Stearns, J. Hartmanis, P. M. Lewis, "Hierarchies of memory limited
   computations," *FOCS/SWAT*, 1965. (Space hierarchy.)
4. S. A. Cook, "A hierarchy for nondeterministic time complexity," *STOC*, 1972.
5. J. I. Seiferas, M. J. Fischer, A. R. Meyer, "Separating nondeterministic time
   complexity classes," *J. ACM*, 1978. (Lazy diagonalization.)
6. T. Baker, J. Gill, R. Solovay, "Relativizations of the P =? NP question,"
   *SIAM J. Comput.* 4(4):431–442, 1975.
7. W. J. Savitch, "Relationships between nondeterministic and deterministic tape
   complexities," *JCSS*, 1970. (Used for \(NPSPACE = PSPACE\).)
8. L. Fortnow and M. Sipser, "Are there interactive protocols for co-NP languages?,"
   *Inf. Process. Lett.*, 1988. (Oracle separating coNP from IP — non-relativization of
   the later IP = PSPACE proof.)
9. C. Lund, L. Fortnow, H. Karloff, N. Nisan, "Algebraic methods for interactive proof
   systems," *J. ACM*, 1992. (Arithmetization.)
10. A. Shamir, "IP = PSPACE," *J. ACM*, 1992.
11. S. Arora, C. Lund, R. Motwani, M. Sudan, M. Szegedy, "Proof verification and the
    hardness of approximation problems," *J. ACM*, 1998. (PCP theorem.)
12. A. A. Razborov and S. Rudich, "Natural proofs," *JCSS* 55:24–35, 1997.
13. S. Aaronson and A. Wigderson, "Algebrization: A new barrier in complexity theory,"
    *ACM Trans. Comput. Theory* 1(1), 2009 (STOC 2008).
14. K. Mulmuley and M. Sohoni, "Geometric complexity theory I,"
    *SIAM J. Comput.*, 2001.
15. P. Bürgisser, C. Ikenmeyer, G. Panova, "No occurrence obstructions in geometric
    complexity theory," *J. AMS*, 2019.
16. S. Arora and B. Barak, *Computational Complexity: A Modern Approach*, Cambridge,
    2009. (Standard reference for all of the above, Chs. 3, 20.)
