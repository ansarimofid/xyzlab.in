import { useState, useMemo } from "react";

/**
 * Organic Revenue Engine
 * Estimates SaaS revenue from SEO organic traffic. Two orthogonal levers:
 *
 *  ACQUISITION MODEL (funnel shape):
 *   Free trial : Visitors -> Trials -> Paying
 *   Freemium   : Visitors -> Free users -> Paying
 *   Sales-led  : Visitors -> Demo/leads -> Closed
 *   Direct buy : Visitors -> Paying (single checkout)
 *
 *  BILLING MODEL (revenue recognition):
 *   Subscription : recurring MRR; churn -> LTV = price / churn; ceiling = MRR / churn
 *   One-time     : single payment (lifetime / license); no churn; revenue = buyers x price
 */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600;700&display=swap');
`;

const C = {
  bg: "#0a0d0b", bgGrad1: "#0c100d", panel: "#11160f", panel2: "#0e1310",
  line: "rgba(196, 240, 79, 0.10)", lineSoft: "rgba(255,255,255,0.07)",
  text: "#edf0e6", mut: "#7e8a78", mut2: "#5b6557",
  lime: "#c4f04f", limeDim: "#8fae3a", amber: "#f0a93f", slate: "#6f86b8", red: "#e8705a",
};

// ---- Acquisition models: reshape the funnel ----
const MODELS = {
  trial: {
    label: "Free trial", desc: "Opt-in free trial that converts to a paid plan.", stages: 2,
    rate1: 2.5, rate2: 20,
    s1Label: "Visitor → trial", s1Verb: "start trial", s1Bench: "Trial signup ~2–5% of visitors",
    s2Label: "Trial → paid", s2Verb: "convert", s2Bench: "Free trial ~15–25% convert to paid",
    mid: "Trials", midSub: "free trials started", arpu: 50, churn: 5,
  },
  freemium: {
    label: "Freemium", desc: "Free plan forever; upsell a share of free users to paid (PLG).", stages: 2,
    rate1: 6, rate2: 4,
    s1Label: "Visitor → free signup", s1Verb: "sign up", s1Bench: "Free signup ~4–8% (low friction)",
    s2Label: "Free → paid", s2Verb: "upgrade", s2Bench: "Free→paid ~2–5% (broad freemium)",
    mid: "Free users", midSub: "free accounts created", arpu: 25, churn: 4,
  },
  sales: {
    label: "Sales-led", desc: "Demo request → sales cycle → closed-won deal.", stages: 2,
    rate1: 1.5, rate2: 20,
    s1Label: "Visitor → demo / lead", s1Verb: "request demo", s1Bench: "Demo/lead capture ~1–3%",
    s2Label: "Lead → customer", s2Verb: "close", s2Bench: "Full-funnel lead→won ~15–25%",
    mid: "Leads", midSub: "demo requests / MQLs", arpu: 2000, churn: 1.5,
    econHint: "Subscription enterprise deals are usually annual — enter the monthly equivalent (ACV ÷ 12). Excludes sales-cycle time-to-revenue.",
  },
  direct: {
    label: "Direct buy", desc: "Self-serve checkout — no trial step, one conversion.", stages: 1,
    rate1: 1.5, rate2: 100,
    s1Label: "Visitor → purchase", s1Verb: "buy", s1Bench: "Direct self-serve checkout ~1–3%",
    arpu: 30, churn: 6,
  },
};

// ---- Billing models: how revenue is recognised ----
const BILLING = {
  sub:  { label: "Subscription", desc: "Recurring revenue — churn and lifetime value apply." },
  once: { label: "One-time", desc: "Single payment (lifetime / license) — no churn, no compounding.",
          hint: "Lifetime/LTD prices usually exceed a monthly plan — pick a higher point." },
};

const BIZ_PRESETS = {
  prosumer: { label: "Prosumer", arpu: 15, churn: 7 },
  smb: { label: "SMB", arpu: 50, churn: 5 },
  mid: { label: "Mid-market", arpu: 350, churn: 2.5 },
  ent: { label: "Enterprise", arpu: 2000, churn: 1 },
};

// ---- formatting ----
const nfInt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = (v) => (!isFinite(v) ? "∞" : "$" + nfInt.format(Math.round(v)));
const moneyCompact = (v) => {
  if (!isFinite(v)) return "∞";
  const a = Math.abs(v);
  if (a >= 1e6) return "$" + (v / 1e6).toFixed(a >= 1e7 ? 0 : 1) + "M";
  if (a >= 1e3) return "$" + (v / 1e3).toFixed(a >= 1e4 ? 0 : 1) + "K";
  return "$" + Math.round(v);
};
const perVisitor = (v) => (!isFinite(v) ? "∞" : "$" + v.toFixed(v >= 100 ? 0 : 2));
const cust = (v) => (v >= 100 ? nfInt.format(Math.round(v)) : v >= 10 ? v.toFixed(0) : v.toFixed(1));

// log mapping for the traffic slider (100 .. 2,000,000)
const T_MIN = 2, T_MAX = 6.301;
const sliderToTraffic = (t) => Math.round(Math.pow(10, T_MIN + (t / 1000) * (T_MAX - T_MIN)));
const trafficToSlider = (v) => {
  const c = Math.min(Math.max(v, 100), 2_000_000);
  return ((Math.log10(c) - T_MIN) / (T_MAX - T_MIN)) * 1000;
};

export default function SaaSRevenueEstimator() {
  const [traffic, setTraffic] = useState(15000);
  const [model, setModel] = useState("trial");
  const [billing, setBilling] = useState("sub");
  const [rate1, setRate1] = useState(2.5);
  const [rate2, setRate2] = useState(20);
  const [arpu, setArpu] = useState(50);
  const [churn, setChurn] = useState(5);
  const [bPreset, setBPreset] = useState("smb");
  const [horizon, setHorizon] = useState(1); // projection years: 1 | 2 | 5
  const [showMethod, setShowMethod] = useState(false);

  const m = MODELS[model];

  const applyModel = (k) => {
    const p = MODELS[k];
    setModel(k); setRate1(p.rate1); setRate2(p.rate2); setArpu(p.arpu); setChurn(p.churn); setBPreset("custom");
  };
  const applyBiz = (k) => {
    const p = BIZ_PRESETS[k];
    setBPreset(k); setArpu(p.arpu); setChurn(p.churn);
  };

  const r = useMemo(() => {
    const M = MODELS[model];
    const twoStage = M.stages === 2;
    const recurring = billing === "sub";

    const firstStage = traffic * (rate1 / 100);
    const customers = twoStage ? firstStage * (rate2 / 100) : firstStage;
    const signups = twoStage ? firstStage : null;

    const monthlyRev = customers * arpu;     // sub: new MRR added | once: monthly bookings
    const annual = monthlyRev * 12;

    // subscription-only
    const lifeMo = churn > 0 ? 100 / churn : Infinity;
    const ltv = churn > 0 ? arpu / (churn / 100) : Infinity;
    const cohortLTV = customers * ltv;
    const steady = churn > 0 ? monthlyRev / (churn / 100) : Infinity;

    // one-time-only
    const revPerVisitor = traffic > 0 ? monthlyRev / traffic : 0;
    const annualCustomers = customers * 12;

    // projection over the selected horizon
    const months = horizon * 12;
    const build = [];
    if (recurring) {
      let mrr = 0;
      for (let i = 1; i <= months; i++) { mrr = mrr * (1 - churn / 100) + monthlyRev; build.push(mrr); }
    } else {
      for (let i = 1; i <= months; i++) build.push(monthlyRev * i); // cumulative, linear (no churn)
    }
    const peak = recurring ? Math.max(...build, isFinite(steady) ? steady : 0, 1) : Math.max(build[build.length - 1], 1);

    return { recurring, twoStage, signups, customers, monthlyRev, annual, lifeMo, ltv, cohortLTV, steady, revPerVisitor, annualCustomers, build, peak, months };
  }, [traffic, rate1, rate2, arpu, churn, model, billing, horizon]);

  const priceChips = billing === "sub" ? [15, 50, 99, 350, 2000] : [49, 99, 199, 499, 999];

  const wrap = {
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif", color: C.text,
    background: `radial-gradient(120% 80% at 12% -10%, ${C.bgGrad1} 0%, ${C.bg} 55%)`,
    minHeight: "100%", padding: "clamp(18px, 3.5vw, 40px)", boxSizing: "border-box",
    position: "relative", overflow: "hidden",
  };

  return (
    <div style={wrap}>
      <style>{FONT_IMPORT + STATIC_CSS}</style>
      <div className="ore-grain" />
      <div className="ore-glow" />

      <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto" }}>
        {/* ---------- HEADER ---------- */}
        <header className="ore-fade" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: C.lime, boxShadow: `0 0 12px ${C.lime}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.28em", color: C.limeDim, fontWeight: 600 }}>SEO → REVENUE</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(30px, 5.2vw, 52px)", lineHeight: 0.98, letterSpacing: "-0.015em" }}>
              Organic Revenue<br /><span style={{ fontStyle: "italic", color: C.lime, fontWeight: 500 }}>Engine</span>
            </h1>
          </div>
          <p style={{ margin: 0, maxWidth: 330, color: C.mut, fontSize: 13.5, lineHeight: 1.5, paddingBottom: 6 }}>
            Translate monthly organic search traffic into expected revenue — matched to your go-to-market motion, billing model, and unit economics.
          </p>
        </header>

        <div className="ore-cols">
          {/* ================= LEFT: INPUTS ================= */}
          <section className="ore-panel ore-fade" style={{ animationDelay: ".05s" }}>
            <SectionTitle n="01" label="Organic traffic" hint="Monthly visitors" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "4px 0 2px" }}>
              <input className="ore-bignum" value={traffic} inputMode="numeric"
                onChange={(e) => setTraffic(Math.min(parseInt(e.target.value.replace(/[^0-9]/g, "") || "0", 10), 5_000_000))} />
              <span style={{ color: C.mut, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>visits / mo</span>
            </div>
            <input className="ore-range ore-range--slate" type="range" min="0" max="1000" step="1"
              value={trafficToSlider(traffic)} onChange={(e) => setTraffic(sliderToTraffic(+e.target.value))} />
            <div className="ore-chiprow">
              {[1000, 10000, 50000, 100000, 500000].map((v) => (
                <button key={v} className={"ore-chip" + (traffic === v ? " on" : "")} onClick={() => setTraffic(v)}>{moneyCompact(v).replace("$", "")}</button>
              ))}
            </div>

            <Divider />

            {/* ---- ACQUISITION MODEL ---- */}
            <SectionTitle n="02" label="Acquisition model" hint="Go-to-market" />
            <Segmented items={MODELS} active={model} onPick={applyModel} />
            <p className="ore-note">{m.desc}</p>

            <Divider />

            {/* ---- FUNNEL ---- */}
            <SectionTitle n="03" label="Conversion funnel" hint={m.stages === 2 ? "two-step" : "one-step"} />
            <Slider label={m.s1Label} value={rate1} unit="%" min={0.1} max={12} step={0.1} accent={C.amber} onChange={setRate1} bench={m.s1Bench} />
            {m.stages === 2 && (
              <Slider label={m.s2Label} value={rate2} unit="%" min={1} max={50} step={0.5} accent={C.amber} onChange={setRate2} bench={m.s2Bench} />
            )}

            <Divider />

            {/* ---- PRICING & ECONOMICS ---- */}
            <SectionTitle n="04" label="Pricing & economics" hint={r.recurring ? "recurring" : "one-time"} />
            <Segmented items={BILLING} active={billing} onPick={setBilling} compact />
            <p className="ore-note">{BILLING[billing].desc}</p>

            {r.recurring && (
              <div style={{ marginTop: 16 }}>
                <Segmented items={BIZ_PRESETS} active={bPreset} onPick={applyBiz} compact />
              </div>
            )}

            <div style={{ margin: "16px 0 2px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label className="ore-lbl">{r.recurring ? "Avg revenue / account · mo" : "One-time price / sale"}</label>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: C.mut, fontFamily: "'JetBrains Mono', monospace", fontSize: 15 }}>$</span>
                <input className="ore-num" value={arpu} inputMode="numeric"
                  onChange={(e) => { setArpu(Math.min(parseInt(e.target.value.replace(/[^0-9]/g, "") || "0", 10), 500000)); setBPreset("custom"); }} />
              </div>
            </div>
            <div className="ore-chiprow">
              {priceChips.map((v) => (
                <button key={v} className={"ore-chip" + (arpu === v ? " on" : "")} onClick={() => { setArpu(v); setBPreset("custom"); }}>${v}</button>
              ))}
            </div>
            {!r.recurring && <p className="ore-note" style={{ fontStyle: "normal", color: C.mut2 }}>{BILLING.once.hint}</p>}

            {r.recurring ? (
              <Slider label="Monthly churn" value={churn} unit="%" min={0.5} max={50} step={0.5} accent={C.red}
                onChange={(v) => { setChurn(v); setBPreset("custom"); }}
                bench={`enterprise ~1–2% · SMB ~3–7% · self-serve / pilots 15–40%+ · lifetime ≈ ${isFinite(r.lifeMo) ? r.lifeMo.toFixed(0) : "∞"} mo`} />
            ) : (
              <div className="ore-nochurn">Single payment — churn doesn’t apply. Revenue is recognised once per buyer.</div>
            )}

            {r.recurring && m.econHint && <p className="ore-note" style={{ fontStyle: "normal", color: C.mut2 }}>{m.econHint}</p>}
          </section>

          {/* ================= RIGHT: RESULTS ================= */}
          <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* headline */}
            <div className="ore-panel ore-hero ore-fade" style={{ animationDelay: ".1s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
                <div>
                  <div className="ore-kicker">{r.recurring ? "Estimated new MRR" : "Estimated revenue"} · {m.label}</div>
                  <div className="ore-hero-num">{money(r.monthlyRev)}<span className="ore-hero-suf">/mo</span></div>
                  <div style={{ color: C.mut, fontSize: 13, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                    {r.recurring ? `${money(r.annual)} new ARR run-rate` : `${perVisitor(r.revPerVisitor)} per visitor`}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="ore-kicker">{r.recurring ? "Steady-state MRR ceiling" : "Annual revenue"}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: C.text }}>
                    {money(r.recurring ? r.steady : r.annual)}
                  </div>
                  <div style={{ color: C.mut2, fontSize: 11.5, marginTop: 3, maxWidth: 180 }}>
                    {r.recurring ? "if acquisition holds at this rate" : "at steady traffic"}
                  </div>
                </div>
              </div>
            </div>

            {/* stat grid */}
            <div className="ore-stats ore-fade" style={{ animationDelay: ".15s" }}>
              <Stat label={r.recurring ? "New customers" : "New buyers"} value={cust(r.customers)} suffix="/mo" tint={C.lime} />
              <Stat label={r.recurring ? "LTV / customer" : "Revenue / sale"} value={money(r.recurring ? r.ltv : arpu)} tint={C.lime} />
              {r.recurring
                ? <Stat label="Cohort value (LTV)" value={moneyCompact(r.cohortLTV)} sub="one month of traffic" tint={C.amber} />
                : <Stat label="Annual buyers" value={cust(r.annualCustomers)} suffix="/yr" sub="12 monthly cohorts" tint={C.amber} />}
              {m.stages === 2
                ? <Stat label={"New " + m.mid.toLowerCase()} value={cust(r.signups)} suffix="/mo" tint={C.slate} />
                : <Stat label="Visitor → buy" value={rate1 + "%"} sub="single conversion" tint={C.slate} />}
            </div>

            {/* funnel */}
            <div className="ore-panel ore-fade" style={{ animationDelay: ".2s" }}>
              <SectionTitle n="" label="Conversion cascade" hint="per month" plain />
              <FunnelRow color={C.slate} label="Visitors" value={nfInt.format(Math.round(traffic))} sub="organic traffic" frac={1} />
              <Step pct={rate1} verb={m.s1Verb} />
              {m.stages === 2 && <>
                <FunnelRow color={C.amber} label={m.mid} value={cust(r.signups)} sub={m.midSub} frac={r.signups / traffic} />
                <Step pct={rate2} verb={m.s2Verb} />
              </>}
              <FunnelRow color={C.lime} label={r.recurring ? "Paying customers" : "Buyers"} value={cust(r.customers)}
                sub={r.recurring ? `@ ${money(arpu)}/mo each` : `@ ${money(arpu)} once`} frac={r.customers / traffic} last />
            </div>

            {/* projection over selectable horizon */}
            <div className="ore-panel ore-fade" style={{ animationDelay: ".25s" }}>
              <div className="ore-build-head">
                <div>
                  <div className="ore-build-title">{horizon}-year {r.recurring ? "MRR build" : "cumulative revenue"}</div>
                  <div className="ore-build-sub">
                    <span style={{ color: C.lime, fontWeight: 700 }}>{money(r.build[r.build.length - 1])}</span>
                    {" · "}{r.recurring ? `MRR at year ${horizon}` : `revenue over ${horizon}y`}
                  </div>
                </div>
                <div className="ore-htoggle">
                  {[1, 2, 5].map((y) => (
                    <button key={y} className={horizon === y ? "on" : ""} onClick={() => setHorizon(y)}>{y}Y</button>
                  ))}
                </div>
              </div>
              <BuildChart data={r.build} peak={r.peak} steady={r.recurring ? r.steady : NaN} />
            </div>

            {/* methodology */}
            <div className="ore-panel ore-fade" style={{ animationDelay: ".3s", padding: "16px 20px" }}>
              <button className="ore-method-btn" onClick={() => setShowMethod((s) => !s)}>
                <span>Methodology &amp; benchmarks</span>
                <span style={{ transform: showMethod ? "rotate(45deg)" : "none", transition: "transform .2s", color: C.limeDim, fontSize: 18, lineHeight: 1 }}>+</span>
              </button>
              {showMethod && (
                <div className="ore-method">
                  <p>The acquisition model sets the funnel shape:</p>
                  <code>trial / freemium / sales → 2 steps</code>
                  <code>direct buy → 1 step (checkout)</code>
                  <code>customers = traffic × step₁% [× step₂%]</code>
                  <p style={{ margin: "10px 0 4px" }}>The billing model sets how revenue is recognised:</p>
                  <code>subscription → MRR; LTV = price ÷ churn; ceiling = MRR ÷ churn</code>
                  <code>one-time → revenue = buyers × price (no churn, flat per month)</code>
                  <p style={{ marginTop: 12 }}>Defaults reflect commonly cited SaaS ranges: trial signup ~2–5% with ~15–25% trial→paid; freemium signup ~4–8% with ~2–5% free→paid; demo/lead capture ~1–3% with ~15–25% lead→won; direct checkout ~1–3%. Churn ~1–2% (enterprise) to ~3–7% (SMB), and 15–40%+ for low-commitment consumer, self-serve, or pilot/POC products. For one-time billing the projection is cumulative revenue from steady traffic, not a churn-adjusted build. Replace any default with your own analytics; estimates exclude seasonality, time-to-rank, sales-cycle lag, repeat purchases, and expansion revenue.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer style={{ marginTop: 22, textAlign: "center", color: C.mut2, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
          Directional estimate · not financial advice · calibrate with your own funnel data
        </footer>
      </div>
    </div>
  );
}

/* ----------------- subcomponents ----------------- */
function SectionTitle({ n, label, hint, plain }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: plain ? 12 : 14 }}>
      {n ? <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.limeDim, fontWeight: 700 }}>{n}</span> : null}
      <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{label}</span>
      {hint ? <span style={{ marginLeft: "auto", fontSize: 11, color: C.mut2, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{hint}</span> : null}
    </div>
  );
}
function Divider() { return <div style={{ height: 1, background: C.lineSoft, margin: "22px 0" }} />; }
function Segmented({ items, active, onPick, compact }) {
  return (
    <div className="ore-seg" style={{ gridTemplateColumns: `repeat(${Object.keys(items).length}, 1fr)` }}>
      {Object.entries(items).map(([k, v]) => (
        <button key={k} className={"ore-seg-btn" + (active === k ? " on" : "")} onClick={() => onPick(k)} style={{ fontSize: compact ? 12 : 12.5 }}>{v.label}</button>
      ))}
    </div>
  );
}
function Slider({ label, value, unit, min, max, step, onChange, accent, bench }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label className="ore-lbl">{label}</label>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: accent }}>{value}{unit}</span>
      </div>
      <input className="ore-range" type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} style={{ "--p": pct + "%", "--acc": accent }} />
      {bench ? <div className="ore-bench">{bench}</div> : null}
    </div>
  );
}
function Stat({ label, value, suffix, sub, tint }) {
  return (
    <div className="ore-stat">
      <div className="ore-stat-lbl">{label}</div>
      <div className="ore-stat-val" style={{ color: tint }}>
        {value}{suffix ? <span style={{ fontSize: "0.5em", color: C.mut, marginLeft: 3 }}>{suffix}</span> : null}
      </div>
      {sub ? <div style={{ color: C.mut2, fontSize: 10.5, marginTop: 2 }}>{sub}</div> : null}
    </div>
  );
}
function FunnelRow({ color, label, value, sub, frac, last }) {
  const w = Math.max(frac * 100, 1.5);
  return (
    <div style={{ marginBottom: last ? 0 : 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: C.text, fontWeight: 500 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
          {label}<span style={{ color: C.mut2, fontSize: 11.5, fontWeight: 400 }}>{sub}</span>
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color }}>{value}</span>
      </div>
      <div className="ore-bar"><div className="ore-bar-fill" style={{ width: w + "%", background: color, boxShadow: `0 0 16px ${color}55` }} /></div>
    </div>
  );
}
function Step({ pct, verb }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "2px 0 8px 4px" }}>
      <svg width="10" height="14" viewBox="0 0 10 14"><path d="M5 0 V11 M1 7 L5 12 L9 7" stroke={C.mut2} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.mut }}>{pct}% {verb || "convert"}</span>
    </div>
  );
}
function BuildChart({ data, peak, steady }) {
  const W = 480, H = 130, pad = 6;
  const n = data.length;
  const gap = n <= 12 ? 5 : n <= 24 ? 3 : 1.6;
  const bw = (W - pad * 2 - gap * (n - 1)) / n;
  const rx = bw < 5 ? 1 : 2.5;
  const steadyY = isFinite(steady) ? H - (steady / peak) * (H - 14) : -10;
  const labelAt = (i) => {
    const mo = i + 1;
    if (i === 0) return "M1";
    if (mo % 12 === 0) return mo / 12 + "y";
    if (n <= 12 && mo === 6) return "M6";
    return "";
  };
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {isFinite(steady) && steadyY > 0 && (
        <g>
          <line x1={pad} y1={steadyY} x2={W - pad} y2={steadyY} stroke={C.limeDim} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
          <text x={W - pad} y={steadyY - 5} textAnchor="end" fontSize="9.5" fill={C.limeDim} fontFamily="'JetBrains Mono', monospace">ceiling</text>
        </g>
      )}
      {data.map((v, i) => {
        const h = Math.max((v / peak) * (H - 14), 2);
        const x = pad + i * (bw + gap);
        const isLast = i === n - 1;
        return (
          <g key={i}>
            <rect x={x} y={H - h} width={bw} height={h} rx={rx} fill={isLast ? C.lime : "url(#ore-bg)"} opacity={isLast ? 1 : 0.85} style={{ transition: "height .25s ease, y .25s ease" }} />
            {labelAt(i) ? <text x={x + bw / 2} y={H + 13} textAnchor="middle" fontSize="9" fill={C.mut2} fontFamily="'JetBrains Mono', monospace">{labelAt(i)}</text> : null}
          </g>
        );
      })}
      <defs>
        <linearGradient id="ore-bg" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={C.limeDim} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.lime} stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ----------------- static css ----------------- */
const STATIC_CSS = `
.ore-grain{position:absolute;inset:0;pointer-events:none;opacity:0.5;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");}
.ore-glow{position:absolute;top:-180px;right:-120px;width:520px;height:520px;pointer-events:none;
  background:radial-gradient(circle, rgba(196,240,79,0.10) 0%, transparent 65%);}
.ore-cols{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);gap:16px;align-items:start;}
@media(max-width:880px){.ore-cols{grid-template-columns:1fr;}}
.ore-panel{background:linear-gradient(180deg, ${C.panel} 0%, ${C.panel2} 100%);border:1px solid ${C.lineSoft};border-radius:16px;padding:22px 22px;}
.ore-hero{background:radial-gradient(120% 140% at 0% 0%, rgba(196,240,79,0.09) 0%, transparent 50%),linear-gradient(180deg, ${C.panel} 0%, ${C.panel2} 100%);border:1px solid ${C.line};}
.ore-kicker{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:${C.mut};margin-bottom:7px;}
.ore-hero-num{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:clamp(38px,7vw,62px);line-height:0.95;color:${C.lime};letter-spacing:-0.02em;}
.ore-hero-suf{font-size:0.34em;color:${C.mut};margin-left:6px;font-weight:600;}
.ore-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
@media(max-width:620px){.ore-stats{grid-template-columns:repeat(2,1fr);}}
.ore-stat{background:linear-gradient(180deg, ${C.panel} 0%, ${C.panel2} 100%);border:1px solid ${C.lineSoft};border-radius:12px;padding:14px 14px 13px;}
.ore-stat-lbl{font-size:11px;color:${C.mut};margin-bottom:8px;line-height:1.2;}
.ore-stat-val{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:clamp(18px,2.6vw,24px);letter-spacing:-0.01em;}
.ore-lbl{font-size:13px;color:${C.text};font-weight:500;}
.ore-note{font-size:11.5px;color:${C.mut};margin:9px 0 2px;font-style:italic;line-height:1.45;}
.ore-nochurn{font-size:12px;color:${C.mut};background:rgba(255,255,255,0.025);border:1px dashed ${C.lineSoft};border-radius:9px;padding:11px 13px;margin-top:16px;line-height:1.45;}
.ore-build-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.ore-build-title{font-family:'Fraunces',serif;font-size:18px;font-weight:600;letter-spacing:-0.01em;}
.ore-build-sub{font-family:'JetBrains Mono',monospace;font-size:12px;color:${C.mut};margin-top:4px;}
.ore-htoggle{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid ${C.lineSoft};border-radius:9px;padding:4px;flex:none;}
.ore-htoggle button{background:none;border:none;color:${C.mut};font-family:'JetBrains Mono',monospace;font-weight:700;font-size:11.5px;padding:5px 11px;border-radius:6px;cursor:pointer;transition:all .15s;}
.ore-htoggle button:hover{color:${C.text};}
.ore-htoggle button.on{background:rgba(196,240,79,0.14);color:${C.lime};box-shadow:inset 0 0 0 1px ${C.line};}
.ore-bench{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:${C.mut2};margin-top:7px;letter-spacing:0.01em;}
.ore-bignum{background:none;border:none;outline:none;color:${C.text};font-family:'JetBrains Mono',monospace;font-weight:700;font-size:clamp(30px,5vw,42px);width:auto;max-width:min(60vw,240px);letter-spacing:-0.02em;padding:0;border-bottom:1.5px solid transparent;}
.ore-bignum:focus{border-bottom-color:${C.limeDim};}
.ore-num{background:none;border:none;border-bottom:1.5px solid ${C.lineSoft};outline:none;color:${C.text};font-family:'JetBrains Mono',monospace;font-weight:700;font-size:16px;width:80px;text-align:right;padding:2px 0;}
.ore-num:focus{border-bottom-color:${C.limeDim};}
.ore-chiprow{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;}
.ore-chip{background:rgba(255,255,255,0.03);border:1px solid ${C.lineSoft};color:${C.mut};font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:600;padding:5px 10px;border-radius:7px;cursor:pointer;transition:all .15s;}
.ore-chip:hover{color:${C.text};border-color:${C.limeDim};}
.ore-chip.on{background:rgba(196,240,79,0.12);border-color:${C.lime};color:${C.lime};}
.ore-seg{display:grid;gap:5px;background:rgba(0,0,0,0.25);border:1px solid ${C.lineSoft};border-radius:11px;padding:5px;}
.ore-seg-btn{background:none;border:none;color:${C.mut};font-family:inherit;font-weight:500;padding:9px 6px;border-radius:8px;cursor:pointer;transition:all .15s;line-height:1.15;}
.ore-seg-btn:hover{color:${C.text};}
.ore-seg-btn.on{background:linear-gradient(180deg, rgba(196,240,79,0.16), rgba(196,240,79,0.06));color:${C.lime};box-shadow:inset 0 0 0 1px ${C.line};}
.ore-bar{height:9px;background:rgba(255,255,255,0.045);border-radius:6px;overflow:hidden;}
.ore-bar-fill{height:100%;border-radius:6px;transition:width .4s cubic-bezier(.2,.7,.2,1);min-width:3px;}
.ore-method-btn{width:100%;background:none;border:none;color:${C.text};font-family:'Fraunces',serif;font-size:15px;font-weight:600;display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:0;}
.ore-method{margin-top:14px;color:${C.mut};font-size:12.5px;line-height:1.6;}
.ore-method p{margin:0 0 4px;}
.ore-method code{display:block;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:${C.limeDim};background:rgba(0,0,0,0.3);border:1px solid ${C.lineSoft};border-radius:6px;padding:6px 10px;margin:5px 0;}
.ore-range{-webkit-appearance:none;appearance:none;width:100%;height:5px;border-radius:6px;margin:13px 0 2px;background:linear-gradient(90deg, var(--acc,${C.lime}) 0%, var(--acc,${C.lime}) var(--p,50%), rgba(255,255,255,0.09) var(--p,50%), rgba(255,255,255,0.09) 100%);cursor:pointer;outline:none;}
.ore-range--slate{background:linear-gradient(90deg, ${C.slate} 0%, ${C.slate} var(--p,50%), rgba(255,255,255,0.09) var(--p,50%));}
.ore-range::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:#fff;border:3px solid var(--acc,${C.lime});box-shadow:0 2px 8px rgba(0,0,0,0.5);cursor:pointer;transition:transform .12s;}
.ore-range::-webkit-slider-thumb:hover{transform:scale(1.15);}
.ore-range--slate::-webkit-slider-thumb{border-color:${C.slate};}
.ore-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;border:3px solid var(--acc,${C.lime});cursor:pointer;}
@keyframes ore-up{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.ore-fade{animation:ore-up .55s cubic-bezier(.2,.7,.2,1) both;}
*{box-sizing:border-box;}
input[type=number]::-webkit-inner-spin-button{display:none;}
`;
