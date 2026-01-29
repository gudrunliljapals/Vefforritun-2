
// <link rel="stylesheet" href="./styles.css">
/**
 * Html fyrir index síðuna 
 * @returns skilar html 
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
    </body>
    </html> `;

    return html;
}

/**
 * 
 * @param {*} param0 
 * @returns 
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
        <title>${title} - Spurningaleikur</title>
        <script src="scripts.js" type="module"></script>
    </head>
    <body> 
        <main> 
            <h1>Spurningaleikur!</h1>
            <a href="./index.html">Tilbaka á forsíðu</a>
            <div class="counter">
                <div class="correct">0</div>
                <div class="incorrect">0</div>
            </div>

            <div class="questions"> 
                <h2>${title}</h2>${qCateogory}</div>
            </div>
        </main>
    </body>
    </html> `;
    
    return html;
}


/**
 * 
 * @param {*} q 
 */

export function questionsHtml(q) {

    const html = `
    <section class="question" data-answered="false">
        <h3>${q.question}</h3>
        <p>${q.answer}</p>
        <button type="button" class="button button-correct">Rétt 🫡</button>
        <button type="button" class="button button-incorrect">Rangt 🥹</button>
    </section> `;

    return html;
} 


