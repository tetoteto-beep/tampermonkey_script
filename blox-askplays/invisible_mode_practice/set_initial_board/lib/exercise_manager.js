const MAP_CODE_DEFAULT = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

// Mulberry32 乱数生成関数
function random(seed) {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// Box-Muller法を使って正規分布に従うランダムな値を生成する関数
function randomGaussian(seed) {
    let u = 0, v = 0;
    while (u === 0) u = random(seed); // 0は除外
    while (v === 0) v = random(seed);
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function generateMapCode(holePos, seed) {
    seed = stringToSeed(seed)
    // テトリス盤面の列の高さをランダムに生成
    const mapWidth = 10;
    const mapHeight = 20;
    let heights = new Array(mapWidth).fill(0);

    // 最初の列の高さを決定（0～10の範囲でランダム）
    heights[0] = Math.floor(random(seed) * 11)*5;

    // 残りの列の高さをランダムに決定
    for (let i = 1; i < mapWidth; i++) {
        let hChange = randomGaussian(seed-i); // 正規分布に従う値を取得
        heights[i] = Math.max(0, Math.min(mapHeight, Math.floor(heights[i - 1] + hChange)));  // 高さは0～20の範囲に制限
    }

    // 盤面を生成
    let board = new Array(mapHeight).fill(0).map(() => new Array(mapWidth).fill('0'));

    // 灰色ブロック（8）を配置
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < heights[x]; y++) {
            board[mapHeight - 1 - y][x] = '8';
        }
    }

    // 穴の位置を適用
    for (let y = 0; y < mapHeight; y++) {
        board[mapHeight - 1 - y][holePos] = '0';  // 穴は空白（0）に設定
    }

    // 盤面をmap code（200文字の文字列）に変換
    let mapCode = '';
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            mapCode += board[y][x];
        }
    }

    return mapCode;
}

// 使用例
// let holePos = 9;  // 右端の列に穴を配置
// for (let seed = 12; seed < 22; seed++) {  // seedを12345から12354まで変化させる
//     let mapCode = generateMapCode(holePos, seed);
//     console.log(`Seed: ${seed}, Map Code: ${mapCode}`);
// }

class ExerciseManager {

    // static GAME_MODE = {
    //     NORMAL: 'normal',
    //     WEAK_POINT: 'weak_point',
    // };

    constructor(exercise) {
        // IDとタイトルを受け取る
        this.id = exercise.id || 'default_id';
        this.title = exercise.title || 'Default Title';

        // win_conditionを受け取り、デフォルト値を設定
        this.winCondition = exercise.win_condition || {
            type: 0, // "0"Lines, "1"PC, "2"No Garbage
            count: 10
        };

        // board_listを受け取り、デフォルト値を設定
        // this.boardList = exercise.board_list || [{
        //     holdPiece: '',
        //     prevFixedQueue: '',
        //     pieceQueue: '',
        //     mapCode: MAP_CODE_DEFAULT
        // }];

        // 現在のゲームカウント
        this.currentGameCount = 1;

        this.SEED_SUFFIX = Math.random().toString(36).substr(2, 4);
        this.NOTIFY_USER_GAME_COUNT = 100;

        // 苦手問題の番号を記憶するための配列
        // this.weakPointGameList = [];

        // this.GAME_MODE = ExerciseManager.GAME_MODE.NORMAL;
    }

    /**
    * 現在のゲームカウントをインクリメントします。
    */
    incrementGameCount() {
        this.currentGameCount++;
        this.notifyUserWhenCountModZero();
    }

    /**
    * 現在のゲームカウントをデクリメントします。
    * ただし、カウントが1未満にならないようにします。
    */
    decrementGameCount() {
        if (this.currentGameCount > 1) {
            this.currentGameCount--;
        }
    }

    /**
    * タイトルを取得
    */
    getTitle() {
        return this.title;
    }

    /**
    * 現在のエクササイズに対応するランダムなボードを取得します。
    */
    getCurrentExercise() {

        // シード値の算出
        let seed = `${this.currentGameCount}_${this.SEED_SUFFIX}`;

        // 苦手ゲームモードの場合は、weakPointGameList配列からランダム（シード値固定）で取得する
        // if (this.GAME_MODE == ExerciseManager.GAME_MODE.WEAK_POINT) {
        //     const gameCount = getRandomElementFromList(this.weakPointGameList, seed);
        //     seed = `${gameCount}_${this.SEED_SUFFIX}`;
        // }

        // const selectedBoard = getRandomElementFromList(this.boardList, seed);
 
        let mapCode = generateMapCode(9, seed);

        return {
            map_code: mapCode,
            piece_queue: '',
            hold_piece: '',
            win_condition: this.winCondition,
            seed: seed,
        };
    }

    /**
    * Notify the user when the game count reaches a specified number.
    */
    notifyUserWhenCountModZero() {

        if ((this.currentGameCount % this.NOTIFY_USER_GAME_COUNT === 0) && (this.currentGameCount >= this.NOTIFY_USER_GAME_COUNT)) {
            console.log(`Game count reached ${this.currentGameCount}, which is a multiple of ${this.NOTIFY_USER_GAME_COUNT}!`);
            alert(`Game count reached ${this.currentGameCount}, which is a multiple of ${this.NOTIFY_USER_GAME_COUNT}!`);
        }
    }

    // // 現在の問題を苦手問題に追加
    // addCurGameToWeakPointList(){
    //     // まだ登録されていない場合のみ登録する
    //     if ((this.GAME_MODE != ExerciseManager.GAME_MODE.WEAK_POINT)
    //         && (!this.weakPointGameList.includes(this.currentGameCount))) {
    //         this.weakPointGameList.push(this.currentGameCount);
    //         showNotification(`#${this.currentGameCount}を苦手問題として登録しました。`);
    //     }
    // }


    // // 問題をカウント1ずつアップさせるのではなく、苦手問題から選出するように変更する
    // changeGameModeToWeakPoint(){
    //     if (this.GAME_MODE != ExerciseManager.GAME_MODE.WEAK_POINT) {
    //         if (this.weakPointGameList.length > 0 ) {
    //             this.GAME_MODE = ExerciseManager.GAME_MODE.WEAK_POINT
    //             showNotification("苦手問題モードに移行します。");
    //         } else {
    //             showNotification("まだ苦手問題が登録されていませんので苦手問題モードへは移行できません。");
    //         }
    //     }
    // }

}
