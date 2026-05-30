# The Algebrization Barrier and Its Consequences for P vs NP

**Author-Angle:** algebrization-barrier (contributor: mike@sudoers.tech)
**Date:** 2026-05-29

---

## Abstract

This write-up examines the *algebrization* barrier of Aaronson and Wigderson
(2008/2009) as an obstacle to resolving the **P vs NP** question. Algebrization
is a refinement of the older *relativization* barrier of Baker, Gill, and
Solovay (1975). Its central insight is that the algebraic techniques that
*defeated* relativization — most prominently the arithmetization method behind
**IP = PSPACE** (Lund–Fortnow–Karloff–Nisan and Shamir, 1990–1992) and the
PCP theorem — nevertheless still respect a slightly weaker structural
invariance. Aaronson and Wigderson formalize this invariance by allowing one
side of an inclusion or separation to access not just an oracle `A` but a
low-degree polynomial *extension* `Ã` of `A` over a field or ring. They prove
that essentially all known non-relativizing results *algebrize*, and that any
resolution of P vs NP (in either direction) would have to be **non-algebrizing**.
I survey the precise definitions, state the key theorems with attributions,
reproduce the core proof ideas, and give an honest assessment of how much this
constrains a would-be proof. The bottom line: algebrization does not say P vs NP
is unsolvable; it identifies a large, natural, and currently-dominant family of
proof techniques that provably cannot suffice, thereby raising the bar for any
candidate proof.

---

## Background / Prior Work

### Relativization (Baker–Gill–Solovay, 1975)

A proof technique *relativizes* if it remains valid when every machine in the
argument is given access to an arbitrary oracle `A`. Most classical
complexity-theoretic arguments — simulation, diagonalization, the time/space
hierarchy theorems — relativize, because they treat the machine as a black box
and only count steps.

**Theorem (Baker, Gill, Solovay 1975).** There exist oracles `A` and `B` such
that `P^A = NP^A` and `P^B ≠ NP^B`.

*Sketch.* For `A`: take any PSPACE-complete oracle (e.g. TQBF). Then
`P^A = NP^A = PSPACE` because a polynomial-space computation can be carried out
with polynomially many queries, collapsing the alternation of NP into the oracle.
For `B`: build `B` by diagonalization so that the unary language
`L_B = { 1^n : B contains a string of length n }` is in `NP^B` (guess the
witness string and query it) but is *not* in `P^B` (a polynomial-time machine
makes too few queries to determine, for infinitely many `n`, whether *some*
length-`n` string is in `B`; reserve an unqueried string to flip the answer). ∎

**Consequence.** Any proof that settled `P` vs `NP` purely by relativizing
techniques would prove the *same* statement relative to *every* oracle. Since
the answer differs across oracles `A` and `B`, no relativizing proof can decide
the question. This is the relativization barrier.

### Non-relativizing techniques: arithmetization and IP = PSPACE

The barrier was *circumvented* (not for P vs NP, but for other separations and
collapses) by **arithmetization**: encoding a Boolean formula `φ` as a
low-degree polynomial `p_φ` over a finite field `F`, so that `p_φ` agrees with
`φ` on `{0,1}` inputs but can be evaluated and manipulated over all of `F`.
This was used to prove:

**Theorem (LFKN 1990; Shamir 1992).** `IP = PSPACE`. (And the prior
Babai–Fortnow result `MIP = NEXP`, Babai–Fortnow–Lund 1991.)

The `coNP ⊆ IP` step (LFKN) and the full `PSPACE ⊆ IP` step (Shamir) use the
sum-check protocol: the verifier reduces a claim about `Σ_{x∈{0,1}^n} p(x)` to a
randomized check of `p` at a *random field point*, exploiting that a nonzero
low-degree polynomial has few roots (Schwartz–Zippel). These results **do not
relativize**: Fortnow and Sipser (1988) exhibited an oracle relative to which
`coNP ⊄ IP`. So IP = PSPACE is a genuinely non-relativizing theorem, which
raised the hope that arithmetization might eventually crack P vs NP. The
algebrization barrier is precisely the formalization of why that hope, *as
currently realized*, is misplaced.

### The PCP theorem and circuit results

The PCP theorem (Arora–Safra; Arora–Lund–Motwani–Sudan–Szegedy, 1992/1998) and
the non-relativizing circuit lower bound `MA_EXP ⊄ P/poly` (Buhrman–Fortnow–
Thierauf 1998, via IP = PSPACE) are the other landmark non-relativizing results.
Aaronson and Wigderson show these algebrize too.

---

## Approach & Methodology

The methodology of the algebrization program is *meta-mathematical*: rather than
attempt a separation, one characterizes the formal closure properties of a
*class of proofs* and then shows the target statement cannot lie inside that
closure. Concretely:

1. Define an *algebraic oracle* extension `Ã` of a Boolean oracle `A`.
2. Define what it means for an inclusion `C₁ ⊆ C₂` or a separation
   `C₁ ⊄ C₂` to *algebrize*.
3. Verify (the positive program) that the known non-relativizing theorems
   algebrize.
4. Prove (the negative/barrier program) that both `P = NP` and `P ≠ NP`, and
   several other open problems, do *not* algebrize — i.e. there are algebraic
   oracle settings forcing each possible answer.
5. Conclude that no algebrizing technique can resolve those problems.

I follow Aaronson–Wigderson's definitions directly, reproduce the barrier
arguments in sketch form, and then assess applicability.

---

## Attempt / Key Arguments

### Definition: algebraic oracle extension

Let `A : {0,1}^* → {0,1}` be a Boolean oracle, viewed as a family of Boolean
functions `A_n : {0,1}^n → {0,1}`. A **(finite-field) extension** of `A` is a
family `Ã = {Ã_{n,F}}` where, for each finite field (or ring) `F`, `Ã_{n,F} :
F^n → F` is a polynomial that *agrees with `A_n` on Boolean inputs*, i.e.
`Ã_{n,F}(x) = A_n(x)` for all `x ∈ {0,1}^n`. The complexity (degree) of `Ã` is
controlled: Aaronson and Wigderson require `Ã` to have degree `poly(n)` per
variable (the canonical multilinear extension has degree 1 per variable, but the
definition allows the verifier-side machine more room).

The key asymmetry: in an algebrizing inclusion `C₁ ⊆ C₂`, the *larger* class
`C₂` (the one doing the simulating / the prover-side or the upper-bound machine)
is granted access to the **algebraic extension `Ã`**, while the smaller class
`C₁` gets only the plain Boolean oracle `A`.

### Definition: algebrization (Aaronson–Wigderson)

- An inclusion `C₁ ⊆ C₂` **algebrizes** if `C₁^A ⊆ C₂^{Ã}` for every Boolean
  oracle `A` and every finite-field extension `Ã` of `A`.
- A separation `C₁ ⊄ C₂` **algebrizes** if `C₁^{Ã} ⊄ C₂^A` for every `A` and
  every extension `Ã`.

The placement of the tilde is deliberately the "generous" one for the result
being claimed: an algebrizing inclusion must survive even when the simulated
class is *strengthened* by the algebraic extension; an algebrizing separation
must survive even when the lower class is so strengthened.

### Positive results (the techniques we have *do* algebrize)

**Theorem (Aaronson–Wigderson 2008).** The following all algebrize:
`IP = PSPACE`; `MIP = NEXP`; `MA_EXP ⊄ P/poly`; the PCP theorem (`NP = PCP`
characterization); `NEXP ⊆ MIP`.

*Idea.* The arithmetization proofs only ever use the oracle through its
low-degree polynomial extension evaluated at field points, together with
Schwartz–Zippel. Granting the simulating machine direct access to `Ã` is exactly
what those proofs already implicitly do, so they go through verbatim relative to
`Ã`. ∎ (sketch)

### Negative results (the barrier for P vs NP)

**Theorem (Aaronson–Wigderson 2008).** There exist a Boolean oracle `A` with a
field extension `Ã`, and a Boolean oracle `B` with extension `B̃`, such that

- `NP^{B̃} ⊆ P^B` (so any *separation* `P ≠ NP` fails to algebrize), and
- `NP^A ⊄ P^{Ã}` (so any *inclusion* `P = NP` fails to algebrize).

Therefore **P vs NP does not algebrize**: no algebrizing proof can show
`P = NP` and none can show `P ≠ NP`.

*Sketch of the two directions.*

(i) *Forcing `P = NP` to fail* (`NP^A ⊄ P^{Ã}`). One adapts the BGS
diagonalization. The subtlety is that the `P` machine now queries the *algebraic
extension* `Ã`, which is far more informative than `A`: a single field query can
encode a weighted sum over exponentially many Boolean points. The crux of the
A–W argument is a **communication-complexity lower bound**. They reduce the
question "can a low-query algebraic-oracle machine detect a planted witness" to
a two-party communication problem, and invoke lower bounds (e.g. on the
*disjointness* / *inner-product* style functions, and on the multilinear
extension's "degree" of information leakage) to show that polynomially many
*algebraic* queries still cannot determine the NP-style predicate. Crucially,
the multilinear extension over a sufficiently large field reveals only `O(query
× field-bits)` bits, so a polynomial-time machine remains witness-blind for a
diagonalized `A`.

(ii) *Forcing `P ≠ NP` to fail* (`NP^{B̃} ⊆ P^B`). Take `B` PSPACE-complete (or
the relevant collapsing oracle) so that the algebraic extension `B̃` buys nothing
beyond what `B` already provides, and the alternation of NP collapses into the
oracle, giving `NP^{B̃} ⊆ P^B`. This mirrors the easy direction of BGS but must
check the extension does not break the collapse. ∎ (sketch)

**Generalization.** A–W show the same for many other open separations, e.g.
`NEXP ⊄ P/poly`, `RP ≠ ZPP`-style questions, and notably that proving
`NP ⊄ P/poly` (which would imply `P ≠ NP`) does not algebrize. They also prove
a *quantitative* version: arithmetic/algebraic query lower bounds translate to
the non-algebrization of the corresponding uniform statements.

### The verifier vs prover asymmetry, made precise

The reason IP = PSPACE algebrizes but P vs NP does not is the **direction of the
tilde**. In IP = PSPACE the powerful (prover/simulator) side legitimately uses
`Ã`, and the verifier checks low-degree consistency at random field points. In a
hypothetical proof of `P = NP`, the *deterministic poly-time* machine would need
to extract NP-hard information; algebrization grants it `Ã` and shows even *that*
is insufficient. Conversely a proof of `P ≠ NP` must produce a hard language
that stays hard even when the upper-bound machine has `Ã`; the collapsing oracle
`B` shows this can fail. So algebrization isolates exactly the gap that
arithmetization leaves open.

---

## Results Obtained

This contribution is expository/analytical; it produces no new separation.
Concretely, I have:

1. Restated the BGS relativization barrier and its proof, and the
   Fortnow–Sipser non-relativizing oracle for `coNP ⊆ IP`, establishing the
   baseline.
2. Reproduced Aaronson–Wigderson's definition of finite-field oracle extensions
   and the tilde-placement convention for algebrizing inclusions vs separations.
3. Catalogued which landmark non-relativizing theorems algebrize
   (IP = PSPACE, MIP = NEXP, MA_EXP ⊄ P/poly, PCP).
4. Reproduced, in sketch, the two-sided oracle construction showing P vs NP does
   not algebrize, and identified the communication-complexity lower bound as the
   technical heart of the harder direction.
5. Articulated the precise structural reason — the asymmetric placement of the
   algebraic extension — that separates the techniques we have from the ones we
   would need.

**Net result toward P vs NP:** a sharpened *negative* constraint. Any successful
proof must be **non-algebrizing** (hence in particular non-relativizing).

---

## Barriers Encountered

The whole point of this angle is to characterize barriers; here they are, as
they apply to *any* attack of this family:

1. **Relativization (Baker–Gill–Solovay 1975).** Black-box / diagonalization /
   simulation arguments cannot decide P vs NP.

2. **Algebrization (Aaronson–Wigderson 2008/2009).** Arithmetization and the
   IP = PSPACE / PCP toolkit, even combined with relativizing techniques, cannot
   decide P vs NP. This subsumes barrier 1.

3. **Natural proofs (Razborov–Rudich 1997).** A *third, largely orthogonal*
   barrier: any "natural" combinatorial property usable for circuit lower bounds
   would break pseudorandom generators / one-way functions. A successful proof
   must dodge this too. (Algebrization and natural proofs are independent
   constraints; a proof must evade both.)

4. **Lack of a known non-algebrizing technique.** A–W explicitly note we have
   essentially *no* lower-bound technique that fails to algebrize, except scraps
   (some arithmetic-circuit and communication results). There is no positive
   recipe for building a non-algebrizing argument; the barrier tells us what to
   avoid, not what to do.

5. **The barrier is robust to definitional tweaks.** Subsequent work
   (e.g. Impagliazzo–Kabanets–Kolokolova 2009 giving an axiomatic/algebraic
   reformulation, and Aydınlıoğlu–Bach and others refining the model) shows the
   obstacle is not an artifact of one definition; reasonable variants of
   "algebrizing" still block P vs NP.

---

## Honest Assessment

**What this line of attack accomplishes.** It is one of the three pillars (with
relativization and natural proofs) of our understanding of *why* P vs NP is
hard to prove. As a *meta-result* it is rigorous, established, and extremely
useful: it lets us discard, often by inspection, vast swaths of proof attempts.
If a claimed proof of P vs NP only ever uses the oracle/polynomial through
low-degree extensions and Schwartz–Zippel-style checks, it is doomed regardless
of cleverness, because it would algebrize.

**What it does *not* accomplish.** Algebrization is **not** an impossibility
result for P vs NP. It says nothing about whether P = NP is true, nor whether it
is provable in ZFC. It only delimits a technique class. Importantly, the
algebrization barrier is *not known to be the last barrier*: a proof could be
non-algebrizing and still fail for reasons we have not yet formalized.

**How far does this get us toward resolving P vs NP? Essentially zero distance
toward an answer, but real distance toward knowing where to look.** This angle
cannot, even in principle, separate or collapse the classes; by its own theorems
any technique that could would lie *outside* its scope. The honest framing: this
is a *signpost*, not a *road*. The constructive content is the demand that future
work develop genuinely non-algebrizing, non-naturalizing methods — candidate
directions in the literature include geometric complexity theory (Mulmuley–
Sohoni), the use of uniformity in ways that defeat oracle access, and the
arithmetic-circuit lower bound program (where some non-algebrizing results
exist, e.g. depth-reduction and the Grochow–Pitassi algebraic proof
complexity lines). None of these has yet produced a P vs NP separation, and
none is established to fully escape all barriers.

I make **no claim** to have resolved or advanced the resolution of P vs NP. This
document is an accurate map of a known obstruction.

---

## Open Sub-questions

1. **Is there a fourth barrier?** Do non-algebrizing, non-natural,
   non-relativizing techniques *automatically* succeed, or is there a further
   meta-obstruction not yet formalized?
2. **Exact strength of algebrization.** What is the right notion of "algebraic
   query" (multilinear only? bounded degree? arbitrary low-degree over arbitrary
   rings?) and does P vs NP fail to algebrize under the *strongest reasonable*
   such notion? (IKK 2009 and Aydınlıoğlu–Bach explore this.)
3. **Constructive non-algebrization.** Can we exhibit a *natural*
   complexity-theoretic technique provably non-algebrizing that yields a *new*
   lower bound (however weak), as a proof of concept that the barrier is
   surmountable?
4. **Algebraic proof complexity.** Does the Ideal Proof System / GCT machinery
   give techniques that are simultaneously non-relativizing, non-algebrizing,
   and non-natural? What concrete separation, even toy, can they deliver?
5. **Interaction with natural proofs.** Are algebrization and the
   natural-proofs barrier truly independent, or is there a unifying axiomatic
   framework (à la IKK) in which both are instances of one closure property?

---

## References

1. T. Baker, J. Gill, R. Solovay. *Relativizations of the P =? NP question.*
   SIAM J. Computing 4(4):431–442, 1975.
2. L. Fortnow, M. Sipser. *Are there interactive protocols for co-NP languages?*
   Information Processing Letters, 1988. (Oracle with `coNP ⊄ IP`.)
3. C. Lund, L. Fortnow, H. Karloff, N. Nisan. *Algebraic methods for
   interactive proof systems.* J. ACM 39(4):859–868, 1992 (FOCS 1990).
4. A. Shamir. *IP = PSPACE.* J. ACM 39(4):869–877, 1992.
5. L. Babai, L. Fortnow, C. Lund. *Non-deterministic exponential time has
   two-prover interactive protocols.* Computational Complexity 1:3–40, 1991.
6. S. Arora, S. Safra. *Probabilistic checking of proofs.* J. ACM 45(1):70–122,
   1998. And S. Arora, C. Lund, R. Motwani, M. Sudan, M. Szegedy.
   *Proof verification and the hardness of approximation problems.* J. ACM
   45(3):501–555, 1998.
7. H. Buhrman, L. Fortnow, T. Thierauf. *Nonrelativizing separations.* CCC 1998.
   (`MA_EXP ⊄ P/poly`.)
8. A. A. Razborov, S. Rudich. *Natural proofs.* JCSS 55(1):24–35, 1997.
9. S. Aaronson, A. Wigderson. *Algebrization: A New Barrier in Complexity
   Theory.* ACM Transactions on Computation Theory 1(1), 2009 (STOC 2008).
   [Primary source for this write-up.]
10. R. Impagliazzo, V. Kabanets, A. Kolokolova. *An axiomatic approach to
    algebrization.* STOC 2009.
11. B. Aydınlıoğlu, E. Bach. *Affine relativization: Unifying the algebrization
    and relativization barriers.* ACM TOCT, 2018.
12. K. Mulmuley, M. Sohoni. *Geometric complexity theory I.* SIAM J. Computing,
    2001. (Candidate non-algebrizing program.)
