// ==UserScript==
// @name         はちみつ砲 練習
// @namespace    http://tampermonkey.net/
// @version      2024-07-19
// @description  try to take over the world!
// @author       author
// @match        https://blox.askplays.com/map-maker
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/lib/utility.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    // ----------------------------
    // 定数定義
    // ----------------------------
    const EXERCISE_BOOK_OF_HONEY_CUP_LV1 = {
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 2,
        },
        isPieceQueueShuffle: true,
        exercise_list: [
            {
                pieceQueue: '',
                mapCode: '00000000000000000641000000000000000066410000000000000000644100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000052200000000000000055522'
            },
            {
                pieceQueue: '',
                mapCode: '00000000000000044422000000000000000004220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000075510000000000000000775100000000000000000751'
            },
        ]
    }

    const EXERCISE_BOOK_OF_HONEY_CUP_LV2 = { // 二巡目の練習（ピース2つ）
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 2,
        },
        isPieceQueueShuffle: true,
        exercise_list: [
            {
                pieceQueue: 'js',
                mapCode: '00000000000000000041000000000000000000410000000000000000044100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000002200000000000000000022'
            },
            {
                pieceQueue: 'lz',
                mapCode: '00000000000000000022000000000000000000220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000005510000000000000000005100000000000000000051'
            },
        ]
    }

    const EXERCISE_BOOK_OF_HONEY_CUP_LV3 = { // 二巡目の練習（ピース4つ）
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 2,
        },
        isPieceQueueShuffle: true,
        exercise_list: [
            {
                pieceQueue: 'tjls',
                mapCode: '00000000000000000001000000000000000000010000000000000000000100000000000000000001000000000000000000700000000000000000007700000000000000000007000000000000000000000000000000000000002200000000000000000022'
            },
            {
                pieceQueue: 'tjlz',
                mapCode: '00000000000000000022000000000000000000220000000000000000000000000000000000000006000000000000000000660000000000000000006000000000000000000001000000000000000000010000000000000000000100000000000000000001'
            },

        ]
    }

    const EXERCISE_BOOK_OF_HONEY_CUP_LV4 = {// 初手から。ただし、ホールドなしではちみつ砲が組めるツモのみ。
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 2,
        },
        isPieceQueueShuffle: true,
        exercise_list: [
            {
                pieceQueue: 'toiszlj',
                mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            },
            {
                pieceQueue: '',
                mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            },
        ]
    }

    const EXERCISE_BOOK_OF_DPC_SZ = {
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 1,
        },
        isPieceQueueShuffle: false,
        exercise_list: [
            {
                pieceQueue: 's',
                mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            },
            {
                pieceQueue: 'z',
                mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            },
        ]
    }

    const EXERCISE_BOOK_OF_DPC_O = {
        win_condition: {
            type: 1, // "0"Lines, "1"PC, "2"No Garbage
            count: 1,
        },
        isPieceQueueShuffle: false,
        exercise_list: [
            {
                pieceQueue: 'o',
                mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            },
        ]
    }

    const MAP_SEED_SUFFIX = Math.random().toString(36).substr(2, 4);

    const NOTIFY_USER_GAME_COUNT = 100;

    // ----------------------------
    // 変数定義
    // ----------------------------
    let g_currentGameCount = 0;
    let g_isSimulating = false;
    let g_exercise_book = null


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
        let exerciseIndex = mod(g_currentGameCount, g_exercise_book.exercise_list.length);
        const exercise = g_exercise_book.exercise_list[exerciseIndex];

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
        const winCondition = g_exercise_book.win_condition;

        const event = new Event("change");

        const winConElement = document.getElementById("win-con");
        if (!winConElement) {
            console.error('win-con要素が見つかりません');
            return;
        }
        winConElement.value = winCondition.type; // "0"Lines, "1"PC, "2"No Garbage
        winConElement.dispatchEvent(event);

        const winConCountElement = document.getElementById("win-con-count");
        if (!winConCountElement) {
            console.error('win-con-count要素が見つかりません');
            return;
        }
        winConCountElement.value = winCondition.count;
        winConCountElement.dispatchEvent(event);
    }

    function initializeGameMode() {
        console.log("initializeGameMode 1");

        // Create the overlay background
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        overlay.style.pointerEvents = 'auto'; // イベントをキャッチできるようにする
        document.body.appendChild(overlay);

        // Create the selection window
        let selectionWindow = document.createElement('div');
        selectionWindow.style.position = 'fixed';
        selectionWindow.style.top = '50%';
        selectionWindow.style.left = '50%';
        selectionWindow.style.transform = 'translate(-50%, -50%)';
        selectionWindow.style.padding = '30px';
        selectionWindow.style.backgroundColor = '#fff';
        selectionWindow.style.borderRadius = '10px';
        selectionWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        selectionWindow.style.zIndex = '1000';
        overlay.style.pointerEvents = 'auto'; // イベントをキャッチできるようにする
        document.body.appendChild(selectionWindow);

        // Create the title
        let title = document.createElement('h2');
        title.innerHTML = 'ゲームを選択してください';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        title.style.color = '#000';
        selectionWindow.appendChild(title);

        // Create the dropdown menu
        let dropdown = document.createElement('select');
        dropdown.id = 'gameModeSelector';
        dropdown.style.width = '100%';
        dropdown.style.padding = '10px';
        dropdown.style.fontSize = '16px';
        dropdown.style.marginBottom = '20px';
        let options = [
            { text: 'はちみつ砲(lv1)', value: 'honeyCannonLv1' },
            { text: 'はちみつ砲(lv2)', value: 'honeyCannonLv2' },
            { text: 'はちみつ砲(lv3)', value: 'honeyCannonLv3' },
            { text: 'はちみつ砲(lv4)', value: 'honeyCannonLv4' },
            { text: 'DPC（S/Z残し）', value: 'szDPC' },
            { text: 'DPC（O残し）', value: 'oDPC' }
        ];
        for (let option of options) {
            let opt = document.createElement('option');
            opt.value = option.value;
            opt.innerHTML = option.text;
            dropdown.appendChild(opt);
        }
        selectionWindow.appendChild(dropdown);

        // Create the confirm button
        let confirmButton = document.createElement('button');
        confirmButton.innerHTML = '決定';
        confirmButton.style.width = '100%';
        confirmButton.style.padding = '10px';
        confirmButton.style.fontSize = '16px';
        confirmButton.style.backgroundColor = '#4CAF50';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.onclick = function() {

            let selectedValue = document.getElementById('gameModeSelector').value;
            switch (selectedValue) {
                case 'honeyCannonLv1':
                    g_exercise_book = EXERCISE_BOOK_OF_HONEY_CUP_LV1;
                    break;
                case 'honeyCannonLv2':
                    g_exercise_book = EXERCISE_BOOK_OF_HONEY_CUP_LV2;
                    break;
                case 'honeyCannonLv3':
                    g_exercise_book = EXERCISE_BOOK_OF_HONEY_CUP_LV3;
                    break;
                case 'honeyCannonLv4':
                    g_exercise_book = EXERCISE_BOOK_OF_HONEY_CUP_LV4;
                    break;
                case 'szDPC':
                    g_exercise_book = EXERCISE_BOOK_OF_DPC_SZ;
                    break;
                case 'oDPC':
                    g_exercise_book = EXERCISE_BOOK_OF_DPC_O;
                    break;
                default:
                    g_exercise_book = null;
            }

            // Remove the selection window after a choice is made
            document.body.removeChild(overlay);
            document.body.removeChild(selectionWindow);

            console.log("initializeGameMode 10")
            initializeWinConditions();

        };
        selectionWindow.appendChild(confirmButton);

    }

    // ----------------------------
    // 初期化処理
    // ----------------------------
    initializeGameMode();
    //initializeWinConditions();

    // ----------------------------
    // イベント処理
    // ----------------------------
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' && !g_isSimulating && g_exercise_book) {
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
