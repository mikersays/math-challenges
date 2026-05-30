# Algorithms and Upper Bounds for SAT, and the Implications of P = NP

**Author-Angle:** Algorithms and Upper Bounds (the "P = NP" side: SAT
algorithms, consequences of P = NP, why no polynomial NP-complete algorithm is
known, and fine-grained barriers such as SETH).

## Abstract

This write-up surveys what is rigorously known about *upper bounds* for
NP-complete problems, taking SAT as the canonical example, and examines what the
existence of a fast SAT algorithm would and would not buy us. We catalogue the
genuine algorithmic progress that exists — exponential-time algorithms beating
brute force (e.g. Schöning's randomized 3-SAT walk, the PPSZ algorithm, the
Held–Karp dynamic program, fast matrix-multiplication reductions) — and contrast
it with the complete absence of any sub-exponential, let alone polynomial,
algorithm for any NP-complete problem. We then state the consequences of P = NP
(collapse of the polynomial hierarchy, break of one-way functions and hence most
cryptography, automatic proof search) and the fine-grained barriers, principally
the Exponential Time Hypothesis (ETH) and Strong ETH (SETH), that make a
polynomial algorithm look implausible. The central honest finding is that the
upper-bound program has produced a remarkably stable "best exponent" landscape:
decades of work have shaved constants in exponents but never broken the
exponential barrier, and the conditional lower bounds explain *why* progress
stalls exactly where it does. None of this resolves P vs NP, and we argue it
*cannot* on its own, because an upper-bound attack would have to defeat the same
relativization/natural-proofs walls from the other direction.

## Background / Prior Work

**Definitions.** A language $L \in \mathrm{NP}$ if there is a polynomial-time
verifier $V$ and polynomial $p$ such that $x \in L \iff \exists w,\ |w| \le
p(|x|),\ V(x,w)=1$. $L$ is **NP-complete** if $L \in \mathrm{NP}$ and every
$L' \in \mathrm{NP}$ reduces to $L$ in polynomial time (Karp reductions).
$\mathrm{P} = \mathrm{NP}$ asserts every such $L$ has a deterministic
polynomial-time decider.

**Cook–Levin (1971).** SAT is NP-complete. Hence a polynomial algorithm for SAT
$\Rightarrow$ P = NP. CNF-SAT, and even 3-SAT, remain NP-complete (Karp 1972).
This makes SAT the natural target for any upper-bound assault.

**The known exponential algorithms.** No polynomial algorithm exists, but the
brute-force $2^n$ bound has been beaten for many NP-complete problems:

- *3-SAT, randomized.* Schöning (1999): a random-restart local-search walk
  decides 3-SAT in expected time $O^*\!\big((2(1-1/k))^n\big)$; for $k=3$ this is
  $O^*(1.334^n)$. ($O^*$ suppresses polynomial factors.)
- *k-SAT, PPSZ.* Paturi–Pudlák–Saks–Zane (1998, 2005); the analysis was tightened
  by Hertli (2011) to give the current best known bound for general (not
  necessarily unique) 3-SAT, $O^*(1.308^n)$.
- *Exact TSP / Hamiltonicity.* Held–Karp (1962) dynamic program over subsets:
  $O^*(2^n)$, still essentially the best known for general TSP — a 60-year-old
  bound nobody has beaten.
- *Independent Set / Max-Cut etc.* Branch-and-reduce and measure-and-conquer
  (Fomin–Grandoni–Kratsch) give bounds like $O(1.1996^n)$ for Maximum
  Independent Set.
- *Subset-Sum.* Meet-in-the-middle (Horowitz–Sahni 1974) gives $O^*(2^{n/2})$;
  improved time–space tradeoffs by Howgrave-Graham–Joux and Schroeppel–Shamir.

**Consequences of P = NP (established).**

- *PH collapse.* If P = NP then the entire polynomial hierarchy collapses to P:
  $\mathrm{P} = \mathrm{NP} \Rightarrow \mathrm{PH} = \mathrm{P}$ (standard,
  by induction on the levels using NP oracles).
- *Cryptography collapses.* One-way functions cannot exist if P = NP: inverting
  $f$ on $y$ is an NP-search problem (guess a preimage, verify in poly time), so
  P = NP gives a poly inverter. This breaks public-key crypto, most symmetric
  primitives' security proofs, digital signatures, etc. (Note: P = NP does not
  *immediately* give *practical* breaks unless the exponent/constant are small.)
- *Search reduces to decision.* For SAT, decision-to-search is a textbook
  self-reduction: fix variables one at a time, querying the decider, to extract a
  satisfying assignment in $O(n)$ decider calls. So P = NP makes NP-search,
  optimization, and even finding short proofs of theorems (bounded length)
  poly-time. This is the "automatic mathematician" consequence emphasized by
  Gödel's 1956 letter to von Neumann and by Cook, Karp, Wigderson.

**Fine-grained hypotheses.**

- *ETH (Impagliazzo–Paturi 1999).* 3-SAT cannot be solved in time
  $2^{o(n)}$. Equivalently the quantity $s_3 = \inf\{\delta : \text{3-SAT in }
  O^*(2^{\delta n})\}$ satisfies $s_3 > 0$.
- *SETH (Impagliazzo–Paturi).* $\lim_{k\to\infty} s_k = 1$; i.e. for every
  $\varepsilon > 0$ there is $k$ such that $k$-SAT has no $O^*(2^{(1-\varepsilon)n})$
  algorithm. SETH says brute force is essentially optimal as clause width grows.
- *Sparsification Lemma (Impagliazzo–Paturi–Zane 2001).* ETH for 3-SAT in terms
  of variables is equivalent to ETH in terms of clauses; this is what lets ETH be
  used as a reduction source for problems measured by instance size.

## Approach & Methodology

The "algorithms and upper bounds" angle attacks P vs NP by trying to *construct*
a fast algorithm (ideally polynomial) for an NP-complete problem, or, failing
that, to map the *frontier* of what is achievable and understand the obstructions
to crossing from exponential to polynomial. My methodology here is threefold:

1. **Inventory the techniques** that have produced sub-$2^n$ algorithms and
   isolate the structural property each exploits (local search, the PPSZ
   encoding, dynamic programming over a treewidth/subset structure, algebraic /
   polynomial-method speedups, fast matrix multiplication).
2. **Test each technique against the "why-it-stops" question:** for each, identify
   the exact quantity that prevents the exponent from reaching $o(n)$ or $0$.
3. **Cross-reference with conditional lower bounds (ETH/SETH and the
   fine-grained web)** to see whether the stopping point is an artifact of our
   cleverness or a (conditional) law of nature.

I treat established theorems as facts and clearly flag my own synthesis and
speculation.

## Attempt / Key Arguments

### Argument 1: Every known SAT speedup is a constant-factor exponent gain, and there is a structural reason.

Consider PPSZ, the strongest general technique. Sketch: pick a random variable
order and a random assignment. Process variables in order; before guessing $x_i$,
run bounded-width resolution (degree-$D$) — if it *implies* $x_i$'s value, set it
for free; otherwise pay one random bit. The savings over $2^n$ come from the
expected number of "forced" variables. The analysis bounds, for a satisfying
assignment, the probability a variable is forced by the *critical clause* + a
bounded-depth resolution tree. The yield is a constant fraction of forced
variables on average, giving base $< 2$ but bounded away from $1$.

**Key observation (synthesis):** the gain is multiplicative per variable and the
per-variable forcing probability is a *constant* determined by clause width $k$.
As $k \to \infty$ the forcing probability $\to 0$, so the PPSZ base $\to 2$. This
is not a defect of the proof — it matches SETH exactly. The same "constant gain
per variable that degrades with width" pattern recurs in Schöning's walk (the
$1/k$ in $2(1-1/k)$) and in local-search/branching methods. My reading: **all
current SAT machinery exploits *local* structure (bounded-width clauses), and
local structure provably washes out as width grows.** To get a polynomial
algorithm one would need a *global* algebraic or combinatorial collapse, of which
we have zero examples for any NP-complete problem.

### Argument 2: Polynomial-method / algebraic speedups also plateau.

The polynomial method (Williams 2014) gave $\mathrm{ACC}^0$ lower bounds and, on
the algorithmic side, the orthogonal-vectors / fast-matrix-multiplication
toolkit yields true polynomial speedups but only for *polynomial-time* problems
(e.g. APSP, OV) and only by constant factors in the exponent of the *polynomial*.
For NP-complete problems the algebraic method gives e.g. $O^*(2^{n/2})$-style
meet-in-the-middle or Möbius/zeta-transform DP ($O^*(2^n)$ for set cover/chromatic
number, Björklund–Husfeldt–Koivisto 2009) — again exponential. **Speculative
claim (mine, unproven):** the reason the polynomial method transfers to circuit
*lower bounds* but not to NP *upper bounds* is that it linearizes a single
fixed-depth circuit, whereas SAT's search space is not a fixed low-depth object;
I could not turn this intuition into anything rigorous and flag it as intuition
only.

### Argument 3: SETH organizes the entire upper-bound frontier.

SETH is not just about SAT. Via fine-grained reductions it implies tight lower
bounds matching the *best known* algorithms for many poly-time problems:

- Orthogonal Vectors has no $O(n^{2-\varepsilon})$ algorithm under SETH
  (Williams 2005), matching the $O(n^2 d)$ upper bound.
- Edit Distance / LCS / Fréchet distance: no truly sub-quadratic algorithm under
  SETH (Backurs–Indyk 2015; Bringmann 2014; Bringmann–Künnemann 2015) — matching
  the classic $O(n^2)$ DP.

**Argument:** the upper-bound program has, in effect, *certified its own
optimality* in the fine-grained world. Where we have a clean upper bound and a
matching SETH lower bound, further algorithmic improvement is impossible unless
SETH is false. So the only way the upper-bound attack on P vs NP makes deep
progress is to **refute SETH** (give $O^*(2^{(1-\varepsilon)n})$ $k$-SAT for all
$k$) — which would itself be a landmark, far short of P = NP but a real crack.

### Argument 4 (my own exploratory attempt, negative result).

I asked whether the decision-to-search self-reduction could be inverted to bound
SAT below brute force *unconditionally* by amortizing across the $n$ fixings. The
hope: if each of the $n$ sub-queries can reuse work (shared bounded-width
resolution), maybe the total beats independent solving. **Outcome: it does not
give anything new.** The shared-resolution idea is exactly what PPSZ already
exploits within a single solve; re-deriving it through the search reduction
recovers the same constant-factor exponent gain and no asymptotic improvement.
This is a small, honest negative: a natural-seeming amortization is already
subsumed by existing technique.

## Results Obtained

I did not obtain any new unconditional algorithm, any improvement to the SAT
exponent, or any refutation of SETH. What this write-up *establishes/clarifies*:

1. **A clean restatement of the frontier:** the best known general 3-SAT bound is
   $O^*(1.308^n)$ (Hertli's PPSZ analysis), Held–Karp $O^*(2^n)$ for TSP is
   unbeaten in 60 years, and *no* NP-complete problem has a sub-exponential
   ($2^{o(n)}$) algorithm — all under the standard definitions, with attributions.
2. **A unifying diagnosis (synthesis, argued not proven):** every known SAT
   speedup is a *width-local, constant-per-variable* gain that provably degrades
   as clause width grows, which is precisely the behaviour SETH predicts. The
   absence of any *global collapse* mechanism is the concrete reason no polynomial
   algorithm is known.
3. **A precise statement of the stakes:** the most that the upper-bound angle can
   plausibly achieve short of P = NP is a refutation of SETH; even that would
   leave the polynomial barrier untouched.
4. **A documented negative result** (Argument 4): the search-reduction
   amortization idea is subsumed by PPSZ and yields nothing new.

## Barriers Encountered

- **The exponential wall is empirically absolute.** No NP-complete problem has a
  $2^{o(n)}$ algorithm; ETH conjectures none exists. Going from constant-base
  improvements to a polynomial would require crossing from $2^{cn}$ all the way to
  $n^{O(1)}$, with no intermediate technique in sight.
- **SETH (conditional lower-bound barrier).** Where upper bounds are tight, SETH
  forbids improvement. The upper-bound attack is therefore self-limiting unless
  SETH is refuted.
- **Relativization (Baker–Gill–Solovay 1975).** There are oracles $A,B$ with
  $\mathrm{P}^A = \mathrm{NP}^A$ and $\mathrm{P}^B \ne \mathrm{NP}^B$. Any
  algorithm built from black-box NP-oracle / brute-force-search techniques
  relativizes, hence cannot decide P vs NP. A would-be polynomial SAT algorithm
  must use the *structure* of the formula non-relativizingly.
- **Natural Proofs (Razborov–Rudich 1997).** This is usually cited as a barrier to
  *lower* bounds, but it bites the algorithm-designer too: a "natural" efficiently
  recognizable structural property exploited to solve SAT fast would, if
  constructive and large, contradict the existence of strong PRGs — so any real
  polynomial SAT algorithm must exploit a *non-natural*, presumably cryptographic-
  strength structural insight. We have none.
- **Algebrization (Aaronson–Wigderson 2008).** Extends relativization to
  algebraic-oracle / polynomial-method techniques; current algebraic algorithms
  algebrize and so cannot separate or collapse P and NP either.
- **No candidate global structure.** Concretely, every technique I examined keys
  off *local* features (clause width, treewidth, subset lattice). I found no
  mechanism that exploits a *global* invariant of an arbitrary CNF in a way that
  could collapse the search to polynomial size.

## Honest Assessment

The algorithms / upper-bounds angle is, in my candid view, the *less* likely of
the two directions to resolve P vs NP, and I think it almost certainly will not
prove P = NP. The empirical and conditional evidence points the other way: 60+
years of intense, well-funded effort on SAT and dozens of other NP-complete
problems has improved only the *constant in the exponent*, never the
exponential-vs-polynomial dichotomy, and the fine-grained theory (ETH/SETH) now
*explains* why each technique stops exactly where it does. The deepest honest
content I can offer is the diagnosis in Argument 1/Result 2: our entire algorithmic
arsenal is width-local, and locality provably cannot beat SETH. To get a
polynomial algorithm one would need a genuinely new, global, non-relativizing,
non-natural structural insight into NP-complete instances — something for which
there is currently not a single example or even a credible candidate.

That said, intellectual honesty cuts both ways: P = NP is *not refuted*. The
barriers (relativization, natural proofs, algebrization) are symmetric — they
block the *lower-bound* program (P ≠ NP) just as firmly. So the upper-bound camp
cannot be dismissed on rigorous grounds; it can only be judged unlikely on the
weight of evidence. My own exploratory attempt (Argument 4) produced a clean
negative, which is the typical fate of "natural-seeming" ideas in this area and is
itself weak evidence for the difficulty. I make no claim to have advanced the
boundary; I have, at best, mapped it carefully and stated honestly where it lies.

## Open Sub-questions

1. **Is SETH true?** A refutation — $O^*(2^{(1-\varepsilon)n})$ for all $k$-SAT —
   is the single most consequential achievable target on this side, even though it
   would not give P = NP.
2. **Is Held–Karp $O^*(2^n)$ optimal for TSP?** Beating it (general TSP in
   $O^*((2-\varepsilon)^n)$) is a famous open problem; even a tiny improvement
   would be a breakthrough and might suggest new global techniques.
3. **Can the polynomial method, which broke into $\mathrm{ACC}^0$ lower bounds,
   ever yield a *super*-polynomial SAT *speedup* beyond constant-base?** Currently
   it does not; understanding the obstruction would clarify the
   algorithms↔lower-bounds duality (Williams' "algorithms imply lower bounds"
   program).
4. **Is there *any* NP-complete problem with a $2^{o(n)}$ algorithm?** A single
   counterexample would refute ETH and upend the landscape.
5. **What would a non-natural, non-relativizing SAT algorithm even look like?**
   Can one exhibit a *toy* structural property that is provably non-natural and
   gives a real (if still exponential) speedup, as a proof of concept that the
   barriers can be evaded constructively?

## References

- T. Baker, J. Gill, R. Solovay. *Relativizations of the P =? NP question.* SIAM
  J. Comput., 1975.
- S. Aaronson, A. Wigderson. *Algebrization: A New Barrier in Complexity Theory.*
  ACM TOCT, 2009.
- A. A. Razborov, S. Rudich. *Natural Proofs.* JCSS, 1997.
- S. A. Cook. *The complexity of theorem-proving procedures.* STOC 1971.
- L. Levin. *Universal sequential search problems.* 1973.
- R. M. Karp. *Reducibility among combinatorial problems.* 1972.
- U. Schöning. *A probabilistic algorithm for k-SAT and constraint satisfaction
  problems.* FOCS 1999.
- R. Paturi, P. Pudlák, M. Saks, F. Zane. *An improved exponential-time algorithm
  for k-SAT.* J. ACM, 2005 (FOCS 1998).
- T. Hertli. *3-SAT faster and simpler — Unique-SAT bounds for PPSZ hold in
  general.* FOCS 2011 / SIAM J. Comput. 2014.
- M. Held, R. M. Karp. *A dynamic programming approach to sequencing problems.*
  J. SIAM, 1962.
- E. Horowitz, S. Sahni. *Computing partitions with applications to the knapsack
  problem.* J. ACM, 1974.
- A. Björklund, T. Husfeldt, M. Koivisto. *Set partitioning via inclusion–
  exclusion.* SIAM J. Comput., 2009.
- F. V. Fomin, F. Grandoni, D. Kratsch. *A measure & conquer approach for the
  analysis of exact algorithms.* J. ACM, 2009.
- R. Impagliazzo, R. Paturi. *On the complexity of k-SAT.* JCSS, 2001 (CCC 1999).
- R. Impagliazzo, R. Paturi, F. Zane. *Which problems have strongly exponential
  complexity?* JCSS, 2001 (the Sparsification Lemma).
- R. Williams. *A new algorithm for optimal 2-constraint satisfaction and its
  implications* (orthogonal vectors / SETH reductions), TCS 2005.
- A. Backurs, P. Indyk. *Edit distance cannot be computed in strongly subquadratic
  time (unless SETH is false).* STOC 2015.
- K. Bringmann. *Why walking the dog takes time: Fréchet distance has no strongly
  subquadratic algorithms unless SETH fails.* FOCS 2014.
- K. Bringmann, M. Künnemann. *Quadratic conditional lower bounds for string
  problems and dynamic time warping.* FOCS 2015.
- R. Williams. *Nonuniform ACC circuit lower bounds.* J. ACM, 2014.
- V. Vassilevska Williams. *Hardness of easy problems: Basing hardness on popular
  conjectures such as SETH.* (survey, IPEC 2015).
