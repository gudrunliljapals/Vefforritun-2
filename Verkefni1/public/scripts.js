

const questionElement = document.querySelectorAll('.question');

if (questionElement.length === 0) {
    console.error('unable to find element');
}

for (const q of questionElement) {
    q.classList.add('hidden');
    const answer = q.querySelector('.answer');
    const intialState = q.querySelector('.initial-state');

    if (answer) answer.classList.add('hidden');
    if (intialState) {
        intialState.querySelector('.button-correct')?.classList.add('hidden');
        intialState.querySelector('.button-incorrect')?.classList.add('hidden');
    }

    q.dataset.answered = 'false';

    const showAnswer = q.querySelector('.showAnswer');
    showAnswer?.addEventListener('click', () => {
        answer?.classList.remove('hidden');
        intialState?.querySelector('.button-correct')?.classList.remove('hidden');
        intialState?.querySelector('.button-incorrect')?.classList.remove('hidden');
    });

    const hideAnswer = q.querySelector('.hideAnswer');
    hideAnswer?.addEventListener('click', () => {
        answer?.classList.add('hidden');
        intialState?.querySelector('.button-correct')?.classList.add('hidden');
        intialState?.querySelector('.button-incorrect')?.classList.add('hidden');
    });
}

const correctElement = document.querySelector('.counter .correct span'); 
const incorrectElement = document.querySelector('.counter .incorrect span');

if (!correctElement || !incorrectElement) {
    console.error('unable to find elements')
}

/**
 * 
 * @param {*} e 
 * @returns 
 */

function questionAnswerHandler(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const isCorrect = button.classList.contains('button-correct')
    const isInCorrect = button.classList.contains('button-incorrect')

    const parentQuestion = button.closest('.question');

    if (!parentQuestion) return;

    if (parentQuestion.dataset.answered === 'true') return;

    if (!correctElement) {
        throw new Error('missing correct element')
    }

    if (!incorrectElement) {
        throw new Error('missing incorrect element')
    }

    if (isCorrect) {
        const currentCorrectText = correctElement.textContent;
        const currentCorrect = Number.parseInt(currentCorrectText ?? '0');

        const updatedCorrect = currentCorrect + 1;

        correctElement.textContent = updatedCorrect.toString();

    }

    if (isInCorrect) {
        const currentInCorrectText = incorrectElement.textContent; 
        const currentInCorrect = Number.parseInt(currentInCorrectText ?? '0');

        const updatedInCorrect = currentInCorrect + 1;

        incorrectElement.textContent = updatedInCorrect.toString();
    }

    parentQuestion.dataset.answered = 'true';
    parentQuestion.querySelectorAll('.button-correct, .button-incorrect').forEach((b) => { b.disabled = true; });
        
}

const buttons = document.querySelectorAll('.question .button-correct, .question .button-incorrect');

for (const button of buttons) {
    button.addEventListener('click', questionAnswerHandler);
}


const difficultyFilter = document.querySelector('#difficultyFilter');
const qualityFilter = document.querySelector('#qualityFilter');

function applyFilters() {
    const difficulty = difficultyFilter?.value ?? '';
    const quality = qualityFilter?.value ?? '';


    if (!difficulty && !quality) {
        questionElement.forEach((q) => q.classList.add('hidden'));
        return;
    }

    questionElement.forEach((q) => {
        const diff = !difficulty || difficulty === 'all' || q.dataset.difficulty === difficulty;
        const qual = !quality || quality === 'all' || q.dataset.quality === quality; 

        if (diff && qual) { 
            q.classList.remove('hidden');
        } else {
            q.classList.add('hidden');
        }
    }); 
}

difficultyFilter?.addEventListener('change', applyFilters);
qualityFilter?.addEventListener('change', applyFilters);

applyFilters();