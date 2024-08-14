// ==UserScript==
// @name         テトリス 練習
// @namespace    http://tampermonkey.net/
// @version      2024-08-06
// @description  テトリスの練習のためのスクリプトであり、Blox上で苦手盤面を練習できるようになっています。
// @author       author
// @match        https://blox.askplays.com/map-maker
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/css/add_styles.js
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/lib/utility.js
// @require      https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/lib/exercise_manager.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("スクリプトが正しく動作するか確認するためのログ出力。2024-08-14-6")

    // 定数定義
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
                    holdPiece: '',
                    prevFixedQueue: '',
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
            title: "【はちみつ砲】1巡目 (確定ミノ設置済み盤面から)",
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
            id: 'dpc_szo',
            title: "【DPC練習】osz残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    holdPiece: 'o',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 's',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_sz',
            title: "【DPC練習】sz残し",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    holdPiece: 's',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_sz_s04',
            title: "【DPC練習】sz残し 派生練習（sz/zs型）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000000660000000000000000004660000000000000000044400000000000000000055000000000000000000050000000000000006607500000000000000006677000000000000000002270000000000000000022000000000000000001111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000001111000000000000000002200000000000000000022600000000000000007766000000000000000770640000000000000000000400000000000000000044000000000000000005550000000000000000057700000000000000000770'
                },
            ]
        },
        {
            id: 'dpc_sz_ssl',
            title: "【DPC練習】sz残し 派生練習（ssl型）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    holdPiece: 's',
                    prevFixedQueue: 'sl',
                    pieceQueue: 'iotzj',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    prevFixedQueue: 'zj',
                    pieceQueue: 'iotsl',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 's',
                    prevFixedQueue: 'sil',
                    pieceQueue: 'otzj',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    prevFixedQueue: 'zij',
                    pieceQueue: 'otsl',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_sz_loj_jol',
            title: "【DPC練習】sz残し 派生練習（loj, jol型）",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    holdPiece: 's',
                    prevFixedQueue: 'stiloj',
                    pieceQueue: 'z',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    prevFixedQueue: 'ztijol',
                    pieceQueue: 's',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 's',
                    prevFixedQueue: 'stijolz',
                    mapCode: MAP_CODE_DEFAULT
                },
                {
                    holdPiece: 'z',
                    prevFixedQueue: 'ztilojs',
                    mapCode: MAP_CODE_DEFAULT
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
                    holdPiece: 'o',
                    mapCode: MAP_CODE_DEFAULT
                },
            ]
        },
        {
            id: 'dpc_o_harddrop_ver_pc_root',
            title: "【DPC練習】o残し 派生練習（中:ls × 端:標準型）",
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
            title: "【DPC練習】o残し 派生練習（中:ls × 端:妥協型）",
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
            id: 'dpc_o_dakyou_harddrop_ver_pc_root_hasei',
            title: "【DPC練習】o残し 派生練習（中:ls × 端:妥協型） 低確率分岐",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 1,
            },
            board_list: [
                {
                    holdPiece: 't',
                    prevFixedQueue: 'tis',
                    pieceQueue: 'ozlj',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000005220000000000000000052200000000000000000550'
                },
                {
                    holdPiece: 't',
                    prevFixedQueue: 'tiz',
                    pieceQueue: 'oslj',
                    mapCode: '00000000000000000440000000000000000004220000000000000000042200000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
                {
                    holdPiece: 't',
                    prevFixedQueue: 'tsz',
                    pieceQueue: 'iolj',
                    mapCode: '00000000000000001111000000000000000077220000000000000007702200000000000000000000000000000000000000640000000000000000066400000000000000000644000000000000000005220000000000000000052200000000000000000550'
                },
                {
                    holdPiece: 't',
                    prevFixedQueue: 'tsz',
                    pieceQueue: 'iolj',
                    mapCode: '00000000000000000440000000000000000004220000000000000000042200000000000000000755000000000000000007750000000000000000007500000000000000000000000000000000000660220000000000000000662200000000000000001111'
                },
            ]
        },
        {
            id: 'dpc_o_compromise_root',
            title: "【DPC練習】o残し 派生練習（中:sl × 端:妥協型）",
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
            title: "【DPC練習】o残し 派生練習（全4種）",
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
        {
            id: 'gasshou_kakutei',
            title: "【合掌TSD】1巡目確定盤面から",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'iolj',
                    mapCode: '00000000000000000000000000000000000000030000000000000000003300000000000000000003000000000000000000770000000000000000077000000000000000000660000000000000000000660000000000000000000000000000000000000000'
                },
                {
                    pieceQueue: 'iolj',
                    mapCode: '00000000000000000000000000000000000000000000000000000000007700000000000000000770000000000000000006600000000000000000006600000000000000000003000000000000000000330000000000000000000300000000000000000000'
                },
            ]
        },
        {
            id: 'gasshou_risou_pc_root',
            title: "【合掌TSD】理想形パフェルート",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000665522000000000000004665220000000000000044457700000000000000000770000000000000000006600000000000000000006600000000000000000003000000000000000040330000000000000022444300000000000000221111'
                },
                {
                    pieceQueue: 't',
                    mapCode: '00000000000000221111000000000000002255530000000000000000503300000000000000000003000000000000000000770000000000000000077000000000000000000660000000000000005554660000000000000057742200000000000000774422'
                },
            ]
        },
        {
            id: 'meisou_2junme',
            title: "【迷走法】2巡目 判断練習",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: '',
                    mapCode: '00000000000000001111000000000000000004440000000000000000066400000000000000000066000000000000000003330000000000000000003000000000000000000005000000000000000075550000000000000000772200000000000000000722'
                }
            ]
        },
        {
            id: 'gamushiro_2junme',
            title: "【ガムシロ】2巡目",
            win_condition: {
                type: 1, // "0"Lines, "1"PC, "2"No Garbage
                count: 2,
            },
            board_list: [
                {
                    pieceQueue: 'l',
                    mapCode: '00000000000000006655000000000000000006650000000000000000000500000000000000000070000000000000000000770000000000000000003700000000000000000333000000000000000011110000000000000000002200000000000000000022'
                }
            ]
        },

    ];
    const SIMULATE_KEY_PRESS_DELAY = 100; // milliseconds

    // グローバル変数定義
    let g_isSimulatingRKey;
    let g_manager;

    // 環境の初期化処理
    function initEnv() {
        // グローバル変数の初期化処理
        g_isSimulatingRKey = false;
        g_manager = null; // ユーザがリストから問題を選択した時点で設定するためここではnullを設定しておく

        // 画面下部にタイトルタグを作成
        let exerciseTitleElement = document.createElement('div');
        exerciseTitleElement.id = 'exerciseTitle';
        document.body.appendChild(exerciseTitleElement);
    }

    // リトライに割り当てられている（前提）'r'キーの押下をシミュレートする
    function simulateRKeyPress(holdPiece = null) {
        setTimeout(() => {
            g_isSimulatingRKey = true;
            simulateKeyPress('r');
            g_isSimulatingRKey = false;

            // holdPieceがnullでない場合にのみホールドミノを更新
            // ※ 補足
            //   updateFieldでなく、リトライキーを押下（シミュレート）した後にホールドを設定する背景については以下の通り。
            // 　ホールドについてはpiece queueやmap codeのように設定できるウインドウがない。
            // 　updateField時に内部変数の値を更新してもリトライ処理時にnullになってしまうため、rを押下した後（ゲーム開始直前）に設定することとする。
            if (holdPiece) {
                let pieceColor = convertToColor(holdPiece);
                holdBlock = new Piece(0, 0, pieceColor); // holdBlockはサイト側の変数。ここで直接参照して上書きする。
            }
        }, SIMULATE_KEY_PRESS_DELAY);
    }

     // UI上の盤面情報の更新
    function updateField(exercise) {

        // 勝利条件は値だけ変えても、load-mapボタン押下時に変更前の値が参照される（つまり、値だけ変えても内部的には設定が反映されない）。
        // そのため、変更イベントもあわせてdispatchしておく。
        const event = new Event("change");
        document.getElementById('win-con').value = exercise.win_condition.type;
        document.getElementById('win-con').dispatchEvent(event);
        document.getElementById('win-con-count').value = exercise.win_condition.count;
        document.getElementById('win-con-count').dispatchEvent(event);

        document.getElementById('piece-queue').value = exercise.piece_queue;
        document.getElementById('map-code').value = exercise.map_code;
        document.getElementById('map-seed').value = exercise.seed;
        document.getElementById('load-map').click();

    }

    // ゲームモードの選択画面の表示
    function showSelectGameModeWindow() {

        // オーバーレイの作成（画面全体にグレーのレイヤーを追加。ゲームモード選択画面はこの上に作成してく）
        let overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);

        // オーバーレイ上にゲームモード選択ウインドウを作成
        let selectionWindow = document.createElement('div');
        selectionWindow.id = 'selectionWindow';
        overlay.appendChild(selectionWindow);

        // ゲームモード選択ウインドウ上にタイトルを表示
        let title = document.createElement('h2');
        title.innerHTML = 'ゲームを選択してください';
        selectionWindow.appendChild(title);

        // ゲームモード選択ウインドウ上にドロップダウンを追加
        let dropdown = document.createElement('select');
        dropdown.id = 'gameModeSelector';
        EXERCISES.forEach(book => {
            let opt = document.createElement('option');
            opt.value = book.id;
            opt.innerHTML = book.title;
            dropdown.appendChild(opt);
        });
        selectionWindow.appendChild(dropdown);

        // 問題選択ウインドウ上に決定ボタンを追加
        let confirmButton = document.createElement('button');
        confirmButton.innerHTML = '決定';
        confirmButton.onclick = function() {

            // ユーザが指定したエクササイズをg_managerに設定
            let selectedValue = document.getElementById('gameModeSelector').value;
            let exerciseData = EXERCISES.find(book => book.id === selectedValue);
            g_manager = new ExerciseManager(exerciseData);

            // 作成したwindowをルートから削除
            document.body.removeChild(overlay);

            // 画面下部のタイトル文字列をアップデート
            let exerciseTitleElement = document.getElementById('exerciseTitle');
            exerciseTitleElement.innerHTML = g_manager.title;
        };
        selectionWindow.appendChild(confirmButton);
    }

    // 画面ロード時に行うメイン処理を定義
    function loadMain() {
        initEnv();
        showSelectGameModeWindow();
    }

    // イベントリスナーの設定
    window.addEventListener('load', loadMain);

    document.addEventListener('keydown', function(event) {

        // リトライボタン（'r'）を押下すると次の問題に進む
        if (event.key === 'r' && !g_isSimulatingRKey && g_manager) {
            event.preventDefault();
            g_manager.incrementGameCount();
            const exercise = g_manager.getCurrentExercise();
            updateField(exercise);
            simulateRKeyPress(exercise.hold_piece);
        }

        // 'R'を押下すると一つ前の問題に戻る
        if (event.key === 'R') {
            g_manager.decrementGameCount();
            const exercise = g_manager.getCurrentExercise();
            updateField(exercise);
            simulateRKeyPress(exercise.hold_piece);
        }
    });

})();
