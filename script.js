// ルーレットを回すボタンと結果表示エリアを取得
const spinButton = document.getElementById('spinButton');
const resultText = document.getElementById('result');
const wheel = document.getElementById('wheel');

// ルーレットのセクター（数字）を格納
const sectors = ['1', '2', '3', '4', '5', '6', '7', '8'];

// ルーレットを回す関数
function spinRoulette() {
    // 1〜8の中でランダムに結果を決める
    const randomIndex = Math.floor(Math.random() * sectors.length);

    // 回転アニメーションを開始
    const rotationDegree = 360 * 5 + (randomIndex * 45); // 5回転 + セクターの角度
    wheel.style.transform = `rotate(${rotationDegree}deg)`;

    // 3秒後に回転が終わったら結果を表示
    setTimeout(() => {
        resultText.textContent = `結果：${sectors[randomIndex]}`;
    }, 3000); // 3秒後に結果を表示
}

// ボタンがクリックされたらルーレットを回す
spinButton.addEventListener('click', spinRoulette);
