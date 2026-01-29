import test from "node:test";
import assert from "node:assert/strict";
import { splitLine } from "../splitLine.js"; 

test("splitLine: splits basic CSV line by commas", () => {
  assert.deepEqual(splitLine("a,b,c"), ["a", "b", "c"]);
});

test("splitLine: keeps commas inside quotes", () => {
  assert.deepEqual(splitLine('"a,b",c'), ["a,b", "c"]);
});

test('splitLine: unescapes doubled quotes inside quoted field', () => {
  assert.deepEqual(splitLine('"a""b",c'), ['a"b', "c"]);
});

test("splitLine: handles empty fields", () => {
  assert.deepEqual(splitLine("a,,c,"), ["a", "", "c", ""]);
});

test("splitLine: handles a line with only one field", () => {
  assert.deepEqual(splitLine("justone"), ["justone"]);
});

test("splitLine: handles empty line", () => {
  assert.deepEqual(splitLine(""), [""]);
});

test("splitLine: preserves spaces outside quotes", () => {
  assert.deepEqual(splitLine("a, b ,c"), ["a", " b ", "c"]);
});

test("splitLine: preserves spaces inside quotes", () => {
  assert.deepEqual(splitLine('" a , b ",c'), [" a , b ", "c"]);
});

