# A Concrete Multiplicity-Obstruction Attempt for Permanent vs Determinant

**Frontier:** gct-multiplicity-obstruction
**Author role:** GCT / multiplicity-obstruction specialist (post Bürgisser–Ikenmeyer–Panova)
**Date:** 2026-05-29
**Status up front:** This attempt does **NOT** close. It produces a *sharpened, concrete, falsifiable* candidate multiplicity inequality and an honest account of exactly which representation-theoretic positivity statement it requires — a statement that is currently **conjectural and, on present evidence, probably false in the strong form needed**. I flag the fatal gap explicitly in §6. This is offered as a documented dead-end with a precisely located obstruction, not as a proof.

---

## 1. Goal & precise claim attempted

### 1.1 The GCT setup (established)

Fix $n$ and $m = m(n)$. Let $\det_m \in \mathbb{C}[\mathrm{Mat}_m]$ be the determinant of an $m\times m$ matrix of variables, a homogeneous degree-$m$ form in $m^2$ variables. Let $\mathrm{per}_n$ be the $n\times n$ permanent. The **Valiant / GCT** approach studies the *padded permanent*
$$
P := z^{\,m-n}\cdot \mathrm{per}_n \in \mathbb{C}[\mathrm{Mat}_m]_m,
$$
a degree-$m$ form in the $m^2$ variables of an $m\times m$ matrix (with $z$ one distinguished variable), via the orbit closures under $G = \mathrm{GL}_{m^2}(\mathbb{C})$ acting on the space $V = \mathbb{C}[\mathrm{Mat}_m]_m$ of degree-$m$ forms. Define
$$
X := \overline{G\cdot \det_m}, \qquad Y := \overline{G\cdot P}.
$$
**Established (Mulmuley–Sohoni; Valiant):** If $\mathrm{per}_n$ requires determinantal complexity $> m$, then $Y \not\subseteq X$. So a sufficient route to a superpolynomial lower bound is: show $Y \not\subseteq X$ for $m = n^{O(\log n)}$ (or any $m = 2^{n^{o(1)}}$ would already beat Valiant's $2^{O(n)}$ in spirit; the dramatic target is $m$ polynomial).

**Established (representation-theoretic obstruction principle):** $X, Y$ are $G$-stable affine cones, so their coordinate rings $\mathbb{C}[X], \mathbb{C}[Y]$ are $G$-modules graded by degree $d$, decomposing into irreducibles $S_\lambda(\mathbb{C}^{m^2})$ indexed by partitions $\lambda \vdash dm$ with at most $m^2$ rows. Write the multiplicities
$$
m_\lambda(X) := \mathrm{mult}\big(S_\lambda, \ \mathbb{C}[X]_d\big), \qquad m_\lambda(Y) := \mathrm{mult}\big(S_\lambda,\ \mathbb{C}[Y]_d\big).
$$
If $Y \subseteq X$ then the restriction (surjection $\mathbb{C}[X]\twoheadrightarrow \mathbb{C}[Y]$ of $G$-modules) gives
$$
m_\lambda(Y) \le m_\lambda(X) \quad\text{for all }\lambda.
$$
Hence a **multiplicity obstruction** is any $\lambda$ with
$$
\boxed{\,m_\lambda(Y) > m_\lambda(X)\,}
$$
and a single such $\lambda$ (for $m$ subexponential in $n$) would prove the lower bound.

### 1.2 Why we are forced onto multiplicities (established)

**Established — Bürgisser–Ikenmeyer–Panova (FOCS 2016, JAMS 2019):** *Occurrence obstructions do not exist* in this padded setting. Precisely, for the relevant range there is **no** $\lambda$ with $m_\lambda(Y) > 0 = m_\lambda(X)$ that can witness $\mathrm{per}_n$ hard against $\det_m$ for $m$ polynomial; in fact they show $m_\lambda(X) > 0$ whenever $m_\lambda(Y) > 0$ (in the regime they analyze), killing the "occurrence" (0-vs-positive) strategy outright. Therefore **any** GCT obstruction must compare *positive* multiplicities: it must be a genuine inequality $m_\lambda(Y) > m_\lambda(X) > 0$.

### 1.3 The precise claim attempted here

I will (i) reduce the multiplicity inequality to a comparison between two *concretely described* quantities — a **plethysm coefficient** controlling $m_\lambda(X)$ (via the symmetry-characterization of the determinant orbit) and a **Kronecker-type / plethysm-with-padding coefficient** controlling $m_\lambda(Y)$; (ii) propose an explicit *family* of partitions $\lambda$ (a "two-row-plus-bulk" shape, defined in §3.4) for which I argue heuristically that $m_\lambda(Y) > m_\lambda(X)$; and (iii) isolate the single positivity statement [**Conjecture MO**, §4 Step 6] on which everything rests.

**Honest scope:** I do *not* claim to prove $m_\lambda(Y) > m_\lambda(X)$. I claim to reduce it to Conjecture MO and to explain why MO is the true crux, why it is currently open, and why it may well be *false* — which would make this specific family a dead-end and would be itself informative.

---

## 2. The core NEW idea (what is different from prior failed attempts)

Prior GCT obstruction attempts fall into two camps, both stalled:

- **Occurrence obstructions** (Kadish–Landsberg; the early Mulmuley–Sohoni program) — *provably dead* (BIP).
- **Generic multiplicity obstructions** — no candidate family exists; the multiplicities $m_\lambda(X), m_\lambda(Y)$ are individually governed by plethysm/Kronecker coefficients that are #P-hard with no positive formula, so people could not even *write down* a candidate $\lambda$, let alone compare.

**The new idea (three moves, marked NOVEL where they are mine):**

1. **Move the comparison off the absolute multiplicities and onto a *difference of two stable limits*.** Instead of trying to compute $m_\lambda(X)$ and $m_\lambda(Y)$ separately (hopeless), I work with the **symmetry group** of each form. The determinant's stabilizer in $\mathrm{GL}_{m^2}$ is large ($\mathrm{SL}_m\times \mathrm{SL}_m \rtimes \mathbb{Z}/2$, plus torus), and by the *Algebraic Peter–Weyl theorem* the multiplicity $m_\lambda(\overline{G\cdot f})$ is **bounded above** by the dimension of the space of $H_f$-invariants in $S_\lambda$, where $H_f$ is the stabilizer of $f$:
   $$
   m_\lambda(\overline{G\cdot f}) \ \le\ \dim\big(S_\lambda(\mathbb{C}^{m^2})\big)^{H_f}.
   $$
   This upper bound (call it the **symmetry bound** $s_\lambda(f)$) is *exactly computable as a plethysm/branching number* for the determinant, because $H_{\det}$ is reductive and explicit. **[ESTABLISHED: this is the Mulmuley–Sohoni / Bürgisser–Ikenmeyer "obstruction-from-symmetries" principle; see Bürgisser–Ikenmeyer 2011, Ikenmeyer–Panova.]**

2. **Exploit an asymmetry in the *padding*: the permanent's symmetry group is small, but the *padding variable* $z^{m-n}$ injects extra $\mathrm{GL}_1\times \mathrm{GL}_{m^2-1}$-type covariants that the determinant orbit closure cannot match at a *specific* internal degree.** Concretely, the padded form $P = z^{m-n}\mathrm{per}_n$ has stabilizer roughly $H_{\mathrm{per}} \times (\text{scalings of } z)$ where $H_{\mathrm{per}}$ is the (small) permanent symmetry group $(T \rtimes S_n)\times(T'\rtimes S_n)\rtimes \mathbb{Z}/2$ (diagonal scalings and row/column permutations). **[NOVEL framing — the use of the padding torus as the source of *excess multiplicity* on the $Y$ side is my proposed mechanism; the symmetry data itself is ESTABLISHED.]** The point: $H_{\mathrm{per}}$ is *much smaller* than $H_{\det}$, so the *lower bound* $m_\lambda(Y)$ can in principle be large where the *upper bound* $s_\lambda(\det)$ is small. The whole obstruction lives in this gap.

3. **Target the obstruction at partitions $\lambda$ that are "invisible to the determinant's continuous symmetry but visible to the permanent's padding".** I define (§3.4) a family $\lambda^{(k)}$ designed so that $S_{\lambda^{(k)}}$ has *no* $H_{\det}$-invariants beyond a small known count (computable via the determinant's plethysm), while it provably *does* carry permanent covariants supplied by the padding. **[NOVEL: the specific family and the claim that it separates the two invariant-counts.]**

The genuine novelty versus the literature is **#3 combined with #2**: a *designed* partition family whose entire purpose is to make the determinant's symmetry bound $s_\lambda(\det)$ *small* (so it cannot hide a large multiplicity) while keeping a permanent covariant alive. This converts the intractable two-sided multiplicity comparison into a **one-sided** problem: *upper-bound $m_\lambda(\det)$ by the exactly-computable symmetry plethysm, and lower-bound $m_\lambda(P)$ by exhibiting one explicit covariant.*

---

## 3. Setup & definitions

### 3.1 Spaces and groups (established)
- $W = \mathbb{C}^{m^2}$, the space of $m\times m$ matrix entries. $G = \mathrm{GL}(W) = \mathrm{GL}_{m^2}$.
- $V_d = \mathrm{Sym}^d(\mathrm{Sym}^m W^*)$ contains $\mathbb{C}[X]_d, \mathbb{C}[Y]_d$ as quotients; irreducibles $S_\lambda(W)$, $\lambda \vdash dm$, $\ell(\lambda)\le m^2$.
- For a form $f\in \mathrm{Sym}^m W^*$, $H_f = \mathrm{Stab}_G(f)$.

### 3.2 Symmetry groups (established)
- **Determinant:** $H_{\det_m} = (\mathrm{GL}_m\times \mathrm{GL}_m)/\!\sim \,\rtimes\, \mathbb{Z}/2$ acting by $A\mapsto g A h^{T}$ (det = product of dets gives the determinant scalar; restricting to the form fixes a one-dim torus relation), transpose for the $\mathbb{Z}/2$. This is a **reductive group of dimension $2m^2 - 1$**. (Frobenius; see Landsberg.)
- **Permanent:** $H_{\mathrm{per}_n} = (T_n \rtimes S_n) \times (T_n' \rtimes S_n) \rtimes \mathbb{Z}/2$ where $T_n$ are diagonal torus scalings with product-of-entries constraint; dimension $2n - 1$ (Marcus–May). This is **vastly smaller** than $H_{\det}$.

### 3.3 The symmetry (upper) bound (established, Algebraic Peter–Weyl)
For any orbit closure $\overline{G\cdot f}$,
$$
m_\lambda(\overline{G\cdot f}) \le \dim S_\lambda(W)^{H_f} =: s_\lambda(f).
$$
**Established.** Moreover for the determinant the upper bound is *asymptotically tight in many regimes* (Bürgisser–Ikenmeyer: "no occurrence obstructions from symmetries" results use exactly this object). For us the relevant facts:
$$
s_\lambda(\det_m) = \dim S_\lambda(\mathbb{C}^{m^2})^{(\mathrm{SL}_m\times \mathrm{SL}_m)}
$$
restricted to the $\mathbb{Z}/2$-symmetric part. Under the isomorphism $W \cong \mathbb{C}^m\otimes \mathbb{C}^m$, the $\mathrm{SL}_m\times\mathrm{SL}_m$-invariants in $S_\lambda(\mathbb{C}^m\otimes\mathbb{C}^m)$ are counted by **Kronecker coefficients**: by the classical formula
$$
\dim S_\lambda(\mathbb{C}^m\otimes \mathbb{C}^m)^{\mathrm{SL}_m\times \mathrm{SL}_m} = \#\{\text{trivial-isotypic part}\} = \sum_{\mu,\nu \text{ rectangular}} g(\lambda,\mu,\nu)\cdots
$$
more precisely the count of $\mathrm{SL}_m\times\mathrm{SL}_m$-invariants equals the multiplicity of pairs of *rectangular* (all-rows-equal) shapes $\mu = \nu = (d^m)$ in the Kronecker/plethysm expansion. **[ESTABLISHED: this is the standard "determinant invariants = symmetric Kronecker with rectangular indices" identity; see Ikenmeyer–Panova, Bürgisser–Ikenmeyer–Panova.]**

### 3.4 The candidate family $\lambda^{(k)}$ [NOVEL]
Set $d$ = a small constant (think $d = 3$). For a parameter $k$, let $m = m(n)$ be the padding dimension under test. Define the partition of $dm$:
$$
\lambda^{(k)} \ := \ \big(\, dm - 2k - r,\ \ k+1,\ \ k+1,\ \ \underbrace{1,\dots,1}_{r}\,\big),
$$
i.e. a long first row, **two equal rows of length $k+1$**, and a "tail" of $r$ singleton rows, with $r$ chosen so $\ell(\lambda^{(k)}) = m^2$ is *not* forced — keep $\ell$ moderate ($\le 2k + r + 1$). The design intent:
- The **two equal middle rows** are chosen so $S_{\lambda^{(k)}}$, restricted to $\mathrm{SL}_m\times\mathrm{SL}_m$ via $W = \mathbb{C}^m\otimes\mathbb{C}^m$, has invariants governed by Kronecker coefficients $g(\lambda^{(k)}, (d^m),(d^m))$ that I conjecture (§4 Step 4) vanish or are tiny — making $s_{\lambda^{(k)}}(\det)$ small.
- The **tail of singleton rows of length $r = m - n$** is engineered to mirror the padding degree $m-n$ of $z^{m-n}$, so that a permanent covariant lives there.

This is the heart of the construction and is **entirely novel and unverified**.

---

## 4. The attempt: step-by-step

**Goal of the argument:** produce $\lambda = \lambda^{(k)}$ with $m_\lambda(Y) > m_\lambda(X)$, with $m$ subexponential in $n$.

**Step 1 [ESTABLISHED].** $Y\subseteq X \Rightarrow m_\lambda(Y)\le m_\lambda(X)\ \forall\lambda$. So it suffices to exhibit one $\lambda$ violating this. (Mulmuley–Sohoni.)

**Step 2 [ESTABLISHED].** Occurrence obstructions are unavailable (BIP); we need $m_\lambda(Y) > m_\lambda(X) > 0$, a strict inequality between positive integers.

**Step 3 — reduce the $X$ side to an exactly-computable symmetry plethysm [ESTABLISHED inequality, NOVEL application].**
By §3.3,
$$
m_{\lambda}(X) \ \le\ s_\lambda(\det_m)\ =\ \dim S_\lambda(\mathbb{C}^m\otimes\mathbb{C}^m)^{(\mathrm{SL}_m\times\mathrm{SL}_m)}_{\mathbb{Z}/2\text{-sym}}.
$$
This is the *crucial reduction*: it replaces the intractable multiplicity $m_\lambda(X)$ (a coefficient in the coordinate ring of a singular variety) by a pure **invariant-theory count** that has a clean combinatorial description in terms of symmetric Kronecker coefficients with two rectangular arguments. **The inequality direction is exactly what we need on the $X$ side: an upper bound.** [The inequality is ESTABLISHED; choosing to push the whole obstruction through it is the NOVEL design decision.]

**Step 4 — claim the symmetry plethysm is small for $\lambda^{(k)}$ [NOVEL: unverified].**
I claim that for $\lambda^{(k)}$ as in §3.4 with $d = 3$ and $k$ in a suitable window,
$$
s_{\lambda^{(k)}}(\det_m) \ \le\ C
$$
for an *absolute constant* $C$ (independent of $n, m$). Heuristic for the claim: the $\mathrm{SL}_m\times\mathrm{SL}_m$-invariants in $S_\lambda(\mathbb{C}^m\otimes\mathbb{C}^m)$ require $\lambda$ to be "close to a multiple of the rectangle $(d^m)$" (this is the geometric content of Kronecker coefficients $g(\lambda,(d^m),(d^m))$ being supported near balanced shapes). The shape $\lambda^{(k)}$, having a *long* first row and only two short middle rows, is *far* from the rectangle $(3^m)$, so the relevant Kronecker numbers should be $0$ or tiny. **This is a positivity/vanishing assertion about Kronecker coefficients with one near-hook and two rectangular arguments — it is exactly the kind of statement for which no proof technique is known, and it is the first of two cruxes.**

**Step 5 — lower-bound the $Y$ side by exhibiting an explicit covariant [NOVEL: unverified, with a partial construction].**
On the $Y$ side I need $m_{\lambda^{(k)}}(Y) \ge C+1$, i.e. strictly more than the determinant upper bound. The mechanism (Move 2): the padding $z^{m-n}$ supplies a covariant. Concretely, consider the $\mathrm{GL}_{m^2}$-covariant maps
$$
\Phi: \mathbb{C}[Y]_d \longrightarrow S_{\lambda^{(k)}}(W)^*
$$
built by contracting $d$ copies of $P = z^{m-n}\mathrm{per}_n$ against a Young symmetrizer of shape $\lambda^{(k)}$ in which the *singleton tail* of length $r = m-n$ is fed exclusively by the $z$-direction (the padding variable), and the *two middle rows* of length $k+1$ are fed by a $2\times(k+1)$ minor-pattern of the permanent's variables. Because the permanent is *not* invariant under the determinant's continuous symmetry, this symmetrizer does not collapse, and I claim it yields a **nonzero** covariant, contributing $\ge 1$ to $m_{\lambda^{(k)}}(Y)$. By varying which $k+1$ permanent columns feed the middle rows over a set of inequivalent choices, I claim one gets $\ge C+1$ *linearly independent* covariants. **[NOVEL — the nonvanishing and independence of these covariants is asserted, not proved. This is the second crux.]**

**Step 6 — the single positivity statement everything reduces to.**

> **Conjecture MO (Multiplicity-Obstruction positivity) [NOVEL, conjectural].**
> There exist constants $d, C$ and a window of $(k, n, m)$ with $m = n^{O(\log n)}$ such that, for $\lambda = \lambda^{(k)}$,
> $$
> \underbrace{m_{\lambda}(Y)}_{\ge\,C+1\ \text{(Step 5)}} \ > \ \underbrace{m_\lambda(X)}_{\le\,s_\lambda(\det)\,\le\,C\ \text{(Steps 3,4)}}.
> $$
> Equivalently and more sharply: *the number of independent permanent-padding covariants of shape $\lambda^{(k)}$ exceeds the dimension of $\mathrm{SL}_m\times\mathrm{SL}_m$-invariants in $S_{\lambda^{(k)}}(\mathbb{C}^m\otimes\mathbb{C}^m)$.*

If Conjecture MO holds for even **one** $\lambda^{(k)}$ with $m$ subexponential, Steps 1–5 assemble into a superpolynomial lower bound for the permanent. **Conjecture MO is unproven. I believe, on present evidence, that the symmetric (two-rectangle) Kronecker numbers in Step 4 are indeed small, but I have NO control over Step 5's lower bound, and that is where the attempt most likely fails (see §6).**

**Step 7 — what I can actually verify (small cases) [PARTIAL].**
The honest checkpoint: for $n = 2,3$ and small $m$, the multiplicities $m_\lambda(X), m_\lambda(Y)$ are finitely computable (this is how BIP and Ikenmeyer–Panova worked). I would run the candidate family $\lambda^{(k)}$ through such a computation. *I expect* (this is a prediction, not a result) that for these tiny cases Step 4's "$s_\lambda(\det)$ small" holds, but Step 5's "$m_\lambda(Y) > s_\lambda(\det)$" **fails** — because the padding covariants I describe, when symmetrized, very likely *also* occur in $\mathbb{C}[X]$ (the determinant orbit is too big to avoid them), exactly the phenomenon BIP exploited to kill occurrence obstructions. I record this as the most probable outcome.

---

## 5. Barrier audit

A GCT multiplicity obstruction must evade relativization, natural proofs, and algebrization. Here is the explicit argument for each.

**Non-relativizing.** The entire construction lives in a *fixed, oracle-free algebraic-geometry setting*: orbit closures of specific polynomials $\det_m, \mathrm{per}_n$ under $\mathrm{GL}_{m^2}(\mathbb{C})$. There is no Turing machine, no oracle tape, nothing whose behavior an oracle could alter. The Baker–Gill–Solovay oracles act on computation transcripts; they have no action on the coordinate ring $\mathbb{C}[X]$. Concretely: an obstruction $\lambda$ with $m_\lambda(Y)>m_\lambda(X)$ is a statement about *representations of $\mathrm{GL}_{m^2}$*, invariant under nothing that an oracle could relativize. **[ESTABLISHED that GCT is non-relativizing — this is one of the program's foundational selling points, Mulmuley–Sohoni; my construction inherits it because it is a literal GCT obstruction.]**

**Non-natural (Razborov–Rudich).** The Razborov–Rudich naturalness obstruction requires a *large* property: one satisfied by a $\ge 2^{-O(n)}$ fraction of truth tables. The GCT obstruction property "$f$ lies in $X = \overline{G\cdot\det}$" is the polar opposite of large — it is a *measure-zero, low-dimensional* condition (an orbit closure of dimension $\le \dim G = m^4 \ll \dim V$). The multiplicity inequality $m_\lambda(Y)>m_\lambda(X)$ is a property of the *specific* permanent, certified by its *specific* symmetry group $H_{\mathrm{per}}$ (Step 5 uses the permanent's exact stabilizer). It is **not constructive in the RR sense** either: deciding $f\in X$ is not known to be doable in time $\mathrm{poly}(2^n)$ — orbit-closure membership is computationally hard. Crucially, my construction *deliberately exploits non-largeness* (the symmetry bound in Step 3 is precisely a non-large, structure-specific certificate). This is the standard reason GCT evades RR, and my attempt uses it essentially. **[ESTABLISHED principle; my construction conforms because Step 5 is symmetry-specific, not a generic combinatorial measure.]**

**Non-algebrizing (Aaronson–Wigderson).** Algebrization captures techniques that go through arithmetization of an oracle plus a relativizing outer argument, with the obstruction being a *communication* lower bound that low-degree extensions cannot overcome. The GCT obstruction is not of this form at all: there is no oracle to arithmetize, and the certificate is a *representation-theoretic multiplicity*, not a query/communication transcript. The Aaronson–Wigderson two-sided algebraic oracles ($\mathrm{NP}^{\tilde A}\not\subseteq P^{\tilde A}$ and $\mathrm{NP}^{\tilde B}\subseteq P^{\tilde B}$) have no analogue here, because the determinant and permanent are *honest, fixed polynomials*, not oracle-relative objects; the inequality $m_\lambda(Y) > m_\lambda(X)$ either holds or does not, with no oracle parameter. **[ESTABLISHED that GCT is not known to algebrize; my construction inherits this.]**

**One caveat I must flag for honesty.** Evading the three *named* barriers is necessary, not sufficient. BIP themselves discovered a **new, GCT-internal no-go** (occurrence obstructions are impossible), which is *not* one of the three classical barriers. My attempt is explicitly built to evade the BIP no-go (by using multiplicities, Step 2). But there may be a *further* GCT-internal obstruction — e.g. a "symmetry-multiplicity obstructions are also impossible" theorem analogous to BIP — that would kill Step 5. I do not know that such a theorem is false. This is the deepest risk and is not covered by the three classical barriers.

---

## 6. Self-identified weakest step (ruthless)

**The weakest step is Step 5 (the $Y$-side lower bound), and behind it the second half of Conjecture MO.**

Here is the brutal version. The reduction in Step 3 (upper-bounding $m_\lambda(X)$ by the determinant's symmetry plethysm) is genuinely sound and is the strongest part of the attempt — it is an established inequality applied to a designed shape. Step 4 (that the two-rectangle Kronecker numbers are small for a near-hook $\lambda^{(k)}$) is plausible and possibly provable with current Kronecker-positivity technology in special cases.

But **Step 5 asks me to lower-bound a multiplicity in $\mathbb{C}[Y]$, and lower-bounding GCT multiplicities is exactly the thing nobody can do.** I gestured at "explicit covariants from padding," but:

1. **Nonvanishing is unproven.** The Young-symmetrizer contraction I described could be identically zero. Symmetrizers collapse constantly; I gave no argument that this one survives.
2. **Independence is unproven.** Even if individual covariants are nonzero, the "$\ge C+1$ independent ones" claim has no proof — they could all be proportional.
3. **The killer:** the same covariants, if they exist on $Y$, very plausibly *also* exist on $X$. The determinant orbit closure is enormous ($\dim 2m^2-1$ stabilizer notwithstanding, the orbit is high-dimensional and its coordinate ring is rich). BIP's occurrence result is precisely the statement that "whatever appears for the padded permanent also appears for the determinant" in the relevant range. My Step 4 tries to dodge this by choosing $\lambda^{(k)}$ where $s_\lambda(\det)$ is small — but **if $s_\lambda(\det)$ is genuinely small, that very smallness suggests $S_\lambda$ has few covariants of *any* kind, including from the permanent**, which would crush Step 5 too. There is a real tension: the design pushes $m_\lambda(X)$ down, but it may push $m_\lambda(Y)$ down *in lockstep*. I have no argument that the two sides decouple. **This is most likely fatal.**

In one sentence: **I can make the determinant side small, but I have no method to certify the permanent side is simultaneously large, and the structural reason the determinant side is small probably forces the permanent side to be small too.**

A secondary weak step: even if Conjecture MO held for some $\lambda^{(k)}$, I have not verified the $m = n^{O(\log n)}$ regime is achievable — the window in Step 4/6 might only open for $m$ exponential, which would not beat Valiant.

---

## 7. What would need to be true for this to go through

1. **A positive lower-bound technique for GCT multiplicities** $m_\lambda(\overline{G\cdot f})$ for $f$ with *small* symmetry group (the permanent). At present we have only upper bounds (symmetry/Peter–Weyl) and small-case computation. A genuine lower-bound method — e.g. an explicit, provably-nonzero, provably-independent family of covariants attached to the permanent's $S_n\times S_n$ symmetry — is the missing engine. This does not exist.
2. **A decoupling theorem:** a proof that for the designed shapes $\lambda^{(k)}$, the permanent multiplicity does *not* shrink in lockstep with the determinant symmetry bound — i.e. that the tension identified in §6(3) can be broken. Equivalently, a refutation of a hypothetical "multiplicity obstructions are also impossible" no-go analogous to BIP. Whether such a no-go is true or false is **open** and is, in my view, *the* question that decides whether the entire multiplicity-obstruction route is alive.
3. **Kronecker/plethysm positivity for two-rectangle, near-hook arguments:** a proof that $g(\lambda^{(k)},(d^m),(d^m))$ is small/zero (Step 4). This is a concrete, possibly-attackable representation-theory problem and is the most tractable of the three needs — but by itself it only controls the *upper* side and is useless without need #1.
4. **A regime check** that the obstruction window includes $m$ subexponential in $n$.

**Net assessment.** This attempt converts the vague "find a multiplicity obstruction" into a *specific, falsifiable* program: a designed shape family, an exactly-computable upper bound on the determinant side, and a single missing ingredient (a permanent-side multiplicity lower bound) that is precisely the known hard gap of the entire field. The attempt **does not close**, and I judge it *likely to fail* for the lockstep reason in §6(3). Its value is diagnostic: it pins the live mathematical question to **need #2 (a decoupling / anti-no-go theorem)**, which I believe is the actual frontier of the multiplicity-obstruction program.

---

### References (established results invoked)
- L. Valiant, *Completeness classes in algebra* (1979); determinantal completeness of permanent.
- K. Mulmuley, M. Sohoni, *Geometric Complexity Theory I, II* (2001, 2008): orbit-closure / multiplicity-obstruction framework.
- P. Bürgisser, C. Ikenmeyer, G. Panova, *No occurrence obstructions in geometric complexity theory*, FOCS 2016 / JAMS 2019.
- C. Ikenmeyer, G. Panova, *Rectangular Kronecker coefficients and plethysms in GCT* (2017).
- P. Bürgisser, C. Ikenmeyer, *Geometric complexity theory and tensor rank* / obstructions from symmetries (2011, 2013).
- T. Mignon, N. Ressayre, *A quadratic bound for the determinant and permanent problem* (2004): $\mathrm{dc}(\mathrm{per}_n)\ge n^2/2$.
- J. Landsberg, L. Manivel, N. Ressayre; J. Landsberg, *Geometry and Complexity Theory* (2017): symmetry groups of det/perm.
- Marcus–May; Frobenius: stabilizers of permanent and determinant.

---

## Adjudication (2026-05-29)

**Ruling: BROKEN.**

**Red-team vote tally:** 3/3 BROKEN (Refuter 1 / barrier: high confidence; Refuter 2 / rigor: high confidence; Refuter 3 / literature: high confidence). Unanimous.

**Where it died:** Step 5 (§4 "lower-bound the Y side by exhibiting an explicit covariant"), together with its restatement as the second half of **Conjecture MO** (Step 6, §4). The chain is rigorous only through Step 3; it has no genuine Step-5 content.

- **Step 3 is genuinely valid** and is the soundest part of the document: `m_λ(X) ≤ s_λ(det) = dim S_λ(C^m⊗C^m)^{SL_m×SL_m}` follows from the algebraic Peter–Weyl / "obstructions from symmetries" principle applied to the determinant's explicit reductive stabilizer. Correctly stated and correctly cited.
- **Step 4 is heuristic** ("far from the rectangle (d^m) ⇒ few SL_m×SL_m-invariants" is asserted via Kronecker-support intuition, not proved). This is a secondary weakness, but a real gap.
- **Step 5 supplies no lower bound on `m_λ(Y)` at all.** The document itself flags all three required sub-claims as unproven: (1) **nonvanishing** of the Young-symmetrizer contraction Φ (no nonvanishing certificate; symmetrizers of mismatched type collapse generically); (2) **linear independence** of the C+1 claimed covariants (they could be proportional, giving multiplicity as low as 0 or 1); (3) **decoupling**. Because there is no lower-bound theorem, lemma, or computation, the "reduction to Conjecture MO" is **vacuous**: MO ≡ "the obstruction exists" ≡ the original separation problem restated. The argument assumes the hard open problem rather than proving it.
- **The decisive structural objection** — on which all three refuters converge, and which the author concedes in §6(3) and §7 need #2 — is the **lockstep / self-defeat** problem. The same symmetry/Peter–Weyl principle that upper-bounds the X-side also upper-bounds the Y-side (`m_λ(Y) ≤ s_λ(P) = dim S_λ^{H_per}`), and `P = z^{m-n}·per_n` lives in the *same* `C^m⊗C^m` matrix-variable space as `det`. Engineering λ far from the rectangle to make `s_λ(det)` small makes `S_λ` carry few covariants of *any* compatible type, shrinking the permanent side simultaneously. No decoupling argument is given, and the BIP "no occurrence obstructions" mechanism (§2, the author's own anchor) predicts that whatever covariants appear for the padded permanent in this regime already appear for the determinant. So `m_λ(Y) > m_λ(X)` is not merely unproven — it points *against* the known evidence. The author's Step 7 even predicts the construction fails in every checkable small case.

**Which barrier killed it:** None classical. The §5 named-barrier audit is essentially correct — a literal GCT orbit-closure multiplicity obstruction does not relativize, naturalize, or algebrize. (Refuter 3 nominally tagged "natural-proofs," but the substance of all three reports agrees the failure is *not* a barrier violation.) The death is a plain unproven — and on present evidence likely false — positivity conjecture sitting at the field's known hard gap: there exists no method to lower-bound orbit-closure multiplicities of a low-symmetry form. This is the BIP-style **internal no-go** the author himself flags as the deepest risk, not a meta-barrier.

**Salvageable residue:**
1. The Step-3 determinant-side upper bound `m_λ(det) ≤ s_λ(det)` is correct, self-contained, and reusable — a clean, honestly-cited statement of the symmetry-multiplicity bound applied to a designed shape.
2. The document's chief value is *negative and diagnostic*: it isolates the exact missing object — a positive **lower-bound method for orbit-closure multiplicities of a small-symmetry form** — and crisply names the **lockstep / decoupling problem** (§7 need #2) as the structural reason the symmetry approach cannot, by itself, separate the two sides. Any viable future attempt must produce a *decoupling theorem*, not merely engineer a shape λ. This is a useful, well-localized signpost for why multiplicity-based GCT is stuck.
3. Exemplary intellectual honesty: the file declares "Status up front: this attempt does NOT close," correctly classifies itself as a documented dead-end, and never claims to be a proof.
