// ==UserScript==
// @name         F4キーを押下することで対戦をリトライする
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  F4キーを押下することで対戦をリトライする処理。jstrisでは設定からリトライキーを変更できる機能があるが、うまく動作しないので代替の処理。
// @author       You
// @match        https://jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function simulateF4KeyPress() {
        // キーボードイベントの生成
        let event = new KeyboardEvent('keydown', {
            key: 'F4',
            keyCode: 115, // F4のキーコード
            which: 115, // F4のキーコード
            code: 'F4',
            bubbles: true, // イベントがバブリングするか
            cancelable: true, // イベントをキャンセルできるか
        });

        // ターゲット要素にイベントをディスパッチ
        document.dispatchEvent(event);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'r') {
            // F4キー押下をシミュレート
            simulateF4KeyPress();
        }
    });

})();
