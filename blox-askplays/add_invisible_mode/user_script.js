// ==UserScript==
// @name         Modify Settings Panel on Blox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add options to the settings panel and handle their interactions
// @author       author
// @match        https://blox.askplays.com/map-maker
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}
    var getParams=a=>{var params=a.slice(a.indexOf("(")+1);params=params.substr(0,params.indexOf(")")).split(",");return params}

    // ページが完全にロードされた後に処理を実行
    window.addEventListener('load', function() {
        // デフォルトの Piece.show メソッドを保存
        const originalPieceShow = Piece.prototype.show;

        // デフォルトの Block.show メソッドを保存
        const originalBlockShow = Block.prototype.show;

        // ゴーストなしモードの処理
        // ※noGhostFunc以外は後で消して整理したい。
        const pieceShowFunc = originalPieceShow.toString();
        var params = getParams(pieceShowFunc)
        var modifiedShowFunc = `
            if (t == true) {
                return;
            }
           ${trim(pieceShowFunc)}
        `;

        const noGhostShow = new Function(...params, modifiedShowFunc);

        // 透明モードの処理
        const invisibleShow = function() {
            // 何も表示しない（透明モード）
        };

// ここから下の処理はHTMLを追加する処理なので、処理の塊として分かるようにはしたい。
        // 'expand-content' クラスを持つすべての div 要素を取得
        const expandContents = document.querySelectorAll('.expand-content');

        // 最後の 'expand-content' 要素を取得
        const lastExpandContent = expandContents[expandContents.length - 5];

        if (lastExpandContent) {
            // 新しい HTML コンテンツを作成
            const newContent = `
                <div>
                    <label for="invisible-mode">Invisible Mode:</label>
                    <input id="invisible-mode" class="setting" type="checkbox" data-key="invisibleMode">
                    <br>
                    <label for="ghost-presence">Ghost Presence:</label>
                    <input id="ghost-presence" class="setting" type="checkbox" data-key="ghostPresence" checked="true">
                </div>
            `;

            // 最後の 'expand-content' 要素の末尾に新しいコンテンツを追加
            lastExpandContent.insertAdjacentHTML('beforeend', newContent);

            // チェックボックスの変更イベントリスナーを追加
            document.getElementById('invisible-mode').addEventListener('change', handleInvisibleModeChange);
            document.getElementById('ghost-presence').addEventListener('change', handleGhostPresenceChange);

            // 初期状態のチェックボックス設定を反映
            handleInvisibleModeChange({ target: document.getElementById('invisible-mode') });
            handleGhostPresenceChange({ target: document.getElementById('ghost-presence') });
        }
        //});

        /**
     * Invisible Mode チェックボックスの状態が変わったときの処理
     */
        function handleInvisibleModeChange(event) {
            const isInvisible = event.target.checked;
            Block.prototype.show = isInvisible ? invisibleShow : originalBlockShow;
        }

        /**
     * Ghost Presence チェックボックスの状態が変わったときの処理
     */
        function handleGhostPresenceChange(event) {
            const isGhostEnabled = event.target.checked;
            Piece.prototype.show = isGhostEnabled ? originalPieceShow : noGhostShow;
        }
    })
})();
