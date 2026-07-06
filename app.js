import { QUESTIONS, RULES } from "./questions.js";

const letters = ["A", "B", "C", "D", "E"];
const $ = (selector) => document.querySelector(selector);

const state = {
  mode: "tryout",
  questions: [],
  answers: [],
  flags: [],
  current: 0,
  participant: "Peserta Tryout",
  remaining: 0,
  timerId: null,
  startedAt: null,
  result: null,
};

const lms = {
  questions: [],
  current: 0,
  selected: null,
  locked: false,
};

function byCategory(category) {
  return QUESTIONS.filter((question) => question.category === category);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function withShuffledOptions(question) {
  const correctOption = question.options[question.answerIndex];
  const options = shuffle(question.options);
  return {
    ...question,
    options,
    answerIndex: options.indexOf(correctOption),
  };
}

function buildPacket() {
  const packet = [];
  Object.entries(RULES).forEach(([category, rule]) => {
    packet.push(...shuffle(byCategory(category)).slice(0, rule.take));
  });
  return shuffle(packet).map((question, index) => ({ ...withShuffledOptions(question), id: index + 1 }));
}

function renderBankStats() {
  $("#hardBank").textContent = byCategory("SULIT").length;
  $("#mediumBank").textContent = byCategory("MUDAH").length;
  $("#basicBank").textContent = byCategory("SANGAT_MUDAH").length;
}

function setTab(nextMode) {
  state.mode = nextMode;
  $("#tabTryout").classList.toggle("active", nextMode === "tryout");
  $("#tabLms").classList.toggle("active", nextMode === "lms");
  $("#tryoutView").classList.toggle("hidden", nextMode !== "tryout");
  $("#lmsView").classList.toggle("hidden", nextMode !== "lms");
}

function startExam() {
  state.questions = buildPacket();
  state.answers = Array(state.questions.length).fill(null);
  state.flags = Array(state.questions.length).fill(false);
  state.current = 0;
  state.participant = $("#candidateName").value.trim() || "Peserta Tryout";
  state.remaining = Math.min(Math.max(Number($("#durationInput").value) || 120, 10), 240) * 60;
  state.startedAt = new Date();
  state.result = null;

  $("#participantLabel").textContent = state.participant;
  $("#maxScore").textContent = maxScore(state.questions).toFixed(6);
  $("#startPanel").classList.add("hidden");
  $("#examPanel").classList.remove("hidden");
  $("#resultPanel").classList.add("hidden");

  buildNumberGrid();
  renderQuestion();
  renderProgress();
  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  renderTimer();
  state.timerId = setInterval(() => {
    state.remaining -= 1;
    renderTimer();
    if (state.remaining <= 0) finishExam();
  }, 1000);
}

function renderTimer() {
  const seconds = Math.max(state.remaining, 0);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  $("#timer").textContent = [h, m, s].map((value) => String(value).padStart(2, "0")).join(":");
}

function buildNumberGrid() {
  $("#numberGrid").innerHTML = "";
  state.questions.forEach((_, index) => {
    const button = document.createElement("button");
    button.className = "num";
    button.type = "button";
    button.textContent = index + 1;
    button.addEventListener("click", () => {
      state.current = index;
      renderQuestion();
    });
    $("#numberGrid").append(button);
  });
}

function renderQuestion() {
  const question = state.questions[state.current];
  const rule = RULES[question.category];

  $("#questionNumber").textContent = `Soal ${state.current + 1} dari ${state.questions.length}`;
  $("#questionCategory").textContent = rule.label;
  $("#questionModule").textContent = question.module;
  $("#questionText").textContent = question.question;
  $("#optionList").innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = `option${state.answers[state.current] === index ? " selected" : ""}`;
    button.type = "button";
    button.innerHTML = `<span class="key">${letters[index]}</span><span>${escapeHtml(option)}</span>`;
    button.addEventListener("click", () => {
      state.answers[state.current] = index;
      renderQuestion();
      renderProgress();
    });
    $("#optionList").append(button);
  });

  $("#prevQuestion").disabled = state.current === 0;
  $("#nextQuestion").disabled = state.current === state.questions.length - 1;
  $("#flagQuestion").textContent = state.flags[state.current] ? "Hapus Ragu" : "Tandai Ragu";
  renderNumberState();
}

function renderNumberState() {
  [...$("#numberGrid").children].forEach((button, index) => {
    button.className = "num";
    if (index === state.current) button.classList.add("active");
    if (state.answers[index] !== null) button.classList.add("answered");
    if (state.flags[index]) button.classList.add("flagged");
  });
}

function renderProgress() {
  const answered = state.answers.filter((answer) => answer !== null).length;
  const flagged = state.flags.filter(Boolean).length;
  $("#answeredCount").textContent = `${answered}/${state.questions.length}`;
  $("#flaggedCount").textContent = flagged;
  $("#blankCount").textContent = state.questions.length - answered;
  renderNumberState();
}

function moveQuestion(direction) {
  state.current = Math.min(Math.max(state.current + direction, 0), state.questions.length - 1);
  renderQuestion();
}

function toggleFlag() {
  state.flags[state.current] = !state.flags[state.current];
  renderQuestion();
  renderProgress();
}

function clearAnswer() {
  state.answers[state.current] = null;
  renderQuestion();
  renderProgress();
}

function maxScore(questions) {
  return questions.reduce((sum, question) => sum + RULES[question.category].correct, 0);
}

function calculateResult() {
  const details = state.questions.map((question, index) => {
    const selected = state.answers[index];
    const status = selected === null ? "blank" : selected === question.answerIndex ? "correct" : "wrong";
    const score = status === "blank" ? 0 : status === "correct" ? RULES[question.category].correct : RULES[question.category].wrong;
    return { index, question, selected, status, score };
  });

  const categoryStats = Object.fromEntries(
    Object.keys(RULES).map((category) => [category, { total: 0, correct: 0, wrong: 0, blank: 0, score: 0, max: 0 }]),
  );

  details.forEach((detail) => {
    const stat = categoryStats[detail.question.category];
    stat.total += 1;
    stat[detail.status] += 1;
    stat.score += detail.score;
    stat.max += RULES[detail.question.category].correct;
  });

  return {
    participant: state.participant,
    startedAt: state.startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
    totalScore: details.reduce((sum, detail) => sum + detail.score, 0),
    maxScore: maxScore(state.questions),
    answered: state.answers.filter((answer) => answer !== null).length,
    blank: state.answers.filter((answer) => answer === null).length,
    flagged: state.flags.filter(Boolean).length,
    categoryStats,
    details,
  };
}

function finishExam() {
  clearInterval(state.timerId);
  state.result = calculateResult();
  $("#examPanel").classList.add("hidden");
  $("#resultPanel").classList.remove("hidden");
  $("#scoreTotal").textContent = state.result.totalScore.toFixed(6);
  $("#resultSummary").textContent = `${state.result.participant} menjawab ${state.result.answered} dari ${state.questions.length} soal. Nilai maksimal paket ini ${state.result.maxScore.toFixed(6)}.`;
  renderReport();
  renderReview();
}

function renderReport() {
  $("#categoryReport").innerHTML = "";
  Object.entries(RULES).forEach(([category, rule]) => {
    const stat = state.result.categoryStats[category];
    const card = document.createElement("article");
    card.className = "card report-card";
    card.innerHTML = `
      <h2>${rule.label}</h2>
      <div class="metric">
        <div><span>Jumlah</span><strong>${stat.total}</strong></div>
        <div><span>Skor</span><strong>${stat.score.toFixed(6)}</strong></div>
        <div><span>Benar</span><strong>${stat.correct}</strong></div>
        <div><span>Salah</span><strong>${stat.wrong}</strong></div>
        <div><span>Kosong</span><strong>${stat.blank}</strong></div>
        <div><span>Maksimal</span><strong>${stat.max.toFixed(6)}</strong></div>
      </div>
    `;
    $("#categoryReport").append(card);
  });
}

function renderReview() {
  $("#reviewPanel").innerHTML = "";
  state.result.details.forEach((detail) => {
    const question = detail.question;
    const selected = detail.selected === null ? "Tidak dijawab" : `${letters[detail.selected]}. ${question.options[detail.selected]}`;
    const correct = `${letters[question.answerIndex]}. ${question.options[question.answerIndex]}`;
    const item = document.createElement("article");
    item.className = `review-item ${detail.status === "correct" ? "correct" : detail.status === "wrong" ? "wrong" : ""}`;
    item.innerHTML = `
      <h3>${detail.index + 1}. ${escapeHtml(question.question)}</h3>
      <p><strong>Modul:</strong> ${escapeHtml(question.module)} | <strong>Kategori:</strong> ${RULES[question.category].label} | <strong>Skor:</strong> ${detail.score.toFixed(6)}</p>
      <p><strong>Jawaban Anda:</strong> ${escapeHtml(selected)}</p>
      <p><strong>Kunci:</strong> ${escapeHtml(correct)}</p>
      <p><strong>Pembahasan:</strong> ${escapeHtml(question.explanation)}</p>
    `;
    $("#reviewPanel").append(item);
  });
}

function resetExam() {
  clearInterval(state.timerId);
  $("#startPanel").classList.remove("hidden");
  $("#examPanel").classList.add("hidden");
  $("#resultPanel").classList.add("hidden");
  $("#reviewPanel").classList.add("hidden");
}

function exportResult() {
  if (!state.result) return;
  const blob = new Blob([JSON.stringify(state.result, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `hasil-tryout-ppat-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function moduleNames() {
  return [...new Set(QUESTIONS.map((question) => question.module))].sort((a, b) => a.localeCompare(b));
}

function initLms() {
  const modules = moduleNames();
  $("#moduleSelect").innerHTML = modules.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  renderModuleStats();
  loadLmsModule(modules[0]);
}

function renderModuleStats() {
  $("#moduleStats").innerHTML = "";
  moduleNames().forEach((name) => {
    const count = QUESTIONS.filter((question) => question.module === name).length;
    const item = document.createElement("div");
    item.className = "module-stat";
    item.innerHTML = `<strong>${escapeHtml(name)}</strong><span>${count} soal belajar</span>`;
    $("#moduleStats").append(item);
  });
}

function loadLmsModule(moduleName) {
  lms.questions = shuffle(QUESTIONS.filter((question) => question.module === moduleName)).map(withShuffledOptions);
  lms.current = 0;
  lms.selected = null;
  lms.locked = false;
  renderLms();
}

function renderLms() {
  const question = lms.questions[lms.current];
  if (!question) return;
  $("#lmsProgress").textContent = `${lms.current + 1}/${lms.questions.length}`;
  $("#lmsCategory").textContent = RULES[question.category].label;
  $("#lmsModule").textContent = question.module;
  $("#lmsQuestion").textContent = question.question;
  $("#lmsFeedback").classList.add("hidden");
  $("#lmsOptions").innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.innerHTML = `<span class="key">${letters[index]}</span><span>${escapeHtml(option)}</span>`;
    button.addEventListener("click", () => answerLms(index));
    $("#lmsOptions").append(button);
  });

  $("#lmsPrev").disabled = lms.current === 0;
  $("#lmsNext").disabled = lms.current === lms.questions.length - 1;
}

function answerLms(index) {
  if (lms.locked) return;
  lms.selected = index;
  lms.locked = true;
  const question = lms.questions[lms.current];
  const isCorrect = index === question.answerIndex;

  [...$("#lmsOptions").children].forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === question.answerIndex) button.classList.add("correct");
    if (optionIndex === index && !isCorrect) button.classList.add("wrong");
  });

  const feedback = $("#lmsFeedback");
  feedback.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  feedback.innerHTML = `
    <strong>${isCorrect ? "Benar." : "Belum tepat."}</strong>
    <p><strong>Kunci:</strong> ${letters[question.answerIndex]}. ${escapeHtml(question.options[question.answerIndex])}</p>
    <p>${escapeHtml(question.explanation)}</p>
  `;
  feedback.classList.remove("hidden");
}

function moveLms(direction) {
  lms.current = Math.min(Math.max(lms.current + direction, 0), lms.questions.length - 1);
  lms.selected = null;
  lms.locked = false;
  renderLms();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

$("#tabTryout").addEventListener("click", () => setTab("tryout"));
$("#tabLms").addEventListener("click", () => setTab("lms"));
$("#startExam").addEventListener("click", startExam);
$("#reshufflePreview").addEventListener("click", () => {
  const packet = buildPacket();
  alert(`Paket acak siap: ${packet.length} soal. Klik Mulai Paket Acak untuk mengerjakan.`);
});
$("#prevQuestion").addEventListener("click", () => moveQuestion(-1));
$("#nextQuestion").addEventListener("click", () => moveQuestion(1));
$("#flagQuestion").addEventListener("click", toggleFlag);
$("#clearAnswer").addEventListener("click", clearAnswer);
$("#submitExam").addEventListener("click", () => {
  const blank = state.answers.filter((answer) => answer === null).length;
  const message = blank ? `Masih ada ${blank} soal kosong. Submit sekarang?` : "Submit tryout sekarang?";
  if (window.confirm(message)) finishExam();
});
$("#reviewToggle").addEventListener("click", () => {
  $("#reviewPanel").classList.toggle("hidden");
  $("#reviewToggle").textContent = $("#reviewPanel").classList.contains("hidden") ? "Review Pembahasan" : "Sembunyikan Review";
});
$("#newExam").addEventListener("click", resetExam);
$("#exportResult").addEventListener("click", exportResult);
$("#moduleSelect").addEventListener("change", (event) => loadLmsModule(event.target.value));
$("#lmsPrev").addEventListener("click", () => moveLms(-1));
$("#lmsNext").addEventListener("click", () => moveLms(1));

renderBankStats();
initLms();
