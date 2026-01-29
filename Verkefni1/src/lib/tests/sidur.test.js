import test from "node:test";
import assert from "node:assert/strict";
import { indexHtml, categoryHtml, questionsHtml } from "../sidur.js";

test("indexHtml: contains expected page shell and links", () => {
  const html = indexHtml();

  assert.ok(html.includes("<!DOCTYPE html>"));
  assert.ok(html.includes('<html lang="is">'));
  assert.ok(html.includes("<title>Trivia Spurningaleikur</title>"));
  assert.ok(html.includes('<script src="scripts.js" type="module"></script>'));

  assert.ok(html.includes('href="general.html"'));
  assert.ok(html.includes('href="nature.html"'));
  assert.ok(html.includes('href="lit.html"'));
  assert.ok(html.includes('href="saga.html"'));
  assert.ok(html.includes('href="geo.html"'));
  assert.ok(html.includes('href="fun.html"'));
  assert.ok(html.includes('href="sport.html"'));

  assert.ok(html.includes('id="footer-info"'));
  assert.ok(html.includes("is-trivia-questions"));
});

test("questionsHtml: renders a question section with data attrs and answer", () => {
  const q = {
    question: "Hvað er 2+2?",
    answer: "4",
    difficulty: "2",
    quality: "3",
  };

  const html = questionsHtml(q);

  assert.ok(html.includes('class="question"'));
  assert.ok(html.includes('data-answered="false"'));
  assert.ok(html.includes('data-difficulty="2"'));
  assert.ok(html.includes('data-quality="3"'));

  assert.ok(html.includes("<h3>Hvað er 2+2?</h3>"));
  assert.ok(html.includes('<p class="answer">4</p>'));

  assert.ok(html.includes('class="showAnswer"'));
  assert.ok(html.includes('class="hideAnswer"'));
  assert.ok(html.includes("button-correct"));
  assert.ok(html.includes("button-incorrect"));
});

test("questionsHtml: difficulty/quality fallback to empty string when missing", () => {
  const q = { question: "Q", answer: "A" };
  const html = questionsHtml(q);

  assert.ok(html.includes('data-difficulty=""'));
  assert.ok(html.includes('data-quality=""'));
});

test("categoryHtml: renders title, filters, counters, and all questions", () => {
  const questions = [
    { question: "Q1", answer: "A1", difficulty: "1", quality: "1" },
    { question: "Q2", answer: "A2", difficulty: "2", quality: "2" },
  ];

  const html = categoryHtml({ title: "Almenn kunnátta", questions });

  assert.ok(html.includes("<title>Almenn kunnátta - Spurningaleikur</title>"));
  assert.ok(html.includes("<h2>Almenn kunnátta</h2>"));

  assert.ok(html.includes('id="difficultyFilter"'));
  assert.ok(html.includes('id="qualityFilter"'));

  assert.ok(html.includes('class="counter"'));
  assert.ok(html.includes('class="correct">Rétt: <span>0</span>'));
  assert.ok(html.includes('class="incorrect">Rangt: <span>0</span>'));

  assert.ok(html.includes("<h3>Q1</h3>"));
  assert.ok(html.includes('<p class="answer">A1</p>'));
  assert.ok(html.includes("<h3>Q2</h3>"));
  assert.ok(html.includes('<p class="answer">A2</p>'));
});

test("categoryHtml: renders fine with no questions", () => {
  const html = categoryHtml({ title: "Tómt", questions: [] });

  assert.ok(html.includes("<h2>Tómt</h2>"));
  assert.ok(html.includes('class="questions"'));
});
