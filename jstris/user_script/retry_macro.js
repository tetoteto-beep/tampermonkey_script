// ==UserScript==
// @name         jstris AI対戦時のリトライ処理マクロ
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  jstris上でColdClearなどのaiと対戦する際、rボタンを押下することでリトライできるようにする。
// @author       You
// @match        https://jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let rCount = 0;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'r') {
            simulateActions();
            rCount++;
            //sendChatMessage(rCount);
        }
    });

    function simulateActions() {
        // canvas要素をクリックしてフォーカスを設定
        //const canvas = document.querySelector('#myCanvas');
        //if (canvas) {
        //    canvas.focus();  // フォーカスを与える
        //    canvas.click();  // クリックをシミュレート
        //}

        // 上ボタン（ハードドロップが上ボタンになっている想定）を20回押す
        for (let i = 0; i < 20; i++) {
            simulateKeyPress();
        }

        // 開始ボタンを押す
        const startButton = document.querySelector('#res[data-text="開始"]');
        if (startButton) {
            startButton.click();
        }
    }

    function simulateKeyPress() {
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            code: 'ArrowUp',
            keyCode: 38,
            which: 38,
            bubbles: true
        });
        document.dispatchEvent(event);

        const keyupEvent = new KeyboardEvent('keyup', {
            key: 'ArrowUp',
            code: 'ArrowUp',
            keyCode: 38,
            which: 38,
            bubbles: true
        });
        document.dispatchEvent(keyupEvent);
    }

    // チャットメッセージを送信する関数
    function sendChatMessage(count) {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMsg');

        if (chatInput && sendButton) {
            chatInput.value = `cnt:${count}`;
            sendButton.click();
        }
    }
})();
