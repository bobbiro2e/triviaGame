$(document).ready(function () {

    var game = {
        questions: [
            {
                question: 'What is the world’s largest coral reef system?',
                possibles: ['The Grand Barrier Reef', 'The Great Barrier Reef', 'The Great Border Reef',],
                id: 'question-one',
                answer: 1
            }, {
                question: 'What spiny venous fish, common in home aquariums, has become an invasive species in the Caribbean Sea and U.S. Atlantic coastal waters?',
                possibles: ['Lionfish', 'Pumafish', 'Catfish'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'What is the largest ocean on planet Earth?',
                possibles: ['Indian Ocean', 'Atlantic Ocean', 'Pacific Ocean'],
                id: 'question-three',
                answer: 2
            }, {
                question: 'What is the name of the deepest known location in the Earth’s oceans?',
                possibles: ['ChallengerDeep', 'Defier Deep', 'Darer Deep'],
                id: 'question-four',
                answer: 0
            }, {
                question: 'Which ocean trench is the deepest?',
                possibles: ['Tonga Trench', 'Mariana Trench', 'Kuril- Kamchatka Trench'],
                id: 'question-five',
                answer: 1
            }
        ]
    }


    $(".startGame").on("click", function () {
        $('.wrapper').show();
        $(".startGame").hide()
    });

    var number = 30;
    $('#timeLeft').on('click', run);


    function decrement() {
        number--;
        $('#timeLeft').html('Time Remaining: ' + number);
        if (number === 0) {
            stop();
            $('#messageDiv').html('Game Over!');
            checkAnswers();
        }
    }

    function run() {
        intervalId = setInterval(decrement, 1000);
    }
    function stop() {
        clearInterval(intervalId);
    }

    run();


    function formTemplate(data) {

        var qString = "<form id='questionOne'>" + data.question + "<br>";
        var possibles = data.possibles;

        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            qString = qString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;

        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;


    function buildQuestions() {
        var questionHTML = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions').append(questionHTML);

    }

    buildQuestions();

    function isCorrect(question) {
        var answers = $('[name=' + question.id + ']');
        var correct = (question.answers)
        var isChecked = correct.is(':checked');
        return isChecked;
    }




    function checkAnswers() {

        for (var i = 0; i < game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else if (checkAnswered(game.questions[i])) {
                incorrect++;
            } else {
                unAnswered++;
            }
        }

    }

    $('.results').html('correct: ' + correct + "<br>" + 'incorrect: ' + incorrect + "<br>" + 'unanswered: ' + unAnswered);


    $('#doneButton').on('click', function () {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
    })
});