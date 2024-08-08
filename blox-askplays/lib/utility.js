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
 * 文字列をハッシュ化して数値シードを生成します。
 * 
 * @param {string} str ハッシュ化する文字列
 * @returns {number} 生成された数値シード
 */
function stringToSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

/**
 * シード値に基づいた単一の乱数を生成します。
 * 
 * @param {number} seed シード値
 * @returns {number} 生成された乱数
 */
function generateRandom(seed) {
    let m = 0x80000000; // 2**31
    let a = 1103515245;
    let c = 12345;

    seed = seed % m;
    return (a * seed + c) % m / (m - 1);
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
function shuffleString(str, seed = 'defaultSeed') {
    const arr = str.split('');
    let numericSeed = stringToSeed(seed);
    
    for (let i = arr.length - 1; i > 0; i--) {
        numericSeed = generateRandom(numericSeed);
        const j = Math.floor(numericSeed * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

/**
 * シード値を用いてリストからランダムに要素を取得します。
 * 
 * @param {Array} list ランダムに要素を取得するリスト
 * @param {string|number} seed シード値（文字列または数値）
 * @returns {*} リストから取得されたランダムな要素
 * 
 * @example
 * // 出力例: 'banana'
 * console.log(getRandomElementFromList(['apple', 'banana', 'cherry'], 'seed123'));
 */
function getRandomElementFromList(list, seed) {
    
    const index = stringToSeed(seed) % list.length;
    return list[index];
}
