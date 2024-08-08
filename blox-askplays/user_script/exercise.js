// ==UserScript==
// @name         テトリス 練習
// @namespace    http://tampermonkey.net/
// @version      2024-08-06
// @description  テトリスの練習のためのスクリプトであり、Blox上で苦手盤面を練習できるようになっています。
// @author       author
// @match        https://blox.askplays.com/map-maker
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/lib/utility.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("スクリプトが正しく動作するか確認するためのログ出力。2024-08-06")

    // Constants
    const MAP_CODE_DEFAULT = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    const EXERCISES = [
        {
            id: 'count_only_mode',
            title: "ノーマル練習（カウント機能のみ）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 10,
            },
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'honey_cup_2nd_bag_lv1',
            title: "【はちみつ砲】2巡目の練習①",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
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
        {
            id: 'honey_cup_2nd_bag_lv2',
            title: "【はちみつ砲】2巡目の練習②",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
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
        {
            id: 'honey_cup_1st_bag',
            title: "【はちみつ砲】1巡目 ハードドロップのみ確定盤面から",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'tszl',
                    mapCode: '00000000000000000022000000000000000000220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000005510000000000000000005100000000000000000051'
                },
                {
                    pieceQueue: 'tozl',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000660000000000000000006000000000000000000001000000000000000005510000000000000000005100000000000000000051'
                },
                {
                    pieceQueue: 'tzjl',
                    mapCode: '00000000000000000022000000000000000000220000000000000000000000000000000000000006000000000000000000660000000000000000006000000000000000000001000000000000000000010000000000000000000100000000000000000001'
                },
                {
                    pieceQueue: 'tszj',
                    mapCode: '00000000000000000041000000000000000000410000000000000000044100000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002200000000000000000022'
                },
                {
                    pieceQueue: 'tosj',
                    mapCode: '00000000000000000041000000000000000000410000000000000000044100000000000000000001000000000000000000700000000000000000007700000000000000000007000000000000000000000000000000000000000000000000000000000000'
                },
                {
                    pieceQueue: 'tslj',
                    mapCode: '00000000000000000001000000000000000000010000000000000000000100000000000000000001000000000000000000700000000000000000007700000000000000000007000000000000000000000000000000000000002200000000000000000022'
                },

            ]
        },
        {
            id: 'honey_cup_3nd_bag_a2_root_pc_practice',
            title: "【はちみつ砲】3巡目(A②ルート)のパフェ練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000044444422000000000000004554220000000000000022533300000000000000225636000000000000000066660000000000000000606000000000000000700001000000000000007775510000000000000007775100000000000001111751'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000001111641000000000000000666410000000000000066644100000000000000600001000000000000000070700000000000000000777700000000000000224737000000000000002243330000000000000054452200000000000055555522'
                },

            ]
        },
        {
            id: 'honey_cup_basic_pc_root',
            title: "【はちみつ砲】3巡目 基本形 PCルートの練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
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
        {
            id: 'dpc_sz',
            title: "【DPC練習】s/z残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 's',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    pieceQueue: 'z',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_sz_doukei',
            title: "【DPC練習】s/z残し ssl(zzj)型",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 'losit',
                    mapCode: '00000000000000000000000000000000000000550000000000000000000500000000000000000075000000000000000000770000000000000000000700000000000000000070000000000000000000770000000000000000000700000000000000000000'
                },
                {
                    pieceQueue: 'jozit',
                    mapCode: '00000000000000000000000000000000000000060000000000000000006600000000000000000060000000000000000000060000000000000000006600000000000000000064000000000000000000040000000000000000004400000000000000000000'
                },
            ]
        },
        {
            id: 'dpc_o',
            title: "【DPC練習】o残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 'o',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_o_harddrop_ver_pc_root',
            title: "【DPC練習】o残し L->S(J->Z)型　pc練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000005550000000000000000057700000000000000000770'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000660000000000000000004660000000000000000044400000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000005220000000000000000052200000000000000000550'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000440000000000000000004220000000000000000042200000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
            ]
        },
        {
            id: 'dpc_o_dakyou_harddrop_ver_pc_root',
            title: "【DPC練習】o残し　L->S(J->Z)型　妥協系　pc練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000444000000000000000002240000000000000000022000000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000002200000000000000000022500000000000000000555'
                },
            ]
        },
        {
            id: 'dpc_o_compromise_root',
            title: "【DPC練習】o残し S->L(Z->J)型　妥協系",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
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
        {
            id: 'dpc_o_hasei',
            title: "【DPC練習】o残し 派生4種",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000006000000000000000000660000000000000000046000000000000000000444000000000000000005220000000000000000052200000000000000000550'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000440000000000000000004220000000000000000042200000000000000000555000000000000000005700000000000000000007700000000000000000007000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000005220000000000000000052200000000000000000550'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000440000000000000000004220000000000000000042200000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000444000000000000000002240000000000000000022000000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000002200000000000000000022500000000000000000555'
                },
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
        {
            id: 'pc-spin-1st-bag',
            title: "【PC-spin(okversion)】1巡目(確定ミノ設置済み盤面から)",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'tizol',
                    mapCode: '00000000000000006655000000000000000006650000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
                {
                    pieceQueue: 'tisoj',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000077400000000000000007744'
                },
                {
                    pieceQueue: 'tiszo',
                    mapCode: '00000000000000000055000000000000000000050000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000400000000000000000044'
                },
            ]
        },
        {
            id: 'pc-spin-2nd-bag',
            title: "【PC-spin(okversion)】2巡目",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
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
        },
        {
            id: 'pc-spin-3nd-pc-bag',
            title: "【PC-spin(okversion)】3巡目PCの練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000011116655000000000000411116650000000000004440000500000000000000007070000000000000000077770000000000000000673700000000000000066333000000000000000652240000000000000022522400000000000000225544'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000224455000000000000002242250000000000000007422500000000000000077333000000000000000076360000000000000000666600000000000000006060000000000000555000040000000000005111177400000000000011117744'
                },
            ]
        },
        {
            id: 'pc-spin-3nd-pc-bag2',
            title: "【PC-spin(okversion)】3巡目PCの練習2",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000011116655000000000000411116650000000000004440000500000000000000007070000000000000000077770000000000000055573700000000000000522333000000000000000222240000000000000006622400000000000000006644'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000007755000000000000000772250000000000000002222500000000000000422333000000000000004446360000000000000000666600000000000000006060000000000000555000040000000000005111177400000000000011117744'
                },
            ]
        },
        {
            id: 'satsuki_1bug',
            title: "【皐月積み】1巡目（確定盤面）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'jszto',
                    mapCode: '00000000000000001111000000000000000004440000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
                },
                {
                    pieceQueue: 'lszto',
                    mapCode: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050000000000000000055500000000000000001111'
                },
            ]
        },
        {
            id: 'satsuki_2bug',
            title: "【皐月積み】2巡目の練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'j',
                    mapCode: '00000000000000661111000000000000000664440000000000000000000400000000000000000070000000000000000000770000000000000000003700000000000000000333000000000000000000220000000000000000002200000000000000000000'
                },
                {
                    pieceQueue: 'l',
                    mapCode: '00000000000000000000000000000000000000220000000000000000002200000000000000000333000000000000000000360000000000000000006600000000000000000060000000000000000000050000000000000007755500000000000000771111'
                },
            ]
        },
        {
            id: 'sangaku2gou_3bug_pc_root_sz',
            title: "【山岳積み2号】3巡目 pc練習（s/zが早い場合）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000005551111000000000000056666550000000000000226666500000000000002200005000000000000000070700000000000000000777700000000000000444737000000000000000443330000000000000004442200000000000000111122'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000111122000000000000000555220000000000000005533300000000000000555636000000000000000066660000000000000000606000000000000002200004000000000000022777740000000000000477774400000000000004441111'
                },
            ]
        },
        {
            id: 'sangaku2gou_3bug_pc_root_o',
            title: "【山岳積み2号】3巡目 pcパフェルート練習（oが早い場合）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000221111000000000000002266550000000000000055566500000000000000500005000000000000000070700000000000000000777700000000000000444737000000000000006443330000000000000664442200000000000006111122'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000007111122000000000000077555220000000000000075533300000000000000555636000000000000000066660000000000000000606000000000000000400004000000000000004447740000000000000022774400000000000000221111'
                },
            ]
        },
        {
            id: 'meisouhou_dakyou_pc_root',
            title: "【迷走法】3巡目パフェルート（妥協）練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'jt',
                    mapCode: '00000000000000001111000000000000000224440000000000000662266400000000000000664466000000000000000043330000000000000000403000000000000000700005000000000000007775550000000000000007772200000000000001111722'
                },
            ]
        },
    ];
    const MAP_SEED_SUFFIX = Math.random().toString(36).substr(2, 4);
    const NOTIFY_USER_GAME_COUNT = 100;
    const SIMULATE_KEY_PRESS_DELAY = 100; // milliseconds
    const DOM_ELEMENT_IDS = ['piece-queue', 'map-code', 'map-seed', 'load-map', 'win-con', 'win-con-count'];

    // Global Variables
    let g_currentGameCount;
    let g_isSimulatingRKey;
    let g_currentExercise;
    let g_domElements;

    /**
     * initialize global valiables
     */
    function initializeGlobalVar() {
        g_currentGameCount = 0;
        g_isSimulatingRKey = false;
        g_currentExercise = null;
        g_domElements = {};
    }


    /**
     * Retrieve DOM elements and store them in the global variable g_domElements.
     */
    function setDomElements() {
        DOM_ELEMENT_IDS.forEach(id => {
            g_domElements[id] = document.getElementById(id);
        });
    }

    /**
     * Check if all necessary DOM elements have been retrieved successfully.
     * @returns {boolean} - Returns true if all elements are found, otherwise false.
     */
    function checkDomElements() {
        for (let id of DOM_ELEMENT_IDS) {
            if (!g_domElements[id]) {
                console.error(`${id} element not found`);
                return false;
            }
        }
        return true;
    }

    /**
     * Simulate pressing the 'r' key with a delay.
     */
    function simulateRKeyPress() {
        setTimeout(() => {
            g_isSimulatingRKey = true;
            simulateKeyPress('r');
            g_isSimulatingRKey = false;
        }, SIMULATE_KEY_PRESS_DELAY);
    }

    /**
     * Update the field based on the current exercise and game count.
     */
    function updateField() {
        if (!checkDomElements()) return;

        let map_seed = `${g_currentGameCount}_${MAP_SEED_SUFFIX}`;
        let exercise = getRandomElementFromList(g_currentExercise.board_list, map_seed)
        let pieceQueue = shuffleString(exercise.pieceQueue, map_seed);

        const event = new Event("change");

        g_domElements['win-con'].value = g_currentExercise.win_condition.type;
        g_domElements['win-con'].dispatchEvent(event);

        g_domElements['win-con-count'].value = g_currentExercise.win_condition.count;
        g_domElements['win-con-count'].dispatchEvent(event);

        g_domElements['piece-queue'].value = pieceQueue;
        g_domElements['map-code'].value = exercise.mapCode;
        g_domElements['map-seed'].value = map_seed;
        g_domElements['load-map'].click();
    }

    /**
     * Increment the game count and notify the user if the count reaches a multiple of NOTIFY_USER_GAME_COUNT.
     * @param {number} n - The number to increment the game count by.
     */
    function incrementGameCount(n) {
        g_currentGameCount = Math.max(g_currentGameCount + n, 1);

        let completedGameCount = g_currentGameCount - 1;
        if ((n>=0) && (completedGameCount % NOTIFY_USER_GAME_COUNT === 0) && (completedGameCount >= NOTIFY_USER_GAME_COUNT)) {
            notifyUser(completedGameCount);
        }
    }

    /**
     * Notify the user when the game count reaches a specified number.
     * @param {number} gameCount - The current game count.
     */
    function notifyUser(gameCount) {
        console.log(`Game count reached ${gameCount}, which is a multiple of ${NOTIFY_USER_GAME_COUNT}!`);
        alert(`Game count reached ${gameCount}, which is a multiple of ${NOTIFY_USER_GAME_COUNT}!`);
    }

    /**
     * Create an overlay to prevent interaction with the rest of the page.
     * @returns {HTMLDivElement} - The created overlay element.
     */
    function createOverlay() {
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
        return overlay;
    }

    /**
     * Create a selection window for choosing the exercise mode.
     * @param {HTMLDivElement} overlay - The overlay element to append the window to.
     * @returns {HTMLDivElement} - The created selection window element.
     */
    function createSelectionWindow(overlay) {
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
        return selectionWindow;
    }

    /**
     * Create a title element for the selection window.
     * @param {HTMLDivElement} selectionWindow - The selection window element to append the title to.
     */
    function createTitle(selectionWindow) {
        let title = document.createElement('h2');
        title.innerHTML = 'ゲームを選択してください';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        title.style.color = '#000';
        selectionWindow.appendChild(title);
    }

    /**
     * Create a dropdown menu for selecting the game mode.
     * @param {HTMLDivElement} selectionWindow - The selection window element to append the dropdown to.
     */
    function createDropdown(selectionWindow) {
        let dropdown = document.createElement('select');
        dropdown.id = 'gameModeSelector';
        dropdown.style.width = '100%';
        dropdown.style.padding = '10px';
        dropdown.style.fontSize = '16px';
        dropdown.style.marginBottom = '20px';

        EXERCISES.forEach(book => {
            let opt = document.createElement('option');
            opt.value = book.id;
            opt.innerHTML = book.title;
            dropdown.appendChild(opt);
        });

        selectionWindow.appendChild(dropdown);
    }

    /**
     * Create a confirm button to finalize the game mode selection.
     * @param {HTMLDivElement} selectionWindow - The selection window element to append the button to.
     * @param {HTMLDivElement} overlay - The overlay element to remove after selection.
     */
    function createConfirmButton(selectionWindow, overlay) {
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
            g_currentExercise = EXERCISES.find(book => book.id === selectedValue);
            document.body.removeChild(overlay);
            document.body.removeChild(selectionWindow);
            updateExerciseTitle(g_currentExercise.title);
        };

        selectionWindow.appendChild(confirmButton);
    }

    /**
     * Create an element to display the current exercise title and a button to return to the selection screen.
     */
    function createExerciseTitleElement() {
        let exerciseTitleElement = document.createElement('div');
        exerciseTitleElement.id = 'exerciseTitle';
        exerciseTitleElement.style.position = 'fixed';
        exerciseTitleElement.style.bottom = '0';
        exerciseTitleElement.style.left = '50%';
        exerciseTitleElement.style.transform = 'translateX(-50%)';
        exerciseTitleElement.style.width = '80%';
        exerciseTitleElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        exerciseTitleElement.style.color = '#ccc';
        exerciseTitleElement.style.textAlign = 'center';
        exerciseTitleElement.style.padding = '8px';
        exerciseTitleElement.style.fontSize = '12px';
        exerciseTitleElement.style.zIndex = '1000';
        exerciseTitleElement.style.borderTop = '2px solid #4CAF50'; // Green border for visibility

        document.body.appendChild(exerciseTitleElement);
    }

    /**
     * Update the exercise title element with the current exercise title.
     * @param {string} title - The title of the current exercise.
     */
    function updateExerciseTitle(title) {
        let exerciseTitleElement = document.getElementById('exerciseTitle');
        if (!exerciseTitleElement) {
            createExerciseTitleElement();
            exerciseTitleElement = document.getElementById('exerciseTitle');
        }
        // Update the title
        exerciseTitleElement.innerHTML = title;
    }

    function selectGameMode() {
        initializeGlobalVar();
        setDomElements();
        let overlay = createOverlay();
        let selectionWindow = createSelectionWindow(overlay);
        createTitle(selectionWindow);
        createDropdown(selectionWindow);
        createConfirmButton(selectionWindow, overlay);
    }

    // Main Event
    window.addEventListener('load', selectGameMode);

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
