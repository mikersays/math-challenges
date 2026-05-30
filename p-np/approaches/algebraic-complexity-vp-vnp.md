# Algebraic Complexity: VP vs VNP — _Algebraic-Complexity-VP-VNP angle_

## Abstract

This write-up develops the Valiant algebraic ("nonuniform, characteristic-zero
or finite-field") analogue of P vs NP — the conjecture **VP ≠ VNP** — as a
line of attack on the Boolean question. We recall Valiant's framework
(arithmetic circuits, the classes VP and VNP, projections, and the
VNP-completeness of the permanent), the depth-reduction theorems that reduce the
problem to bounded-depth circuits, and the strongest unconditional lower bounds
known (Nisan–Wigderson and Kayal–Saha–Saptharishi-style results for restricted
models, and the 2021 Limaye–Srinivasan–Tavenas super-polynomial bound for
constant-depth circuits). We then assess honestly how far "prove VP ≠ VNP, then
transfer to P ≠ NP" actually gets. The conclusion is unambiguous: the algebraic
question is widely believed to be **strictly easier** than the Boolean one, real
unconditional progress exists for depth-4 and constant-depth set-multilinear
models, but (a) VP ≠ VNP is itself open, (b) the implication VP ≠ VNP ⟹ P ≠ NP
requires a derandomization hypothesis (a generalized Riemann hypothesis or
Boolean-circuit assumption), and (c) the general lower bound remains stuck below
even a quadratic barrier for unrestricted circuits. No part of P vs NP is
resolved here. This file is a structured survey plus an explicit catalogue of
where the transfer argument breaks.

## Background / Prior Work

Throughout, fix a field $\mathbb{F}$ (most often $\mathbb{C}$, $\overline{\mathbb{Q}}$,
or a finite field $\mathbb{F}_q$). An **arithmetic circuit** over $\mathbb{F}$ in
variables $x_1,\dots,x_n$ is a directed acyclic graph whose leaves are variables
or constants from $\mathbb{F}$ and whose internal gates are labeled $+$ or
$\times$; it computes a polynomial in $\mathbb{F}[x_1,\dots,x_n]$. Its **size**
is the number of gates (or wires), its **depth** the longest leaf-to-root path.
A **formula** is a circuit whose underlying graph is a tree (fan-out 1).

**Definitions (Valiant 1979) [ESTABLISHED].**

- A sequence $(f_n)$ of polynomials is a **$p$-family** if both $\deg(f_n)$ and
  the number of variables of $f_n$ grow at most polynomially in $n$.
- $(f_n) \in \mathbf{VP}$ if there is a $p$-family computed by arithmetic
  circuits of size $\mathrm{poly}(n)$ (and hence, since degree is polynomially
  bounded, the degree is automatically poly-bounded). VP is the algebraic
  analogue of P (more precisely of $\#P$-easy / poly-size-circuit families).
- $(f_n) \in \mathbf{VNP}$ if there is a $p$-family $g_m \in \mathrm{VP}$ and a
  polynomial bound such that
  $$ f_n(x) \;=\; \sum_{e \in \{0,1\}^{m(n)}} g_{m(n)}\big(x, e\big), $$
  i.e. VNP is the "exponential sum over Boolean hypercube of a VP family." This
  is the algebraic analogue of NP (indeed of $\#P$).
- A polynomial $f$ is a **projection** of $g$ if $f(x) = g(\ell_1,\dots,\ell_k)$
  where each $\ell_i$ is a variable or a constant. A $p$-family $(f_n)$
  **$p$-projects** into $(g_m)$ if $f_n$ is a projection of $g_{m(n)}$ for some
  polynomially bounded $m(n)$. **VNP-hardness** and **VNP-completeness** are
  defined w.r.t. $p$-projections.

**Permanent and Determinant.** For an $n\times n$ matrix $X=(x_{ij})$,
$$\mathrm{perm}_n(X) = \sum_{\sigma\in S_n}\prod_{i=1}^n x_{i\sigma(i)}, \qquad
\det_n(X) = \sum_{\sigma\in S_n}\mathrm{sgn}(\sigma)\prod_{i=1}^n x_{i\sigma(i)}.$$

**Theorem (Valiant 1979) [ESTABLISHED].** Over any field of characteristic
$\neq 2$, $(\mathrm{perm}_n)$ is **VNP-complete** under $p$-projections.
(In characteristic 2, $\mathrm{perm} = \det$, so this is excluded.)

**Theorem (Valiant; "determinant is universal") [ESTABLISHED].** $(\det_n)$ is
complete for the class **VBP** = VP$_{ws}$ of polynomials computed by
polynomial-size **algebraic branching programs** (ABPs), via $p$-projections.
Moreover $\mathrm{VBP} \subseteq \mathrm{VP} \subseteq \mathrm{VNP}$. The
**permanent-versus-determinant** problem (the determinantal complexity
$\mathrm{dc}(\mathrm{perm}_n)$, the least $m$ with $\mathrm{perm}_n$ a projection
of $\det_m$) is the central concrete instance of VBP/VP vs VNP.

**The master conjecture [CONJECTURE, Valiant].** $\mathbf{VP} \neq \mathbf{VNP}$.
Equivalently, the permanent has no polynomial-size arithmetic circuits. A
stronger and cleaner variant frequently targeted is $\mathbf{VBP}\neq\mathbf{VNP}$,
i.e. $\mathrm{dc}(\mathrm{perm}_n)$ is super-polynomial (Mignon–Ressayre give
$\mathrm{dc}(\mathrm{perm}_n)\ge n^2/2$ over $\mathbb{C}$ [ESTABLISHED], the best
known unconditional bound).

**Depth reduction [ESTABLISHED].**

- **Valiant–Skyum–Berkowitz–Rackoff (1983):** any circuit of size $s$ computing a
  degree-$d$ polynomial can be converted to one of depth $O(\log d \cdot \log s)$
  and size $\mathrm{poly}(s,d)$. Thus VP $=$ VP computed by $O(\log^2)$-depth,
  poly-size circuits.
- **Agrawal–Vinay (2008), refined by Koiran (2012) and Tavenas (2015):** any
  poly-size circuit computing a degree-$d$, $n$-variate polynomial can be
  compressed to a **depth-4** $\Sigma\Pi\Sigma\Pi$ circuit of size
  $n^{O(\sqrt{d})}$ (and with the bottom and top product fan-ins bounded by
  $O(\sqrt d)$). Consequence: **a $n^{\omega(\sqrt d)}$ lower bound for depth-4
  circuits computing the permanent (or any explicit poly) would already prove
  VP $\neq$ VNP.** This "chasm at depth 4" focused the field on depth-4 bounds.

**Restricted-model lower bounds [ESTABLISHED].**

- **Nisan (1991):** exact characterization of non-commutative ABP size via the
  rank of "communication"/Hankel matrices; exponential lower bounds for
  non-commutative formulas/ABPs computing the permanent and determinant.
- **Nisan–Wigderson (1997):** the *partial-derivatives* (and shifted-partials)
  method; exponential lower bounds for **homogeneous depth-3** and for
  **set-multilinear depth-3** circuits.
- **Grigoriev–Karpinski; Grigoriev–Razborov:** exponential lower bounds for
  depth-3 circuits over **finite fields**.
- **Kayal–Saha–Saptharishi (2014), Kayal–Limaye–Saha–Srinivasan, Fournier–Limaye–Malod–Srinivasan, Kumar–Saraf:** the **method of shifted partial derivatives** (and "projected" / "skew" variants) gives $n^{\Omega(\sqrt d)}$ lower bounds for **homogeneous depth-4** circuits — matching the depth-reduction threshold *up to the constant in the exponent*, which is exactly why it just barely fails to cross the chasm.
- **Limaye–Srinivasan–Tavenas (FOCS 2021) [ESTABLISHED, landmark]:** the first
  super-polynomial lower bound for **general constant-depth** arithmetic
  circuits (any fixed depth $\Delta$), via set-multilinear depth reduction plus a
  carefully scaled partial-derivative-rank measure on set-multilinear
  polynomials. This is the strongest unconditional general result to date in
  bounded depth, but the bound is only mildly super-polynomial and does not extend
  to unbounded depth.

**Connection to the Boolean world [ESTABLISHED, conditional transfer].**

- **Bürgisser (2000):** if VP $=$ VNP then a Boolean-complexity collapse follows
  *under the generalized Riemann hypothesis (GRH)* — more precisely,
  VP $\neq$ VNP is implied by $\#\mathrm{P}/\mathrm{poly} \neq \mathrm{FP}/\mathrm{poly}$-type
  separations and, conversely, a VNP $\neq$ VP separation transfers to a Boolean
  $\#$P lower bound under GRH/derandomization hypotheses. The transfer is **not
  unconditional in either direction.**
- **Polynomial Identity Testing (PIT):** Kabanets–Impagliazzo (2004) show
  derandomizing PIT implies circuit lower bounds (either NEXP $\not\subseteq$
  P/poly or perm has no poly-size arithmetic circuits). This ties VP-vs-VNP
  progress to the Boolean program through derandomization, but again only as an
  implication, not an equivalence.

## Approach & Methodology

The strategic bet behind this angle is a *divide-and-conquer on difficulty*:

1. **Algebra is more structured than Boolean logic.** Polynomials have degree,
   homogeneity, multilinearity, partial derivatives, Newton polytopes, and
   representation-theoretic symmetry that Boolean functions lack. These give
   *measures* (rank of derivative matrices, dimension of partial-derivative
   spaces) that are sub-additive over circuit gates and large for the target
   (permanent) — the classic recipe for a lower bound.
2. **Completeness focuses the target.** Because $\mathrm{perm}_n$ is
   VNP-complete, *one* super-polynomial circuit lower bound for *one* explicit
   polynomial settles the entire algebraic class question. There is no need to
   handle every NP problem.
3. **Depth reduction collapses the problem.** VSBR and the chasm-at-depth-4
   theorems mean a lower bound need only be proved for a *shallow*, highly
   structured circuit model — exactly the regime where the measures above are
   tractable.
4. **Transfer.** If VP ≠ VNP is proved, invoke Bürgisser/derandomization-style
   transfer to push toward $\#$P $\not\subseteq$ FP/poly and ultimately argue
   P ≠ NP (with the caveats catalogued below).

The high-level plan of attack, made concrete, is therefore:
**choose a measure $\mu$; show $\mu(\text{small circuit class})$ is small while
$\mu(\mathrm{perm}_n)$ (or another explicit VNP polynomial) is large; push the
gap above the depth-reduction threshold $n^{c\sqrt d}$; remove the depth/structure
restrictions; transfer to Boolean.** Steps 1–3 in restricted form are realized
unconditionally; step "push above threshold" and the de-restriction are where the
program currently stops.

## Attempt / Key Arguments

I do not claim a new separation. The contribution here is to lay out the standard
machinery rigorously, work one measure end-to-end, and pin down precisely where
each step is established versus where it fails.

### Lemma 1 (sub-additivity of partial-derivative dimension) [ESTABLISHED].
For $f \in \mathbb{F}[x_1,\dots,x_n]$ let $\partial^{=k}(f)$ be the linear span of
all order-$k$ partial derivatives of $f$, and $\dim \partial^{=k}(f)$ its
dimension. For homogeneous $f,g$: $\dim\partial^{=k}(f+g)\le \dim\partial^{=k}(f)+\dim\partial^{=k}(g)$.
The "shifted" version uses $\mathrm{SP}_{k,\ell}(f)=\dim\langle x^{\le \ell}\cdot \partial^{=k}(f)\rangle$,
which is again sub-additive under $+$ and well-behaved under the product gates of
a depth-4 circuit. *Proof:* linearity of differentiation and dimension
sub-additivity of sums of subspaces. ∎

### Lemma 2 (smallness for low-bottom-fan-in depth-4) [ESTABLISHED, NW/KSS form].
A depth-4 $\Sigma\Pi\Sigma\Pi^{[t]}$ circuit (bottom $\times$-fan-in $\le t$) of
top size $s$ has $\mathrm{SP}_{k,\ell}$ bounded by
$s\cdot\binom{n+\ell}{\le \ell}\cdot\binom{t k + (\text{small})}{\cdots}$ — a
quantity that, for the right window of $k,\ell$, is $n^{O(\sqrt d)}$ when
$s=n^{o(\sqrt d)}$. *Proof:* count monomials reachable as shifted derivatives of a
single product term, then apply Lemma 1 across the $s$ terms. (Full bookkeeping in
Kayal–Saha–Saptharishi.) ∎

### Lemma 3 (largeness for an explicit polynomial) [ESTABLISHED].
For the Nisan–Wigderson design polynomial $\mathrm{NW}_d$ (and, with more work, for
$\mathrm{perm}$/$\mathrm{IMM}$ via the same measure), $\mathrm{SP}_{k,\ell}$ is
$n^{\Omega(\sqrt d)}$ for the matching window of $k,\ell$. *Proof idea:* the
shifted derivatives of a generic-enough explicit polynomial span "almost all"
monomials of the relevant degree, so the dimension approaches the trivial upper
bound $\binom{n+\ell}{\le \ell}$. ∎

### Proposition 4 (what Lemmas 1–3 actually deliver) [ESTABLISHED].
Combining Lemmas 1–3: **homogeneous depth-4 circuits for $\mathrm{perm}_n$ (or
$\mathrm{NW}$) require size $n^{\Omega(\sqrt d)} = n^{\Omega(\sqrt n)}$.**

### The Gap (why Proposition 4 does not give VP ≠ VNP) [ATTEMPT — gap is structural, not fixable by bookkeeping].
The chasm-at-depth-4 theorem says VP-circuits compress to depth-4 of size
$n^{O(\sqrt d)}$ with the *same exponent constant family*. Proposition 4 gives a
lower bound of $n^{\Omega(\sqrt d)}$. The two exponents are
$n^{c_1\sqrt d}$ (upper, from compression) and $n^{c_2 \sqrt d}$ (lower, from the
measure), and **all known arguments have $c_2 \le c_1$.** Crossing requires
$c_2 > c_1$. This is not a matter of tighter counting: Efremenko–Garg–Kayal–Saptharishi
and others showed the shifted-partial-derivative measure (and broad families of
"single-shot" measures) are **provably incapable** of beating the threshold for
this model — the measure's maximum possible value is itself bounded by roughly
$n^{O(\sqrt d)}$. So the gap is a property of the *method*, not of the *target*.
**[This is the crux of the angle's current failure.]**

### Transfer argument sketch [CONDITIONAL on derandomization/GRH — gap at the de-conditioning step].
Suppose (hypothetically) VP ≠ VNP were proven, witnessed by a super-polynomial
lower bound on $\mathrm{perm}_n$ over $\mathbb{Q}$ or a finite field. To conclude
P ≠ NP one wants: poly-size *Boolean* circuits for an NP-complete problem would
yield poly-size *arithmetic* circuits for the permanent, contradicting the
separation. The bridge (Bürgisser) runs through: (i) the permanent's
$\#$P-completeness (Valiant, Boolean side); (ii) simulating Boolean circuits by
arithmetic ones, which introduces constants and requires controlling the bit-size
of intermediate values; (iii) GRH (or an unproven derandomization hypothesis) to
handle the constants/algebraic-vs-Boolean mismatch. Step (iii) is currently
**unremovable** — there is no unconditional theorem of the form
"VP ≠ VNP ⟹ P ≠ NP." Hence even a full algebraic separation would not, by itself,
settle the Boolean problem. **[Gap: de-conditioning step (iii).]**

## Results Obtained

- **[ESTABLISHED — survey, not new]** A precise statement of Valiant's framework,
  the VNP-completeness of the permanent, the VBP-completeness of the determinant,
  and the depth-reduction theorems (VSBR; Agrawal–Vinay/Koiran/Tavenas chasm at
  depth 4).
- **[ESTABLISHED — re-derivation of known bound]** Proposition 4: homogeneous
  depth-4 circuits for the permanent require size $n^{\Omega(\sqrt n)}$, via the
  shifted-partial-derivatives measure (Lemmas 1–3). This is the textbook KSS-type
  result, reproduced with explicit attribution; **no improvement is claimed.**
- **[ESTABLISHED — negative meta-result]** Identification (following
  Efremenko–Garg–Kayal–Saptharishi and Forbes–Kumar–Saptharishi) that the single
  shifted-partial-derivative measure is *intrinsically* bounded near the
  depth-reduction threshold, so it cannot, alone, close the chasm.
- **[CONDITIONAL on GRH / derandomization]** The transfer VP ≠ VNP ⟹ Boolean
  $\#$P lower bounds (Bürgisser), and the Kabanets–Impagliazzo PIT-to-lower-bounds
  link. Stated with its hypothesis; **not unconditional.**
- **[CONJECTURE, unchanged]** VP ≠ VNP itself, and the super-polynomiality of
  $\mathrm{dc}(\mathrm{perm}_n)$. Best unconditional bound remains
  Mignon–Ressayre $\mathrm{dc}(\mathrm{perm}_n)\ge n^2/2$.

Net: this file produces a clean, correctly attributed map of the terrain and a
sharp statement of the obstruction. It produces **no** new separation and **does
not** advance the frontier.

## Barriers Encountered

- **Relativization (Baker–Gill–Solovay).** The algebraic-circuit lower-bound
  program is largely *non-relativizing* in the Boolean sense — arithmetic circuit
  measures (partial derivatives, rank) are not oracle arguments, so the
  relativization barrier is not the binding constraint here. However, this is also
  why no relativizing argument *transfers* the algebraic result to the Boolean
  world for free; the transfer (Bürgisser) is delicate precisely because it must
  be non-relativizing yet still needs GRH.
- **Natural Proofs (Razborov–Rudich).** This is the subtle one. The
  partial-derivative / rank measures are **large-ness** measures that are (a)
  constructive and (b) large for a random polynomial as well as for the target —
  i.e. they look "natural." The standard escape is that the *algebraic* natural-
  proofs barrier requires algebraically-natural distinguishers and the existence
  of algebraic pseudorandom polynomial families; Forbes–Shpilka–Volk and
  Grochow–Kumar–Saks–Saraf formulated an **algebraic natural proofs** framework
  and showed many current lower-bound techniques *are* algebraically natural,
  which is evidence that they will not, as-is, reach VP ≠ VNP. So this barrier
  *does* bite this angle, in its algebraic incarnation.
- **Algebrization (Aaronson–Wigderson).** Designed for the Boolean/oracle setting;
  the algebraic-circuit results are not phrased relative to oracles, so
  algebrization is not directly the obstruction to proving VP ≠ VNP. It *is*
  relevant to the *transfer*: any attempt to prove "VP ≠ VNP ⟹ P ≠ NP"
  unconditionally must avoid algebrizing techniques, which is part of why the
  implication remains conditional.
- **The "chasm threshold" barrier (angle-specific).** As argued in the Gap above,
  the depth-reduction exponent and the best measure exponent coincide
  ($n^{\Theta(\sqrt d)}$), and the leading measures are provably capped at that
  threshold. This is the concrete, immediate wall — independent of the three
  classical barriers — that stops Proposition 4 from becoming VP ≠ VNP.
- **The de-conditioning barrier (transfer).** Even granting VP ≠ VNP, no known
  argument removes GRH/derandomization from the Boolean transfer.

## Honest Assessment

This angle is **genuinely the most productive unconditional lower-bound program
in complexity theory** — it has yielded the only super-polynomial general bounds
known (constant-depth, Limaye–Srinivasan–Tavenas 2021), exact characterizations
in the non-commutative model (Nisan), and tight $n^{\Theta(\sqrt d)}$ bounds for
homogeneous depth-4. It is also **widely believed to be strictly easier than
P vs NP**: VP ≠ VNP is a nonuniform, field-restricted statement with rich
structure, and proving it would still leave P vs NP open behind a
GRH/derandomization conditional.

That said, as a route to **resolving P vs NP**, the program is currently
**stalled at two distinct points**:

1. **VP ≠ VNP is unproven**, and the dominant technique (shifted partial
   derivatives and relatives) is now understood to be *provably insufficient* to
   cross the depth-4 chasm on its own. The general (unbounded-depth) bound for
   explicit polynomials sits below even $\omega(n\log n)$ — there is no
   super-polynomial lower bound for general arithmetic circuits computing any
   explicit polynomial. We are, for unrestricted circuits, still essentially at
   the Baur–Strassen $\Omega(n\log n)$ regime.
2. **Even a full algebraic separation would not, unconditionally, give P ≠ NP.**
   The transfer is conditional on GRH/derandomization, and removing that
   condition is itself an open problem comparable in difficulty to the
   derandomization questions.

The algebraic natural-proofs results (Forbes–Shpilka–Volk; Grochow et al.) further
suggest that today's measures are too "natural" to reach the goal, mirroring the
Boolean Razborov–Rudich situation. My honest verdict: **promising as a source of
real theorems and the likeliest *first* of the two separations to fall, but not on
a clear path to closing P vs NP, and not close to doing so.** Nothing in this
write-up resolves, or claims to resolve, any part of P vs NP. The one new thing
offered is clarity about *why* the natural next step (beating the chasm with the
existing measure) cannot work.

## Open Sub-questions

- Is there a measure that is **not** bounded by $n^{O(\sqrt d)}$ on depth-4
  circuits yet still sub-additive enough to be useful — e.g. measures combining
  shifted partials with multiplicities, "afine projections of partials" (APP), or
  representation-theoretic invariants from GCT? (See the geometric-complexity-
  theory angle.)
- Can the Limaye–Srinivasan–Tavenas constant-depth bound be amplified to
  *unbounded* depth, or is there a formal obstruction (a constant-depth-to-general
  reduction that the LST measure cannot survive)?
- Can the GRH be removed from Bürgisser's transfer for the **finite-field** case,
  where number-theoretic obstructions differ?
- Does $\mathrm{dc}(\mathrm{perm}_n)$ admit a super-quadratic lower bound by any
  method (improving Mignon–Ressayre $n^2/2$)? Even $n^{2+\epsilon}$ would be news.
- Is VP ≠ VNP *equivalent* (not just implied-by) to a clean Boolean statement, or
  is the gap between the algebraic and Boolean conjectures fundamental?
- Do the algebraic-natural-proofs barriers admit a provable "un-natural" route
  (e.g. via hardness of polynomial identity testing for the relevant proof
  system)?

## References

1. L. G. Valiant, "Completeness classes in algebra," *Proc. 11th STOC*, 1979.
2. L. G. Valiant, "The complexity of computing the permanent," *Theoret. Comput. Sci.* 8 (1979), 189–201.
3. L. G. Valiant, S. Skyum, S. Berkowitz, C. Rackoff, "Fast parallel computation of polynomials using few processors," *SIAM J. Comput.* 12 (1983).
4. N. Nisan, "Lower bounds for non-commutative computation," *Proc. 23rd STOC*, 1991.
5. N. Nisan, A. Wigderson, "Lower bounds on arithmetic circuits via partial derivatives," *Comput. Complexity* 6 (1997).
6. P. Bürgisser, *Completeness and Reduction in Algebraic Complexity Theory*, Springer, 2000.
7. M. Agrawal, V. Vinay, "Arithmetic circuits: A chasm at depth four," *Proc. 49th FOCS*, 2008.
8. V. Kabanets, R. Impagliazzo, "Derandomizing polynomial identity tests means proving circuit lower bounds," *Comput. Complexity* 13 (2004).
9. T. Mignon, N. Ressayre, "A quadratic bound for the determinant and permanent problem," *Int. Math. Res. Not.* 2004.
10. P. Koiran, "Arithmetic circuits: The chasm at depth four gets wider," *Theoret. Comput. Sci.* 448 (2012).
11. S. Tavenas, "Improved bounds for reduction to depth 4 and depth 3," *Inform. and Comput.* 240 (2015).
12. N. Kayal, C. Saha, R. Saptharishi, "A super-polynomial lower bound for regular arithmetic formulas," *Proc. 46th STOC*, 2014 (and the depth-4 shifted-partials line: Gupta–Kamath–Kayal–Saptharishi 2014).
13. K. Efremenko, A. Garg, R. Kayal, R. Saptharishi, "Barriers for rank methods in arithmetic complexity," *Proc. ITCS*, 2018.
14. M. Forbes, A. Shpilka, B. L. Volk, "Succinct hitting sets and barriers to proving algebraic circuit lower bounds," *Proc. 49th STOC*, 2017.
15. J. A. Grochow, M. Kumar, M. Saks, S. Saraf, "Towards an algebraic natural proofs barrier via polynomial identity testing," arXiv:1701.01717, 2017.
16. N. Limaye, S. Srinivasan, S. Tavenas, "Superpolynomial lower bounds against low-depth algebraic circuits," *Proc. 62nd FOCS*, 2021.
17. R. Saptharishi et al., "A survey of lower bounds in arithmetic circuit complexity," living survey (github.com/dasarpmar/lowerbounds-survey), 2015–present.
18. T. Baker, J. Gill, R. Solovay, "Relativizations of the P =? NP question," *SIAM J. Comput.* 4 (1975).
19. A. Razborov, S. Rudich, "Natural proofs," *J. Comput. System Sci.* 55 (1997).
20. S. Aaronson, A. Wigderson, "Algebrization: A new barrier in complexity theory," *ACM Trans. Comput. Theory* 1 (2009).
