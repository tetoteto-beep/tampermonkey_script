// ---------------------------------------
// ControlLeftを押下することで20手戻る処理
// ---------------------------------------
const REPEAT_COUNT = 20;

document.addEventListener('keydown', function(event) {
    if (event.code === 'ControlLeft') {
        for (let i = 0; i < REPEAT_COUNT; i++) {
            document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Digit1', key: '1', bubbles: true, cancelable: true }));
        }
    }
});

// -----------------------------------------------------------
// ページ読み込み完了時にQキーを押下し、ToggleFocusModeにする処理
// -----------------------------------------------------------
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

window.addEventListener('load', function() {
    // Qキーの押下
    simulateKeyPress('q');
});

// -----------------------------------------------------------
// ページ読み込み完了時にチャット画面を閉じる処理
// -----------------------------------------------------------
window.addEventListener('load', function() {
    // チャット画面を閉じる
    document.getElementById('close-chat').click();
});
