const ThemeManager = window.ThemeManager || null;

const MODULE_CARD_META = {
  flags_verticals_full: {
    code: "1.x",
    summary: "Verticals и Tier-ограничения: Dating, VOD, Webcams, Games и флаги чувствительного контента.",
    category: "Вертикали",
    order: 10
  },
  csam: {
    code: "2.x",
    summary: "CSAM, loli/shota, fake elements, non-compliant креативы и работа с жалобами.",
    category: "Чувствительный контент",
    order: 20
  },
  psych_check: {
    code: "PSY",
    summary: "Психологический скрининг «12 точек» для модераторов 18+: анонимно проверяет выгорание и десенсибилизацию.",
    category: "Самочувствие",
    order: 15,
    accent: true
  },
  sites_pwb: {
    code: "3.x",
    summary: "PBW и sensitive сайты: forbidden практики (forced push, deceptive UI) и защита паблишеров.",
    category: "PBW",
    order: 30
  },
  chinese_advertisers: {
    code: "CN",
    summary: "Специальные требования, флаги и коммуникация через #chinese_advertisers.",
    category: "Региональные правила",
    order: 40
  },
  new_account: {
    code: "ACCT",
    summary: "Первичная проверка рекламодателя: IP, платежи, комментарии, первые кампании.",
    category: "Аккаунты",
    order: 50
  },
  suspicious_patterns: {
    code: "ACCT+",
    summary: "Повторные проверки и сигналы фрода после «чистых» запусков.",
    category: "Аккаунты",
    order: 60
  },
  account_block: {
    code: "BAN",
    summary: "Когда блокировать аккаунт, какие признаки собираем и как фиксируем решение.",
    category: "Аккаунты",
    order: 70
  },
  email_change: {
    code: "MAIL",
    summary: "Процесс смены email клиента: подтверждения, фиксация действий, безопасность.",
    category: "Аккаунты",
    order: 80
  },
  codes: {
    code: "REF",
    summary: "Справочник кодов и флагов: как документировать причины отклонения.",
    category: "Справочник",
    order: 90
  }
};

const DEFAULT_CARD_SUMMARY = "Пройдите модуль, чтобы закрепить знания.";
const DEFAULT_CARD_CODE = "—";
const DEFAULT_CATEGORY = "Общие темы";
const RESULT_STORAGE_KEY = "compliance_quiz_last_results";
const CATEGORY_COLLATOR =
  typeof Intl !== "undefined" ? new Intl.Collator("ru", { sensitivity: "base" }) : null;

function goToModule(moduleId, extraParams = {}) {
  const params = new URLSearchParams(extraParams);
  if (moduleId) {
    params.set("module", moduleId);
  }
  const query = params.toString();
  window.location.href = query ? `quiz.html?${query}` : "quiz.html";
}

function formatQuestionLabel(count) {
  if (count === 0) return "нет вопросов";
  if (count === 1) return "1 вопрос";
  if (count >= 2 && count <= 4) return count + " вопроса";
  return count + " вопросов";
}

function getModuleMeta(moduleId) {
  return MODULE_CARD_META[moduleId] || {};
}

function getModuleCategory(module) {
  return module.category || getModuleMeta(module.id).category || DEFAULT_CATEGORY;
}

function getModuleOrder(module) {
  const meta = getModuleMeta(module.id);
  return typeof meta.order === "number" ? meta.order : Number.MAX_SAFE_INTEGER;
}

function compareModules(a, b) {
  const orderDiff = getModuleOrder(a) - getModuleOrder(b);
  if (orderDiff !== 0) {
    return orderDiff;
  }
  if (CATEGORY_COLLATOR) {
    return CATEGORY_COLLATOR.compare(a.title, b.title);
  }
  return String(a.title || "").localeCompare(String(b.title || ""));
}

document.addEventListener("DOMContentLoaded", () => {
  if (ThemeManager) {
    ThemeManager.applyTheme(ThemeManager.getStoredTheme(), { persist: false });
    ThemeManager.bindThemeToggle();
  }

  const heroTabs = Array.from(document.querySelectorAll("[data-hero-tab]"));
  const heroPanes = Array.from(document.querySelectorAll("[data-hero-pane]"));

  function activateHeroTab(target) {
    heroTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.heroTab === target);
    });
    heroPanes.forEach((pane) => {
      pane.classList.toggle("hidden", pane.dataset.heroPane !== target);
    });
  }

  if (heroTabs.length) {
    const defaultTab =
      heroTabs.find((tab) => tab.classList.contains("is-active")) || heroTabs[0];
    activateHeroTab(defaultTab.dataset.heroTab);
    heroTabs.forEach((tab) => {
      tab.addEventListener("click", () => activateHeroTab(tab.dataset.heroTab));
    });
  }

  const quizDataModules = window.QUIZ_DATA && window.QUIZ_DATA.modules;
  const modules = Array.isArray(quizDataModules) ? quizDataModules.slice() : [];
  const cardsContainer = document.getElementById("category-cards");
  const emptyStateEl = document.getElementById("cards-empty-state");
  const filterSelect = document.getElementById("category-filter");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const resultCountBadge = document.getElementById("cards-filter-count");

  let activeCategoryFilter = "";

  const visibleModules = modules.filter((module) => module.id !== "overall_quiz");
  const lastResults = readStoredResults();

  const uniqueCategories = Array.from(
    new Set(visibleModules.map((module) => getModuleCategory(module)))
  ).sort((a, b) => {
    if (CATEGORY_COLLATOR) {
      return CATEGORY_COLLATOR.compare(a, b);
    }
    return a.localeCompare(b);
  });

  if (filterSelect) {
    filterSelect.innerHTML = '<option value="">Все категории</option>';
    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      filterSelect.appendChild(option);
    });
  }

  const fullTestBtn = document.getElementById("full-test-btn");
  if (fullTestBtn) {
    fullTestBtn.addEventListener("click", () => {
      goToModule("overall_quiz");
    });
  }

  const psychTestBtn = document.getElementById("psych-test-btn");
  if (psychTestBtn) {
    psychTestBtn.addEventListener("click", () => {
      goToModule("psych_check");
    });
  }

  const adminBtn = document.getElementById("admin-dashboard-btn");
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      goToModule(null, { admin: "1" });
    });
  }

  function renderModuleCards() {
    if (!cardsContainer) return;
    cardsContainer.textContent = "";

    const filteredModules = visibleModules.filter((module) => {
      if (!activeCategoryFilter) return true;
      return getModuleCategory(module) === activeCategoryFilter;
    });

    const sortedModules = filteredModules.slice().sort(compareModules);

    if (emptyStateEl) {
      emptyStateEl.classList.toggle("hidden", sortedModules.length > 0);
    }

    if (resultCountBadge) {
      resultCountBadge.textContent = String(sortedModules.length);
    }

    if (sortedModules.length === 0) {
      return;
    }

    sortedModules.forEach((module) => {
      const meta = getModuleMeta(module.id);
      const article = document.createElement("article");
      const classes = ["ts-card"];
      if (meta.accent) {
        classes.push("ts-card--accent");
      }
      if (lastResults[module.id] === "failed") {
        classes.push("ts-card--failed");
      } else if (lastResults[module.id] === "passed") {
        classes.push("ts-card--passed");
      }
      article.className = classes.join(" ");

      const tagRow = document.createElement("div");
      tagRow.className = "ts-card__tag-row";

      const codeSpan = document.createElement("span");
      codeSpan.className = "ts-card__tag-code";
      codeSpan.textContent = meta.code || module.code || DEFAULT_CARD_CODE;
      tagRow.appendChild(codeSpan);

      const countSpan = document.createElement("span");
      countSpan.className = "ts-card__badge-questions";
      const count = Array.isArray(module.questions) ? module.questions.length : 0;
      countSpan.textContent = formatQuestionLabel(count);
      tagRow.appendChild(countSpan);
      article.appendChild(tagRow);

      const title = document.createElement("h3");
      title.className = "ts-card__title";
      title.textContent = module.title || "Без названия";
      article.appendChild(title);

      const subtitle = document.createElement("p");
      subtitle.className = "ts-card__subtitle";
      subtitle.textContent = meta.summary || module.summary || DEFAULT_CARD_SUMMARY;
      article.appendChild(subtitle);

      const categoryLabel = document.createElement("div");
      categoryLabel.className = "ts-card__category-label";
      categoryLabel.textContent = getModuleCategory(module);
      article.appendChild(categoryLabel);

      const button = document.createElement("button");
      button.className = "ts-btn ts-btn--primary ts-card__button";
      button.type = "button";
      button.textContent = "Начать тестирование";
      button.addEventListener("click", () => {
        goToModule(module.id);
      });
      article.appendChild(button);

      cardsContainer.appendChild(article);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      activeCategoryFilter = filterSelect.value;
      if (resetFiltersBtn) {
        resetFiltersBtn.disabled = !activeCategoryFilter;
      }
      renderModuleCards();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      if (!activeCategoryFilter) return;
      activeCategoryFilter = "";
      if (filterSelect) {
        filterSelect.value = "";
      }
      resetFiltersBtn.disabled = true;
      renderModuleCards();
    });
  }

  renderModuleCards();
});

function readStoredResults() {
  try {
    const raw = window.localStorage.getItem(RESULT_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (_) {
    return {};
  }
  return {};
}
