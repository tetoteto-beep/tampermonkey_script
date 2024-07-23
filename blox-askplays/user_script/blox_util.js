// ==UserScript==
// @name         便利機能一式
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

})();