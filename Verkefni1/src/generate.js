import fs from "node:fs/promises";
import { parseQuestions } from "./lib/parse.js";
import { indexHtml, categoryHtml } from  "./lib/sidur.js";

const MAX_QUESTIONS_PER_CATEGORY = 100;

/**
 * Main fallið sem keyrir allt 
 * 
 */

// TODO filter til að filtera út í spurningum

async function main() {
  // búa til dist möppu 
  const distPath = './dist'; 
  await fs.mkdir(distPath, {recursive: true});

  // lesa csv skrá og parsa línur 
  const databaseQuestions = await fs.readFile('./Database/questions.csv', 'utf-8');
  const linesQuestions = databaseQuestions.split('\n');
  const questions = linesQuestions.map(parseQuestions).filter(Boolean);
  
  // ítra í gegnum alla flokka og fá max 100 spurningar úr hverjum flokki
  const Max_questions = [];
  for (let i = 1; i <= 7; i++) {
    const q = questions.filter((q) => q.categoryNumber === i.toString()).sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS_PER_CATEGORY);

    Max_questions.push(q);
  }
  const qFlokk1 = Max_questions[0]; 
  const qFlokk2 = Max_questions[1];
  const qFlokk3 = Max_questions[2];
  const qFlokk4 = Max_questions[3];
  const qFlokk5 = Max_questions[4];
  const qFlokk6 = Max_questions[5];
  const qFlokk7 = Max_questions[6];

  // index.html
  await fs.writeFile("./dist/index.html", indexHtml(), 'utf-8');

  // general.html
  await fs.writeFile("./dist/general.html", categoryHtml({title: "Almenn kunnátta", questions: qFlokk1}), 'utf-8');

  // nature.hmtl
  await fs.writeFile("./dist/nature.html", categoryHtml({title: "Náttúra og vísindi", questions: qFlokk2}), 'utf-8');

  // lit.hmtl
  await fs.writeFile("./dist/lit.html", categoryHtml({title: "Bókmenntir og listir", questions: qFlokk3}), 'utf-8');

  // saga.hmtl
  await fs.writeFile("./dist/saga.html", categoryHtml({title: "Saga", questions: qFlokk4}), 'utf-8');

  // geo.hmtl
  await fs.writeFile("./dist/geo.html", categoryHtml({title: "Landafræði", questions: qFlokk5}), 'utf-8');

  // fun.hmtl
  await fs.writeFile("./dist/fun.html", categoryHtml({title: "Skemmtun og afþreying", questions: qFlokk6}), 'utf-8');

  // sport.hmtl
  await fs.writeFile("./dist/sport.html", categoryHtml({title: "Íþróttir og tómstundir", questions: qFlokk7}), 'utf-8');
  
}


main().catch((error) => {
  console.error('error generating', error);
});


