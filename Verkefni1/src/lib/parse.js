/**
 * A function that parses one line in a single string
 * and maps a key to a position by index in the line that is predefined
 * @param {string} line 
 * @returns an object with mapped keys 
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

export function parseQuestions(line) {
  const splitQuestions = line.split(',');
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
    console.log('Spurning eða svar er ekki skilgreint:', q);
    return null;
  }

  if (q.difficulty === '' || q.difficulty === undefined ) {
    console.log('Erfiðleikastig er ekki skilgreint:', q);
    return null;
  }

  if (q.subCategory === '' || q.subCategory === undefined || q.quality === undefined) {
    console.log('undirflokkur eða Gæðastig er ekki skilgreint:', q);
    return null;
  }

  return q;
}
  

  



