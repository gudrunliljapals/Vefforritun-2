
// <link rel="stylesheet" href="./styles.css">
/**
 * Býr til HTML fyrir forsíðu (index)
 * @returns {string} HTML strengur
 */

export function indexHtml () {
    const html = `
    <!DOCTYPE html>
    <html lang="is"> 
    <head> 
        <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖌️</text></svg>"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./styles.css">
        <title>Trivia Spurningaleikur</title>
        <script src="scripts.js" type="module"></script>
    </head>
    <body> 
        <main> 
            <h1>Spurningaleikur!</h1>
            <p>Velkomin velkomin</p>
            <ul> 
                <li><a href="general.html">Almenn kunnátta</a></li>
                <li><a href="nature.html">Náttúra og vísindi</a></li>
                <li><a href="lit.html">Bókmenntir og listir</a></li>
                <li><a href="saga.html">Saga</a></li>
                <li><a href="geo.html">Landafræði</a></li>
                <li><a href="fun.html">Skemmtun og afþreying</a></li>
                <li><a href="sport.html">Íþróttir og tómstundir</a></li>
            </ul>
        </main>
        <footer>
            <p>Upplýsingar um spurningarnar í gagnagrunninum og bakgrunn vefsins má finna 
                <a id="footer-info" href="https://github.com/sveinn-steinarsson/is-trivia-questions">hér</a>
            </p>
            <div class="github-links">
                <a class="github-glp" href="https://github.com/gudrunliljapals"><img width="17" src="./github-mark.svg" alt="Github logo">gudrunliljapals</a>
            </div>
        </footer> 
    </body>
    </html> `;

    return html;
}

/**
 * Býr til HTML fyrir flokksíðu
 * @param {object} params
 * @param {string} params.title - Titill flokks spurninga
 * @param {Array<object>} params.questions - Spurningarnar í flokknum (Max 100)
 * @returns {string} HTML strengur
 */

export function categoryHtml({ title, questions }) {
    const qCateogory = questions.map(questionsHtml).join('\n');

    const html = `
    <!DOCTYPE html>
    <html lang="is"> 
    <head> 
        <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖌️</text></svg>"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./styles.css">
        <title>${title} - Spurningaleikur</title>
        <script src="scripts.js" type="module"></script>
    </head>
    <body> 
        <main> 
            <h1>Spurningaleikur!</h1>
            <a href="./index.html">Tilbaka á forsíðu</a>

            <div class="filters"> 
                <label>
                    Erfiðleikastig: 
                    <select id="difficultyFilter">
                        <option value="">Veldu</option>
                        <option value="all">Allt</option>
                        <option value="1">Létt</option>
                        <option value="2">Meðal</option>
                        <option value="3">Erfitt</option>
                    </select>

                    Gæðastig: 
                    <select id="qualityFilter">
                        <option value="">Veldu</option>
                        <option value="all">Allt</option>
                        <option value="1">Slöpp</option>
                        <option value="2">Góð</option>
                        <option value="3">Ágæt</option>
                    </select>
                </label>
            </div>

            <div class="counter">
                <div class="correct">0</div>
                <div class="incorrect">0</div>
            </div>

            <div class="questions"> 
                <h2>${title}</h2>
                ${qCateogory}
            </div>
        </main>
        <footer>
            <p>Upplýsingar um spurningarnar í gagnagrunninum og bakgrunn vefsins má finna 
                <a id="footer-info" href="https://github.com/sveinn-steinarsson/is-trivia-questions">hér</a>
            </p>
            <div class="github-links">
                <a class="github-glp" href="https://github.com/gudrunliljapals"><img width="17" src="./github-mark.svg" alt="Github logo">gudrunliljapals</a>
            </div>
        </footer> 
    </body>
    </html> `;
    
    return html;
}


/**
 * Býr til HTML script fyrir eina spurningu
 * @param {object} q 
 * @param {string} q.question  - spurning
 * @param {string} q.answer - svar við spurningu
 * @returns {string} HTML strengur
 */

export function questionsHtml(q) {

    const html = `
    <section class="question" data-answered="false" data-difficulty="${q.difficulty ?? ''}" data-quality="${q.quality ?? ''}">
        <h3>${q.question}</h3>
        <button  type="button" class="showAnswer">Sýna svar</button> 
        <button type="button" class="hideAnswer">Fela svar</button>
        <p class="answer">${q.answer}</p>
        <div class="initial-state"> 
            <button type="button" class="button button-correct">Rétt 🫡</button>
            <button type="button" class="button button-incorrect">Rangt 🥹</button>
        </div>
    </section> `;

    return html;
} 


