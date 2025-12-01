(function (window) {
  const THEME_STORAGE_KEY = "ts_theme";

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
    } catch (_) {
      return "light";
    }
  }

  function persistTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {}
  }

  function applyTheme(theme, options = {}) {
    const { persist = true } = options;
    const normalizedTheme = theme === "dark" ? "dark" : "light";
    const body = document.body;
    if (body) {
      body.classList.toggle("theme-dark", normalizedTheme === "dark");
    }

    const toggleButtons = document.querySelectorAll(".theme-toggle-btn");
    toggleButtons.forEach((btn) => {
      btn.textContent = normalizedTheme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-pressed", normalizedTheme === "dark" ? "true" : "false");
    });

    if (persist) {
      persistTheme(normalizedTheme);
    }
    return normalizedTheme;
  }

  function toggleTheme() {
    const current = getStoredTheme();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    return next;
  }

  function handleToggleClick() {
    toggleTheme();
  }

  function bindThemeToggle(selector = ".theme-toggle-btn") {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((btn) => {
      if (btn.dataset.themeToggleBound === "1") return;
      btn.addEventListener("click", handleToggleClick);
      btn.dataset.themeToggleBound = "1";
    });
  }

  const ThemeManager = {
    storageKey: THEME_STORAGE_KEY,
    getStoredTheme,
    applyTheme,
    toggleTheme,
    bindThemeToggle
  };

  window.ThemeManager = ThemeManager;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        applyTheme(getStoredTheme(), { persist: false });
        bindThemeToggle();
      },
      { once: true }
    );
  } else {
    applyTheme(getStoredTheme(), { persist: false });
    bindThemeToggle();
  }
})(window);
