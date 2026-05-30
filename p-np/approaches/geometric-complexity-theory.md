# Geometric Complexity Theory and the Permanent vs Determinant Problem — geometric-complexity-theory angle

## Abstract

Geometric Complexity Theory (GCT), initiated by Mulmuley and Sohoni, attempts to prove complexity lower bounds (ultimately separations such as VP ≠ VNP, the algebraic shadow of P ≠ NP) by translating them into questions about orbit closures of group actions and the representation theory of the general linear group. The concrete flagship target is Valiant's conjecture that the permanent is much harder than the determinant. GCT proposes to separate the two by exhibiting *representation-theoretic obstructions*: irreducible GL-representations occurring in the coordinate ring of one orbit closure but not the other. This write-up surveys the established scaffolding (the GL-action, determinantal complexity, plethysm and Kronecker coefficients, padding into the boundary), states the main theorems with correct attributions, and then focuses on the decisive negative result — the Bürgisser–Ikenmeyer–Panova theorem (FOCS 2016 / JAMS 2019) that the originally proposed *occurrence obstructions* provably **cannot** prove the permanent-versus-determinant lower bound. My honest assessment: GCT in its original occurrence-obstruction form is refuted as a route to the desired separation; the refined *multiplicity-obstruction* program survives logically but is currently far from delivering even the known quadratic bound, and faces formidable positivity and degeneration barriers.

## Background / Prior Work

### Valiant's algebraic framework

**[ESTABLISHED]** Valiant [Val79] introduced an algebraic analogue of P vs NP. Over a field (we take $\mathbb{F}=\mathbb{C}$, the natural setting for GCT) one considers polynomial families $(f_n)$ of polynomially bounded degree.

- **VP**: families computable by arithmetic circuits of polynomial size and polynomial degree.
- **VNP**: families expressible as $f_n(x) = \sum_{e\in\{0,1\}^m} g_n(x,e)$ with $(g_n)\in$ VP and $m=\mathrm{poly}(n)$.

The **permanent** $\mathrm{perm}_n=\sum_{\sigma\in S_n}\prod_i x_{i\sigma(i)}$ is VNP-complete under p-projections (Valiant). The **determinant** $\det_n=\sum_\sigma \mathrm{sgn}(\sigma)\prod_i x_{i\sigma(i)}$ is complete for VBP (algebraic branching programs) and lies in VP. Valiant's conjecture is **VP ≠ VNP**, with the sharper flagship that $\mathrm{perm}_n$ is not a polynomial-size projection of a determinant.

The quantitative measure is **determinantal complexity** $\mathrm{dc}(f)$: the least $m$ such that $f(x)=\det_m(A(x))$ with $A(x)$ an $m\times m$ matrix of affine-linear forms in $x$. The strong Valiant conjecture asserts $\mathrm{dc}(\mathrm{perm}_n)$ grows super-polynomially in $n$.

**[ESTABLISHED] Known lower bounds on $\mathrm{dc}(\mathrm{perm}_n)$ — by non-GCT methods.**
- $\mathrm{dc}(\mathrm{perm}_n)\ge n^2/2$ — Mignon–Ressayre [MR04], via the rank of the Hessian of $\det$ at points where $\mathrm{perm}$'s Hessian has full rank. First $\Omega(n^2)$ bound.
- Streamlinings/variants: Cai–Chen–Li, Yabe, Landsberg–Manivel–Ressayre. The best general bound remains quadratic, $\Omega(n^2)$. **No super-quadratic bound is known.**

The gap between known $\Omega(n^2)$ and conjectured $n^{\omega(1)}$ is the entire content of the problem.

### The GCT reformulation

**[ESTABLISHED]** Mulmuley–Sohoni [MS01, MS08] attack $\mathrm{dc}$ lower bounds geometrically. Let $V=\mathrm{Sym}^m(\mathbb{C}^{m^2})$ be degree-$m$ forms in $m^2$ variables (an $m\times m$ matrix of variables). The group $G=GL_{m^2}(\mathbb{C})$ acts on $V$ by linear substitution.

- $\det_m\in V$, with **orbit closure** $\overline{G\cdot\det_m}$ (Zariski closure) the central object, closely related to the variety of forms of bounded determinantal complexity.
- To compare with $\mathrm{perm}_n$ ($n<m$), one **pads**: $\overline{\mathrm{perm}}_n^m=\ell^{m-n}\mathrm{perm}_n$ with $\ell$ a new linear form, so the padded permanent is a degree-$m$ form in $V$. Then $\mathrm{dc}(\mathrm{perm}_n)\le m \Rightarrow \overline{\mathrm{perm}}_n^m\in\overline{G\cdot\det_m}$.

Thus proving $\overline{\mathrm{perm}}_n^m\notin\overline{G\cdot\det_m}$ for $m=\mathrm{poly}(n)$ would give a super-polynomial $\mathrm{dc}$ lower bound.

**Coordinate rings and representations.** If $X\subseteq Y$ are $G$-stable, then $\mathbb{C}[X]$ is a quotient $G$-module of $\mathbb{C}[Y]$. Both decompose into isotypic components indexed by partitions $\lambda$ (highest weights):
$$\mathbb{C}[Y]_d=\bigoplus_\lambda V_\lambda^{\oplus m_\lambda(Y)},\qquad \mathbb{C}[X]_d=\bigoplus_\lambda V_\lambda^{\oplus m_\lambda(X)}.$$
**[ESTABLISHED]** If $X\subseteq Y$ then surjectivity $\mathbb{C}[Y]\twoheadrightarrow\mathbb{C}[X]$ forces $m_\lambda(X)\le m_\lambda(Y)$ for all $\lambda$. Contrapositive — the **GCT obstruction principle**:
- A **multiplicity obstruction** is $\lambda$ with $m_\lambda(X)>m_\lambda(Y)$; it proves $X\not\subseteq Y$.
- An **occurrence obstruction** is the special case $m_\lambda(Y)=0<m_\lambda(X)$ (a representation absent on the determinant side but present on the permanent side).

The original program (GCT2) emphasized **occurrence obstructions**, since deciding occurrence (multiplicity $>0$) was hoped to be more tractable than computing exact multiplicities, by analogy with the saturation/positivity phenomena that make Littlewood–Richardson coefficients computable.

### Representation-theoretic ingredients

**[ESTABLISHED]** The relevant multiplicities are governed by hard combinatorial quantities:
- **Plethysm coefficients** $a_\lambda(d[m])=\mathrm{mult}(V_\lambda,\mathrm{Sym}^d(\mathrm{Sym}^m\mathbb{C}^n))$ control the ambient ring and (via the determinant's symmetries) the determinant orbit closure. General positivity of plethysm is a famous open problem (Foulkes' conjecture is a special case).
- **Kronecker coefficients** $g(\lambda,\mu,\nu)=\mathrm{mult}(\chi^\nu,\chi^\lambda\otimes\chi^\mu)$ arise for the permanent/padding side. Deciding their positivity is a central open problem; computing them is #P-hard (Bürgisser–Ikenmeyer).

GCT *hoped* positivity might admit polynomial-time/combinatorial characterizations ("flip"/saturation), making obstruction-search feasible.

## Approach & Methodology

The GCT methodology proceeds in stages:

1. **Symmetry characterization.** Both forms are *characterized by their stabilizers* in $GL$. **[ESTABLISHED]** (Frobenius) the stabilizer of $\det_m$ in $GL_{m^2}$ is generated by $X\mapsto AXB$ (i.e. $GL_m\times GL_m$ modulo scalars) and transpose. The permanent's stabilizer (Marcus–Minc / Botta) is the much smaller group of diagonal scalings and permutations. An orbit closure of a form with a large reductive stabilizer is determined by representation-theoretic data, so multiplicities in $\mathbb{C}[\overline{G\cdot f}]$ are in principle computable from the stabilizer via algebraic Peter–Weyl / Luna slice theory.

2. **Reduce to ambient multiplicities.** The orbit map $G/G_f\to G\cdot f$ identifies $\mathbb{C}[\overline{G\cdot f}]$ with a subring of functions on $G/G_f$, giving the **algebraic Peter–Weyl** upper bound $m_\lambda(\overline{G\cdot f})\le \dim(V_\lambda^*)^{G_f}$. For $\det$ this is a plethysm-type count; for the padded permanent, a Kronecker/plethysm count.

3. **Find a separating $\lambda$** with $m_\lambda(\text{perm side})>m_\lambda(\det\text{ side})$ for all polynomially bounded $m$; in the occurrence variant, $\lambda$ occurring on the perm side with $m_\lambda(\overline{G\cdot\det_m})=0$.

My contribution is a careful, honest synthesis rather than a new positive attempt: I reconstruct *why* the occurrence-obstruction route is now known to be impossible, and assess what remains.

## Attempt / Key Arguments

### Step 1 — Padding and the boundary

**[ESTABLISHED, subtle]** The relevant containment is membership in the *closure*, not the orbit. Boundary points $\partial(G\cdot\det_m)=\overline{G\cdot\det_m}\setminus G\cdot\det_m$ are limits of determinants and need not have large stabilizers; the Peter–Weyl bound is clean on the orbit but the *closure*'s ring can have strictly smaller multiplicities, and the boundary is hard to analyze. Much of the difficulty (and the eventual no-go) lives here.

### Step 2 — Why occurrence obstructions are attractive but fragile

**[ATTEMPT/heuristic, made rigorous by BIP below]** The occurrence approach needs $\lambda$ with $m_\lambda(\text{padded perm})>0$ and $m_\lambda(\overline{\det_m})=0$. The determinant orbit closure is very "large" representation-theoretically. Because the padding $\ell^{m-n}\mathrm{perm}_n$ is highly degenerate, the partitions occurring for it tend to *also* occur for the determinant. BIP turns this heuristic into a theorem.

### Step 3 — The no-occurrence-obstruction theorem

**[ESTABLISHED] Theorem (Bürgisser–Ikenmeyer–Panova [BIP16/19]).** *Occurrence obstructions cannot prove the permanent-versus-determinant conjecture in the GCT setting.* Precisely: for the padded permanent $\overline{\mathrm{perm}}_n^m=\ell^{m-n}\mathrm{perm}_n$ and $\det_m$ (in the relevant regime, $m$ polynomial in $n$ and well beyond), **every** partition $\lambda$ occurring in the coordinate ring of $\overline{GL_{m^2}\cdot\overline{\mathrm{perm}}_n^m}$ also occurs in that of $\overline{GL_{m^2}\cdot\det_m}$. Equivalently $m_\lambda(\text{perm side})>0\Rightarrow m_\lambda(\det\text{ side})>0$: **no occurrence obstruction exists.**

**Proof idea (high level).**
(i) An *upper-bound* analysis showing the $\lambda$ that can occur on the permanent side are heavily constrained by the padding (large $\lambda_1$, reflecting the high power of $\ell$).
(ii) A *lower-bound* (occurrence) result for the determinant: any such constrained $\lambda$ already occurs for $\det_m$, via explicit highest-weight-vector constructions and degenerations, using positivity of the relevant plethysm/Kronecker-type coefficients in the padded regime, building on Kadish–Landsberg and Bürgisser–Ikenmeyer's study of the determinant boundary.
The result is **unconditional** and rigorous, and it is **negative**.

### Step 4 — Companion no-go results

**[ESTABLISHED]**
- Ikenmeyer–Panova and Bürgisser–Ikenmeyer extended the philosophy: occurrence obstructions also fail in the matrix-multiplication / tensor setting, indicating the phenomenon is not an artifact of the permanent.
- Kadish–Landsberg [KL14], Landsberg–Manivel–Ressayre [LMR13] show the *padding* injects representations that wash out distinctions, motivating padding-free reformulations (e.g. studying the determinant via its symmetries directly).
- Bürgisser–Ikenmeyer [BI08] and Ikenmeyer–Mulmuley–Walter [IMW17]: positivity/computation of plethysm and Kronecker coefficients is computationally hard (#P-hardness; subtle vanishing problems), undercutting the "occurrence = easy" hope.

### Step 5 — What survives: multiplicity obstructions

**[ESTABLISHED that occurrence fails; multiplicity route is OPEN]** BIP rules out *occurrence* obstructions, **not multiplicity obstructions**: there could still be $\lambda$ with $0<m_\lambda(\det\text{ side})<m_\lambda(\text{perm side})$. Mulmuley emphasizes this distinction and subsequent GCT work treats multiplicity obstructions as the surviving hope. However: no super-polynomial separation via multiplicities exists; computing exact multiplicities is at least as hard as the open positivity problems; and there is no known structural reason a gap of the required size exists, let alone a method to certify one.

## Results Obtained

I produced no new theorem. The substantive, correctly-attributed results this angle rests on:

1. **[ESTABLISHED — positive scaffolding]** GCT correctly reduces $\mathrm{dc}(\mathrm{perm}_n)>\mathrm{poly}(n)$ to orbit-closure non-containment, and that to a multiplicity inequality $m_\lambda(X)>m_\lambda(Y)$ [MS01, MS08]. A genuine, valid conceptual contribution.
2. **[ESTABLISHED — negative, headline]** [BIP16/19] **Occurrence obstructions provably do not exist** for padded permanent vs determinant; the originally proposed GCT route cannot prove Valiant's conjecture.
3. **[ESTABLISHED — context]** The best unconditional $\mathrm{dc}$ bound is $\Omega(n^2)$ [MR04], by *non-GCT* methods. GCT has not reproduced even this via an explicit obstruction.
4. **[ESTABLISHED — hardness]** Positivity/computation of the governing plethysm and Kronecker coefficients is computationally hard [BI08, IMW17].

## Barriers Encountered

- **No-occurrence-obstruction barrier (dominant).** BIP is effectively a *new, GCT-internal barrier*: a whole natural class of would-be proofs is provably empty. Spiritually analogous (though technically unrelated) to natural-proofs as a "your method is too coarse" obstruction. It does not kill GCT-via-multiplicities, but it eliminates the part that was supposed to be tractable.
- **Padding pathology.** The necessary $\ell^{m-n}$ padding injects representations that make the two orbit closures representation-theoretically *closer*, not farther apart — and is precisely what BIP exploit.
- **Boundary/degeneration complexity.** The boundary of $\overline{G\cdot\det_m}$ is poorly understood; its coordinate-ring multiplicities can be strictly below the clean Peter–Weyl bounds, so even computing $m_\lambda(\det\text{ side})$ exactly is open.
- **Wildness of plethysm/Kronecker.** No positive combinatorial rule, no needed saturation theorem, #P-/NP-style hardness for the decision/counting problems. The Littlewood–Richardson analogy (Knutson–Tao saturation) does **not** transfer.
- **Relativization (Baker–Gill–Solovay):** does not apply — GCT works in a fixed algebraic model, not via oracles; it is not a diagonalization/relativizing argument.
- **Natural Proofs (Razborov–Rudich):** GCT is explicitly designed to evade this. Its obstructions are highly structured, $G$-invariant, and arguably not efficiently recognizable in the natural-proofs sense; Mulmuley argues GCT is "unnatural."
- **Algebrization (Aaronson–Wigderson):** not an oracle/algebraic-oracle argument, so algebrization does not apply.
- **Crucial honest point:** GCT cleanly avoids the three classical barriers — only to hit the *new*, sharper no-occurrence-obstruction barrier. Dodging the old barriers did not make the problem easy.

## Honest Assessment

GCT remains the most mathematically ambitious and barrier-aware program aimed at VP vs VNP / P vs NP, and its reduction of lower bounds to algebraic geometry and representation theory is real and correct. But as a *route to actually proving permanent vs determinant*, the picture is sobering:

- The **occurrence-obstruction** version — the concrete plan in the original Mulmuley–Sohoni papers, with a feasible-looking search problem — is **dead**: BIP proved no such obstructions exist (an absence theorem, not a "we couldn't find one").
- The **multiplicity-obstruction** version survives only logically and is by every measure *harder*: it needs exact multiplicities governed by computationally hard, combinatorially untamed plethysm and Kronecker coefficients, with no candidate $\lambda$, no asymptotic family, and no proof strategy for a super-polynomial gap.
- GCT has not reproduced even the $\Omega(n^2)$ Mignon–Ressayre bound via an explicit obstruction; the strongest unconditional progress on $\mathrm{dc}(\mathrm{perm}_n)$ comes from elementary/differential-geometric methods outside GCT.

Candidly: GCT correctly identifies a barrier-avoiding *target* (orbit-closure non-containment) but the *certificates* it proposed are either provably unavailable (occurrence) or as hard as the original problem (multiplicity). Its lasting contributions so far are (a) the reduction, (b) a genuinely new and fruitful interaction with algebraic combinatorics that has advanced plethysm and Kronecker theory, and (c) the disciplining negative theorem of BIP. It does **not** currently put P ≠ NP within reach, and I make no claim that it does. Realistically GCT, if it ever succeeds, will require fundamentally new positivity results or a non-padding reformulation that do not presently exist.

## Open Sub-questions

- **Multiplicity gaps.** Is there *any* explicit partition family $\lambda^{(n)}$ with a provable gap $m_\lambda(\overline{\mathrm{perm}})>m_\lambda(\overline{\det})$, even one giving a super-linear $\mathrm{dc}$ bound? Even recovering $\Omega(n^2)$ via a multiplicity obstruction would be a milestone.
- **Avoiding padding.** Can perm/det be compared *without* the $\ell^{m-n}$ padding (a different homogeneous model, or the symmetry/cubic-form approach of Landsberg–Ressayre) so occurrence obstructions are no longer a priori excluded?
- **Boundary of $\overline{G\cdot\det_m}$.** Determine its irreducible components and coordinate-ring multiplicities, especially for $\lambda$ with large $\lambda_1$ (the padded regime).
- **Positivity tractability.** Do the *restricted* plethysm/Kronecker families actually arising in perm/det admit positive combinatorial rules or saturation theorems despite the general hardness?
- **A meta-theorem for GCT.** Can one prove a general "obstructions of type X cannot separate orbit closures of forms with stabilizer of type Y," generalizing BIP, to map which obstruction notions are viable?
- **Tensor/MatMul transfer.** Is the failure of occurrence obstructions a universal feature of padded/degenerate orbit-closure comparisons, and where is the dividing line?

## References

1. [Val79] L. Valiant. *Completeness classes in algebra.* STOC 1979. (VP/VNP analogues; VNP-completeness of the permanent; determinantal representation.)
2. [MR04] T. Mignon, N. Ressayre. *A quadratic bound for the determinant and permanent problem.* IMRN 2004. ($\mathrm{dc}(\mathrm{perm}_n)\ge n^2/2$.)
3. [MS01] K. Mulmuley, M. Sohoni. *Geometric Complexity Theory I: An approach to the P vs NP and related problems.* SIAM J. Comput. 2001.
4. [MS08] K. Mulmuley, M. Sohoni. *Geometric Complexity Theory II: Towards explicit obstructions for embeddings among class varieties.* SIAM J. Comput. 2008.
5. [BIP16/19] P. Bürgisser, C. Ikenmeyer, G. Panova. *No occurrence obstructions in geometric complexity theory.* FOCS 2016; journal version J. Amer. Math. Soc. (JAMS) 2019. (The headline no-go theorem.)
6. [BI08] P. Bürgisser, C. Ikenmeyer. *The complexity of computing Kronecker coefficients.* FPSAC 2008 and follow-ups (#P-hardness).
7. [IMW17] C. Ikenmeyer, K. Mulmuley, M. Walter. *On vanishing of Kronecker coefficients.* Computational Complexity, 2017.
8. [LMR13] J.M. Landsberg, L. Manivel, N. Ressayre. *Hypersurfaces with degenerate duals and the geometric complexity theory program.* Comment. Math. Helv. 2013.
9. [KL14] H. Kadish, J.M. Landsberg. *Padded polynomials, their cousins, and geometric complexity theory.* Comm. Algebra 2014. (Determinant orbit-closure boundary; padding analysis.)
10. [Lan17] J.M. Landsberg. *Geometry and Complexity Theory.* Cambridge Studies in Advanced Mathematics, 2017. (Textbook treatment of GCT, orbit closures, the determinant boundary, and the no-go results.)
11. [RR97] A. Razborov, S. Rudich. *Natural proofs.* J. Comput. System Sci. 1997. (The barrier GCT is designed to avoid.)
12. [BGS75] T. Baker, J. Gill, R. Solovay. *Relativizations of the P =? NP question.* SIAM J. Comput. 1975.
13. [AW09] S. Aaronson, A. Wigderson. *Algebrization: A new barrier in complexity theory.* ACM TOCT 2009.
