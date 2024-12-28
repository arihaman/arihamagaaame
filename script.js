const quizData = [
    { question: "リナのアレルギーは何？", answers: ["リンゴ", "キウイ", "マンゴー"], correct: 2 },
    { question: "リナの最近の趣味は？", answers: ["編み物", "料理", "ビーズ"], correct: 2 },
    { question: "リナの今食べたいものは？", answers: ["エビ", "生春巻き", "焼きマシュマロ"], correct: 1 },
    { question: "リナの好きな映画ジャンルは？", answers: ["ホラー", "コメディ", "ロマンス"], correct: 1 },
    { question: "リナが最近ハマっている飲み物は？", answers: ["ソイラテ", "タピオカミルクティー", "抹茶ラテ"], correct: 0 },
    { question: "リナが得意なスポーツは？", answers: ["バドミントン", "テニス", "そんなものはない"], correct: 2 },
    { question: "リナの行ってみたい旅行先は？", answers: ["ハワイ", "スイス", "北海道"], correct: 2 },
    { question: "リナが一番好きな季節は？", answers: ["春", "秋", "冬"], correct: 2 },
    { question: "リナが飼いたいペットは？", answers: ["パグ", "ブルドッグ", "フレンチブルドッグ"], correct: 2 },
    { question: "リナの今会いたい人は？", answers: ["饒波円", "藤井風", "菅田将暉"], correct: 0 },
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
            alert("全部正解するまで逃がさないよ");
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
        questionEl.textContent = "ゲーム終了！もう一度挑戦してみてね。";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    } else if (incorrectQuestions.length === 0) {
        // 全問正解
        questionEl.textContent = "おめでとうございます！全問正解しました！🎉";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    } else {
        // 不正解のクイズがある場合
        questionEl.textContent = "ゲーム終了！もう一度挑戦してみてね。";
        answersEl.innerHTML = "";
        scoreEl.style.display = "block";
        finalScoreEl.textContent = score;
    }
}

loadQuestion();
startTimer();
