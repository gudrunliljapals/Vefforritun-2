import fs from "node:fs/promises";
import { parseQuestions } from "./lib/parse.js";
import { indexHtml } from  "./lib/sidur.js";
import { type } from "node:os";
import { maxHeaderSize } from "node:http";

const MAX_QUESTIONS_PER_CATEGORY = 100;

/**
 * Main fallið sem keyrir allt 
 * 
 */

  // TODO mappa categoryNumber yfir í streng skv skjölun
  /*
    1 	Almenn kunnátta
    2 	Náttúra og vísindi
    3 	Bókmenntir og listir
    4 	Saga
    5 	Landafræði
    6 	Skemmtun og afþreying
    7 	Íþróttir og tómstundir
    */

  /*
1 	Nei 	Flokkanúmer
2 	Já 	Undirflokkur ef til staðar
3 	Nei 	Erfiðleikastig: 1: Létt, 2: Meðal, 3: Erfið
4 	Já 	Gæðastig: 1: Slöpp, 2: Góð, 3: Ágæt
5 	Nei 	Spurningin
6 	Nei 	Svarið
*/
// TODO filter til að filtera út í spurningum

async function main() {
  // búa til dist möppu 
  const distPath = './dist'; 
  await fs.mkdir(distPath);

  // lesa csv skrá og parsa línur 
  const databaseQuestions = await fs.readFile('./Database/questions.csv', 'utf-8');
  const linesQuestions = databaseQuestions.split('\n');
  const questions = linesQuestions.map(parseQuestions).filter(Boolean);
  
  // ítra í gegnum alla flokka og fá max 100 spurningar úr hverjum flokki
  const Max_questions = [];
  for (let i = 1; i <= 7; i++) {
    const q = questions.filter((q) => q.categoryNumber === i.toString()).slice(0, MAX_QUESTIONS_PER_CATEGORY);

    Max_questions.push(q);
  }
  
  // 1 	Almenn kunnátta - general.html
  // 2 	Náttúra og vísindi - nature.html
  // 3 	Bókmenntir og listir - lit.html
  // 4 	Saga - saga.html
  // 5 	Landafræði - geo.html
  // 6 	Skemmtun og afþreying - fun.html
  // 7 	Íþróttir og tómstundir - sport.html


  // index.html
  const indexPath = "./dist/index.html";
  const indexOutput = indexHtml();
  fs.writeFile(indexPath, indexOutput, 'utf-8');
}


main().catch((error) => {
  console.error('error generating', error);
});


