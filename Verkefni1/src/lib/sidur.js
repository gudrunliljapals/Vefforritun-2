

/**
 * Html fyrir index síðuna 
 * @returns skilar html 
 */

export function indexHtml () {
    const html = `
    <html> 
    <head> 
        <script src="scripts.js" type="module"></script>
    </head>
    <body> 
        <h1>Spurningaleikur!</h1>
        <p>Velkomin velkomin</p>
    </body>
    </html> `;

    return html;
}


/* 
export function generateQuestionsHtml(questions) {


} 

export function questionsHtml(questions) {

    const html_index = `
    <section>
        <h3>${questions.question}</h3>
        <p>${questions.answer}</p>
    </section>`;

    
    return html_index;
}
*/