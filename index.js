//question database
const STORE = [
    
    {
        question: "What's Spider-Man's real name?",
        choices: [
            "Bruce Wayne",
            "Clark Kent",
            "Peter Parker",
            "Rory Mcilroy"
        ],
        answer: "Peter Parker"
    },

    {
        question: "How did Spider-man gain his powers?",
        choices: [
            "Oscorp genetically modified the DNA in his body",
            "He was bitten by a radioactive spider",
            "He was born with powers",
            "Iron-Man gave him a suit that contains the powers"
        ],
        answer: "He was bitten by a radioactive spider"
    },

    {
        question: "What year was Spider-Man first introduced?",
        choices: [
            "1962",
            "1984",
            "1995",
            "2002"
        ],
        answer: "1962"
    },

    {
        question: "Which actor has not played Spider-Man on the big screen?",
        choices: [
            "Tom Holland",
            "Tobey Maguire",
            "Andrew Garfield",
            "Christian Bale"
        ],
        answer: "Christian Bale"
    },

    {
        question: "Which villain is not a part of the Sinister Six?",
        choices: [
            "Doctor Octopus",
            "Kraven",
            "Venom",
            "Sandman"
        ],
        answer: "Venom"
    }
];


//varibles for quiz and score
let score = 0;
let questionNum = 0;

//update question #
function updateQuestion() {
    questionNum++;
    $('.questionNum').text(questionNum+1);
}

//update score
function updateScore() {
    score++;
    $('.score').text(score);
}

//starts the quiz
function startQuiz() {

    $('.home').on('click', '.startButton', function(event) {
        $('.home').hide();
        $('.status').show();
        $('.questionBox').show();
        $('.questionNum').text('1');
        $('.questionBox').prepend(handleQuestion(questionNum));
    });
}

function handleQuestion(num) {
    $('.questionBox').html(
        `<form>
            <fieldset>
                <legend class="questionText">${STORE[num].question}</legend>
            </fieldset>
        </form>`);

    handleChoices(num);
}

function handleChoices(index) {
    let field = $('.questionBox').find('fieldset');

    STORE[index].choices.forEach(function (value, answerIndex) {
        $(`<label class="format" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${value}" name="answer" required>
            <span>${value}</span>
        </label>
        `).appendTo(field);
    });
    $(`<button type="submit" class="submitButton">Submit</button>`).appendTo(field);

}

function submitAnswer() {
    $('.questionBox').on('submit', function(event) {
        event.preventDefault();
        $('.alt').hide();
        $('.feedback').show();
        if($('input:checked').val() === STORE[questionNum].answer) {
            right();
        } else {
            wrong();
        }

    });

}

function right() {
    $('.feedback').html(
        `<h3>That's right!</h3>
        <img src="images/spideyOK.jpg" alt="Spider-Man signaling OK with his fingers" class="image">

        <button type="button" class="next">Next</button>`);
    
        updateScore();
        console.log('right');
}

function wrong() {
    $('.feedback').html(
        `<h3>Boo.. The right answer is ${STORE[questionNum].answer}!!</h3>
        <img src="images/spiderConfused.jpeg" alt="Spider-Man shrugging in a jail cell" class="image">
        <button type="button" class="next">Next</button>`);

        console.log('wrong');
}

function handleNext() {
    $('.questBox').on('click', '.next', function(event) {
        $('.alt').hide();
        updateQuestion();
        console.log(questionNum < STORE.length);    
        if (questionNum < STORE.length) {
            $('.questionBox').show();
            $('.questionBox form').replaceWith(handleQuestion(questionNum));
        } else {
            $('.questionNum').text(5);
            results();
        }
    });

    
}

function results() {
    $('.results').show();
    $('.status').hide();
    console.log('results');

    $('.results').html(
        `<h3>You got ${score} out of 5!</h3>
        <img src="images/wallpaper.jpg" alt="Spider-Man swinging through air" class="image">
        <button type="submit" class="restart">Go Again!</button>`);
}

function restart() {
    $('.questBox').on('click', '.restart', function(event) {
        event.preventDefault();
        resetStats();
        $('.alt').hide();
        $('.home').show();
    });
}

function resetStats() {
    score=0;
    questionNum=0;
    $('.score').text(0);
    $('.questionNum').text(0);
}


function handleQuizApp() {
    startQuiz();
    submitAnswer();
    handleNext();
    restart();
}

$(handleQuizApp);