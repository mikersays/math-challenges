export const meta = {
  name: 'p-np-acc-thr-assault',
  description: 'Maximum-rigor multi-round assault on the live ACC0-THR / combinatorial Circuit-SAT lead: diverse attempt teams, per-step barrier audit, 5-vote red-team, adjudication, a repair round on the least-broken attempt, and a brutal honest verdict',
  phases: [
    { title: 'Attempt', detail: '5 independent attempt teams, distinct strategies on the ACC0-THR lead' },
    { title: 'BarrierAudit', detail: 'Dedicated barrier auditor checks each attempt step-by-step' },
    { title: 'RedTeam', detail: '5 adversarial verifiers x each attempt, diverse lenses' },
    { title: 'Adjudicate', detail: 'Neutral referee rules each attempt; pick least-broken' },
    { title: 'Repair', detail: 'Repair team attacks the exact failure point of the least-broken attempt; re-refuted' },
    { title: 'Verdict', detail: 'Brutal honest final verdict' },
  ],
}

const ROOT = '/Users/momo/git/math-challenges/p-np'
const DIR = ROOT + '/attempts/acc-thr-assault'

const HONESTY = `NON-NEGOTIABLE RULES:
- This is a GENUINE research assault, not theater. Never fabricate a proof or dress a hand-wave as a theorem.
- Every step is either [ESTABLISHED: cite] or [NOVEL: unverified]. No "it is easy to see" without a real argument.
- You MUST flag your own weakest step ruthlessly.
- A sharpened, well-documented dead-end is a SUCCESS. A fake success is a CATASTROPHIC FAILURE.
- The relevant context: ${ROOT}/attempts/VERDICT.md (why the prior 4 attempts died), ${ROOT}/attempts/williams-algorithmic-method-scaling.md (the parent method and its conservation-of-difficulty trap), ${ROOT}/SYNTHESIS.md (the three barriers).
- THE LIVE LEAD: Ryan Williams' algorithmic method says a sufficiently-faster-than-brute-force Circuit-SAT (or #SAT / GAP-SAT) algorithm for a circuit class C yields NEXP (or lower) not in C. The frontier the referees flagged as non-circular and non-barriered: push this on C = ACC0 o THR (ACC0 with a layer of threshold/majority gates) using the COMBINATORIAL (non-algebraic, hence non-algebrizing) Circuit-SAT normal form (Chen-Lyu-Williams style: probabilistic-polynomial / correlation-with-low-degree + fast rectangular matrix multiplication, or the "easy witness + win-win" amplification). The known result is NEXP (and quasi-NP via Murray-Williams) not-in ACC0; extending the SAT algorithm to ACC0 o THR / scaling the hard class down is the open edge.`

const ATTEMPT_SCHEMA = {
  type: 'object',
  required: ['strategy', 'file_written', 'claim', 'core_new_idea', 'weakest_step', 'barrier_evasion', 'self_grade'],
  properties: {
    strategy: { type: 'string' },
    file_written: { type: 'string' },
    claim: { type: 'string' },
    core_new_idea: { type: 'string' },
    weakest_step: { type: 'string' },
    barrier_evasion: { type: 'string' },
    self_grade: { type: 'string', enum: ['plausible-progress', 'partial-conditional', 'dead-end'] },
  },
}

const AUDIT_SCHEMA = {
  type: 'object',
  required: ['relativizes', 'naturalizes', 'algebrizes', 'verdict', 'detail'],
  properties: {
    relativizes: { type: 'string', enum: ['yes', 'no', 'unclear'] },
    naturalizes: { type: 'string', enum: ['yes', 'no', 'unclear'] },
    algebrizes: { type: 'string', enum: ['yes', 'no', 'unclear'] },
    verdict: { type: 'string', enum: ['passes-all-three', 'fails-a-barrier', 'inconclusive'] },
    detail: { type: 'string' },
  },
}

const REFUTE_SCHEMA = {
  type: 'object',
  required: ['verdict', 'fatal_flaw', 'flaw_location', 'severity'],
  properties: {
    verdict: { type: 'string', enum: ['BROKEN', 'SURVIVES', 'INCONCLUSIVE'] },
    fatal_flaw: { type: 'string' },
    flaw_location: { type: 'string' },
    severity: { type: 'string', enum: ['fatal', 'serious', 'minor', 'none'] },
  },
}

const ADJ_SCHEMA = {
  type: 'object',
  required: ['strategy', 'final_ruling', 'where_it_died', 'brokenness_score', 'salvageable_residue', 'file_written'],
  properties: {
    strategy: { type: 'string' },
    final_ruling: { type: 'string', enum: ['BROKEN', 'SURVIVES-SCRUTINY', 'INCONCLUSIVE'] },
    where_it_died: { type: 'string' },
    brokenness_score: { type: 'number', description: '0 = airtight survivor, 10 = trivially circular/vacuous. Lower = closer to viable.' },
    salvageable_residue: { type: 'string' },
    file_written: { type: 'string' },
  },
}

const REPAIR_SCHEMA = {
  type: 'object',
  required: ['repaired', 'what_was_tried', 'outcome', 'file_written'],
  properties: {
    repaired: { type: 'boolean' },
    what_was_tried: { type: 'string' },
    outcome: { type: 'string' },
    file_written: { type: 'string' },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['file_written', 'any_survivors', 'best_brokenness_score', 'overall_verdict', 'most_promising_next_step'],
  properties: {
    file_written: { type: 'string' },
    any_survivors: { type: 'boolean' },
    best_brokenness_score: { type: 'number' },
    overall_verdict: { type: 'string' },
    most_promising_next_step: { type: 'string' },
  },
}

// ---------------------------------------------------------------------------
phase('Attempt')
const STRATEGIES = [
  { slug: 'probabilistic-poly-correlation',
    desc: 'Build a faster-than-2^n Circuit-SAT (or GAP-SAT) algorithm for ACC0 o THR via probabilistic polynomials: approximate THR gates by low-degree probabilistic polynomials over a well-chosen ring, compose with the Beigel-Tarui ACC0 SYM+ normal form, and evaluate the resulting sparse polynomial on all inputs via fast rectangular matrix multiplication. Attempt to push the savings below brute force, then invoke Williams NEXP-not-in-C transfer.' },
  { slug: 'easy-witness-winwin',
    desc: 'Use the easy-witness lemma + win-win amplification directly: assume NEXP in ACC0 o THR for contradiction, derive succinct (ACC0 o THR) witnesses, and combine with a nontrivial CircuitSAT algorithm to beat the nondeterministic time hierarchy. Confront head-on the conservation-of-difficulty trap that killed the williams-scaling attempt — show the witness compression is NOT vacuous here.' },
  { slug: 'gap-sat-derandomization',
    desc: 'Target the GAP-UNSAT / #SAT version: a nontrivial algorithm estimating the acceptance probability of an ACC0 o THR circuit faster than trivial, via the Williams-Chen quantified-derandomization / PRG-free counting route, then transfer to a lower bound for NQP (quasi-NP) a la Murray-Williams, and attempt to scale the hard class toward NP.' },
  { slug: 'thr-degree-reduction',
    desc: 'Attack the specific obstacle: THR (threshold) gates resist low-degree probabilistic-polynomial approximation (high voting margin). Propose a NEW combinatorial normal form or a margin/discrepancy-based decomposition of ACC0 o THR that sidesteps the degree blowup, enabling the SAT speedup. Be explicit about whether this collides with known THR lower-bound barriers.' },
  { slug: 'meta-algorithmic-magnification',
    desc: 'Combine the algorithmic method with hardness magnification at the ACC0 o THR boundary: identify a weak (e.g. slightly-superlinear) lower bound for an explicit problem against ACC0 o THR that a magnification theorem amplifies, and supply that weak bound via the CircuitSAT-algorithm route rather than a Fourier/locality route (to evade the CHOPRS locality barrier that killed meta-complexity-magnification).' },
]

const attempts = await parallel(STRATEGIES.map(s => () => agent(
  `You are a world-expert in circuit complexity and the algorithmic method, making a SERIOUS no-holds-barred attempt on the one live P vs NP lead.

Your strategy: "${s.slug}"
${s.desc}

${HONESTY}

Read ${ROOT}/attempts/VERDICT.md and ${ROOT}/attempts/williams-algorithmic-method-scaling.md first.
Then write ${DIR}/${s.slug}.md with sections:
1. Goal & precise claim
2. The core NEW idea vs prior failed attempts (esp. why you avoid the conservation-of-difficulty / locality / vacuous-witness traps that killed earlier rounds)
3. Setup & definitions
4. The attempt: step-by-step, each step [ESTABLISHED: cite] or [NOVEL: unverified]
5. Barrier audit (non-relativizing AND non-natural AND non-algebrizing)
6. Ruthless self-identification of the weakest step
7. What must be true for it to go through; honest self-grade

Push the mathematics as far as you genuinely can. Return the structured fields.`,
  { schema: ATTEMPT_SCHEMA, phase: 'Attempt', label: `attempt:${s.slug.slice(0,18)}` }
)))

const live = attempts.filter(Boolean)
log(`${live.length}/${STRATEGIES.length} attempts drafted`)

// ---------------------------------------------------------------------------
// Barrier audit (flat fan-out) + 5-vote red-team (flat fan-out), all independent
phase('BarrierAudit')
const audits = await parallel(live.map(a => () => agent(
  `You are a dedicated BARRIER AUDITOR. Examine this P vs NP attempt ONLY for the three barriers, step by step.
Attempt file: ${a.file_written}
Author's claimed evasion: "${a.barrier_evasion}"

Rule on each: does the proof technique RELATIVIZE (would it survive adding an arbitrary oracle)? Does it NATURALIZE (does it implicitly define a large + constructive property of truth tables, per Razborov-Rudich)? Does it ALGEBRIZE (does it go through under algebraic oracle extensions, per Aaronson-Wigderson)? A "yes" to any one is FATAL. Be concrete about which step triggers it.
Return the structured audit.`,
  { schema: AUDIT_SCHEMA, phase: 'BarrierAudit', label: `audit:${a.strategy.slice(0,18)}` }
).then(au => ({ slug: a.file_written, strategy: a.strategy, audit: au }))))

phase('RedTeam')
const LENSES = [
  { key: 'barrier', role: 'a barrier-theory skeptic: does it secretly relativize, naturalize, or algebrize? Any one is fatal.' },
  { key: 'rigor', role: 'a rigor skeptic: find the FIRST step asserted but not proven; scrutinize every [NOVEL] step and every implicit "clearly".' },
  { key: 'literature', role: 'a literature skeptic: does the idea contradict a published theorem, repeat a known-failed approach, or silently assume an open conjecture (e.g. an unproven THR lower bound, an unproven CircuitSAT speedup) as if proven?' },
  { key: 'quantitative', role: 'a quantitative skeptic: track the actual exponents/savings/degree blowups. Does the claimed speedup really beat brute force? Does the degree of the probabilistic polynomial actually stay low enough? Do the matrix-multiplication dimensions actually fit? Recompute and find where the numbers fail.' },
  { key: 'circularity', role: 'a circularity skeptic: does the attempt smuggle its conclusion into a hypothesis (the conservation-of-difficulty trap)? Is any "lemma" actually equivalent in strength to the target separation? Is any witness-compression / easy-witness step vacuous at the relevant scale?' },
]
const rtJobs = []
for (const a of live) for (const L of LENSES) rtJobs.push({ a, L })
const rtFlat = await parallel(rtJobs.map(j => () => agent(
  `You are ${j.L.role}
Try to BREAK this P vs NP attempt. Default to skepticism: if a step is not airtight, it is BROKEN. Surviving must be RARE — only SURVIVES if you genuinely cannot find any gap after real effort.
Attempt file: ${j.a.file_written}
Author's stated weakest step: "${j.a.weakest_step}"
Name the single most fatal problem: the exact step/lemma and precisely why it fails. Return the structured verdict.`,
  { schema: REFUTE_SCHEMA, phase: 'RedTeam', label: `refute:${j.a.strategy.slice(0,14)}:${j.L.key}` }
).then(v => ({ strategy: j.a.strategy, file: j.a.file_written, lens: j.L.key, vote: v }))))

const votesBy = {}
for (const r of rtFlat.filter(Boolean)) { (votesBy[r.strategy] ||= []).push(r) }
const auditBy = {}
for (const a of audits.filter(Boolean)) { auditBy[a.strategy] = a.audit }
log(`Red-team: ${rtFlat.filter(Boolean).length}/${rtJobs.length} verdicts; ${audits.filter(Boolean).length} barrier audits`)

// ---------------------------------------------------------------------------
phase('Adjudicate')
const rulings = (await parallel(live.map(a => () => {
  const votes = (votesBy[a.strategy] || [])
  const broken = votes.filter(v => v.vote.verdict === 'BROKEN').length
  const au = auditBy[a.strategy]
  const votesText = votes.map(v => `- [${v.lens}] ${v.vote.verdict} (sev=${v.vote.severity}): ${v.vote.fatal_flaw} @ ${v.vote.flaw_location}`).join('\n')
  const auText = au ? `Barrier audit: relativizes=${au.relativizes}, naturalizes=${au.naturalizes}, algebrizes=${au.algebrizes}, verdict=${au.verdict}. ${au.detail}` : 'Barrier audit: (missing)'
  return agent(
    `You are a NEUTRAL referee adjudicating a P vs NP attempt after independent review.
Strategy: ${a.strategy}
Attempt file: ${a.file_written}
Claim: ${a.claim}
${auText}
Red-team (${broken}/${votes.length} BROKEN):
${votesText}

Read the attempt file and weigh everything fairly. Rule BROKEN / SURVIVES-SCRUTINY / INCONCLUSIVE, and assign a brokenness_score from 0 (airtight) to 10 (trivially circular/vacuous) — be calibrated; this is used to pick the least-broken attempt for a repair round.
Append "## Adjudication (2026-05-30)" to ${a.file_written}: ruling, exact death point, barrier audit result, vote tally, brokenness score, and salvageable residue.
Return the structured fields.`,
    { schema: ADJ_SCHEMA, phase: 'Adjudicate', label: `adjudicate:${a.strategy.slice(0,16)}` }
  )
}))).filter(Boolean)

const ranked = rulings.slice().sort((x, y) => x.brokenness_score - y.brokenness_score)
const best = ranked[0]
const survivors = rulings.filter(r => r.final_ruling === 'SURVIVES-SCRUTINY')
log(`Adjudication done. Least-broken: ${best ? best.strategy + ' (score ' + best.brokenness_score + ')' : 'none'}; survivors: ${survivors.length}`)

// ---------------------------------------------------------------------------
// Repair round: attack the exact failure point of the least-broken attempt, then re-refute
phase('Repair')
let repair = null, repairVerdicts = []
if (best) {
  repair = await agent(
    `You are an elite "fixer" team taking the least-broken P vs NP attempt and trying to REPAIR its exact point of failure. No holds barred, but the honesty rules still bind absolutely.
Least-broken attempt: ${best.strategy}
File: ${best.file_written}
It died at: ${best.where_it_died}
Salvageable residue: ${best.salvageable_residue}

${HONESTY}

Read the attempt file in full. Attempt a concrete fix for the precise failure point — a new lemma, a different normal form, a tighter quantitative bound, whatever genuinely addresses the death cause WITHOUT smuggling in the conclusion. If you cannot repair it, document precisely WHY the failure point is fundamental (this is a valuable result).
Append "## Repair Attempt (2026-05-30)" to ${best.file_written} with: what you tried, whether it worked, and (if not) why the obstruction is fundamental.
Return the structured fields.`,
    { schema: REPAIR_SCHEMA, phase: 'Repair', label: `repair:${best.strategy.slice(0,16)}` }
  )
  if (repair && repair.repaired) {
    // brutal re-refutation of the claimed repair: 5 fresh skeptics
    repairVerdicts = (await parallel(LENSES.map(L => () => agent(
      `You are ${L.role}
A repair was just claimed for a P vs NP attempt. Claimed fix: "${repair.what_was_tried}". Outcome claimed: "${repair.outcome}".
Read ${best.file_written} (especially the Repair Attempt section). Try HARD to break the repair. A claimed P vs NP repair surviving is extraordinary — demand extraordinary evidence. Return the structured verdict.`,
      { schema: REFUTE_SCHEMA, phase: 'Repair', label: `re-refute:${L.key}` }
    ).then(v => ({ lens: L.key, vote: v })))) ).filter(Boolean)
  }
}
const repairBroken = repairVerdicts.filter(v => v.vote.verdict === 'BROKEN').length
log(`Repair: ${repair ? (repair.repaired ? 'repair CLAIMED; re-refute ' + repairBroken + '/' + repairVerdicts.length + ' BROKEN' : 'not repairable (fundamental)') : 'skipped'}`)

// ---------------------------------------------------------------------------
phase('Verdict')
const digest = ranked.map(r =>
  `- ${r.strategy}: ${r.final_ruling}, brokenness=${r.brokenness_score}. Died: ${r.where_it_died}. Residue: ${r.salvageable_residue}`
).join('\n')
const repairLine = repair
  ? `Repair on least-broken (${best.strategy}): ${repair.repaired ? 'claimed repaired, but re-refutation found ' + repairBroken + '/' + repairVerdicts.length + ' BROKEN' : 'NOT repairable — ' + repair.outcome}`
  : 'No repair round (no attempts survived drafting).'
const realSurvivor = repair && repair.repaired && repairBroken === 0

const verdict = await agent(
  `You are the lead coordinator. A maximum-rigor assault was run on the live ACC0 o THR / combinatorial Circuit-SAT lead: 5 diverse attempts, a dedicated barrier audit each, a 5-lens red-team each, neutral adjudication, and a repair round on the least-broken attempt with brutal re-refutation.

Adjudication (ranked least-to-most broken):
${digest}

${repairLine}

Write ${DIR}/VERDICT.md: a brutally honest summary. Per strategy: claim, barrier-audit result, red-team tally, where it died, brokenness score. Then the repair round outcome. Then the bottom line.
${realSurvivor
  ? 'A repair reportedly survived a 5-lens re-refutation. This is EXTRAORDINARY and almost certainly still flawed. Restate exactly what survived, state emphatically that an internal red-team passing is NOT a verified proof of anything, identify the single remaining load-bearing unverified claim, and recommend the most rigorous possible external expert verification before ANY claim is made publicly.'
  : 'No attempt and no repair survived. State plainly: P vs NP remains OPEN and unsolved by this swarm. Do NOT soften this. The value of this round is sharpened, externally-checked dead-ends on the most promising known lead, plus a calibrated map of exactly which sub-obstacle (THR degree blowup / vacuous witnesses / quantitative savings / locality) kills each route.'}
Identify the single most promising concrete next step that remains genuinely live (or state honestly if this round closed the lead off).
Append a dated (2026-05-30) bullet to ${ROOT}/PROGRESS_LOG.md and ensure ${ROOT}/README.md links this assault folder.
Return file_written, any_survivors (boolean), best_brokenness_score (the lowest score seen, post-repair), overall_verdict, most_promising_next_step.`,
  { schema: VERDICT_SCHEMA, phase: 'Verdict', label: 'lead-verdict-assault' }
)

return {
  attempts: live.map(a => ({ strategy: a.strategy, self_grade: a.self_grade, claim: a.claim })),
  ranked: ranked.map(r => ({ strategy: r.strategy, ruling: r.final_ruling, brokenness: r.brokenness_score })),
  least_broken: best ? { strategy: best.strategy, score: best.brokenness_score } : null,
  repair: repair ? { repaired: repair.repaired, re_refute_broken: repairBroken, total: repairVerdicts.length } : null,
  real_survivor: realSurvivor,
  any_survivors: verdict.any_survivors,
  best_brokenness_score: verdict.best_brokenness_score,
  overall_verdict: verdict.overall_verdict,
  next_step: verdict.most_promising_next_step,
}
