# Attempt: Scaling the Algorithmic Method below NEXP

**Frontier:** williams-algorithmic-method-scaling
**Author:** automated research attempt
**Date:** 2026-05-29
**Status:** Sharpened dead-end. Does NOT close. Documents a concrete new idea, locates the precise point of failure, and quantifies exactly what would be needed.

> NOTE ON CONTEXT: This attempt was written after reading `/Users/momo/git/math-challenges/p-np/SYNTHESIS.md`
> and the eight write-ups in `approaches/`. The barrier audit (§5) is checked against that synthesis — in
> particular the synthesis's own assessment that Williams' method "genuinely evades [natural proofs] but only
> reaches NEXP/NTIME, not NP" (SYNTHESIS §2, Barrier 2 table) and that scaling it below NEXP is direction #1
> on its most-promising list (SYNTHESIS §4.1). This file attacks exactly that named gap.

---

## 1. Goal & precise claim attempted

**Ultimate target of the frontier:** Use the algorithmic method (faster Circuit-SAT ⇒ circuit lower bounds)
to prove a separation strictly stronger than the current state of the art — ideally a step on the road to
`NP ⊄ C` for a class `C ⊋ ACC0`, rather than the known `NEXP ⊄ ACC0` (Williams 2014) and
`NQP ⊄ ACC0` (Murray–Williams 2018).

**What this attempt actually tries to establish (the honest, scaled-back claim):**

> **Claimed Target T.** A *conditional, scale-invariant* version of the algorithmic method:
> a fixed polynomial-factor (not exponential-factor) Circuit-SAT speedup, applied at *every input length
> simultaneously and uniformly*, suffices to derive `NP ⊄ C[poly]` — provided one can supply a
> **"self-similar easy-witness lemma"** that survives the scale-down from `NEXP` to `NP`.

The contribution of this file is to (i) isolate the unique structural obstruction that forces Williams'
method to start at `NEXP`, (ii) propose a concrete new mechanism ("recursive witness compression via
padding-stable SAT solvers") that *attacks exactly that obstruction*, and (iii) show **rigorously where the
mechanism breaks** — namely a quantitative loss in the easy-witness lemma that I cannot currently close, and
which I argue is plausibly *equivalent in difficulty* to the original problem.

**Bottom line up front:** the attempt does **not** go through. The new idea reduces the gap by one named
lemma, and I show that lemma is the whole ballgame. This is a documented dead-end, not a proof.

---

## 2. The core NEW idea (what is different from prior failed attempts)

Williams' method is morally a *trade between two exponential gaps*:

- **Gap A (the seed):** the nondeterministic time hierarchy theorem gives a hard language at the *top* —
  something in `NTIME[2^n]` but not `NTIME[2^n / n]`. This is an **exponential-length** object.
- **Gap B (the speedup):** the Circuit-SAT algorithm must beat brute force by a *superpolynomial* factor,
  but it is applied to circuits of *exponential* size that encode the hierarchy computation.

The reason the method *starts at NEXP and cannot be naively scaled to NP* is that the **easy-witness lemma**
(EWL) and the **collapse step** both operate at the exponential scale: assuming `NEXP ⊆ C`, witnesses for
`NEXP` verifiers become `C`-circuits of *polynomial* size (an exponential compression of an
exponential-length witness). When you try to run the same template at the `NP` scale, "witnesses" are already
polynomial length, so compressing them into poly-size circuits buys you *nothing* — there is no exponential
gap left to exploit, and the contradiction with the time hierarchy evaporates.

Prior scaling efforts (Murray–Williams; Chen et al.) pushed `NEXP → NQP` by tightening the *hierarchy seed*
and the *speedup bookkeeping*, but they kept the **single-scale** architecture: one EWL application at one
(quasi-polynomial) scale.

> **NEW IDEA (NOVEL):** Replace the single-scale collapse with a **self-similar / multi-scale collapse**.
> Instead of compressing an exponential witness once, build a SAT solver that is **padding-stable**:
> its speedup factor is *the same relative function of the input length at every length*, and chain the
> easy-witness lemma **recursively across a tower of length scales**
> `n, n^{log n}, n^{(log n)^2}, …` so that a *fixed polynomial* compression at each rung accumulates,
> over `O(log* )`-many rungs, into the *one* exponential compression that the contradiction needs.
>
> The point: no single rung needs an exponential gap. The exponential gap is *manufactured by the recursion
> depth*, the way repeated squaring manufactures an exponent from a constant. If this works, the *base*
> requirement on the SAT solver drops from "exponential-factor speedup at exponential size" to
> "uniform polynomial-factor speedup, self-similar across scales" — which is the kind of speedup we might
> actually hope to obtain for a class above ACC0.

The technical vehicle is a **padding-stable Circuit-SAT speedup** (Def. 3.3) feeding a **recursive
easy-witness lemma** (the lemma I cannot prove, §4 Step 5, §6).

This differs from all prior attempts in *where it puts the exponential*: prior work needs the exponential in
the *primitive* (the SAT solver, or the seed). This attempt tries to move the exponential into the
*recursion structure*, leaving the primitives polynomial.

---

## 3. Setup & definitions

Let `C = {C_n}` be a (non-uniform) circuit class with a notion of size `s` and an explicit
`SAT(C)` problem: given a `C`-circuit on `n` inputs, decide satisfiability. We assume `C` is closed
under: (a) composition with `AC0`, (b) projections, (c) polynomial blow-up in size. (ACC0, TC0, NC1 all
satisfy these.)

**Def 3.1 (Speedup).** A `SAT(C)` algorithm has *speedup* `g(n)` if it runs in time
`2^n / g(n) · poly(s)` on `n`-input, size-`s` `C`-circuits. Williams needs `g(n) = n^{ω(1)}`
(superpolynomial) at exponential `s`. We will instead ask for a *uniform polynomial* `g(n) = n^c` for a
fixed constant `c > 1`, but **at every scale** (Def 3.3).

**Def 3.2 (Scale tower).** Fix a growth operator `Φ(n) = n^{log n}` (quasipolynomial). Define the *scale
tower* rooted at `n_0` by `n_{i+1} = Φ(n_i)`. After `k` rungs, `n_k = n_0^{(log n_0)^{...}}` (height-`k`
tower of logs in the exponent). Note `k = O(log* N)` rungs suffice to climb from `n_0 = N` to
`n_k = 2^N` (an exponential scale). *(This counting is the crux; see Weakest Step.)*

**Def 3.3 (Padding-stable speedup) [NOVEL definition].** A `SAT(C)` algorithm is *padding-stable with
exponent `c`* if there is a single algorithm `A` and constant `c` such that for **every** scale `m` in the
tower, on size-`s` `C`-circuits with `m` inputs, `A` runs in time `2^m / m^c · poly(s)`, **and** the
running of `A` at scale `m_{i+1}` can be *simulated* by a size-`poly(m_{i+1})` `C`-circuit family using
oracle gates to `A`'s behavior at scale `m_i` (a "self-reduction with `C`-glue"). The second clause is the
genuinely new demand: it asks the solver to be *internally recursive in a `C`-respecting way*.

**Def 3.4 (Easy witnesses).** A nondeterministic machine `M` running in time `T` has *`C`-easy
witnesses* if for every `x ∈ L(M)` there is an accepting computation whose witness `w` (length `T`) is the
truth table of a `C`-circuit of size `poly(log T)`. The classical EWL (Impagliazzo–Kabanets–Wigderson,
restated by Williams) says: if `NEXP ⊆ C[poly]` then `NEXP` verifiers have `C`-easy witnesses.

**Established anchors we will use:**

- **[ESTABLISHED: Williams 2014, "Nonuniform ACC Circuit Lower Bounds", JACM]** If `SAT(ACC0)` has
  speedup `2^{n^δ}` then `NEXP ⊄ ACC0`.
- **[ESTABLISHED: Impagliazzo–Kabanets–Wigderson 2002]** Easy-witness lemma for `NEXP`.
- **[ESTABLISHED: Murray–Williams 2018, STOC]** `NQP ⊄ ACC0`; refined hierarchy/speedup bookkeeping;
  in particular a *quasi-polynomial-scale* version of the collapse.
- **[ESTABLISHED: Nondeterministic Time Hierarchy, Cook 1972 / Seiferas–Fischer–Meyer]** `NTIME[T'] ⊊ NTIME[T]`
  for `T` superlinearly above `T'`.
- **[ESTABLISHED: Aaronson–Wigderson 2008]** Algebrization framework; algebrizing techniques cannot settle
  `NEXP` vs `P/poly`, and (the relevant negative result) cannot prove `NP ⊄ P/poly` either.

---

## 4. The attempt: step-by-step

We attempt to prove **Claimed Target T**: from a padding-stable speedup with exponent `c` (Def 3.3),
derive `NP ⊄ C[poly]`.

**Step 1 [ESTABLISHED, repackaged].** Assume for contradiction `NP ⊆ C[poly]`. By standard upward
translation (padding), `NP ⊆ C[poly]` implies `NTIME[2^{polylog}] = NQP ⊆ C[quasipoly]`, and iterating,
`NEXP ⊆ C[2^{polylog}]`. *(This is the usual padding argument; the size blow-up is the price of climbing
scales — and it is exactly this blow-up the recursion must control.)*

**Step 2 [ESTABLISHED: IKW + Williams].** Under `NEXP ⊆ C[…]`, NEXP verifiers have `C`-easy witnesses *at
the top scale*. Classically this is where the single exponential compression happens.

**Step 3 [NOVEL: unverified — the recursion setup].** Define, for each rung `n_i` of the scale tower, a
verifier `V_i` for the canonical hard language `H` produced by the nondeterministic time hierarchy at scale
`n_i`. Claim: padding-stability (Def 3.3, clause 2) lets us express *witnesses for `V_{i+1}`* as
`C`-circuits whose **internal oracle gates call `V_i`-witness circuits**. Intuitively, a witness at scale
`n_{i+1}` is "a `C`-circuit one rung down, plus polynomial glue."

*Status:* This is the heart of the new idea and it is **not proved**. It requires that the easy-witness
structure *commutes with the self-reduction* in Def 3.3 clause 2. I can motivate it (the self-reduction is
`C`-computable, and `C`-easy witnesses are `C`-circuits, so the composition is a `C`-circuit) but I cannot
control the **size growth** of the glue across rungs (see Step 5).

**Step 4 [NOVEL: unverified — recursion unrolling].** Unroll Step 3 across all `k = O(log* N)` rungs. If at
each rung the witness-circuit grows by a factor `f(m)` (the "glue cost"), then the top-scale witness circuit
has size `s_top = s_base · ∏_{i<k} f(n_i)`. The contradiction with the hierarchy at the top scale
(`2^N`-scale) requires `s_top = poly`, i.e. the *product of glue costs over the whole tower must stay
polynomial in `N`*.

**Step 5 [THE GAP — NOVEL, and I cannot close it].** Run the fast `SAT(C)` algorithm `A` (padding-stable,
exponent `c`) on the top-scale circuit to *find* the compressed witness faster than brute force, exactly as
in Williams: a poly-size succinctly-described witness search is solved in
`2^{N} / N^{c} · poly(s_top)` time, which — *if* `s_top` is poly — beats the nondeterministic-time-hierarchy
lower bound for `H`, giving the contradiction. **The contradiction is valid iff `s_top = poly(N)`.**

So everything reduces to: **is the glue product `∏_{i<k} f(n_i)` polynomial?**

**Step 6 [Honest evaluation of Step 5].** Here is the killer arithmetic. The classical EWL/collapse, when
run across a *single* quasi-polynomial scale jump (the Murray–Williams refinement), already incurs glue
`f(m) = m^{Θ(1)}` *with the constant in the exponent growing by the padding in Step 1*. Concretely, climbing
from scale `m` to `Φ(m) = m^{log m}` multiplies the relevant circuit-size budget by `m^{log m}` in the
worst case I can verify — i.e. `f(n_i) ≈ n_i^{log n_i}`, **quasi-polynomial, not polynomial, per rung.**
Then

```
∏_{i<k} f(n_i)  ≥  f(n_{k-1})  =  n_{k-1}^{log n_{k-1}}  =  (≈2^N)^{log(2^N)}  =  2^{N · log(2^N)}  =  2^{Θ(N^2)}.
```

That is **doubly exponential in the original `N`**, catastrophically larger than poly. The recursion does
*not* manufacture a free exponential gap; it manufactures a free exponential *blow-up* in witness size,
which destroys the contradiction. **The new idea, as stated, fails at Step 5/6.**

**Why the naive fix doesn't work.** One wants `f(n_i) = poly(n_i)` (polynomial glue per rung), which would
give `∏ f = poly(N)^{O(log* N)} = poly(N)` — *that* would close it. But polynomial glue per rung is exactly
the statement that `C`-easy witnesses *compose across a quasipolynomial scale jump with only polynomial
overhead*. I show in §6 that this demand is **equivalent to** an unconditional, scale-free easy-witness
lemma — which is not known and is plausibly as hard as the target separation itself.

---

## 5. Barrier audit

For the attempt to be *interesting* (even as a dead-end on the right road), the *mechanism* must at least be
of a non-barriered type. I audit the three barriers against the **method**, and note honestly where the
method inherits Williams' known status.

**(a) Non-relativizing.** ✔ Inherited and preserved. The skeleton uses the easy-witness lemma (IKW), which
rests on `MIP = NEXP` / arithmetized PCP-style succinct verification. There is an oracle `B` with
`NEXP^B ⊆ C^B` yet the EWL fails relative to `B`; Williams' theorem is known non-relativizing for exactly
this reason (BGS-style oracles separate the two sides). My recursion in Steps 3–4 only adds `C`-computable
self-reductions on top of the same arithmetic core, so it cannot become relativizing — it strictly
*increases* reliance on the non-relativizing succinct-PCP machinery (now invoked at every rung).

**(b) Non-natural.** ✔ The conclusion `NP ⊄ C[poly]` produced this way is **not** obtained by exhibiting a
Razborov–Rudich "natural property" (large + constructive) that the lower-bounded function has and that
`C`-functions lack. Williams' lower bounds are *not natural*: the hard function is a specific
(`NEXP`/`NP`)-complete language pinned by diagonalization, the argument is by contradiction with a uniform
time hierarchy, and there is **no** constructive predicate satisfied by a `1/2^{o(n)}` fraction of functions
in play. My version inherits this: the witness objects are pinned by the hierarchy seed, not drawn from a
large set, and the recursion does not introduce any density/largeness condition. (Indeed the multi-scale
witnesses are an *exponentially sparse* family.) So the natural-proofs barrier does not bite, *and* — this is
the standard escape hatch — even if it did, the existence of strong PRFs in `C` (which would block natural
proofs) is precisely what a separation would refute, so non-naturality is a feature.

**(c) Algebrization — THE HONEST PROBLEM.** ✘ / open. This is where I must be most careful, because it is
the barrier most likely to be fatal.

- Aaronson–Wigderson show algebrizing techniques **cannot** prove `NP ⊄ P/poly` (there are algebraic oracles
  separating the two directions). Williams' ACC0 result is widely regarded as **non-algebrizing for ACC0
  specifically** — but the consensus is *not* that the algorithmic method as a whole evades algebrization for
  *all* classes; rather, that the ACC0 instance squeaks under because ACC0 is weak enough that the
  Beigel–Tarui / Yao normal form (the actual SAT-algorithm engine) is *combinatorial*, not algebraic-oracle
  invariant.
- My attempt targets `C ⊋ ACC0`. The moment `C ⊇ TC0` (or anything that can compute the low-degree
  extension used in the algebrization framework), the padding-stable speedup of Def 3.3 would, if it existed,
  plausibly **algebrize** — and then Aaronson–Wigderson's oracle would forbid the very conclusion `NP ⊄ C`.
  Concretely: clause 2 of Def 3.3 (self-reduction with `C`-glue) lets `C` simulate `A`'s own recursion; if
  `C ⊇ TC0`, that simulation can carry the low-degree-extension oracle, making the whole argument relativize
  *algebraically*. **This is a genuine obstruction to the new idea, not just to the old one.**
- **Partial escape (NOVEL, speculative):** the ONLY route I see to dodge algebrization while still climbing
  above ACC0 is to demand the speedup engine be **non-algebraic** — e.g. a SAT algorithm whose only
  primitive is a *combinatorial* circuit-normalization (à la Beigel–Tarui for ACC0) that provably does **not**
  extend to oracle-augmented low-degree polynomials. For ACC0 this is the multilinear/symmetric-function
  collapse. For a strictly larger class I do **not** know such a combinatorial normal form, and its existence
  is open. So the barrier audit concludes: **the new idea is plausibly non-relativizing and non-natural, but
  I cannot certify it non-algebrizing for any `C ⊋ ACC0`, and there is positive reason to fear it algebrizes
  once `C ⊇ TC0`.**

---

## 6. Self-identified weakest step (ruthless)

**The single weakest step is Step 5/6: the per-rung "glue cost" `f(n_i)`.** I claimed (Step 3) that
witnesses compose across rungs; I then showed (Step 6) that the only composition bound I can actually verify
is *quasi-polynomial per rung*, which compounds to `2^{Θ(N^2)}` total — fatal. The entire attempt lives or
dies on replacing this with *polynomial-per-rung* glue, and:

> **Reduction showing the gap is the whole problem (NOVEL).** "Polynomial-per-rung glue across a
> quasipolynomial scale jump" is logically equivalent to a **scale-free easy-witness lemma**: for all `m`,
> `C`-easy witnesses at scale `m` lift to `C`-easy witnesses at scale `Φ(m)` with `poly(m)` overhead.
> Iterating *that* from the `NP` scale to the `NEXP` scale would give `NEXP`-easy witnesses with only
> `poly` overhead *unconditionally on the scale jump* — which, plugged back into Williams' top-scale
> contradiction, would already yield `NEXP ⊄ C` and (by the very padding of Step 1) `NP ⊄ C`. In other
> words, **the missing lemma is not weaker than the goal; it essentially *is* the goal.** The recursion did
> not reduce the problem; it relocated it into a lemma of equal strength.

This is the honest verdict: the new idea is a **conservation-of-difficulty** phenomenon. It is a genuinely
different *architecture* (multi-scale vs single-scale), and it correctly identifies the obstruction
(per-rung witness-compression overhead), but it does not *reduce* the difficulty — it repackages it.

Secondary weak points, in order:
- **Def 3.3 clause 2** (existence of a padding-stable, internally-`C`-recursive SAT solver) is asserted as a
  hypothesis; no such solver is known for any `C ⊋ ACC0`, and for ACC0 the known solver is single-scale.
- The **scale-tower rung count** `k = O(log* N)` (Def 3.2) is correct for *climbing* the scale, but I
  conflated "number of rungs is tiny" with "total overhead is tiny." The rung count being small does not
  help when per-rung overhead is super-polynomial — this was the seductive error.
- **Algebrization** (§5c): even granting Steps 3–6, I cannot certify non-algebrization for `C ⊇ TC0`.

---

## 7. What would need to be true for this to go through

A precise wish-list, each item flagged with my belief about its plausibility:

1. **(Hard, ≈ equivalent to goal) Scale-free / self-similar easy-witness lemma.** `C`-easy witnesses lift
   across a quasipolynomial scale jump with polynomial overhead. By §6 this alone essentially yields the
   separation. *Belief: as hard as the target; this is the true bottleneck.*

2. **(Open, possibly approachable) A combinatorial Circuit-SAT normal form for a class `C ⊋ ACC0`.**
   The Beigel–Tarui symmetric-function representation makes ACC0-SAT tractable *combinatorially*. A genuine
   advance would be an analogous normal form for, e.g., `ACC0 ∘ THR` of *unbounded* bottom fan-in, or a
   restricted `TC0`. Recent work (Chen–Lyu–Williams on `ACC0 ∘ THR`) is the live frontier; pushing it to a
   true superclass with a *combinatorial* (non-algebraic) engine would also be the cleanest way to dodge
   algebrization (§5c). *Belief: this is the realistic place to push; it is where actual progress lives.*

3. **(Necessary) Non-algebraic speedup engine.** To beat the Aaronson–Wigderson barrier for `C ⊇ TC0`, the
   SAT speedup must rest on a structural property of `C` that does **not** survive low-degree-extension
   oracle augmentation. Identifying such a property for a class above ACC0 is open and may be impossible if
   the class is "too algebraic." *Belief: the binding constraint on which classes are even eligible.*

4. **(Bookkeeping) Padding-stable speedup with controlled per-rung overhead.** Even granting (1)–(3), one
   needs the speedup constant `c` and the glue to be uniform across the tower (Def 3.3). This is the most
   "engineering" requirement and would likely follow if (1)–(3) held.

**Honest closing assessment.** The attempt FAILS to establish Claimed Target T. Its value is threefold:
(i) it pins the reason the algorithmic method starts at `NEXP` to a single quantity — the *per-scale
witness-compression overhead* — and proves (§6) that driving that overhead to polynomial is equivalent to
the separation itself, so the multi-scale architecture is a conservation-of-difficulty restatement, not a
reduction; (ii) it shows the most promising *non-barriered* concrete direction is a **combinatorial
(non-algebraic) SAT normal form for a specific superclass of ACC0** (item 2/3), which is consistent with where
the real research frontier (Chen–Lyu–Williams) actually is; (iii) it gives a clean, falsifiable statement of
what a future "scale-free easy-witness lemma" would have to say. A sharpened dead-end, documented as such.

---

## Adjudication (2026-05-29)

**Ruling: BROKEN.**

**Red-team vote tally:** 3 / 3 BROKEN — Refuter 1 (barrier lens), Refuter 2 (rigor lens),
Refuter 3 (literature lens), all at high confidence. The author concurs in the document's own
text (Status line; §1 "bottom line up front"; §6; §7 closing).

**Where it died.** Step 5/6 of Section 4 — the per-rung "glue cost" `f(n_i)` and its compounded
witness-size product — reinforced by the Section 6 equivalence reduction. The failure is not
merely unproven; it is provably fatal by the author's own arithmetic, which the referees
independently verified. Two coupled, mutually reinforcing failure modes:

1. **Compression-ratio collapse at the NP scale (Section 3 / §2 motivation, Refuter 3).** The
   IKW/Williams easy-witness lever draws all its power from the exponential ratio between witness
   length (`2^n`) and circuit index/input length (`n`) in the NEXP regime, where a poly-size
   circuit is an exponential compression of an exponentially long truth table. At the NP scale the
   witness is only `poly(n)` bits, so a circuit has `O(log n)` inputs and a `poly(n)`-size circuit
   is a full lookup table computing ANY function on its domain. Hence "every witness is easy"
   carries zero information exactly where the argument needs it. The document itself states this
   collapse in §2 ("compressing them into poly-size circuits buys you *nothing*"). With the engine
   vacuous, the second horn of the dichotomy has no content.

2. **Glue-product blow-up + conservation of difficulty (Steps 4–6 / §6, Refuters 1 & 2).** The
   Step 5 contradiction is valid only if `s_top = poly(N)` (the author's own line: "valid iff
   `s_top = poly(N)`"). The only composition bound that actually holds is quasi-polynomial PER
   RUNG, `f(n_i) ≈ n_i^{log n_i}`. The product is dominated by the single top rung, where
   `n_{k-1} ≈ 2^N`, giving `f(n_{k-1}) = (2^N)^{log(2^N)} = 2^{Θ(N^2)}` — doubly exponential,
   catastrophically above `poly(N)`, regardless of how few rungs there are. The load-bearing
   seductive error (which the author explicitly flags in §6) is conflating "few rungs
   (`k = O(log* N)`)" with "small total overhead"; a small rung count cannot rescue
   super-polynomial per-rung overhead, because the product is top-rung-dominated. The only repair —
   polynomial-per-rung glue — is proven in §6 to be logically EQUIVALENT to a scale-free
   easy-witness lemma which, iterated, already yields `NEXP ⊄ C` and hence (by the Step 1 padding)
   the target. The lemma needed to run the argument is therefore of equal strength to the
   conclusion: using it assumes what must be proved.

The recursion manufactures an exponential witness-size BLOW-UP, not the free compression the
central novelty claimed. The multi-scale architecture relocates the difficulty rather than
reducing it; it never closes any gap.

**Barrier.** No classical barrier is the proximate cause — all three refuters report
`barrier=none`. The proximate killer is an internal **conservation-of-difficulty / circularity**:
the helper lemma is provably as hard as the target separation. (Separately, the attempt's own §5c
honestly concedes it cannot certify non-algebrization for any `C ⊇ TC0`, a genuine secondary
obstruction that would bite even if Steps 3–6 went through — but it is not what kills the argument;
the glue-product arithmetic and the §6 equivalence do.)

**Salvageable residue (genuinely useful).**

- A clean, quantified statement of WHY the algorithmic method starts at NEXP and does not naively
  descend to NP: the easy-witness lever is powered entirely by the witness-vs-index length ratio,
  which collapses from exponential (NEXP) to `O(log n)`-input lookup tables (NP). A crisp, reusable
  no-go intuition for any scale-descent attempt.
- The §6 reduction is a worthwhile standalone artifact: it pins down that a scale-free /
  polynomial-per-rung easy-witness lemma is equivalent in strength to the target separation. A
  legitimate conservation-of-difficulty result that future work should cite to avoid re-walking
  this dead-end.
- The explicit `2^{Θ(N^2)}` glue-product computation is a good cautionary lemma for
  recursive-tower constructions generally: super-polynomial per-rung overhead defeats any benefit
  from a small (`log*`) rung count, because the product is top-rung-dominated.
- The §7 redirection — toward a *combinatorial (non-algebraic) Circuit-SAT normal form for a
  specific superclass of ACC0* (e.g. `ACC0 ∘ THR`, à la Chen–Lyu–Williams) — correctly identifies
  where live, non-barriered progress actually is, even though this attempt does not deliver it.

**Honesty note.** The document does not claim a completed proof; it is an explicit, honest negative
report ("sharpened dead-end," "does NOT close"). The BROKEN ruling records that it does not
establish Claimed Target T (let alone P ≠ NP), which the author concedes throughout.

> Referee process note: during adjudication an earlier parallel tool call erroneously overwrote
> this file with a reconstruction placeholder; the original full text was recovered from the
> verbatim read performed at the start of adjudication and has been restored above intact, with
> only this Adjudication section appended. No original content was lost.
