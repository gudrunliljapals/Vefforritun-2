import fs from "node:fs/promises";
import { parseQuestions } from "./lib/parse.js";

/**
 * Main fallið sem keyrir allt 
 * 
 */

// TODO filter til að filtera út í spurningum
// ATH það eru kommur í spurningunum -- gæti valdið vandræðum 

async function main() {
  console.log('generating questions...');

  const databaseQuestions = await fs.readFile('./Database/questions.csv', 'utf-8');
  const linesQuestions = databaseQuestions.split('\n');
  const questions = linesQuestions.map(parseQuestions);
    

}


main().catch((error) => {
  console.error('error generating', error);
});


