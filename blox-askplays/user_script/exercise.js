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

    // ----------------------------
    // 定数定義
    // ----------------------------
    const EXERCISES = {
        countOnlyMode: {
            id: 'count_only_mode',
            description: "ノーマル練習（カウント機能のみ）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 10,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
            ]
        },
        honeyCup2ndBagLv1: {
            id: 'honey_cup_2nd_bag_lv1',
            description: "【はちみつ砲】2巡目の練習①",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            isPieceQueueShuffle: true,
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: '00000000000000000641000000000000000066410000000000000000644100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000052200000000000000055522'
                },
                {
                    pieceQueue: '',
                    mapCode: '00000000000000044422000000000000000004220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000075510000000000000000775100000000000000000751'
                },
            ]
        },
        honeyCup2ndBagLv2: {
            id: 'honey_cup_2nd_bag_lv2',
            description: "【はちみつ砲】2巡目の練習②",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            isPieceQueueShuffle: true,
            board_list: [
                {
                    pieceQueue: 'js',
                    mapCode: '00000000000000000041000000000000000000410000000000000000044100000000000000000001000000000000000000700000000000000000007700000000000000000037000000000000000003330000000000000000002200000000000000000022'
                },
                {
                    pieceQueue: 'lz',
                    mapCode: '00000000000000000022000000000000000000220000000000000000033300000000000000000036000000000000000000660000000000000000006000000000000000000001000000000000000005510000000000000000005100000000000000000051'
                },
            ]
        },
        honeyCup2ndBagLv3: {
            id: 'honey_cup_2nd_bag_lv3',
            description: "【はちみつ砲】2巡目の練習③",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            isPieceQueueShuffle: true,
            board_list: [
                {
                    pieceQueue: 'tjls',
                    mapCode: '00000000000000000001000000000000000000010000000000000000000100000000000000000001000000000000000000700000000000000000007700000000000000000007000000000000000000000000000000000000002200000000000000000022'
                },
                {
                    pieceQueue: 'tjlz',
                    mapCode: '00000000000000000022000000000000000000220000000000000000000000000000000000000006000000000000000000660000000000000000006000000000000000000001000000000000000000010000000000000000000100000000000000000001'
                },

            ]
        },
        honeyCupBasicPCRoot: {
            id: 'honey_cup_basic_pc_root',
            description: "【はちみつ砲】3巡目 基本形 PCルートの練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: '00000000000000001111000000000000000052210000000000000000522100000000000000005501000000000000000000000000000000000000000700000000000000000447000000000000000006630000000000000000006200000000000000000052'
                },
                {
                    pieceQueue: '',
                    mapCode: '00000000000000000042000000000000000000220000000000000000042300000000000000000446000000000000000000060000000000000000000000000000000000005701000000000000000057710000000000000000557100000000000000001111'
                },
                {
                    pieceQueue: '',
                    mapCode: '00000000000000001111000000000000000044610000000000000000466100000000000000004601000000000000000000000000000000000000000700000000000000000557000000000000000005230000000000000000002200000000000000000052'
                },
                {
                    pieceQueue: '',
                    mapCode: '00000000000000000042000000000000000000720000000000000000077300000000000000000556000000000000000000060000000000000000000000000000000000004401000000000000000042210000000000000000422100000000000000001111'
                },
            ]
        },

        honeyCupDPCMinoSZ: {
            id: 'dpc_sz',
            description: "【DPC練習】s/z残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: 's',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
                {
                    pieceQueue: 'z',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
            ]
        },
        honeyCupDPCMinoO: {
            id: 'dpc_o',
            description: "【DPC練習】o残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: 'o',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
            ]
        },
        honeyCupDPCMinoOCompromiseRoot: {
            id: 'dpc_o_compromise_root',
            description: "【DPC練習】o残し 妥協系",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000444000000000000000002240000000000000000022000000000000000000555000000000000000005700000000000000000007700000000000000000007000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000006000000000000000000660000000000000000046000000000000000000444000000000000000002200000000000000000022500000000000000000555'
                },
            ]
        },

        honeyCupPCSpin2ndBag: {
            id: 'pc-spin-2nd-bag',
            description: "【PC-spin(okversion)】2巡目",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            isPieceQueueShuffle: false,
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: '00000000000000006655000000000000011116650000000000000000000500000000000000000070000000000000000000770000000000000000003700000000000000000333000000000000000002240000000000000000022400000000000000000044'
                },
                {
                    pieceQueue: '',
                    mapCode: '00000000000000000055000000000000000002250000000000000000022500000000000000000333000000000000000000360000000000000000006600000000000000000060000000000000000000040000000000000111177400000000000000007744'
                },
            ]
        }
    }

    const MAP_SEED_SUFFIX = Math.random().toString(36).substr(2, 4);

    const NOTIFY_USER_GAME_COUNT = 100;

    // ----------------------------
    // 変数定義
    // ----------------------------
    let g_currentGameCount = 0;
    let g_isSimulatingRKey = false;
    let g_currentExercise = null;

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
            g_isSimulatingRKey = true; // デフォルトの動作を行うため
            simulateKeyPress('r');
            g_isSimulatingRKey = false;
        }, 100); // 100ミリ秒の遅延
    }


    function updateField() {
        let exerciseIndex = mod(g_currentGameCount, g_currentExercise.board_list.length);
        const exercise = g_currentExercise.board_list[exerciseIndex];

        const pieceQueueElement = document.getElementById('piece-queue');
        const mapCodeElement = document.getElementById('map-code');
        const mapSeedElement = document.getElementById('map-seed');
        const loadMapElement = document.getElementById('load-map');

        if (!pieceQueueElement || !mapCodeElement || !mapSeedElement || !loadMapElement) {
            console.error('必要なDOM要素が見つかりません');
            return;
        }

        // pieceQueueをシャッフルするかどうかをチェック
        if (g_currentExercise.isPieceQueueShuffle) {
            exercise.pieceQueue = shuffleString(exercise.pieceQueue);
        }

        // 勝利条件のための種別・回数を設定
        // ・種別設定
        const event = new Event("change");
        const winConElement = document.getElementById("win-con");
        if (!winConElement) {
            console.error('win-con要素が見つかりません');
            return;
        }
        winConElement.value = g_currentExercise.win_condition.type;
        winConElement.dispatchEvent(event);

        // ・回数設定
        const winConCountElement = document.getElementById("win-con-count");
        if (!winConCountElement) {
            console.error('win-con-count要素が見つかりません');
            return;
        }
        winConCountElement.value = g_currentExercise.win_condition.count;
        winConCountElement.dispatchEvent(event);


        // ネクスト、画面、シード値を設定したのち、LoadMapボタンを押下し画面を更新
        pieceQueueElement.value = exercise.pieceQueue;
        mapCodeElement.value = exercise.mapCode;
        mapSeedElement.value = `${g_currentGameCount}_${MAP_SEED_SUFFIX}`;
        loadMapElement.click();


    }

    function incrementGameCount(n) {
        g_currentGameCount = Math.max(g_currentGameCount + n, 1);

        let completedGameCount = g_currentGameCount - 1
        if ((n>=0) && (completedGameCount % NOTIFY_USER_GAME_COUNT === 0) && (completedGameCount >= NOTIFY_USER_GAME_COUNT)) {
            notifyUser(completedGameCount);
        }

    }


    function initializeGameMode() {

        // Create the overlay background
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        overlay.style.pointerEvents = 'auto';
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
        overlay.style.pointerEvents = 'auto';
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

        Object.values(EXERCISES).forEach(book => {
            let opt = document.createElement('option');
            opt.value = book.id;
            opt.innerHTML = book.description;
            dropdown.appendChild(opt);
        });

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
            g_currentExercise = Object.values(EXERCISES).find(book => book.id === selectedValue);

            // Remove the selection window after a choice is made
            document.body.removeChild(overlay);
            document.body.removeChild(selectionWindow);

            updateField();
        };
        selectionWindow.appendChild(confirmButton);

    }

    // ----------------------------
    // イベント処理
    // ----------------------------
    window.addEventListener('load', initializeGameMode);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' && !g_isSimulatingRKey && g_currentExercise) {
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
