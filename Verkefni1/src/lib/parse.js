import { splitLine } from "./splitLine.js";
/**
 * A function that parses one line in a single string
 * and maps a key to a position by index in the line that is predefined
 * Deletes any lines where the value is empty, null or undefined
 * @param {string} line 
 * @returns an object with mapped keys 
 */

export function parseQuestions(lines) {

  const splitQuestions = splitLine(lines);

  const categoryNames = {
    '1': 'Almenn kunnátta',
    '2': 'Náttúra og vísindi',
    '3': 'Bókmenntir og listir', 
    '4': 'Saga',
    '5': 'Landafræði',
    '6': 'Skemmtun og afþreying',
    '7': 'Íþróttir og tómstundir'
  };
  const difficultyNames = {
    '1': 'Létt',
    '2': 'Meðal',
    '3': 'Erfið'
  }
  const qualityNames = {
    '1': 'Slöpp',
    '2': 'Góð',
    '3': 'Ágæt'
  }
  const categoryNumber = splitQuestions[0];
  const subCategory = splitQuestions[1];
  const difficulty = splitQuestions[2];
  const quality = splitQuestions[3];
  const question = splitQuestions[4];
  const answer = splitQuestions[5];
  const q = {
    categoryNumber,
    subCategory,
    difficulty,
    quality,
    question,
    answer 
  };
  
  for (const key in categoryNames) {
    if (q.categoryNumber === key) {
      q['categoryName'] = categoryNames[key];
    }
  };

  for (const key in difficultyNames) {
    if (q.difficulty === key) {
      q['difficultyName'] = difficultyNames[key];
    }
  };

  for (const key in qualityNames) {
    if (q.quality === key) {
      q['qualityName'] = qualityNames[key]
    }
  };

  if (q.categoryNumber === undefined || q.question === undefined || q.answer === undefined) {
    delete q.categoryNumber;
    delete q.subCategory;
    delete q.difficulty;
    delete q.quality;
    delete q.question;
    delete q.answer;
    // console.log('Flokkur, spurning eða svar er ekki skilgreint');
    return null;
  }

  if (q.difficulty === '' || q.difficulty === undefined ) {
    delete q.difficulty;
    // console.log('Erfiðleikastig er ekki skilgreint');
    return q;
  }

  if (q.subCategory === '' || q.subCategory === undefined) {
    delete q.subCategory
    // console.log('Undirflokkur er ekki skilgreindur');
    return q;
  }

  if (q.quality === '' || q.quality === undefined) {
    delete q.quality
    // console.log('Gæðastig er ekki skilgreint');
    return q;
  }

  return q;
}
  

  



