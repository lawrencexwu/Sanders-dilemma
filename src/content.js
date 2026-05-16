// All bilingual copy lives here. UI strings + 10 slides, each with the
// structured data its renderer needs, plus presenter notes and the
// executive-summary source. The language toggle swaps the active branch.

export const content = {
  en: {
    dir: "en",
    ui: {
      brand: "PrOACT · Smart Choices",
      start: "Start Presentation",
      print: "Print Executive Summary",
      notes: "Presenter Notes",
      notesOn: "Hide Notes",
      fullscreen: "Full Screen",
      fullscreenExit: "Exit Full Screen",
      langLabel: "Language",
      menu: "Sections",
      prev: "Previous section",
      next: "Next section",
      slideOf: (a, b) => `${a} / ${b}`,
      summaryHeading: "Executive Summary",
      close: "Close",
      reduceHint: "Reduced motion is on — animation is minimal.",
    },
    nav: [
      "Hero",
      "Problem",
      "Objectives",
      "Alternatives",
      "Consequences",
      "Tradeoffs",
      "Recommended Path",
      "60–90 Day Test",
      "Decision Triggers",
      "Final Judgment",
    ],
    slides: [
      {
        kind: "hero",
        title: "Ms. Sanders's Dilemma",
        subtitle: "A PrOACT Decision Analysis Based on Smart Choices",
        framing:
          "This is not simply a question of whether to tolerate or fire Anna. It is a role-fit and performance-management problem.",
        nodes: [
          "Tolerate",
          "Fire",
          "Redesign",
          "Transfer",
          "Improve",
          "Separate Fairly",
        ],
        notes:
          "Introduce the case as a management decision, not a personnel complaint.",
      },
      {
        kind: "problem",
        tag: "P — Problem",
        heading: "Problem",
        wrongLabel: "The wrong question",
        wrong: "“Should Sanders fire Anna?”",
        betterLabel: "The better question",
        better:
          "“How should Sanders correct a poor role fit while protecting the office's mission, Anna's dignity, team morale, and institutional compliance?”",
        insightLabel: "Key insight",
        insight:
          "Anna is strong in back-office administrative work but weak in front-facing interpersonal work. The issue is job fit, not personality.",
        badFrame: "Tolerate vs. Fire",
        goodFrame: "Restore performance + preserve fairness",
        badFrameLabel: "Bad frame",
        goodFrameLabel: "Better frame",
        notes:
          "The first move is to escape the bad frame of “tolerate or fire.”",
      },
      {
        kind: "objectives",
        tag: "O — Objectives",
        heading: "Objectives",
        items: [
          "Protect office service quality",
          "Treat Anna fairly",
          "Preserve team morale",
          "Follow HR rules",
          "Retain useful administrative capacity",
          "Minimize managerial burden",
        ],
        keyLine:
          "The office's service mission comes first. Anna's dignity and fairness come next. Convenience comes last.",
        notes:
          "Clarify what Sanders is really trying to protect and rank those goals.",
      },
      {
        kind: "alternatives",
        tag: "A — Alternatives",
        heading: "Alternatives",
        options: [
          { k: "A", t: "Maintain status quo" },
          { k: "B", t: "Train Anna" },
          { k: "C", t: "Redesign the role" },
          { k: "D", t: "Internal transfer" },
          { k: "E", t: "Hybrid solution" },
          { k: "F", t: "Formal separation" },
          { k: "G", t: "Negotiated exit" },
        ],
        keyLine:
          "The strongest option is not tolerance or termination. It is a structured hybrid path.",
        notes:
          "Good decision analysis creates better choices before choosing.",
      },
      {
        kind: "consequences",
        tag: "C — Consequences",
        heading: "Consequences",
        columns: [
          "Option",
          "Service Quality",
          "Fairness to Anna",
          "Team Morale",
          "HR Risk",
          "Practicality",
          "Overall",
        ],
        rows: [
          ["Status quo", "Poor", "Medium", "Poor", "Medium", "Easy short-term", "Weak"],
          ["Training only", "Medium", "High", "Medium", "Low", "Moderate", "Limited"],
          ["Role redesign", "High", "High", "High", "Low/Medium", "Depends on HR", "Strong"],
          ["Internal transfer", "High", "High", "Medium/High", "Low", "Depends on vacancies", "Strong"],
          ["Hybrid solution", "High", "High", "High", "Low", "Moderate", "Best"],
          ["Formal separation", "High eventually", "Medium/Low", "Low short-term", "Medium", "Costly", "Last resort"],
          ["Negotiated exit", "Medium/High", "Medium/High", "Medium", "Medium", "Depends on Anna", "Possible fallback"],
        ],
        highlightRow: 4,
        notes:
          "The hybrid solution performs best because it protects performance and fairness.",
      },
      {
        kind: "tradeoffs",
        tag: "T — Tradeoffs",
        heading: "Tradeoffs",
        items: [
          {
            a: "Compassion",
            b: "Performance",
            rule: "Be kind to Anna, but do not lower the service standard.",
          },
          {
            a: "Short-Term Discomfort",
            b: "Long-Term Damage",
            rule: "Accept short-term discomfort to prevent long-term dysfunction.",
          },
          {
            a: "Retaining Strengths",
            b: "Fixing Weaknesses",
            rule: "Preserve what works, remove or reduce what does not.",
          },
          {
            a: "Flexibility",
            b: "Fairness to the Team",
            rule: "Role redesign is acceptable only if it does not quietly punish the rest of the team.",
          },
        ],
        ruleLabel: "Decision rule",
        notes:
          "This decision is hard because the right answer requires tradeoffs.",
      },
      {
        kind: "recommended",
        heading: "Recommended Solution",
        main:
          "Immediate HR consultation + factual documentation + honest conversation + role redesign or transfer + 60–90 day measurable review.",
        steps: [
          "Consult HR immediately",
          "Gather specific evidence",
          "Speak with Anna respectfully",
          "Create a 60–90 day plan",
          "Define decision triggers",
        ],
        notes:
          "The recommendation is structured action, not avoidance and not punishment.",
      },
      {
        kind: "test",
        heading: "The 60–90 Day Test",
        roleTitle: "Role adjustment",
        roleCols: ["Task", "Arrangement"],
        roles: [
          ["Expense reimbursement tracking", "Anna keeps"],
          ["Database maintenance", "Anna keeps"],
          ["Scheduling support", "Anna keeps"],
          ["Walk-in student reception", "Shared rotation or student worker"],
          ["Employer reception", "More suitable staff member or trained front-desk support"],
          ["General visitor greeting", "Shared front-desk protocol"],
        ],
        metricsTitle: "Performance metrics",
        metrics: [
          "No repeated student complaints",
          "No unresolved employer reception incidents",
          "Front-desk inquiries handled or escalated quickly",
          "Administrative accuracy remains strong",
          "No unfair burden on one colleague",
        ],
        notes: "The 60–90 day period must be measurable, not vague.",
      },
      {
        kind: "triggers",
        heading: "Clear Decision Rules",
        items: [
          { c: "Anna succeeds in redesigned role", r: "Make new role official." },
          { c: "Anna improves but still struggles", r: "Continue reduced front-desk duties and monitor." },
          { c: "Redesign is not allowed", r: "Pursue internal transfer." },
          { c: "No transfer exists and performance stays below standard", r: "Begin formal PIP or separation." },
          { c: "Anna rejects reasonable adjustments", r: "Move to formal HR process." },
          { c: "Anna agrees the role is a poor fit", r: "Explore negotiated exit." },
        ],
        ifLabel: "If",
        thenLabel: "Then",
        notes:
          "Decision triggers prevent the process from drifting indefinitely.",
      },
      {
        kind: "final",
        heading: "Final Judgment",
        main: "Sanders should act now, but not punitively.",
        support:
          "She should redesign or transfer first, measure results, and only then move toward dismissal if the mismatch cannot be resolved.",
        closing:
          "Anna may be a good employee in the wrong role. Sanders's job is to test whether a better role fit exists. If it does, preserve it. If it does not, separate fairly.",
        notes: "The final judgment is humane but disciplined.",
      },
    ],
    summary: {
      title: "Ms. Sanders's Dilemma — PrOACT Decision Analysis",
      sections: [
        {
          h: "Core Problem",
          b: "Not “tolerate vs. fire,” but how to correct a poor role fit while protecting the office's mission, Anna's dignity, team morale, and institutional compliance. Anna is strong in back-office administration and weak in front-facing work — this is a job-fit issue, not a personality issue.",
        },
        {
          h: "Ranked Objectives",
          b: "1) Protect office service quality · 2) Treat Anna fairly · 3) Preserve team morale · 4) Follow HR rules · 5) Retain useful administrative capacity · 6) Minimize managerial burden.",
        },
        {
          h: "Best Alternatives",
          b: "A hybrid path — role redesign or internal transfer combined with documentation and a measured review — outperforms both tolerance and immediate termination.",
        },
        {
          h: "Key Tradeoffs",
          b: "Compassion vs. performance; short-term discomfort vs. long-term damage; retaining strengths vs. fixing weaknesses; flexibility vs. fairness to the team.",
        },
        {
          h: "Recommended Solution",
          b: "Immediate HR consultation + factual documentation + honest conversation + role redesign or transfer + a 60–90 day measurable review with defined decision triggers.",
        },
        {
          h: "60–90 Day Action Plan",
          b: "Anna keeps reimbursement tracking, database maintenance, and scheduling support. Walk-in student reception, employer reception, and general greeting move to shared rotation, trained front-desk support, or better-suited staff. Success is measured by no repeated complaints, no unresolved employer incidents, fast inquiry handling, sustained administrative accuracy, and no unfair burden on one colleague.",
        },
        {
          h: "Decision Triggers",
          b: "Success → make the new role official. Partial improvement → continue reduced duties and monitor. No redesign allowed → internal transfer. No transfer and below standard → formal PIP or separation. Rejects adjustments → formal HR process. Agrees on poor fit → negotiated exit.",
        },
        {
          h: "Final Judgment",
          b: "Sanders should act now, but not punitively. Redesign or transfer first, measure results, and only move toward dismissal if the mismatch cannot be resolved. Anna may be a good employee in the wrong role — preserve a better fit if one exists; if not, separate fairly.",
        },
      ],
    },
  },

  zh: {
    dir: "zh",
    ui: {
      brand: "PrOACT · Smart Choices",
      start: "開始簡報",
      print: "列印執行摘要",
      notes: "簡報備註",
      notesOn: "隱藏備註",
      fullscreen: "全螢幕",
      fullscreenExit: "退出全螢幕",
      langLabel: "語言",
      menu: "章節",
      prev: "上一節",
      next: "下一節",
      slideOf: (a, b) => `${a} / ${b}`,
      summaryHeading: "執行摘要",
      close: "關閉",
      reduceHint: "已啟用減少動態效果 — 動畫已最小化。",
    },
    nav: [
      "封面",
      "問題界定",
      "目標",
      "選項",
      "後果",
      "取捨",
      "建議路徑",
      "60–90 天測試",
      "決策觸發條件",
      "最終判斷",
    ],
    slides: [
      {
        kind: "hero",
        title: "桑德斯女士的困境",
        subtitle: "以《Smart Choices》PrOACT 架構進行決策分析",
        framing:
          "這不只是要不要容忍或解僱 Anna 的問題，而是角色適配與績效管理問題。",
        nodes: ["容忍", "解僱", "重設職務", "內部轉調", "改善", "公平分手"],
        notes: "將此個案定位為管理決策問題，而不是單純的人事抱怨。",
      },
      {
        kind: "problem",
        tag: "P — 問題界定",
        heading: "問題界定",
        wrongLabel: "錯誤的問題",
        wrong: "「Sanders 應不應該解僱 Anna？」",
        betterLabel: "更好的問題",
        better:
          "「Sanders 要如何修正一個錯誤的職務適配，同時保護辦公室使命、Anna 的尊嚴、團隊士氣與學校制度合規？」",
        insightLabel: "關鍵洞察",
        insight:
          "Anna 擅長後台行政工作，但不適合高互動性的前台工作。問題不是人格，而是職務適配。",
        badFrame: "容忍 vs. 解僱",
        goodFrame: "恢復績效 + 保留公平",
        badFrameLabel: "壞框架",
        goodFrameLabel: "好框架",
        notes: "第一步是跳出「容忍或解僱」這個錯誤框架。",
      },
      {
        kind: "objectives",
        tag: "O — 目標",
        heading: "目標",
        items: [
          "保護辦公室服務品質",
          "公平對待 Anna",
          "維持團隊士氣",
          "遵守人資與學校規範",
          "保留 Anna 有價值的行政能力",
          "降低管理負擔",
        ],
        keyLine:
          "辦公室的服務使命優先。Anna 的尊嚴與公平處理其次。主管的方便性最後。",
        notes: "釐清 Sanders 真正要保護的是什麼，並排出優先順序。",
      },
      {
        kind: "alternatives",
        tag: "A — 選項",
        heading: "選項",
        options: [
          { k: "A", t: "維持現狀" },
          { k: "B", t: "訓練 Anna" },
          { k: "C", t: "重設職務" },
          { k: "D", t: "內部轉調" },
          { k: "E", t: "混合方案" },
          { k: "F", t: "正式離職程序" },
          { k: "G", t: "協議式離職" },
        ],
        keyLine:
          "最好的選項不是單純容忍或直接解僱，而是一條有結構的混合路徑。",
        notes: "好的決策分析不是急著選，而是先創造更好的選項。",
      },
      {
        kind: "consequences",
        tag: "C — 後果",
        heading: "後果",
        columns: [
          "選項",
          "服務品質",
          "對 Anna 的公平性",
          "團隊士氣",
          "人資風險",
          "可執行性",
          "整體判斷",
        ],
        rows: [
          ["維持現狀", "差", "中", "差", "中", "短期容易", "弱"],
          ["只做訓練", "中", "高", "中", "低", "中等", "有限"],
          ["重設職務", "高", "高", "高", "低至中", "取決於人資規定", "強"],
          ["內部轉調", "高", "高", "中至高", "低", "取決於校內職缺", "強"],
          ["混合方案", "高", "高", "高", "低", "中等", "最佳"],
          ["正式離職程序", "最終可改善", "中至低", "短期低", "中", "成本高", "最後手段"],
          ["協議式離職", "中至高", "中至高", "中", "中", "取決於 Anna", "可作備案"],
        ],
        highlightRow: 4,
        notes: "混合方案最佳，因為它同時保護績效與公平。",
      },
      {
        kind: "tradeoffs",
        tag: "T — 取捨",
        heading: "取捨",
        items: [
          {
            a: "同理心",
            b: "績效",
            rule: "善待 Anna，但不能降低服務標準。",
          },
          {
            a: "短期尷尬",
            b: "長期損害",
            rule: "接受短期不舒服，避免長期失能。",
          },
          {
            a: "保留強項",
            b: "修正弱項",
            rule: "保留有效的部分，移除或降低無效的部分。",
          },
          {
            a: "彈性調整",
            b: "團隊公平",
            rule: "職務重設可以接受，但不能讓其他同事默默承擔代價。",
          },
        ],
        ruleLabel: "決策規則",
        notes: "這個決策困難，是因為正確答案必須處理取捨。",
      },
      {
        kind: "recommended",
        heading: "建議方案",
        main:
          "立即諮詢 HR + 事實性紀錄 + 坦誠談話 + 職務重設或轉調 + 60–90 天可衡量檢視。",
        steps: [
          "立即諮詢 HR",
          "蒐集具體事實",
          "尊重且坦誠地與 Anna 談話",
          "建立 60–90 天方案",
          "設定明確決策觸發條件",
        ],
        notes: "建議的核心是有結構地行動，不是逃避，也不是懲罰。",
      },
      {
        kind: "test",
        heading: "60–90 天測試",
        roleTitle: "職務調整",
        roleCols: ["工作項目", "安排方式"],
        roles: [
          ["費用報銷追蹤", "Anna 保留"],
          ["資料庫維護", "Anna 保留"],
          ["排程支援", "Anna 保留"],
          ["學生臨櫃接待", "輪值或學生工讀生支援"],
          ["企業雇主接待", "更適合的同事或受訓前台支援"],
          ["一般訪客問候", "共享前台接待流程"],
        ],
        metricsTitle: "績效衡量指標",
        metrics: [
          "不再出現重複性的學生抱怨",
          "不再出現未處理的企業接待問題",
          "前台詢問能快速處理或升級",
          "行政準確度維持良好",
          "不讓單一同事承擔不公平負擔",
        ],
        notes: "60–90 天不能只是觀察，而要有明確衡量標準。",
      },
      {
        kind: "triggers",
        heading: "明確決策規則",
        items: [
          { c: "Anna 在重設後的職務中表現良好", r: "正式化新職務安排。" },
          { c: "Anna 有改善但仍不適合前台工作", r: "持續降低前台責任並觀察。" },
          { c: "學校不允許職務重設", r: "尋求內部轉調。" },
          { c: "沒有轉調機會，且績效仍低於標準", r: "啟動正式績效改善計畫或離職程序。" },
          { c: "Anna 拒絕合理調整", r: "進入正式 HR 流程。" },
          { c: "Anna 也認同此角色不適合", r: "探討協議式離職。" },
        ],
        ifLabel: "如果",
        thenLabel: "則",
        notes: "決策觸發條件可以避免整個流程無限拖延。",
      },
      {
        kind: "final",
        heading: "最終判斷",
        main: "Sanders 應該立刻行動，但不應以懲罰為出發點。",
        support:
          "她應該先嘗試職務重設或轉調，衡量結果後，若仍無法解決適配問題，再走向解僱程序。",
        closing:
          "Anna 可能不是壞員工，而是被放在錯誤位置的好員工。Sanders 的任務，是測試是否存在更好的職務適配。如果有，就保留；如果沒有，就公平分手。",
        notes: "最終判斷要有人性，但也要有紀律。",
      },
    ],
    summary: {
      title: "桑德斯女士的困境 — PrOACT 決策分析",
      sections: [
        {
          h: "核心問題",
          b: "不是「容忍 vs. 解僱」，而是如何修正錯誤的職務適配，同時保護辦公室使命、Anna 的尊嚴、團隊士氣與學校制度合規。Anna 擅長後台行政、不適合前台互動 — 這是職務適配問題，不是人格問題。",
        },
        {
          h: "目標排序",
          b: "1) 保護辦公室服務品質 · 2) 公平對待 Anna · 3) 維持團隊士氣 · 4) 遵守人資與學校規範 · 5) 保留有價值的行政能力 · 6) 降低管理負擔。",
        },
        {
          h: "最佳選項",
          b: "混合路徑 — 職務重設或內部轉調，搭配事實紀錄與可衡量檢視 — 優於單純容忍，也優於立即解僱。",
        },
        {
          h: "關鍵取捨",
          b: "同理心 vs. 績效；短期尷尬 vs. 長期損害；保留強項 vs. 修正弱項；彈性調整 vs. 團隊公平。",
        },
        {
          h: "建議方案",
          b: "立即諮詢 HR + 事實性紀錄 + 坦誠談話 + 職務重設或轉調 + 設定明確觸發條件的 60–90 天可衡量檢視。",
        },
        {
          h: "60–90 天行動計畫",
          b: "Anna 保留報銷追蹤、資料庫維護與排程支援。學生臨櫃接待、企業雇主接待與一般問候改為輪值、受訓前台支援或更適合的同事。成功的衡量：不再有重複抱怨、不再有未處理的企業接待問題、詢問快速處理、行政準確度維持、無單一同事承擔不公平負擔。",
        },
        {
          h: "決策觸發條件",
          b: "表現良好 → 正式化新職務。部分改善 → 持續降低責任並觀察。不允許重設 → 內部轉調。無轉調且低於標準 → 正式績效改善計畫或離職。拒絕調整 → 正式 HR 流程。認同不適配 → 協議式離職。",
        },
        {
          h: "最終判斷",
          b: "Sanders 應立刻行動，但不以懲罰為出發點。先重設或轉調、衡量結果，若仍無法解決適配問題再走向解僱。Anna 可能是被放錯位置的好員工 — 若有更好的適配就保留；若沒有，就公平分手。",
        },
      ],
    },
  },
};

export const SLIDE_COUNT = content.en.slides.length;
