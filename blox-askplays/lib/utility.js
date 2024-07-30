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
