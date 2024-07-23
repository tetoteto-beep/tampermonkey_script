/**
 * @fileoverview
 * このファイルには、一般的なユーティリティ関数が含まれています。
 * 
 * @module utility
 * 
 * @version 1.0.0
 * @since 2024-07-23
 * 
 * @license MIT
 * 
 * @description
 * - `mod`: 正の余りを返すモジュロ関数。
 * - `simulateKeyPress`: キーイベントをシミュレートして、特定のキーが押されたことをエミュレートします。
 * - `shuffleString`: 文字列をランダムにシャッフルします。
 * - `parseConstraints`: 制約文字列を解析して、制約のペアリストを生成します。
 * - `applyConstraints`: 制約リストに従ってシャッフルされた文字列を調整します。
 */

/**
 * 正の余りを返すモジュロ関数。
 * 
 * @param {number} a 割られる数
 * @param {number} b 割る数
 * @returns {number} 正の余り
 * 
 * @example
 * // 出力例: 2
 * console.log(mod(10, 8));
 */
function mod(a, b) {
    return ((a % b) + b) % b;
}

/**
 * キーイベントをシミュレートして、特定のキーが押されたことをエミュレートします。
 * 
 * @param {string} key シミュレートするキーの名前（例: 'a', 'Enter'）
 * 
 * @example
 * simulateKeyPress('a');
 */
function simulateKeyPress(key) {
    const keyEventInit = {
        key: key,
        code: `Key${key.toUpperCase()}`,
        keyCode: key.toUpperCase().charCodeAt(0),
        which: key.toUpperCase().charCodeAt(0),
        bubbles: true,
        cancelable: true
    };

    document.dispatchEvent(new KeyboardEvent('keydown', keyEventInit));
    document.dispatchEvent(new KeyboardEvent('keyup', keyEventInit));
}

/**
 * 文字列をランダムにシャッフルします。
 * 
 * @param {string} str シャッフルする文字列
 * @returns {string} シャッフルされた文字列
 * 
 * @example
 * // 出力例: 'cba'
 * console.log(shuffleString('abc'));
 */
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

/**
 * 制約文字列を解析して、制約のペアリストを生成します。
 * 
 * @param {string} constraints 制約文字列（例: "{a,b}<c and d<{e,f,g}"）
 * @returns {Array<Array<string>>} 制約のペアリスト
 * 
 * @example
 * // 出力例: [['a', 'c'], ['b', 'c'], ['d', 'e'], ['d', 'f'], ['d', 'g']]
 * console.log(parseConstraints('{a,b}<c and d<{e,f,g}'));
 */
function parseConstraints(constraints) {
    const constraintPattern = /(\{?[a-z,]+\}?)<(\{?[a-z,]+\}?)/g;
    let match;
    const parsedConstraints = [];
    
    while ((match = constraintPattern.exec(constraints)) !== null) {
        const left = match[1].replace(/[{}]/g, '').split(',');
        const right = match[2].replace(/[{}]/g, '').split(',');
        for (let l of left) {
            for (let r of right) {
                parsedConstraints.push([l, r]);
            }
        }
    }
    
    return parsedConstraints;
}

/**
 * 制約リストに従ってシャッフルされた文字列を調整します。
 * 
 * @param {string} str シャッフルする文字列
 * @param {string} constraints 制約文字列（例: "{a,b}<c and d<{e,f,g}"）
 * @returns {string} 制約に従ったシャッフルされた文字列
 * 
 * @example
 * // 出力例: 'adecfg'
 * console.log(applyConstraints('abcdefg', '{a,b}<c and d<{e,f,g}'));
 */
function applyConstraints(str, constraints) {
    let randomStr = shuffleString(str);
    const constraintsList = parseConstraints(constraints);
    
    // 制約リストをランダムに並び替える
    for (let i = constraintsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [constraintsList[i], constraintsList[j]] = [constraintsList[j], constraintsList[i]];
    }
    

    // 制約を適用してシャッフルを調整する
    // FIXME: あまりきれいな処理じゃない。オーダーn^2？よくないので修正したくはある。動くのでいったんよしとする。
    const arr = randomStr.split('');
    let max_loop_cnt = 10;
    for(let i = 0; i>max_loop_cnt;i++) {
        
        const arr_before = [...arr]; // 配列のコピーを作成
        for (const [before, after] of constraintsList) {
            const beforeIndex = arr.indexOf(before);
            const afterIndex = arr.indexOf(after);
            if (beforeIndex > afterIndex) {
                // 入れ替えが必要
                [arr[beforeIndex], arr[afterIndex]] = [arr[afterIndex], arr[beforeIndex]];
            }
        }

        if (arr.join('') === arr_before.join('')) {
            break
        }
    }
    return arr.join('');
    
}
