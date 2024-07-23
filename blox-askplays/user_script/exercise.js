// ==UserScript==
// @name         はちみつ砲 練習
// @namespace    http://tampermonkey.net/
// @version      2024-07-19
// @description  try to take over the world!
// @author       author
// @match        https://blox.askplays.com/map-maker
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/js/utility.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    // ----------------------------
    // 定数定義
    // ----------------------------
    const EXERCISE_BOOK_OF_HONEY_CUP_LV1 = [
        {
            isPieceQueueShuffle: true,
            pieceQueue: '',
            mapCode: '00000000000000000641000000000000000066410000000000000000644100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000052200000000000000055522'
        },
        {
            isPieceQueueShuffle: true,
            pieceQueue: '',
            mapCode: '00000000000000044422000000000000000004220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000075510000000000000000775100000000000000000751'
        },
    ]


    const EXERCISE_BOOK_OF_HONEY_CUP_LV2 = [ // 二巡目の練習（ピース2つ）
        {
            isPieceQueueShuffle: false,
            pieceQueue: 'js',
            mapCode: '00000000000000000041000000000000000000410000000000000000044100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000002200000000000000000022'
        },
        {
            isPieceQueueShuffle: false,
            pieceQueue: 'lz',
            mapCode: '00000000000000000022000000000000000000220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000005510000000000000000005100000000000000000051'
        },
    ]

    const EXERCISE_BOOK_OF_HONEY_CUP_LV3 = [ // 二巡目の練習（ピース4つ）
        {
            isPieceQueueShuffle: true,
            pieceQueue: 'tjls',
            mapCode: '00000000000000000001000000000000000000010000000000000000000100000000000000000001000000000000000000700000000000000000007700000000000000000007000000000000000000000000000000000000002200000000000000000022'
        },
        {
            isPieceQueueShuffle: true,
            pieceQueue: 'tjlz',
            mapCode: '00000000000000000022000000000000000000220000000000000000000000000000000000000006000000000000000000660000000000000000006000000000000000000001000000000000000000010000000000000000000100000000000000000001'
        },

    ];

    const EXERCISE_BOOK_OF_MEISOU = [
        {
            isPieceQueueShuffle: true,
            pieceQueue: '',
            mapCode: '00000000000000001111000000000000000004440000000000000000066400000000000000000066000000000000000003330000000000000000003000000000000000000005000000000000000075550000000000000000772200000000000000000722'
        },
    ];


    const EXERCISE_BOOK = EXERCISE_BOOK_OF_HONEY_CUP_LV3


    const MAP_SEED_SUFFIX = Math.random().toString(36).substr(2, 4);

    const NOTIFY_USER_GAME_COUNT = 100;

    // ----------------------------
    // 変数定義
    // ----------------------------
    let g_currentGameCount = 0;
    let g_isSimulating = false;

    // ----------------------------
    // 関数定義
    // ----------------------------
    function notifyUser(gameCount) {
        // コンソール出力
        console.log(`Game count reached ${gameCount}, which is a multiple of ${NOTIFY_USER_GAME_COUNT}!`);

        // アラートダイアログ
        alert(`Game count reached ${gameCount}, which is a multiple of ${NOTIFY_USER_GAME_COUNT}!`);
    }

    function simulateRKeyPress() {
        setTimeout(() => {
            g_isSimulating = true;
            simulateKeyPress('r');
            g_isSimulating = false;
        }, 100); // 100ミリ秒の遅延
    }

    function updateField() {
        let exerciseIndex = mod(g_currentGameCount, EXERCISE_BOOK.length);
        const exercise = EXERCISE_BOOK[exerciseIndex];

        const pieceQueueElement = document.getElementById('piece-queue');
        const mapCodeElement = document.getElementById('map-code');
        const mapSeedElement = document.getElementById('map-seed');
        const loadMapElement = document.getElementById('load-map');

        if (!pieceQueueElement || !mapCodeElement || !mapSeedElement || !loadMapElement) {
            console.error('必要なDOM要素が見つかりません');
            return;
        }

        // pieceQueueをシャッフルするかどうかをチェック
        if (exercise.isPieceQueueShuffle) {
            exercise.pieceQueue = shuffleString(exercise.pieceQueue);
            console.log(exercise.pieceQueue)
        }

        pieceQueueElement.value = exercise.pieceQueue;
        mapCodeElement.value = exercise.mapCode;
        mapSeedElement.value = g_currentGameCount + "_" + MAP_SEED_SUFFIX;
        loadMapElement.click();
    }

    function incrementGameCount(n) {
        g_currentGameCount = Math.max(g_currentGameCount + n, 1);

        let completedGameCount = g_currentGameCount - 1
        if ((n>=0) && (completedGameCount % NOTIFY_USER_GAME_COUNT === 0) && (completedGameCount >= NOTIFY_USER_GAME_COUNT)) {
            notifyUser(completedGameCount);
        }

    }

    function initializeWinConditions() {
        const event = new Event("change");

        const winConElement = document.getElementById("win-con");
        if (!winConElement) {
            console.error('win-con要素が見つかりません');
            return;
        }
        winConElement.value = "1"; // "0"Lines, "1"PC, "2"No Garbage
        winConElement.dispatchEvent(event);

        const winConCountElement = document.getElementById("win-con-count");
        if (!winConCountElement) {
            console.error('win-con-count要素が見つかりません');
            return;
        }
        winConCountElement.value = "2";
        winConCountElement.dispatchEvent(event);
    }

    // ----------------------------
    // 初期化処理
    // ----------------------------
    initializeWinConditions();

    // ----------------------------
    // イベント処理
    // ----------------------------
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' && !g_isSimulating) {
            event.preventDefault();
            incrementGameCount(1);
            updateField();
            simulateRKeyPress();
        }

        if (event.key === 'R') {
            incrementGameCount(-1);
            updateField();
            simulateRKeyPress();
        }
    });

})();
