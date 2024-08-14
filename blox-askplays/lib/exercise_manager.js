const MAP_CODE_DEFAULT = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

class ExerciseManager {

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
        this.boardList = exercise.board_list || [{
            holdPiece: '',
            prevFixedQueue: '',
            pieceQueue: '',
            mapCode: MAP_CODE_DEFAULT
        }];

        // 現在のゲームカウント
        this.currentGameCount = 1;

        this.SEED_SUFFIX = Math.random().toString(36).substr(2, 4);
        this.NOTIFY_USER_GAME_COUNT = 100;
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
        const seed = `${this.currentGameCount}_${this.SEED_SUFFIX}`;
        const selectedBoard = getRandomElementFromList(this.boardList, seed);

        return {
            map_code: selectedBoard.mapCode,
            piece_queue: (selectedBoard.prevFixedQueue || '') + (selectedBoard.pieceQueue ? shuffleString(selectedBoard.pieceQueue, seed) : ''),
            hold_piece: selectedBoard.holdPiece || '',
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

}