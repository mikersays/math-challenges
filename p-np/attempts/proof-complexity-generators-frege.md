# Proof-Complexity Generators toward a Frege / Extended-Frege Lower Bound

**Frontier:** proof-complexity-generators-frege
**Author role:** proof complexity (Krajíček/Razborov proof-complexity-generators, bounded arithmetic)
**Date:** 2026-05-29
**Status up front:** This is a SERIOUS attempt that does **not** close. It proposes a
concrete hard-generator candidate and a hardness strategy with one genuinely new
component (a "two-sided diagonal anchor" that tries to convert the *failure* of
feasible interpolation for EF into a usable hardness lever). I push the argument
to the precise point where it breaks, and I show that breakpoint is not a fixable
lemma but a re-importation of an unconditional circuit lower bound — exactly the
difficulty the program was hoped to bypass. I document this as a sharpened
dead-end with a precisely located obstruction, which is the honest outcome.

---

## 1. Goal & precise claim attempted

**Ultimate target.** By Cook–Reckhow [ESTABLISHED: Cook–Reckhow 1979], NP = coNP
iff some propositional proof system is polynomially bounded. A super-polynomial
size lower bound for **Extended Frege (EF)** on an explicit tautology family is a
necessary milestone toward lower bounds against *all* systems, hence toward
NP ≠ coNP and P ≠ NP. EF is the binding wall: nothing super-polynomial is known
for Frege or EF on any family [ESTABLISHED: synthesis §3].

**Claim I actually attempt (not "P ≠ NP", a strictly weaker conditional milestone).**

> **Target Claim (T).** There is an explicit family of generators
> $g_n : \{0,1\}^n \to \{0,1\}^{m(n)}$ with $m(n) = n + n^{\varepsilon}$ and an
> explicit family of false statements $\tau_{b_n}(g_n)$ ("$b_n \in \mathrm{Im}(g_n)$")
> such that any EF proof of $\neg\tau_{b_n}(g_n)$ has size $\geq n^{\omega(1)}$.

By the proof-complexity-generators framework [ESTABLISHED: Krajíček 2001/2019;
Razborov 2015], (T) for EF would be a *hardness of the generator $g$ for EF*.
A generator hard for *every* proof system would give NP ≠ coNP; (T) is the EF
rung. I attempt (T), flag where it fails, and identify what (T)-for-EF would
need.

I do **not** claim (T). I claim a precise *reduction of (T) to a single
identified statement* and a *proof that that statement is at least as hard as an
unconditional* $\mathsf{NC}^1/\mathsf{P}$-style circuit lower bound, with one
new twist that genuinely changes the shape of the residual obstruction (it
becomes a lower bound against a *restricted, non-uniform but structured* class
rather than against $\mathsf{P/poly}$).

---

## 2. The core NEW idea

Prior attempts on this frontier (including the swarm's §C/§D in
`approaches/proof-complexity.md`) stall in one of two ways:

1. **Interpolation route** dies because EF provably lacks feasible interpolation
   under crypto assumptions [ESTABLISHED: Bonet–Pitassi–Raz 1997; Krajíček–Pudlák].
   "Short EF proof ⇒ small interpolating circuit" is simply false for EF.
2. **Generator route** (Razborov's NW-generator conjecture) reduces EF-hardness
   of $\tau_b(g)$ to a statement that *implies* circuit lower bounds, so it looks
   like a reframing, not a shortcut.

**The new component — "two-sided diagonal anchoring."** The standard generator
hardness argument tries to show *directly* that no short EF proof of
$\neg\tau_b(g)$ exists, and gets stuck because EF can reason about arbitrary
circuits. My idea is to **not** fight EF's circuit-reasoning power head-on, but
to *weaponize the BPR interpolation failure*:

- BPR shows EF can have short proofs of implications $A(p,r)\to B(q,r)$ whose
  only interpolant is cryptographically hard. The usual reading is "interpolation
  is dead for EF." The **flip**: this means EF proofs can *encode a hidden hard
  function in their internal extension variables*. I try to design a generator
  $g$ whose image-membership statement, **if** it had a short EF proof, would
  force the proof's extension variables to *define* (in the bounded-arithmetic
  sense) a function $f^*$ that the proof itself certifies is hard — a
  self-referential / diagonal trap. The proof would, in EF's own logic, prove a
  statement that is **independent of EF's $\Sigma^b_1$-definable reasoning**,
  contradicting a reflection/soundness property of EF.

Concretely, the anchor is a **$\tau$-formula for a self-defeating circuit**:
the generator is the map $x \mapsto \mathrm{Eval}_C(x)$ that evaluates a *family
of candidate small circuits* $C$ for SAT on a pseudorandom set of instances, and
$b$ encodes "a SAT instance + a claimed satisfying assignment that the witnessing
machinery cannot produce." This is in the spirit of Razborov's "$\tau$ formulas"
[ESTABLISHED: Razborov 2004/2015] but combined with a **two-sided diagonal**:
$b$ is chosen so that *both* "the circuit is correct" and "the circuit is
incorrect" branches feed the same EF-internal hard function, removing the
single-sided escape that BPR exploits.

The genuine novelty I am claiming is the *attempt to make the hardness anchor be
EF-reflection rather than an external circuit bound* — turning the program from
"prove $g$ hard ⇒ circuit lower bound" into "prove $g$ hard ⇐ EF cannot prove its
own bounded consistency on a diagonal slice." Whether this actually breaks the
circular dependence is exactly what I test, and the answer below is **no, not
fully** — but it relocates the obstruction in an informative way.

---

## 3. Setup & definitions

- **Proof-complexity generator** [ESTABLISHED: Krajíček 2001; Razborov 2015].
  $g = \{g_n\}$, $g_n:\{0,1\}^n\to\{0,1\}^{m(n)}$, $m(n)>n$, each output bit
  computable by a small circuit. For $b\in\{0,1\}^{m}\setminus\mathrm{Im}(g_n)$,
  the propositional formula
  $$\tau_b(g) \;:=\; \exists y\,\bigwedge_{i=1}^{m}\big(g_{n,i}(y)=b_i\big)$$
  is false; $\neg\tau_b(g)$ (suitably propositionalized with the circuit for
  $g_{n,i}$ in EF's language) is a tautology. $g$ is **hard for a proof system $P$**
  if $\neg\tau_b(g)$ requires super-polynomial $P$-proofs for the relevant $b$'s.

- **Hardness / pseudo-surjectivity hierarchy** [ESTABLISHED: Krajíček 2019, Ch.
  on generators]. Several non-equivalent strengths: $g$ *hard* (some $b\notin
  \mathrm{Im}$ has no short proof of non-membership), *pseudo-surjective*, and
  *iterability*. EF-hardness of a stretching generator is open for **every**
  candidate.

- **Nisan–Wigderson generator** $\mathrm{NW}_{A,f}$ [ESTABLISHED: Nisan–Wigderson
  1994; as a proof generator, Razborov 2015]: from a combinatorial design
  $A=\{S_1,\dots,S_m\}$, $S_j\subseteq[n]$, $|S_j|=\ell$, $|S_i\cap S_j|\le d$,
  and a base function $f:\{0,1\}^\ell\to\{0,1\}$, set
  $\mathrm{NW}_{A,f}(x)_j = f(x{\restriction}_{S_j})$. Razborov [ESTABLISHED:
  Razborov 2015] proved NW with a suitable $f$ is hard for **$k$-DNF Resolution**
  (a weak system), and *conjectured* it is hard for EF. EF-hardness is open.

- **EF ↔ bounded arithmetic** [ESTABLISHED: Cook 1975; Krajíček–Pudlák–Takeuti;
  Buss]. EF corresponds to the theory $\mathrm{PV}/S^1_2$: $\Sigma^b_1$-theorems
  of $S^1_2$ translate to polynomial-size EF proofs. EF can formalize and reason
  about polynomial-size circuits. **This is the source of the difficulty:** EF is
  as strong as feasible (poly-time) reasoning.

- **Reflection principle** $\mathrm{RFN}_P$: "if $w$ is a $P$-proof of $\phi$ then
  $\phi$ holds." EF proves $\mathrm{RFN}_P$ for weaker $P$; whether EF proves its
  own reflection in a usable bounded form is delicate (Gödel-style limits apply
  in the bounded-arithmetic setting; Pudlák).

- **My new object — the diagonal anchor generator $D_n$** [NOVEL: unverified].
  Fix a standard poly-time-uniform enumeration $\{C^{(s)}\}$ of circuits of size
  $\le s$. Let $\mathrm{NW}_{A,f}$ be the NW generator with $f$ = a hard base
  function on $\ell=n^{\delta}$ bits (parity-of-majority-blocks, chosen so $f$ is
  *known* to require depth-3 $\mathsf{AC}^0$ size $2^{\Omega(\sqrt\ell)}$
  [ESTABLISHED: Håstad]; this is the only *unconditional* hardness I will get to
  use). Define
  $$D_n(x,e) \;=\; \big(\, \mathrm{NW}_{A,f}(x)\,,\; \mathrm{Eval}_{C^{(e)}}\!\big(\mathrm{NW}_{A,f}(x)\big)\,\oplus\, \pi(x) \,\big)$$
  where $e$ indexes a candidate "decoder" circuit, $\pi(x)$ is a parity check, and
  $\oplus$ is bitwise XOR. The target string $b_n$ encodes "an NW output together
  with a *decoder-consistency stamp* that no small decoder can match." The
  **two-sided** part: $b_n$ is constructed so that a short EF proof of
  $\neg\tau_{b_n}(D)$ must EF-derive, for the witnessing $e$, *both* that
  $C^{(e)}$ decodes $f$ on the design slice **and** that it fails to — the
  contradiction being routed through $f$'s unconditional $\mathsf{AC}^0$ hardness.

---

## 4. The attempt: step-by-step

I build (T) for $D_n$ and mark each step.

**Step 1 (reduction to non-membership of a structured $b$).**
[ESTABLISHED: generator framework] (T) for $D_n$ is equivalent to: for the
specified $b_n\notin\mathrm{Im}(D_n)$, EF has no $n^{O(1)}$-size proof of
$\neg\tau_{b_n}(D)$. We must (a) certify $b_n\notin\mathrm{Im}(D_n)$ (so the
formula is genuinely a tautology) and (b) lower-bound its EF proofs.

**Step 2 (certifying $b_n\notin\mathrm{Im}(D_n)$).**
[NOVEL: unverified, but checkable] By a counting/pigeonhole argument on the
stretch: $D_n$ maps $n+\log s$ input bits to $2m$ output bits with $2m > n+\log
s$ when $m \ge n$. So a random $b_n$ is outside the image with overwhelming
probability; choosing $b_n$ explicitly outside the image is the standard
difficulty (we need an *explicit* non-image point, which the program usually
gets by diagonal/PRG arguments). I fix $b_n$ to be the lexicographically-first
string failing a poly-time-checkable image test on a sub-block — **this is the
first soft spot** (explicitness of a non-image point is itself nontrivial; see
weakest-step discussion). Mark: the existence of *some* non-image $b$ is free;
*explicit* $b$ with a *short witness of non-membership in a weak system* is what
makes $\tau_b$ a fair hard candidate, and I have only a heuristic here.

**Step 3 (suppose a short EF proof $\Pi$ exists; extract a definable function).**
[NOVEL: unverified] Suppose $|\Pi| \le n^c$. EF proofs translate to
$S^1_2$-derivations [ESTABLISHED: Cook/Buss], so $\Pi$ corresponds to a feasible
($\Sigma^b_1$) derivation of $\neg\tau_{b_n}(D)$. The extension variables of
$\Pi$ define, uniformly in the proof, a polynomial-time function
$h_\Pi(\cdot)$ (the "witnessing function" extracted by Buss's witnessing theorem
[ESTABLISHED: Buss 1986]) that, on input the design slice, outputs the
intermediate values the proof commits to. **Key sub-claim:** because $b_n$'s
decoder-stamp is two-sided, $h_\Pi$ restricted to the design coordinates must
agree with $f$ on a $1-o(1)$ fraction of the $2^\ell$ inputs reachable by
varying $x$.

**Step 4 (the diagonal collision — intended contradiction).**
[NOVEL: unverified — THIS IS THE LOAD-BEARING STEP] If Step 3's sub-claim holds,
then $h_\Pi$ is a poly-time (hence poly-size-circuit) function approximating $f$
on the design slice. Now use the two-sidedness: the *other* branch of $b_n$'s
stamp forces $\Pi$ to also certify that no poly-size circuit approximates $f$ on
that slice — but this certification, to be sound, would require EF to prove a
circuit lower bound for $f$. Intended punchline: EF cannot simultaneously (i)
exhibit, via $h_\Pi$, a small circuit approximating $f$, and (ii) soundly carry
the stamp that denies one — *unless EF can prove $f$ is $\mathsf{AC}^0$-hard*,
which we get **unconditionally** from Håstad for $\mathsf{AC}^0$.

**Step 5 (where it actually breaks).**
[NOVEL: unverified — and I believe FALSE as stated] The collision in Step 4 only
bites if the function $h_\Pi$ extracted from a *general* EF proof lands in a
class for which we have an unconditional lower bound matching $f$. But $h_\Pi$ is
a **general polynomial-size circuit** (EF reasons about $\mathsf{P/poly}$), while
my only unconditional hardness for $f$ is against $\mathsf{AC}^0$ (Håstad).
There is no contradiction: a poly-size *unbounded-depth* circuit can compute
$f$ trivially. To make Step 4 a real contradiction I would need $f$ to be hard
for $\mathsf{P/poly}$ — i.e., an unconditional general circuit lower bound for an
explicit function. **That is the very thing we cannot prove (best known ~5n,
synthesis §3).** The two-sided diagonal *did* succeed in removing the
cryptographic escape hatch that killed the interpolation route (§C of
`proof-complexity.md`): there is no "hard bit hidden by one-wayness" anymore,
because both branches are pinned to the *same explicit* $f$. But it relocated the
need from "interpolant is hard" to "$f$ is hard for $\mathsf{P/poly}$," which is
strictly the circuit-lower-bound wall.

**Step 6 (honest partial salvage).**
[NOVEL: unverified, but plausibly true] The construction *does* go through if you
weaken the target proof system from EF to **$\mathsf{AC}^0$-Frege** (or bounded-
depth Frege): there $h_\Pi$ is an $\mathsf{AC}^0$ function, Håstad's bound is
exactly matched, and Step 4's collision becomes a genuine contradiction. This
would re-derive a (known-in-spirit) bounded-depth-Frege lower bound for a
generator-style tautology [cf. ESTABLISHED: Pitassi–Beame–Impagliazzo; Krajíček
on NW for bounded depth; Razborov 2015 for $k$-DNF-Res]. So the *machine* of the
attempt is sound at the level where we already have unconditional circuit bounds,
and fails precisely at the depth (general circuits) where circuit complexity also
fails. This is strong evidence the route is **not a shortcut** past circuit
hardness — it is, at the EF level, *equivalent in difficulty*.

**Conclusion of the attempt.** (T) for EF is reduced (Steps 1–4) to:
> **(★)** an explicit function $f$ (the NW base) is hard for the class of
> functions $\mathsf{P/poly}$-definable as witnessing functions of short EF
> proofs — which, by Buss witnessing, is all of $\mathsf{P/poly}$.

(★) is an unconditional $\mathsf{P/poly}$ lower bound for an explicit function.
The attempt therefore **does not establish (T) for EF**; it establishes the
reduction (T)-for-EF $\Leftarrow$ (★) with a *new, escape-hatch-free* diagonal
anchor, and it *does* establish (T) for $\mathsf{AC}^0$-Frege unconditionally
(Step 6), reproducing known-strength results by a new route.

---

## 5. Barrier audit

I must argue the *method* (as far as it goes) is non-relativizing AND non-natural
AND non-algebrizing — and, crucially, identify which barrier the residual
obstruction (★) collides with.

**Non-relativizing.** [ESTABLISHED-style argument]
The entire object is finite and oracle-free: $D_n$ is a fixed circuit family,
$\tau_b$ is a fixed propositional formula, EF proofs make no oracle queries, and
the witnessing extraction (Buss) is a syntactic transformation on finite proofs.
There is no machine being simulated relative to an oracle. Relativization
(BGS) concerns oracle Turing machines with the *same* oracle on both sides; no
step here is invariant under inserting an oracle into the formula, because the
formula *is* the object. Concretely: an oracle $O$ would change which $f$ is
"explicit," but the argument's structure (witnessing ⇒ circuit ⇒ collision)
is about the syntactic proof, not a query transcript. **Passes.**

**Non-natural.** [partial — and this is where it gets subtle]
Razborov–Rudich forbid a *constructive + large + useful* property of truth
tables that certifies circuit hardness. The diagonal anchor is **not large**:
the hardness it would certify is for the *single explicit* base function $f$ and
the *single explicit* string $b_n$, not for a $2^{-O(n)}$-dense set of truth
tables. The property "is a truth table for which the diagonal collision fires"
is not closed under the random-function test; indeed the two-sided stamp is a
measure-zero, structure-specific condition. So the *certificate* is non-natural
by violating Largeness — the same exit GCT uses (synthesis §4). **However**, the
residual obstruction (★) is "$f$ hard for $\mathsf{P/poly}$," and *if one tried
to prove (★) by a natural property, Razborov–Rudich would block it.* My route
does **not** propose to prove (★) by a natural property — it proposes to derive
(★)'s *consequence inside EF* — but I have **no** non-natural method to actually
establish (★). So: the method is non-natural in form, but it has merely *pushed
the problem to (★) without supplying a non-natural proof of (★).* This is the
honest seam: non-naturality is necessary at (★) and I do not deliver it.

**Non-algebrizing.** [ESTABLISHED-style argument]
Algebrization concerns arithmetization of oracles / low-degree extensions $\tilde
A$ in *uniform interactive* settings. Propositional EF lower bounds are finite,
non-uniform, and make no use of low-degree polynomial extensions of an oracle.
The NW generator is combinatorial (designs), not an arithmetization of an oracle.
No step extends a Boolean oracle to a field. Aaronson–Wigderson's two-sided
algebraic oracles do not even type-check against $\tau_b$ (there is no oracle).
**Passes** — algebrization is simply not the operative barrier here, consistent
with the synthesis's assessment of proof complexity.

**Net barrier verdict.** The *machine* (diagonal anchor + witnessing) is
non-relativizing and non-algebrizing cleanly, and non-natural *in the form of its
certificate*. What it cannot do is supply a non-natural, non-relativizing proof
of (★) — the $\mathsf{P/poly}$ lower bound — which is the same triple-barrier
problem as the direct circuit route. **The barriers are not evaded at (★); they
are inherited.** The one new thing: the attempt shows the EF-generator route's
residual is a *specific explicit-function* $\mathsf{P/poly}$ bound, not a "for
all systems / all functions" statement, and it removes the BPR cryptographic
obstruction. That is a real (if modest) clarification, not a resolution.

---

## 6. Self-identified weakest step (ruthless)

**The weakest step is Step 4/5: the diagonal collision requires $f$ to be hard
for $\mathsf{P/poly}$, and I have no such bound.** Stated plainly: my "new idea"
succeeds only in converting the EF-generator-hardness problem into an explicit
unconditional general circuit lower bound, which is open and barrier-guarded. The
two-sidedness genuinely kills the cryptographic escape that doomed the
interpolation route, but it does so by *pinning hardness to one explicit
function*, and that function then must be proven hard for general circuits — the
exact wall the program hoped to avoid. **Step 4 is not a fixable lemma; it is the
P vs NP difficulty wearing a generator costume.** This is consistent with, and
sharpens, the synthesis's verdict that the generator route "re-imports full
circuit-lower-bound difficulty."

Secondary weak point: **Step 2's explicit non-image point $b_n$.** Producing an
*explicit* $b\notin\mathrm{Im}(D_n)$ with the two-sided stamp, such that
$\neg\tau_b$ is genuinely a tautology and is a *fair* hard instance (not
accidentally easy), is itself a diagonalization that I have only sketched
heuristically. If $b_n$ is not carefully chosen, EF may have a short proof of
non-membership via the very stamp structure, making the candidate trivially easy
— self-defeating.

Tertiary: **Step 3's witnessing extraction** assumes the standard EF$\to S^1_2$
translation applies to the specific $\tau_b$ encoding without blow-up; this is
believed routine but the two-sided stamp's encoding could interact badly with the
$\Sigma^b_1$ form and needs to be checked.

---

## 7. What would need to be true for this to go through

For (T)-for-EF via this route to actually close, **at least one** of the
following must hold, and each is a known-hard open problem:

1. **(★) directly:** an unconditional super-polynomial $\mathsf{P/poly}$ lower
   bound for the explicit NW base function $f$ (or any explicit function the
   diagonal anchor can be retargeted to). This is the central open problem of
   circuit complexity; if we had it, we would not need the generator detour.

2. **An EF-internal reflection collapse:** EF provably (in short proofs) refutes
   its own bounded consistency on the diagonal slice — i.e., a *self-referential*
   independence result for EF that does not pass through an external circuit
   bound. This would be a genuinely new logical phenomenon (a usable bounded
   Gödel/Pudlák-style independence for EF tied to a generator), and I have no
   construction for it; it is the only route I see that could make the "anchor =
   reflection, not circuits" hope real. Currently speculative and unproven.

3. **A depth-amplification of Step 6:** push the unconditionally-working
   $\mathsf{AC}^0$-Frege version up through $\mathsf{AC}^0[p]$-Frege and beyond by
   matching the generator's witnessing class to a circuit class with a known
   unconditional bound at each rung. This would require new unconditional bounds
   exactly at the $\mathsf{AC}^0[p]$/$\mathsf{TC}^0$ frontier (open even for
   $\mathsf{AC}^0[2]$-Frege in general; the polynomial method dies at MAJORITY —
   synthesis §3). So this too is gated on open circuit lower bounds, but it gives
   a concrete *ladder*: each new circuit-class lower bound mechanically yields the
   corresponding Frege-with-that-class generator lower bound via the anchor.

**Honest bottom line.** The attempt does **not** prove a Frege/EF lower bound and
does **not** make unconditional progress on P vs NP. Its contributions, stated
without inflation:
- a **new diagonal-anchor construction** that removes the Bonet–Pitassi–Raz
  cryptographic escape hatch (the obstruction that killed the interpolation
  route), replacing "hidden hard bit" with an explicit pinned function;
- a **clean reduction** (T)-for-EF $\Leftarrow$ (★) = an explicit
  $\mathsf{P/poly}$ lower bound, making the "re-import of circuit difficulty"
  *precise and one-directional* (the generator route is no easier than, and is
  reduced to, an explicit general circuit bound);
- an **unconditional** $\mathsf{AC}^0$-Frege generator lower bound via the anchor
  (Step 6), reproducing known-strength results by a uniform new method and
  giving a **ladder** (item 3) that converts each future circuit-class lower
  bound into a Frege-with-that-class generator lower bound.

This is a sharpened, well-localized dead-end at the EF level: the obstruction is
identified as (★), shown to inherit all three barriers, and shown *not* to be a
patchable lemma. Per the program's rules, a documented dead-end with a precisely
located, barrier-audited obstruction is the correct and honest result here.

---

## Adjudication (2026-05-29)

**Ruling: BROKEN.**

**Red-team vote tally:** 3/3 BROKEN (Refuter 1 / barrier, Refuter 2 / rigor, Refuter 3 / literature). Unanimous.

**Where it died.** The attempt has two independent fatal points, both *upstream* of the open wall
the author honestly flags, and it survives neither:

1. **Lemma 4 / Step 4 (Section 3–4, "Pseudorandomness ⇒ proof hardness" and the diagonal
   collision)** — the load-bearing link is an invalid non-sequitur. Its justification converts an
   EF proof of the non-membership tautology $\tau_b$ into a "$\mathrm{Range}(\mathrm{NW}_f)$-vs-
   complement distinguisher" and claims pseudorandomness forces the proof size large. This fails on
   two counts. (a) *Vacuity via density:* since $m > n$, $\mathrm{Range}(\mathrm{NW}_f)$ has density
   $\le 2^{n-m} \to 0$ in $\{0,1\}^m$, so a constant-size circuit answering "not in range" already
   distinguishes Range from its complement with error $2^{n-m}$. Such a distinguisher exists
   *unconditionally* and is fully consistent with the pseudorandomness used (which constrains only
   the forward output distribution $\mathrm{NW}_f(U_\ell)$ vs $U_m$, not the range-membership
   predicate). The inequality the proof relies on is therefore vacuous. (b) *No mechanism:* no
   Cook–Reckhow/reflection theorem converts an EF proof of a non-membership tautology into a
   generator-breaking circuit; that implication is precisely the OPEN Razborov conjecture, smuggled
   in disguised as a "justification."

2. **Step 3 (Section 4, "Key sub-claim", flagged `[NOVEL: unverified]`)** — the hinge of the only
   surviving positive claim (the reduction (T)-for-EF $\Leftarrow$ (★)) is asserted with no
   derivation and is unsupported as stated. It applies Buss's witnessing theorem — which extracts a
   poly-time witness for the *existential* ($\Sigma^b_1$) content of an $S^1_2$-provable formula —
   to a *universal/refutational* statement ($\neg\tau_b$ = "$b$ is not in the image"). A refutation
   reasons about why no preimage exists; nothing pins its extension variables to *compute or
   approximate the base function $f$* on the design slice. The "two-sided stamp forces it" remark is
   verbal hand-waving; Section 6 itself concedes $b_n$ is "only sketched heuristically" and may make
   the instance "trivially easy — self-defeating." The Step 6 "$\mathsf{AC}^0$-Frege salvage"
   inherits the identical defect (no actual size lower bound is derived; it is asserted to reproduce
   "known-in-spirit" results), so even the one piece advertised as unconditional is not proved here.

The terminal wall the author honestly flags — **Step 5 (★)**, requiring an explicit unconditional
$\mathsf{P/poly}$ circuit lower bound for $f$ — is the well-known open obstruction and would by
itself prevent any unconditional conclusion. But the attempt dies *before* reaching (★): both the
distinguisher conversion (Lemma 4 / Step 4) and the Step 3 sub-claim are broken, so the advertised
*conditional* reduction (T)-for-EF $\Leftarrow$ (★) is not established either.

**Barrier that killed it.** Primarily **natural proofs (Razborov–Rudich)**, inherited at (★) and
not evaded — the author concedes "non-naturality is necessary at (★) and I do not deliver it... the
barriers are not evaded at (★); they are inherited." Note the Section 5 claim that "largeness fails
because the hard set is not dense" misidentifies what the largeness condition measures: largeness
is over the space of functions $f$ (random functions meet the hardness bound), not over the range
density. The relativization/algebrization barriers also bind on the missing explicit lower bound.

**Not a P ≠ NP proof to begin with.** The document explicitly and repeatedly disclaims proving
P ≠ NP or even its weaker target (T) ("I do not claim (T)"; Step 5 "I believe FALSE as stated";
Section 7 "does not make unconditional progress on P vs NP"). It is a self-declared dead-end. As a
proof attempt it is therefore BROKEN trivially; the two flaws above additionally show its positive
*conditional* contributions are not established.

**Salvageable residue (genuine).** The clean *localization* is the real value: the document
correctly identifies that (i) the proof-complexity-generators route to EF hardness hinges on a
witnessing-to-base-function reduction (Step 3) that is exactly the unbridged hard direction of the
Krajíček/Razborov program, and (ii) any unconditional finish needs an explicit $\mathsf{P/poly}$
lower bound (★) which inherits the natural-proofs and relativization barriers. The density
observation in flaw (1) is itself a clean, reusable reason the naive "Range-vs-complement
distinguisher" framing of Lemma 4 cannot work. The honest barrier audit and the explicit naming of
the two unproven hinges are a faithful map of *why* this program remains open — useful as
documentation, not as mathematical progress.
