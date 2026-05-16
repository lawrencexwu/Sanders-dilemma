import "./style.css";
import { content, SLIDE_COUNT } from "./content.js";
import { createScene } from "./three-scene.js";

const state = {
  lang: "en",
  index: 0,
  notes: false,
};

const app = document.getElementById("app");
const canvas = document.getElementById("bg-canvas");
const scene = createScene(canvas);

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------- Slide body renderers ---------- */

function slideHero(s, ui) {
  const wrap = el("div", "slide-inner hero");
  wrap.appendChild(el("p", "kicker", ui.brand));
  wrap.appendChild(el("h1", "hero-title", s.title));
  wrap.appendChild(el("p", "hero-sub", s.subtitle));
  wrap.appendChild(el("p", "hero-framing", s.framing));
  const tags = el("div", "node-tags");
  s.nodes.forEach((n, i) =>
    tags.appendChild(el("span", "node-tag" + (i >= 2 ? " node-tag--good" : ""), n))
  );
  wrap.appendChild(tags);
  const btn = el("button", "btn btn--primary", ui.start);
  btn.addEventListener("click", () => go(1));
  wrap.appendChild(btn);
  return wrap;
}

function proHeader(s) {
  const h = el("div", "slide-head");
  if (s.tag) h.appendChild(el("span", "proact-tag", s.tag));
  h.appendChild(el("h2", "slide-title", s.heading));
  return h;
}

function slideProblem(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  const grid = el("div", "two-col");
  const c1 = el("div", "card card--warn");
  c1.appendChild(el("p", "card-label", s.wrongLabel));
  c1.appendChild(el("p", "card-text", s.wrong));
  const c2 = el("div", "card card--good");
  c2.appendChild(el("p", "card-label", s.betterLabel));
  c2.appendChild(el("p", "card-text", s.better));
  grid.append(c1, c2);
  w.appendChild(grid);
  const ins = el("div", "insight");
  ins.appendChild(el("span", "insight-label", s.insightLabel));
  ins.appendChild(el("p", null, s.insight));
  w.appendChild(ins);
  const frames = el("div", "frame-row");
  const bad = el("div", "frame frame--bad");
  bad.appendChild(el("span", "frame-tag", s.badFrameLabel));
  bad.appendChild(el("strong", null, s.badFrame));
  const good = el("div", "frame frame--good");
  good.appendChild(el("span", "frame-tag", s.goodFrameLabel));
  good.appendChild(el("strong", null, s.goodFrame));
  frames.append(bad, good);
  w.appendChild(frames);
  if (s.principle) {
    const pr = el("div", "principle");
    pr.appendChild(el("span", "principle-label", s.principleLabel));
    pr.appendChild(el("p", null, s.principle));
    w.appendChild(pr);
  }
  return w;
}

function slideObjectives(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  const ladder = el("ol", "ladder");
  s.items.forEach((it, i) => {
    const li = el("li", "ladder-item");
    li.appendChild(el("span", "ladder-rank", String(i + 1)));
    li.appendChild(el("span", null, it));
    ladder.appendChild(li);
  });
  w.appendChild(ladder);
  w.appendChild(el("p", "key-line", s.keyLine));
  return w;
}

function slideAlternatives(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  const grid = el("div", "option-grid");
  s.options.forEach((o) => {
    const card = el("div", "option-card" + (o.k === "E" ? " option-card--best" : ""));
    card.appendChild(el("span", "option-key", o.k));
    card.appendChild(el("span", "option-text", o.t));
    grid.appendChild(card);
  });
  w.appendChild(grid);
  w.appendChild(el("p", "key-line", s.keyLine));
  return w;
}

function slideConsequences(s) {
  const w = el("div", "slide-inner slide-inner--wide");
  w.appendChild(proHeader(s));
  const scroll = el("div", "table-scroll");
  const t = el("table", "matrix");
  const thead = el("thead");
  const tr = el("tr");
  s.columns.forEach((c) => tr.appendChild(el("th", null, c)));
  thead.appendChild(tr);
  t.appendChild(thead);
  const tb = el("tbody");
  s.rows.forEach((row, ri) => {
    const r = el("tr", ri === s.highlightRow ? "row-highlight" : null);
    row.forEach((cell, ci) =>
      r.appendChild(el(ci === 0 ? "th" : "td", ci === 0 ? "row-head" : null, cell))
    );
    tb.appendChild(r);
  });
  t.appendChild(tb);
  scroll.appendChild(t);
  w.appendChild(scroll);
  return w;
}

function slideTradeoffs(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  const grid = el("div", "tradeoff-grid");
  s.items.forEach((it) => {
    const c = el("div", "tradeoff");
    const scale = el("div", "scale");
    scale.appendChild(el("span", "scale-side", it.a));
    scale.appendChild(el("span", "scale-vs", "vs"));
    scale.appendChild(el("span", "scale-side", it.b));
    c.appendChild(scale);
    const rule = el("p", "tradeoff-rule");
    rule.appendChild(el("span", "rule-label", s.ruleLabel));
    rule.appendChild(document.createTextNode(it.rule));
    c.appendChild(rule);
    grid.appendChild(c);
  });
  w.appendChild(grid);
  return w;
}

function slideRecommended(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  w.appendChild(el("p", "lead", s.main));
  const tl = el("ol", "timeline");
  s.steps.forEach((st, i) => {
    const li = el("li", "tl-step");
    li.appendChild(el("span", "tl-dot", String(i + 1)));
    li.appendChild(el("span", "tl-text", st));
    tl.appendChild(li);
  });
  w.appendChild(tl);
  return w;
}

function slideTest(s) {
  const w = el("div", "slide-inner slide-inner--wide");
  w.appendChild(proHeader(s));
  const cols = el("div", "two-col two-col--top");
  const left = el("div");
  left.appendChild(el("h3", "sub-h", s.roleTitle));
  const t = el("table", "role-table");
  const head = el("tr");
  s.roleCols.forEach((c) => head.appendChild(el("th", null, c)));
  t.appendChild(head);
  s.roles.forEach((r) => {
    const tr = el("tr");
    tr.appendChild(el("td", "role-task", r[0]));
    tr.appendChild(el("td", null, r[1]));
    t.appendChild(tr);
  });
  left.appendChild(t);
  const right = el("div");
  right.appendChild(el("h3", "sub-h", s.metricsTitle));
  const m = el("div", "metric-grid");
  s.metrics.forEach((x) => m.appendChild(el("div", "metric-card", x)));
  right.appendChild(m);
  cols.append(left, right);
  w.appendChild(cols);
  if (s.standard) {
    const st = el("div", "insight");
    st.appendChild(el("span", "insight-label", s.standardTitle));
    st.appendChild(el("p", null, s.standard));
    w.appendChild(st);
  }
  return w;
}

function slideTriggers(s) {
  const w = el("div", "slide-inner");
  w.appendChild(proHeader(s));
  const list = el("div", "trigger-list");
  s.items.forEach((it) => {
    const row = el("div", "trigger");
    const c = el("div", "trigger-if");
    c.appendChild(el("span", "tg-label", s.ifLabel));
    c.appendChild(document.createTextNode(it.c));
    const r = el("div", "trigger-then");
    r.appendChild(el("span", "tg-label tg-label--then", s.thenLabel));
    r.appendChild(document.createTextNode(it.r));
    row.append(c, r);
    list.appendChild(row);
  });
  w.appendChild(list);
  return w;
}

function slideFinal(s) {
  const w = el("div", "slide-inner final");
  w.appendChild(proHeader(s));
  w.appendChild(el("p", "final-main", s.main));
  w.appendChild(el("p", "final-support", s.support));
  w.appendChild(el("p", "final-closing", s.closing));
  return w;
}

const RENDERERS = {
  hero: slideHero,
  problem: slideProblem,
  objectives: slideObjectives,
  alternatives: slideAlternatives,
  consequences: slideConsequences,
  tradeoffs: slideTradeoffs,
  recommended: slideRecommended,
  test: slideTest,
  triggers: slideTriggers,
  final: slideFinal,
};

/* ---------- Shell ---------- */

let nodes = {};

function buildShell() {
  app.innerHTML = "";
  const data = content[state.lang];
  const ui = data.ui;

  // Top bar
  const top = el("header", "topbar");
  const brand = el("div", "tb-brand", data.slides[0].title);
  const controls = el("div", "tb-controls");

  const langBtn = el("button", "btn btn--ghost lang-toggle");
  langBtn.setAttribute("aria-label", ui.langLabel);
  langBtn.innerHTML = `<span class="${state.lang === "en" ? "on" : ""}">EN</span><span class="sep">/</span><span class="${state.lang === "zh" ? "on" : ""}">繁中</span>`;
  langBtn.addEventListener("click", toggleLang);

  const notesBtn = el("button", "btn btn--ghost", state.notes ? ui.notesOn : ui.notes);
  notesBtn.setAttribute("aria-pressed", String(state.notes));
  notesBtn.addEventListener("click", toggleNotes);

  const fsBtn = el("button", "btn btn--ghost", ui.fullscreen);
  fsBtn.addEventListener("click", toggleFullscreen);

  const printBtn = el("button", "btn btn--ghost", ui.print);
  printBtn.addEventListener("click", openSummary);

  controls.append(langBtn, notesBtn, fsBtn, printBtn);
  top.append(brand, controls);

  // Progress
  const prog = el("div", "progress");
  const bar = el("div", "progress-bar");
  prog.appendChild(bar);

  // Counter
  const counter = el("div", "counter");

  // Section menu
  const menu = el("nav", "section-menu");
  menu.setAttribute("aria-label", ui.menu);
  data.nav.forEach((label, i) => {
    const b = el("button", "menu-dot");
    b.setAttribute("aria-label", label);
    b.title = label;
    b.addEventListener("click", () => go(i));
    menu.appendChild(b);
  });

  // Slides
  const deck = el("main", "deck");
  data.slides.forEach((s, i) => {
    const section = el("section", "slide");
    section.setAttribute("aria-label", data.nav[i]);
    section.appendChild((RENDERERS[s.kind] || slideFinal)(s, ui));
    const note = el("aside", "presenter-note");
    note.appendChild(el("span", "pn-label", ui.notes));
    note.appendChild(el("p", null, s.notes));
    section.appendChild(note);
    deck.appendChild(section);
  });

  // Arrows
  const prevBtn = el("button", "edge-nav edge-prev", "‹");
  prevBtn.setAttribute("aria-label", ui.prev);
  prevBtn.addEventListener("click", () => go(state.index - 1));
  const nextBtn = el("button", "edge-nav edge-next", "›");
  nextBtn.setAttribute("aria-label", ui.next);
  nextBtn.addEventListener("click", () => go(state.index + 1));

  app.append(top, prog, counter, menu, deck, prevBtn, nextBtn);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const hint = el("div", "rm-hint", ui.reduceHint);
    app.appendChild(hint);
  }

  nodes = { bar, counter, menu, deck, slides: [...deck.children], fsBtn, notesBtn };
  applyState();
}

/* ---------- State ---------- */

function applyState() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  document.body.dataset.lang = state.lang;
  document.body.dataset.notes = String(state.notes);
  const ui = content[state.lang].ui;
  nodes.slides.forEach((sl, i) => {
    sl.classList.toggle("is-active", i === state.index);
    sl.setAttribute("aria-hidden", String(i !== state.index));
  });
  [...nodes.menu.children].forEach((d, i) =>
    d.classList.toggle("is-active", i === state.index)
  );
  nodes.bar.style.width = `${((state.index + 1) / SLIDE_COUNT) * 100}%`;
  nodes.counter.textContent = ui.slideOf(state.index + 1, SLIDE_COUNT);
  scene.goTo(state.index);
}

function go(i) {
  const next = Math.max(0, Math.min(SLIDE_COUNT - 1, i));
  if (next === state.index) return;
  state.index = next;
  applyState();
}

function toggleLang() {
  state.lang = state.lang === "en" ? "zh" : "en";
  buildShell();
}

function toggleNotes() {
  state.notes = !state.notes;
  const ui = content[state.lang].ui;
  nodes.notesBtn.textContent = state.notes ? ui.notesOn : ui.notes;
  nodes.notesBtn.setAttribute("aria-pressed", String(state.notes));
  document.body.dataset.notes = String(state.notes);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

document.addEventListener("fullscreenchange", () => {
  const ui = content[state.lang].ui;
  if (nodes.fsBtn)
    nodes.fsBtn.textContent = document.fullscreenElement
      ? ui.fullscreenExit
      : ui.fullscreen;
});

/* ---------- Executive summary / print ---------- */

let summaryEl = null;

function openSummary() {
  const data = content[state.lang];
  const ui = data.ui;
  if (summaryEl) summaryEl.remove();
  summaryEl = el("div", "summary-overlay");
  const sheet = el("article", "summary-sheet");
  sheet.appendChild(el("p", "summary-kicker", ui.brand));
  sheet.appendChild(el("h1", "summary-title", data.summary.title));
  data.summary.sections.forEach((sec, i) => {
    const block = el("section", "summary-block");
    block.appendChild(el("h2", null, `${i + 1}. ${sec.h}`));
    block.appendChild(el("p", null, sec.b));
    sheet.appendChild(block);
  });
  const actions = el("div", "summary-actions");
  const printBtn = el("button", "btn btn--primary", ui.print);
  printBtn.addEventListener("click", () => window.print());
  const closeBtn = el("button", "btn btn--ghost", ui.close);
  closeBtn.addEventListener("click", () => {
    summaryEl.remove();
    summaryEl = null;
    document.body.classList.remove("printing");
    scene.setPaused(false);
  });
  actions.append(printBtn, closeBtn);
  sheet.appendChild(actions);
  summaryEl.appendChild(sheet);
  document.body.appendChild(summaryEl);
  document.body.classList.add("printing");
  scene.setPaused(true);
}

window.addEventListener("afterprint", () => {
  /* keep overlay open so user can review or close manually */
});

/* ---------- Keyboard ---------- */

window.addEventListener("keydown", (e) => {
  if (summaryEl) {
    if (e.key === "Escape") {
      summaryEl.remove();
      summaryEl = null;
      document.body.classList.remove("printing");
      scene.setPaused(false);
    }
    return;
  }
  switch (e.key) {
    case "ArrowDown":
    case "ArrowRight":
    case " ":
      e.preventDefault();
      go(state.index + 1);
      break;
    case "ArrowUp":
    case "ArrowLeft":
      e.preventDefault();
      go(state.index - 1);
      break;
    case "Home":
      e.preventDefault();
      go(0);
      break;
    case "End":
      e.preventDefault();
      go(SLIDE_COUNT - 1);
      break;
  }
});

// Wheel / touch: advance one slide at a time within the deck.
let wheelLock = false;
window.addEventListener(
  "wheel",
  (e) => {
    if (summaryEl || wheelLock || Math.abs(e.deltaY) < 24) return;
    wheelLock = true;
    go(state.index + (e.deltaY > 0 ? 1 : -1));
    setTimeout(() => (wheelLock = false), 700);
  },
  { passive: true }
);

let touchY = null;
window.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), {
  passive: true,
});
window.addEventListener(
  "touchend",
  (e) => {
    if (summaryEl || touchY == null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 60) go(state.index + (dy > 0 ? 1 : -1));
    touchY = null;
  },
  { passive: true }
);

buildShell();
