// --- 1. CONFIGURATION ---
const CONFIG = {
    mode: "light", // 'light' or 'dark'
    bgColor: {
        light: 255,
        dark: 20
    },
    drawingColor: {
        light: 20,
        dark: 200
    },
    canvasRatio: 4, // ウィンドウサイズの何分の1にするか
    debug: true, // 目安 (中心点) の表示切り替え
    duration: 3600 // アニメーションの長さ (フレーム数)
};

// グローバル変数
let W, H;

const palettes = [
    { title: "Retro Sunny Living", comment: "レトロで温かみのある暖色", colors: [{ hex: "#A6171C" }, { hex: "#D6D0C5" }, { hex: "#F1C045" }] },
    { title: "Citrus Breeze", comment: "爽やかな青と柑橘系の黄色", colors: [{ hex: "#20373B" }, { hex: "#FFC64F" }] }, // Picked highest contrast pair
    { title: "Dreamy Sunset", comment: "淡いパステルカラー", colors: [{ hex: "#11476C" }, { hex: "#FAD6A5" }] },
    { title: "Bold Modernism", comment: "モダンなビビッドピンクと無彩色", colors: [{ hex: "#36434A" }, { hex: "#FF4777" }] },
    { title: "Fresh Orange", comment: "明るいオレンジとフレッシュな水色", colors: [{ hex: "#FFA43A" }, { hex: "#A3DFF1" }] },
    { title: "Classic Marine", comment: "クラシックなトリコロール", colors: [{ hex: "#141A45" }, { hex: "#ECE1D5" }] },
    { title: "Retro Sci-Fi", comment: "ポップな赤と緑の補色対比", colors: [{ hex: "#2E5C58" }, { hex: "#94EEE3" }] },
    { title: "Bauhaus Geometry", comment: "幾何学的な原色構成", colors: [{ hex: "#1E459F" }, { hex: "#FABD32" }] },
    { title: "Dynamic Sport", comment: "アクティブでスポーティーなマルチカラー", colors: [{ hex: "#2267B1" }, { hex: "#F7D232" }] },
    { title: "Fruit Salad", comment: "鮮やかな青と黄色のコントラスト", colors: [{ hex: "#292E4F" }, { hex: "#F3D959" }] }
];

// --- 2. P5.JS ---

function setup() {
    // キャンバスサイズの決定 (スマホ縦長対応含む)
    const minDim = Math.min(windowWidth, windowHeight);
    const size = Math.floor(minDim / CONFIG.canvasRatio) * CONFIG.canvasRatio;

    // 基本は正方形、必要なら変更
    W = size;
    H = size;
    createCanvas(W, H);

    // テキスト設定
    setTextSettings();
}

function draw() {
    // スタイル適用と背景塗りつぶし
    applyStyle(CONFIG.mode);

    // 座標を中心に移動
    translate(W / 2, H / 2);

    // --- 描画処理ここから ---

    // テスト描画
    // const t = (frameCount % 60) / 60;
    // const r = easing('easeInOutCubic', t) * (W * 0.4);
    // const [px, py] = polar(r, frameCount * 0.1);
    // circle(px, py, 10);

    // --- 描画処理ここまで ---

    // デバッグ表示 (中心点)
    if (CONFIG.debug) drawDebugMarker(0, 0);

    // アニメーション終了判定
    if (frameCount > CONFIG.duration) noLoop();
}

// --- 3. DRAWING HELPERS (描画・スタイル補助) ---

function applyStyle(mode) {
    if (mode === "light") {
        background(CONFIG.bgColor.light);
        fill(CONFIG.drawingColor.light);
        stroke(CONFIG.drawingColor.light);
    } else {
        background(CONFIG.bgColor.dark);
        fill(CONFIG.drawingColor.dark);
        stroke(CONFIG.drawingColor.dark);
    }
}

function setTextSettings() {
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    textSize(W * 0.05);
}

function drawDebugMarker(x, y) {
    push();
    noFill();
    stroke("red");
    strokeWeight(1);
    circle(x, y, W * 0.02); // 少しサイズを調整
    pop();
}

function showError(msg = "error!") {
    push();
    resetMatrix(); // 座標変換をリセットして左上に表示
    textAlign(LEFT, TOP);
    fill("red");
    noStroke();
    textSize(12);
    text(msg, 10, 10);
    pop();
}

// --- 4. MATH & ALGORITHMS ---

function polar(r, theta) {
    return [r * cos(theta), r * sin(theta)];
}

const EASINGS = {
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    easeInOutExpo: (t) =>
        t === 0
            ? 0
            : t === 1
            ? 1
            : t < 0.5
            ? Math.pow(2, 20 * t - 10) / 2
            : (2 - Math.pow(2, -20 * t + 10)) / 2,
    easeOutQuad: (t) => t * (2 - t),
    easeInQuad: (t) => t * t,
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    easeInOutQuint: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    easeInCirc: (t) => 1 - Math.sqrt(1 - t * t),
    easeOutCirc: (t) => Math.sqrt(1 - --t * t),
    easeInOutCirc: (t) =>
        t < 0.5
            ? (1 - Math.sqrt(1 - 2 * t * (2 * t))) / 2
            : (Math.sqrt(1 - --t * (2 * t)) + 1) / 2,
    easeInBack: (t) => 2.70158 * t * t * t - 1.70158 * t * t,
    easeOutBack: (t) => 1 + 2.70158 * --t * t * t + 1.70158 * t * t,
    easeInOutBack: (t) =>
        t < 0.5
            ? 2 * t * t * (3.5949095 * t - 2.5949095) * 2
            : (--t, 1 + 2.70158 * t * t * t + 1.70158 * t * t) * 2,
    easeInElastic: (t) =>
        t === 0
            ? 0
            : t === 1
            ? 1
            : -Math.pow(2, 10 * t - 10) *
              Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)),
    easeOutElastic: (t) =>
        t === 0
            ? 0
            : t === 1
            ? 1
            : Math.pow(2, -10 * t) *
                  Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) +
              1,
    easeInOutElastic: (t) =>
        t === 0
            ? 0
            : t === 1
            ? 1
            : t < 0.5
            ? -(
                  Math.pow(2, 20 * t - 10) *
                  Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))
              ) / 2
            : (Math.pow(2, -20 * t + 10) *
                  Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) /
                  2 +
              1,
    easeInBounce: (t) => 1 - EASINGS.easeOutBounce(1 - t),
    easeOutBounce: (t) => {
        if (t < 1 / 2.75) return 7.5625 * t * t;
        else if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        else if (t < 2.5 / 2.75)
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        else return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    },
    easeInOutBounce: (t) =>
        t < 0.5
            ? (1 - EASINGS.easeOutBounce(1 - 2 * t)) / 2
            : (1 + EASINGS.easeOutBounce(2 * t - 1)) / 2
};

function easing(easeName, t) {
    // tを0-1の範囲にクランプ
    t = Math.max(0, Math.min(1, t));
    if (EASINGS[easeName]) return EASINGS[easeName](t);
    console.warn(`Easing '${easeName}' not found.`);
    return t; // フォールバック：線形
}

// --- 5. SYSTEM & EXPORT ---

function getTimestampFilename(ext) {
    const pad = (n) => n.toString().padStart(2, "0");
    const d = new Date();
    const dateStr = `${d.getFullYear()}_${pad(d.getMonth() + 1)}${pad(
        d.getDate()
    )}`;
    const timeStr = `${pad(d.getHours())}${pad(d.getMinutes())}${pad(
        d.getSeconds()
    )}`;
    return `p5js_${dateStr}_${timeStr}.${ext}`;
}

// Sキーで画像保存
function keyPressed() {
    if (key === "s" || key === "S") {
        const fname = getTimestampFilename("png");
        save(fname);
        console.log(`Saved: ${fname}`);
    }
}
