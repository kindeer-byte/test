/*
  Как обновлять вопросы:

  1. Все данные лежат в файле js/data.js (window.QUIZ_DATA).
  2. modules: массив разделов (по документам).
  3. В каждом module:
     - id: строка (уникальный идентификатор)
     - title: название раздела
     - passPercent: проходной процент
     - questions: массив вопросов

  Формат вопроса:
  {
    id: "строка_уникальная",
    type: "single" | "multi" | "image_single" | "image_multi" | "video_single" | "true_false",
    text: "текст вопроса",
    imageUrl: "опциональная картинка",
    videoUrl: "опциональное видео",
    options: [
      { id: "a", text: "вариант ответа", correct: true/false },
      ...
    ],
    explanation: "краткий разбор"
  }

  Для картинок и видео достаточно указать imageUrl / videoUrl (например /static/...) и соответствующий type.
*/

const ThemeManager = window.ThemeManager || null;
const ADMIN_PASSWORD = "ts-compliance";
const CUSTOM_STORAGE_KEY = "compliance_quiz_custom_questions";
const DOCS_LINK = "https://intranet.example.com/wiki/compliance";
const MODULE_DOC_LINKS = {
    overall_quiz: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/299237395/-",
    flags_verticals_full: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/299368816/1.X",
    csam: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/424017947/CSAM",
    chinese_advertisers: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/507412490/-+chinese_advertisers",
    new_account: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/299369738",
    email_change: "https://trafficstars.atlassian.net/wiki/spaces/T/pages/388759587"
};

const PROGRESS_STORAGE_KEY = "compliance_quiz_progress";
const RESULT_STORAGE_KEY = "compliance_quiz_last_results";
const ALLOWED_HTML_TAGS = new Set([
    "b",
    "strong",
    "i",
    "em",
    "u",
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "span",
    "div",
    "code",
    "a"
]);
const ALLOWED_HTML_ATTRS = {
    a: new Set(["href", "target", "rel"])
};

let currentModule = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let adminUploadedImageDataUrl = "";
let customQuestions = [];
let checkedQuestions = new Set();

if (ThemeManager) {
    ThemeManager.applyTheme(ThemeManager.getStoredTheme(), { persist: false });
}

function sanitizeUrl(value) {
    if (typeof value !== "string") {
        return "";
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return "";
    }
    const lower = trimmed.toLowerCase();
    if (lower.startsWith("javascript:") || lower.startsWith("data:")) {
        return "";
    }
    return trimmed;
}

function sanitizeHtmlFragment(raw) {
    if (typeof raw !== "string") {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(document.createTextNode(raw == null ? "" : String(raw)));
        return fragment;
    }
    const template = document.createElement("template");
    template.innerHTML = raw;

    const sanitizeNode = (node) => {
        const childNodes = Array.from(node.childNodes);
        childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                const tagName = child.tagName.toLowerCase();
                if (!ALLOWED_HTML_TAGS.has(tagName)) {
                    const textNode = document.createTextNode(child.textContent || "");
                    node.replaceChild(textNode, child);
                    return;
                }
                Array.from(child.attributes).forEach((attr) => {
                    const attrName = attr.name.toLowerCase();
                    if (attrName.startsWith("on")) {
                        child.removeAttribute(attr.name);
                        return;
                    }
                    const allowedAttrs = ALLOWED_HTML_ATTRS[tagName];
                    if (!allowedAttrs || !allowedAttrs.has(attrName)) {
                        child.removeAttribute(attr.name);
                        return;
                    }
                    if (attrName === "href") {
                        const safeValue = sanitizeUrl(attr.value);
                        if (!safeValue) {
                            child.removeAttribute(attr.name);
                            return;
                        }
                        child.setAttribute(attr.name, safeValue);
                        if (!child.getAttribute("rel")) {
                            child.setAttribute("rel", "noopener noreferrer");
                        }
                        if (!child.getAttribute("target")) {
                            child.setAttribute("target", "_blank");
                        }
                    }
                });
                sanitizeNode(child);
            } else if (child.nodeType === Node.COMMENT_NODE) {
                child.remove();
            }
        });
    };

    sanitizeNode(template.content);
    return template.content;
}

function setSafeHtml(target, raw) {
    if (!target) return;
    target.textContent = "";
    if (!raw) return;
    target.appendChild(sanitizeHtmlFragment(raw));
}

function createSafeExternalLink(url, label) {
    const safeUrl = sanitizeUrl(url);
    if (!safeUrl) return null;
    const link = document.createElement("a");
    link.href = safeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
}

function loadModuleResults() {
    try {
        const raw = window.localStorage.getItem(RESULT_STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
            return parsed;
        }
        return {};
    } catch (_) {
        return {};
    }
}

function persistModuleResult(moduleId, passed) {
    if (!moduleId) return;
    try {
        const allResults = loadModuleResults();
        allResults[moduleId] = passed ? "passed" : "failed";
        window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(allResults));
    } catch (_) { }
}

function shuffleArray(source) {
    const arr = source.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

function persistProgress() {
    if (!currentModule) {
        clearStoredProgress();
        return;
    }
    try {
        const payload = {
            moduleId: currentModule.id,
            questionIndex: currentQuestionIndex,
            answers: Object.entries(userAnswers).map(([qid, set]) => [
                qid,
                Array.from(set || [])
            ]),
            checked: Array.from(checkedQuestions)
        };
        window.sessionStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
    } catch (_) { }
}

function clearStoredProgress() {
    try {
        window.sessionStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (_) { }
}

function restoreProgressState(modules) {
    try {
        const raw = window.sessionStorage.getItem(PROGRESS_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.moduleId) return null;
        const module = modules.find((m) => m.id === parsed.moduleId);
        if (!module) {
            clearStoredProgress();
            return null;
        }
        const answers = {};
        if (Array.isArray(parsed.answers)) {
            parsed.answers.forEach(([qid, values]) => {
                if (!qid) return;
                answers[qid] = new Set(Array.isArray(values) ? values : []);
            });
        }
        const checked = new Set(Array.isArray(parsed.checked) ? parsed.checked : []);
        const maxIndex = Math.max(module.questions.length - 1, 0);
        const index = Math.min(Math.max(Number(parsed.questionIndex) || 0, 0), maxIndex);
        return { module, answers, checked, index };
    } catch (_) {
        return null;
    }
}

function mergeCustomQuestionIntoData(moduleId, question) {
    if (!moduleId || !question) return;
    const mod = QUIZ_DATA.modules.find(m => m.id === moduleId);
    if (!mod || !Array.isArray(mod.questions)) return;
    const existingIdx = mod.questions.findIndex(q => q.id === question.id);
    if (existingIdx >= 0) {
        mod.questions[existingIdx] = question;
    } else {
        mod.questions.push(question);
    }
}

function updateCustomRegistry(moduleId, question) {
    if (!moduleId || !question || !question.id) return;
    const idx = customQuestions.findIndex(entry => entry.question && entry.question.id === question.id);
    const entry = { moduleId, question };
    if (idx >= 0) {
        customQuestions[idx] = entry;
    } else {
        customQuestions.push(entry);
    }
}

function loadCustomQuestionsFromStorage() {
    try {
        const raw = window.localStorage.getItem(CUSTOM_STORAGE_KEY);
        if (!raw) {
            customQuestions = [];
            return;
        }
        const items = JSON.parse(raw);
        if (!Array.isArray(items)) {
            customQuestions = [];
            return;
        }
        customQuestions = [];
        items.forEach(entry => {
            if (!entry || !entry.moduleId || !entry.question) return;
            mergeCustomQuestionIntoData(entry.moduleId, entry.question);
            customQuestions.push(entry);
        });
    } catch (err) {
        console.error("Failed to load custom questions", err);
        customQuestions = [];
    }
}

function saveCustomQuestionsToStorage() {
    try {
        window.localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customQuestions));
    } catch (err) {
        console.error("Failed to save custom questions", err);
    }
}

function buildCustomQuestionsExport() {
    const grouped = {};
    customQuestions.forEach((entry) => {
        if (!entry || !entry.moduleId || !entry.question) return;
        if (!grouped[entry.moduleId]) {
            grouped[entry.moduleId] = [];
        }
        grouped[entry.moduleId].push(entry.question);
    });
    return grouped;
}

function initQuizApp() {
    const moduleSelect = document.getElementById("module-select");
    const startBtn = document.getElementById("start-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const finishBtn = document.getElementById("finish-btn");
    const retryBtn = document.getElementById("retry-btn");
    const backToModulesBtn = document.getElementById("back-to-modules-btn");
    const quizHomeBtn = document.getElementById("quiz-home-btn");

    const adminToggleBtn = document.getElementById("admin-toggle-btn");
    const adminPanel = document.getElementById("admin-panel");
    const adminModuleSelect = document.getElementById("admin-module-select");
    const adminQuestionSelect = document.getElementById("admin-question-select");
    const adminQuestionText = document.getElementById("admin-question-text");
    const adminCategory = document.getElementById("admin-category");
    const adminDifficulty = document.getElementById("admin-difficulty");
    const adminQuestionType = document.getElementById("admin-question-type");
    const adminImageFile = document.getElementById("admin-image-file");
    const adminImageUrl = document.getElementById("admin-image-url");
    const adminAnswer1 = document.getElementById("admin-answer-1");
    const adminAnswer2 = document.getElementById("admin-answer-2");
    const adminAnswer3 = document.getElementById("admin-answer-3");
    const adminAnswer4 = document.getElementById("admin-answer-4");
    const adminCorrectInputs = Array.from(document.querySelectorAll(".admin-correct"));
    const adminExplanation = document.getElementById("admin-explanation");
    const adminDocLink = document.getElementById("admin-doc-link");
    const adminAddQuestionBtn = document.getElementById("admin-add-question-btn");
    const adminHomeBtn = document.getElementById("admin-home-btn");
    const adminResetQuestionBtn = document.getElementById("admin-reset-question-btn");
    const adminEditingStatus = document.getElementById("admin-editing-status");
    const adminExportBtn = document.getElementById("admin-export-btn");
    const adminExportOutput = document.getElementById("admin-export-output");
    const adminExportStatus = document.getElementById("admin-export-status");

    const urlParams = new URLSearchParams(window.location.search);
    const initialModuleId = urlParams.get("module");
    const shouldOpenAdmin = urlParams.get("admin") === "1";
    let adminEditingQuestionId = null;
    let adminEditingModuleId = null;

    loadCustomQuestionsFromStorage();

    const quizDataModules = window.QUIZ_DATA && window.QUIZ_DATA.modules;
    const modules = Array.isArray(quizDataModules) ? quizDataModules : [];
    const restoredState = !initialModuleId && !shouldOpenAdmin ? restoreProgressState(modules) : null;

    if (moduleSelect) {
        moduleSelect.innerHTML = '<option value="">— выбери модуль —</option>';
        modules.forEach((module) => {
            const option = document.createElement("option");
            option.value = module.id;
            option.textContent = module.title;
            moduleSelect.appendChild(option);
        });
    }

    function findModuleById(moduleId) {
        return modules.find((module) => module.id === moduleId);
    }

    function enforceSingleCorrectSelection(triggerInput) {
        if (!adminQuestionType || adminQuestionType.value === "multi") return;
        adminCorrectInputs.forEach(input => {
            if (input !== triggerInput) {
                input.checked = false;
            }
        });
        if (!adminCorrectInputs.some(input => input.checked) && adminCorrectInputs.length) {
            adminCorrectInputs[0].checked = true;
        }
    }

    function applyQuestionTypeConstraints() {
        if (!adminQuestionType || adminQuestionType.value === "multi") {
            adminCorrectInputs.forEach(input => { input.disabled = false; });
            return;
        }
        adminCorrectInputs.forEach((input, index) => {
            input.disabled = false;
            if (input.checked) {
                adminCorrectInputs.forEach((other, idx) => {
                    if (idx !== index) {
                        other.checked = false;
                    }
                });
            }
        });
    }

    function resetAdminForm(options = {}) {
        const { preserveModule = false, preserveQuestion = false } = options;
        if (!preserveModule && adminModuleSelect) adminModuleSelect.value = "";
        if (!preserveQuestion && adminQuestionSelect) adminQuestionSelect.value = "";
        if (adminQuestionText) adminQuestionText.value = "";
        if (adminCategory) adminCategory.value = "";
        if (adminDifficulty) adminDifficulty.value = "medium";
        if (adminQuestionType) adminQuestionType.value = "single";
        if (adminImageUrl) adminImageUrl.value = "";
        if (adminImageFile) adminImageFile.value = "";
        if (adminAnswer1) adminAnswer1.value = "";
        if (adminAnswer2) adminAnswer2.value = "";
        if (adminAnswer3) adminAnswer3.value = "";
        if (adminAnswer4) adminAnswer4.value = "";
        if (adminExplanation) adminExplanation.value = "";
        if (adminDocLink) adminDocLink.value = "";
        adminUploadedImageDataUrl = "";
        adminCorrectInputs.forEach((input, idx) => {
            input.checked = idx === 0;
        });
        if (adminEditingStatus) adminEditingStatus.classList.add("hidden");
        adminEditingQuestionId = null;
        adminEditingModuleId = null;
    }

    function populateAdminFormFromQuestion(question, options = {}) {
        if (!question) {
            resetAdminForm(options);
            return;
        }
        if (adminCategory) adminCategory.value = question.category || "";
        if (adminDifficulty) adminDifficulty.value = question.difficulty || "medium";
        const isMultiType = question.type === "multi" || question.type === "image_multi";
        if (adminQuestionType) adminQuestionType.value = isMultiType ? "multi" : "single";
        if (adminQuestionText) adminQuestionText.value = question.text || "";
        [adminAnswer1, adminAnswer2, adminAnswer3, adminAnswer4].forEach((input, idx) => {
            if (!input) return;
            const opt = question.options ? question.options[idx] : null;
            input.value = (opt && opt.text) || "";
            if (adminCorrectInputs[idx]) {
                adminCorrectInputs[idx].checked = !!(opt && opt.correct);
            }
        });
        if (adminImageUrl) adminImageUrl.value = question.imageUrl || "";
        if (adminImageFile) adminImageFile.value = "";
        adminUploadedImageDataUrl = "";
        if (adminExplanation) adminExplanation.value = question.explanation || "";
        if (adminDocLink) adminDocLink.value = question.docLink || "";
    }

    function refreshAdminQuestionOptions(preserveSelection = false) {
        if (!adminModuleSelect || !adminQuestionSelect) return;
        const moduleId = adminModuleSelect.value;
        const prevValue = preserveSelection ? adminQuestionSelect.value : "";
        adminQuestionSelect.innerHTML = '<option value="">— новый вопрос —</option>';
        const mod = modules.find(m => m.id === moduleId);
        if (mod && Array.isArray(mod.questions)) {
            mod.questions.forEach(q => {
                const opt = document.createElement("option");
                opt.value = q.id;
                opt.textContent = q.text.slice(0, 80);
                adminQuestionSelect.appendChild(opt);
            });
            if (prevValue) {
                const exists = Array.from(adminQuestionSelect.options).some(opt => opt.value === prevValue);
                if (exists) {
                    adminQuestionSelect.value = prevValue;
                }
            }
        }
    }

    function setEditingQuestionContext(moduleId, question) {
        adminEditingModuleId = moduleId;
        adminEditingQuestionId = question ? question.id : null;
        if (adminEditingStatus && question) {
            adminEditingStatus.textContent = "Редактируется вопрос: " + question.id;
            adminEditingStatus.classList.remove("hidden");
        } else if (adminEditingStatus) {
            adminEditingStatus.textContent = "";
            adminEditingStatus.classList.add("hidden");
        }
    }

    function showExportStatus(message, variant = "info") {
        if (!adminExportStatus) return;
        adminExportStatus.textContent = message;
        adminExportStatus.classList.remove(
            "hidden",
            "admin-export-status--error",
            "admin-export-status--success"
        );
        if (variant === "error") {
            adminExportStatus.classList.add("admin-export-status--error");
        } else if (variant === "success") {
            adminExportStatus.classList.add("admin-export-status--success");
        }
    }

    function hideExportStatus() {
        if (!adminExportStatus) return;
        adminExportStatus.textContent = "";
        adminExportStatus.classList.add("hidden");
        adminExportStatus.classList.remove("admin-export-status--error", "admin-export-status--success");
    }

    function ensureAdminAccess() {
        if (window.__adminUnlocked) return true;
        const password = window.prompt("Введите админ-пароль");
        if (password === ADMIN_PASSWORD) {
            window.__adminUnlocked = true;
            return true;
        }
        alert("Неверный пароль");
        return false;
    }

    function disableTestLaunchForAdminView() {
        setModuleSelectionVisible(false);
        document.body.classList.add("module-selection-hidden");
        if (moduleSelect) moduleSelect.disabled = true;
        if (startBtn) startBtn.disabled = true;
    }

    if (adminPanel) {
        adminPanel.classList.add("hidden");
    }
    hideExportStatus();

    if (adminToggleBtn && adminPanel) {
        adminToggleBtn.addEventListener("click", () => {
            if (!ensureAdminAccess()) {
                return;
            }
            adminPanel.classList.toggle("hidden");
            if (!adminPanel.classList.contains("hidden")) {
                adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    if (shouldOpenAdmin && adminPanel) {
        if (!window.__adminUnlocked) {
            window.__adminUnlocked = true;
        }
        adminPanel.classList.remove("hidden");
        adminPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        disableTestLaunchForAdminView();
    }

    if (adminModuleSelect) {
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = "— выберите раздел —";
        adminModuleSelect.appendChild(placeholderOption);
        modules.forEach((module) => {
            const optAdmin = document.createElement("option");
            optAdmin.value = module.id;
            optAdmin.textContent = module.title;
            adminModuleSelect.appendChild(optAdmin);
        });
    }

    if (adminImageFile) {
        adminImageFile.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) {
                adminUploadedImageDataUrl = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                adminUploadedImageDataUrl = reader.result || "";
            };
            reader.readAsDataURL(file);
        });
    }

    if (adminModuleSelect) {
        adminModuleSelect.addEventListener("change", () => {
            refreshAdminQuestionOptions();
            populateAdminFormFromQuestion(null, { preserveModule: true });
            setEditingQuestionContext(adminModuleSelect.value, null);
        });
    }

    if (adminQuestionSelect) {
        adminQuestionSelect.addEventListener("change", () => {
            const moduleId = adminModuleSelect ? adminModuleSelect.value : "";
            const questionId = adminQuestionSelect.value;
            if (!moduleId || !questionId) {
                populateAdminFormFromQuestion(null, { preserveModule: true, preserveQuestion: true });
                setEditingQuestionContext(moduleId, null);
                return;
            }
            const mod = modules.find(m => m.id === moduleId);
            const question = mod && mod.questions ? mod.questions.find(q => q.id === questionId) : null;
            populateAdminFormFromQuestion(question);
            setEditingQuestionContext(moduleId, question);
        });
    }

    if (adminQuestionType) {
        adminQuestionType.addEventListener("change", () => {
            applyQuestionTypeConstraints();
        });
    }

    adminCorrectInputs.forEach(input => {
        input.addEventListener("change", () => {
            enforceSingleCorrectSelection(input);
        });
    });

    if (adminResetQuestionBtn) {
        adminResetQuestionBtn.addEventListener("click", () => {
            populateAdminFormFromQuestion(null, { preserveModule: true });
            setEditingQuestionContext(adminModuleSelect ? adminModuleSelect.value : null, null);
        });
    }

    if (adminHomeBtn) {
        adminHomeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (adminExportBtn) {
        adminExportBtn.addEventListener("click", async () => {
            if (!customQuestions.length) {
                if (adminExportOutput) {
                    adminExportOutput.value = "";
                    adminExportOutput.classList.add("hidden");
                }
                showExportStatus("Нет локальных вопросов для экспорта.", "error");
                return;
            }
            const payload = buildCustomQuestionsExport();
            const serialized = JSON.stringify(payload, null, 2);
            if (adminExportOutput) {
                adminExportOutput.value = serialized;
                adminExportOutput.classList.remove("hidden");
                adminExportOutput.focus();
                adminExportOutput.select();
            }
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(serialized);
                    showExportStatus("JSON скопирован в буфер обмена.", "success");
                } else {
                    throw new Error("Clipboard API unavailable");
                }
            } catch (_) {
                showExportStatus("Скопируйте JSON вручную из поля ниже.", "error");
            }
        });
    }

    if (adminAddQuestionBtn) {
        adminAddQuestionBtn.addEventListener("click", () => {
            const moduleId = adminModuleSelect.value;
            if (!moduleId) {
                alert("Выбери раздел квиза");
                return;
            }
            const mod = modules.find(m => m.id === moduleId);
            if (!mod) {
                alert("Не найден раздел");
                return;
            }
            const text = adminQuestionText.value.trim();
            if (!text) {
                alert("Заполни текст вопроса");
                return;
            }
            const answers = [
                adminAnswer1 ? adminAnswer1.value.trim() : "",
                adminAnswer2 ? adminAnswer2.value.trim() : "",
                adminAnswer3 ? adminAnswer3.value.trim() : "",
                adminAnswer4 ? adminAnswer4.value.trim() : ""
            ].filter(Boolean);
            if (answers.length < 2) {
                alert("Нужно минимум два варианта ответа");
                return;
            }

            const correctSelected = adminCorrectInputs
                .map((input, idx) => (input.checked ? idx : -1))
                .filter(idx => idx >= 0);
            if (correctSelected.length === 0) {
                alert("Отметь хотя бы один правильный вариант");
                return;
            }

            const typeValue = adminQuestionType ? adminQuestionType.value : "single";
            if (typeValue !== "multi" && correctSelected.length > 1) {
                alert("Для одиночного вопроса можно выбрать только один правильный ответ");
                return;
            }

            const options = [];
            answers.forEach((ans, idx) => {
                const id = String.fromCharCode(97 + idx);
                options.push({
                    id,
                    text: ans,
                    correct: correctSelected.includes(idx)
                });
            });

            const effectiveImageUrl = adminUploadedImageDataUrl ||
                (adminImageUrl ? adminImageUrl.value.trim() : "");

            const questionId = adminQuestionSelect && adminQuestionSelect.value
                ? adminQuestionSelect.value
                : ("custom_" + Date.now());

            const explanationText = adminExplanation ? adminExplanation.value.trim() : "";
            const docLinkText = adminDocLink ? adminDocLink.value.trim() : "";

            const question = {
                id: questionId,
                type: typeValue === "multi" ? "multi" : "single",
                text,
                options,
                explanation: explanationText,
                docLink: docLinkText
            };

            if (effectiveImageUrl) {
                question.imageUrl = effectiveImageUrl;
            }
            const categoryValue = adminCategory ? adminCategory.value.trim() : "";
            if (categoryValue) {
                question.category = categoryValue;
            }
            if (adminDifficulty && adminDifficulty.value) {
                question.difficulty = adminDifficulty.value;
            }

            const isEditingExisting = adminEditingQuestionId && adminEditingModuleId === moduleId;
            if (isEditingExisting) {
                const existingIdx = mod.questions.findIndex(q => q.id === adminEditingQuestionId);
                if (existingIdx >= 0) {
                    mod.questions[existingIdx] = question;
                } else {
                    mod.questions.push(question);
                }
            } else {
                mod.questions.push(question);
            }

            mergeCustomQuestionIntoData(moduleId, question);
            updateCustomRegistry(moduleId, question);
            saveCustomQuestionsToStorage();

            refreshAdminQuestionOptions(true);
            populateAdminFormFromQuestion(question);
            setEditingQuestionContext(moduleId, question);
            alert("Вопрос сохранен. Чтобы добавить в постоянную базу — используй «Экспорт JSON» или перенеси объект в js/data.js");
        });
    }

    if (startBtn && moduleSelect) {
        startBtn.addEventListener("click", () => {
            const selectedModuleId = moduleSelect.value;
            const module = findModuleById(selectedModuleId);
            if (!module) {
                alert("Пожалуйста, выбери раздел.");
                return;
            }
            startModule(module);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex -= 1;
                renderQuestion();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (!currentModule) return;
            if (currentQuestionIndex < currentModule.questions.length - 1) {
                currentQuestionIndex += 1;
                renderQuestion();
            }
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener("click", () => {
            showResults();
        });
    }

    const checkBtn = document.getElementById("check-btn");
    if (checkBtn) {
        checkBtn.addEventListener("click", () => {
            if (!currentModule) return;
            const q = currentModule.questions[currentQuestionIndex];
            const selected = userAnswers[q.id];

            if (!selected || selected.size === 0) {
                alert("Выберите вариант ответа");
                return;
            }

            checkedQuestions.add(q.id);
            renderQuestion();
        });
    }

    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            if (currentModule) {
                startModule(currentModule);
            }
        });
    }

    function enableModuleSelection() {
        if (moduleSelect) moduleSelect.disabled = false;
        if (startBtn) startBtn.disabled = false;
    }

    if (backToModulesBtn) {
        backToModulesBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (quizHomeBtn) {
        quizHomeBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (!initialModuleId && restoredState) {
        startModule(restoredState.module, {
            initialIndex: restoredState.index,
            answers: restoredState.answers,
            checked: restoredState.checked
        });
        return;
    }

    if (initialModuleId) {
        const initialModule = findModuleById(initialModuleId);
        if (initialModule) {
            moduleSelect.value = initialModule.id;
            startModule(initialModule);
            return;
        }
    }

    setModuleSelectionVisible(true);
}

function setModuleSelectionVisible(isVisible) {
    const moduleSelection = document.getElementById("module-selection");
    if (!moduleSelection) return;
    moduleSelection.classList.toggle("hidden", !isVisible);
    moduleSelection.style.display = isVisible ? "flex" : "none";
}

function startModule(module, options = {}) {
    if (!module) return;
    const { initialIndex = 0, answers = null, checked = null } = options;
    const baseQuestions = Array.isArray(module.questions) ? module.questions : [];
    const workingQuestions = module.shuffleQuestions
        ? shuffleArray(baseQuestions)
        : baseQuestions.slice();
    const preparedModule = { ...module, questions: workingQuestions };
    const maxIndex = Math.max(workingQuestions.length - 1, 0);
    currentQuestionIndex = Math.min(Math.max(initialIndex, 0), maxIndex);
    userAnswers = {};
    if (answers && typeof answers === "object") {
        Object.entries(answers).forEach(([qid, value]) => {
            if (!qid) return;
            if (value instanceof Set) {
                userAnswers[qid] = new Set(value);
            } else if (Array.isArray(value)) {
                userAnswers[qid] = new Set(value);
            }
        });
    }
    checkedQuestions = checked instanceof Set ? new Set(checked) : new Set();
    currentModule = preparedModule;

    const moduleSelect = document.getElementById("module-select");
    const startBtn = document.getElementById("start-btn");

    setModuleSelectionVisible(false);
    document.body.classList.add("module-selection-hidden");
    if (moduleSelect) {
        moduleSelect.value = preparedModule.id;
        moduleSelect.disabled = true;
    }
    if (startBtn) startBtn.disabled = true;

    const resultContainer = document.getElementById("result-container");
    const quizContainer = document.getElementById("quiz-container");
    if (resultContainer) resultContainer.classList.add("hidden");
    if (quizContainer) quizContainer.classList.remove("hidden");

    const titleEl = document.getElementById("quiz-title");
    const breadcrumbModule = document.getElementById("quiz-breadcrumb-module");
    const quizStartTimeEl = document.getElementById("quiz-start-time");
    const startedAt = new Date();

    if (breadcrumbModule) {
        breadcrumbModule.textContent = preparedModule.title;
    }
    if (titleEl) {
        titleEl.textContent = preparedModule.title;
    }
    if (quizStartTimeEl) {
        quizStartTimeEl.textContent =
            "Начало теста: " +
            startedAt.toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        quizStartTimeEl.classList.remove("hidden");
    }

    renderQuestion();
}

function returnToModuleSelection() {
    currentModule = null;
    userAnswers = {};
    currentQuestionIndex = 0;
    checkedQuestions = new Set();
    clearStoredProgress();

    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const moduleSelect = document.getElementById("module-select");
    const startBtn = document.getElementById("start-btn");
    const breadcrumbModule = document.getElementById("quiz-breadcrumb-module");
    const quizStartTimeEl = document.getElementById("quiz-start-time");
    const titleEl = document.getElementById("quiz-title");

    if (quizContainer) quizContainer.classList.add("hidden");
    if (resultContainer) resultContainer.classList.add("hidden");

    setModuleSelectionVisible(true);
    document.body.classList.remove("module-selection-hidden");
    if (moduleSelect) moduleSelect.disabled = false;
    if (startBtn) startBtn.disabled = false;

    if (breadcrumbModule) breadcrumbModule.textContent = "—";
    if (titleEl) titleEl.textContent = "";
    if (quizStartTimeEl) {
        quizStartTimeEl.textContent = "";
        quizStartTimeEl.classList.add("hidden");
    }
}

function renderQuestion() {
    if (!currentModule) return;
    const q = currentModule.questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");
    const progress = document.getElementById("quiz-progress");
    const progressInner = document.getElementById("quiz-progress-inner");

    if (!q || !questionContainer) {
        return;
    }

    const total = currentModule.questions.length;
    if (progress) {
        progress.textContent = "Вопрос " + (currentQuestionIndex + 1) + " из " + total;
    }
    if (progressInner && total > 0) {
        const ratio = ((currentQuestionIndex + 1) / total) * 100;
        progressInner.style.width = ratio + "%";
    }

    questionContainer.textContent = "";

    const questionTextEl = document.createElement("div");
    questionTextEl.className = "question-text";
    setSafeHtml(questionTextEl, q.text || "");
    questionContainer.appendChild(questionTextEl);

    const badgeElements = [];
    if (q.difficulty) {
        let diffClass = "badge-difficulty-medium";
        let diffLabel = "Средний";
        if (q.difficulty === "easy") {
            diffClass = "badge-difficulty-easy";
            diffLabel = "Легкий";
        } else if (q.difficulty === "hard") {
            diffClass = "badge-difficulty-hard";
            diffLabel = "Сложный";
        }
        const difficultyBadge = document.createElement("span");
        difficultyBadge.className = "badge " + diffClass;
        difficultyBadge.textContent = "Сложность: " + diffLabel;
        badgeElements.push(difficultyBadge);
    }
    if (q.category) {
        const categoryBadge = document.createElement("span");
        categoryBadge.className = "badge badge-category";
        categoryBadge.textContent = "Категория: " + q.category;
        badgeElements.push(categoryBadge);
    }
    if (badgeElements.length) {
        const badgesWrapper = document.createElement("div");
        badgesWrapper.className = "question-badges";
        badgeElements.forEach((badge) => badgesWrapper.appendChild(badge));
        questionContainer.appendChild(badgesWrapper);
    }

    if (q.imageUrl) {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "media-block";
        const img = document.createElement("img");
        img.src = q.imageUrl;
        img.alt = "Изображение к вопросу";
        imageWrapper.appendChild(img);
        questionContainer.appendChild(imageWrapper);
    }

    if (q.videoUrl) {
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "media-block";
        const video = document.createElement("video");
        video.controls = true;
        video.src = q.videoUrl;
        video.textContent = "Ваш браузер не поддерживает видео.";
        videoWrapper.appendChild(video);
        questionContainer.appendChild(videoWrapper);
    }

    const selected = userAnswers[q.id] || new Set();
    const isMulti = q.type === "multi" || q.type === "image_multi";
    const inputType = isMulti ? "checkbox" : "radio";
    const isChecked = checkedQuestions.has(q.id);
    const isCorrect = computeQuestionCorrect(q, Array.from(selected));

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "options";

    q.options.forEach((opt) => {
        const label = document.createElement("label");
        let optionClass = "option";
        if (isChecked) {
            if (opt.correct) {
                optionClass += " correct";
            } else if (selected.has(opt.id) && !opt.correct) {
                optionClass += " incorrect";
            }
        }
        label.className = optionClass;

        const input = document.createElement("input");
        input.type = inputType;
        input.name = "q_" + q.id;
        input.value = opt.id;
        input.checked = selected.has(opt.id);
        input.disabled = isChecked;
        label.appendChild(input);

        const textSpan = document.createElement("span");
        textSpan.textContent = opt.text;
        label.appendChild(textSpan);

        optionsWrapper.appendChild(label);
    });

    questionContainer.appendChild(optionsWrapper);

    const inputs = optionsWrapper.querySelectorAll("input[type=radio], input[type=checkbox]");
    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (isChecked) return;
            handleOptionChange(q, input, isMulti);
            updateNavigationButtons();
        });
    });

    if (isChecked) {
        const feedbackClass = isCorrect ? "feedback-correct" : "feedback-incorrect";
        const feedbackTitle = isCorrect ? "Правильно" : "Неправильно";
        const feedbackIcon = isCorrect ? "✅" : "❌";
        const feedbackBox = document.createElement("div");
        feedbackBox.className = "feedback-box " + feedbackClass;

        const header = document.createElement("div");
        header.className = "feedback-header";
        const iconSpan = document.createElement("span");
        iconSpan.className = "feedback-icon";
        iconSpan.textContent = feedbackIcon;
        const titleStrong = document.createElement("strong");
        titleStrong.textContent = feedbackTitle;
        header.appendChild(iconSpan);
        header.appendChild(titleStrong);
        feedbackBox.appendChild(header);

        const content = document.createElement("div");
        content.className = "feedback-content";
        if (q.explanation) {
            const explanation = document.createElement("p");
            setSafeHtml(explanation, q.explanation);
            content.appendChild(explanation);
        }
        if (q.docLink) {
            const docWrapper = document.createElement("div");
            docWrapper.className = "feedback-doc-link";
            docWrapper.append("📖 ");
            const link = createSafeExternalLink(q.docLink, "Ссылка на документацию");
            if (link) {
                docWrapper.appendChild(link);
                content.appendChild(docWrapper);
            }
        }
        feedbackBox.appendChild(content);
        questionContainer.appendChild(feedbackBox);
    }

    persistProgress();
    updateNavigationButtons();
}

function handleOptionChange(question, inputElement, isMulti) {
    const qid = question.id;
    if (!userAnswers[qid]) {
        userAnswers[qid] = new Set();
    }
    const selected = userAnswers[qid];

    if (isMulti) {
        if (inputElement.checked) {
            selected.add(inputElement.value);
        } else {
            selected.delete(inputElement.value);
        }
    } else {
        selected.clear();
        if (inputElement.checked) {
            selected.add(inputElement.value);
        }
    }
    persistProgress();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const finishBtn = document.getElementById("finish-btn");
    const checkBtn = document.getElementById("check-btn");

    if (!currentModule) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        if (finishBtn) finishBtn.classList.add("hidden");
        if (checkBtn) checkBtn.classList.add("hidden");
        return;
    }

    const total = currentModule.questions.length;
    const q = currentModule.questions[currentQuestionIndex];
    const isChecked = checkedQuestions.has(q.id);

    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;

    // Logic:
    // 1. If not checked: Show "Check", Hide "Next", Hide "Finish"
    // 2. If checked: Hide "Check"
    //    - If last question: Show "Finish", Hide "Next"
    //    - If not last: Show "Next", Hide "Finish"

    if (!isChecked) {
        if (checkBtn) checkBtn.classList.remove("hidden");
        if (nextBtn) nextBtn.classList.add("hidden");
        if (finishBtn) finishBtn.classList.add("hidden");
    } else {
        if (checkBtn) checkBtn.classList.add("hidden");

        if (currentQuestionIndex === total - 1) {
            if (nextBtn) nextBtn.classList.add("hidden");
            if (finishBtn) finishBtn.classList.remove("hidden");
        } else {
            if (nextBtn) nextBtn.classList.remove("hidden");
            if (finishBtn) finishBtn.classList.add("hidden");
        }
    }
}

function computeQuestionCorrect(question, selectedIds) {
    const correctIds = question.options.filter(o => o.correct).map(o => o.id);
    if (correctIds.length === 0) return true;
    if (selectedIds.length !== correctIds.length) return false;
    const setSelected = new Set(selectedIds);
    for (const id of correctIds) {
        if (!setSelected.has(id)) return false;
    }
    return true;
}

function showResults() {
    if (!currentModule) return;
    clearStoredProgress();
    const resultContainer = document.getElementById("result-container");
    const quizContainer = document.getElementById("quiz-container");
    const summaryEl = document.getElementById("result-summary");
    const detailsEl = document.getElementById("result-details");

    if (quizContainer) quizContainer.classList.add("hidden");
    if (resultContainer) resultContainer.classList.remove("hidden");

    if (!detailsEl || !summaryEl) {
        return;
    }

    const questions = currentModule.questions;
    let correctCount = 0;

    detailsEl.textContent = "";

    const createAnswerRow = (label, value) => {
        const row = document.createElement("div");
        row.className = "result-answer-row";
        const labelEl = document.createElement("span");
        labelEl.className = "result-answer-label";
        labelEl.textContent = label + ": ";
        row.appendChild(labelEl);
        row.appendChild(document.createTextNode(value));
        return row;
    };

    questions.forEach((q, index) => {
        const selectedSet = userAnswers[q.id] || new Set();
        const selectedIds = Array.from(selectedSet);
        const isCorrect = computeQuestionCorrect(q, selectedIds);
        if (isCorrect) correctCount += 1;

        const card = document.createElement("article");
        card.className = "result-question-card " + (isCorrect ? "is-correct" : "is-incorrect");

        const titleRow = document.createElement("div");
        titleRow.className = "result-question-card__title-row";

        const title = document.createElement("h3");
        title.className = "result-question-card__title";
        setSafeHtml(title, (index + 1) + ". " + (q.text || ""));
        titleRow.appendChild(title);

        const status = document.createElement("span");
        status.className =
            "result-question-card__status " + (isCorrect ? "is-correct" : "is-incorrect");
        status.textContent = isCorrect ? "Ответ верный" : "Ответ неверный";
        titleRow.appendChild(status);

        card.appendChild(titleRow);

        const correctOpts = q.options.filter(o => o.correct).map(o => o.text);
        const userOpts = q.options.filter(o => selectedIds.includes(o.id)).map(o => o.text);

        card.appendChild(
            createAnswerRow(
                "Правильные варианты",
                correctOpts.length ? correctOpts.join("; ") : "нет явного правильного ответа"
            )
        );
        card.appendChild(
            createAnswerRow("Ваш ответ", userOpts.length ? userOpts.join("; ") : "ничего не выбрано")
        );

        if (q.category || q.difficulty) {
            const meta = document.createElement("div");
            meta.className = "result-question-card__meta";
            const metaParts = [];
            if (q.category) {
                metaParts.push("Категория: " + q.category);
            }
            if (q.difficulty) {
                let diffLabel = "Средний";
                if (q.difficulty === "easy") diffLabel = "Легкий";
                if (q.difficulty === "hard") diffLabel = "Сложный";
                metaParts.push("Сложность: " + diffLabel);
            }
            meta.textContent = metaParts.join(" • ");
            card.appendChild(meta);
        }

        if (q.explanation) {
            const expl = document.createElement("div");
            expl.className = "result-question-card__explanation";
            setSafeHtml(expl, q.explanation);
            card.appendChild(expl);
        }
        if (q.docLink) {
            const doc = document.createElement("div");
            doc.className = "result-question-card__doc";
            const docLink = createSafeExternalLink(q.docLink, "Документация по вопросу");
            if (docLink) {
                doc.appendChild(docLink);
                card.appendChild(doc);
            }
        }

        detailsEl.appendChild(card);
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= currentModule.passPercent;
    persistModuleResult(currentModule.id, passed);

    if (summaryEl) {
        summaryEl.textContent = "";
        const statusChip = document.createElement("div");
        statusChip.className =
            "result-summary__status " + (passed ? "is-passed" : "is-failed");
        statusChip.textContent = passed ? "Раздел пройден" : "Нужно повторить";
        summaryEl.appendChild(statusChip);

        const infoLine = document.createElement("div");
        infoLine.className = "result-summary__line";
        infoLine.textContent =
            "Вы набрали " +
            percent +
            "% (" +
            correctCount +
            " из " +
            questions.length +
            "). Проходной балл: " +
            currentModule.passPercent +
            "%.";
        summaryEl.appendChild(infoLine);

        const stats = document.createElement("div");
        stats.className = "result-summary__stats";
        const statCorrect = document.createElement("div");
        statCorrect.textContent = "Правильных";
        const correctValue = document.createElement("span");
        correctValue.className = "result-summary__statvalue";
        correctValue.textContent = String(correctCount);
        statCorrect.appendChild(correctValue);
        stats.appendChild(statCorrect);

        const statTotal = document.createElement("div");
        statTotal.textContent = "Всего вопросов";
        const totalValue = document.createElement("span");
        totalValue.className = "result-summary__statvalue";
        totalValue.textContent = String(questions.length);
        statTotal.appendChild(totalValue);
        stats.appendChild(statTotal);

        const statPass = document.createElement("div");
        statPass.textContent = "Проходной балл";
        const passValue = document.createElement("span");
        passValue.className = "result-summary__statvalue";
        passValue.textContent = currentModule.passPercent + "%";
        statPass.appendChild(passValue);
        stats.appendChild(statPass);

        summaryEl.appendChild(stats);

        if (!passed) {
            const docLinkUrl =
                (currentModule && MODULE_DOC_LINKS[currentModule.id]) || DOCS_LINK;
            const docLinkElement = createSafeExternalLink(docLinkUrl, "Compliance Wiki");
            if (docLinkElement) {
                const docWrapper = document.createElement("div");
                docWrapper.className = "result-summary__doc";
                docWrapper.append(
                    "Перейдите к документации, чтобы закрыть пробелы: "
                );
                docWrapper.appendChild(docLinkElement);
                summaryEl.appendChild(docWrapper);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initQuizApp();
});
