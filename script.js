const quizData = [
    { question: "ママのアレルギーは、なに？", answers: ["リンゴ", "マンゴー", "キウイ"], correct: 1 },
    { question: "ママのすきなことは？", answers: ["だんす", "そうじ", "ビーズ"], correct: 2 },
    { question: "ママのすきなたべものは？", answers: ["エビ", "プリン", "マシュマロ"], correct: 0 },
    { question: "ママのきらいなたべものは？", answers: ["チョコレート", "てんぷら", "ぎょうざ"], correct: 1 },
    { question: "ママのすきなのみものは？", answers: ["コーヒー", "おちゃ", "りんごジュース"], correct: 0 },
    { question: "ママがとくいなスポーツは？", answers: ["サッカー", "バスケ", "そんなものはない"], correct: 2 },
    { question: "ママのすきないろは？", answers: ["あか", "ぴんく", "あお"], correct: 2 },
    { question: "ママのすきなおすしは？", answers: ["たまご", "まぐろ", "イカ"], correct: 2 },
    { question: "ママがすきなどうぶつは？", answers: ["うさぎ", "とり", "いぬ"], correct: 2 },
    { question: "ママのいちばんのおともだちは？", answers: ["まどか", "はなこ", "たろう"], correct: 0 },
];

let currentQuestion = 0;
let score = 0;
let time = 60;
let incorrectQuestions = []; // 不正解のクイズを記録
let timeOut = false; // 時間切れを判定するフラグ

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        // 不正解のクイズがある場合、再挑戦
        if (incorrectQuestions.length > 0) {
            quizData.splice(0, quizData.length, ...incorrectQuestions);
            incorrectQuestions = [];
            currentQuestion = 0;
            alert("ぜんぶ、せいかいするまで、がんばって！");
            loadQuestion();
        } else {
            endGame();
        }
        return;
    }

    const quiz = quizData[currentQuestion];
    questionEl.textContent = quiz.question;
    answersEl.innerHTML = "";
    quiz.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answersEl.appendChild(button);
    });
}

function checkAnswer(index) {
    const quiz = quizData[currentQuestion];
    if (index === quiz.correct) {
        score++;
    } else {
        incorrectQuestions.push(quiz); // 間違えたクイズを記録
    }
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    const timerInterval = setInterval(() => {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            timeOut = true; // 時間切れを記録
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (timeOut) {
        // 時間切れ時のメッセージ
        questionEl.textContent = "ゲームおしまい！またあそんでね。";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    } else if (incorrectQuestions.length === 0) {
        // 全問正解
        questionEl.textContent = "おめでとうございます！\nぜんぶ、せいかいです！🎉";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    } else {
        // 不正解のクイズがある場合
        questionEl.textContent = "ゲームおしまい！またあそんでね。";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    }
}

loadQuestion();
startTimer();
