import test from "node:test";
import assert from "node:assert/strict";
import { main } from "../generate.js";
import * as fs from "node:fs/promises";
import * as parseModule from "../lib/parse.js";
import * as sidur from "../lib/sidur.js";

test("generate.js: creates dist files for all categories", async (t) => {
  const writtenFiles = new Map();

  t.mock.method(fs, "mkdir", async () => {});
  t.mock.method(fs, "readFile", async () =>
    [
      "q1,a1,1,1,1",
      "q2,a2,2,2,2",
      "q3,a3,3,3,3",
      "q4,a4,4,4,4",
      "q5,a5,5,5,5",
      "q6,a6,6,6,6",
      "q7,a7,7,7,7",
    ].join("\n")
  );

  t.mock.method(fs, "writeFile", async (path, content) => {
    writtenFiles.set(path, content);
  });

  t.mock.method(parseModule, "parseQuestions", (line) => {
    const [question, answer, categoryNumber, difficulty, quality] =
      line.split(",");

    return {
      question,
      answer,
      categoryNumber,
      difficulty,
      quality,
    };
  });

  t.mock.method(sidur, "indexHtml", () => "<index />");
  t.mock.method(sidur, "categoryHtml", ({ title }) => `<category>${title}</category>`);

  t.mock.method(Math, "random", () => 0.5);

  await main();

  assert.ok(writtenFiles.has("./dist/index.html"));
  assert.ok(writtenFiles.has("./dist/general.html"));
  assert.ok(writtenFiles.has("./dist/nature.html"));
  assert.ok(writtenFiles.has("./dist/lit.html"));
  assert.ok(writtenFiles.has("./dist/saga.html"));
  assert.ok(writtenFiles.has("./dist/geo.html"));
  assert.ok(writtenFiles.has("./dist/fun.html"));
  assert.ok(writtenFiles.has("./dist/sport.html"));

  assert.equal(writtenFiles.get("./dist/index.html"), "<index />");
  assert.ok(writtenFiles.get("./dist/general.html").includes("Almenn kunnátta"));
  assert.ok(writtenFiles.get("./dist/nature.html").includes("Náttúra og vísindi"));
});
