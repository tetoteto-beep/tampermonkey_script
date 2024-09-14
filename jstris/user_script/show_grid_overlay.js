// ==UserScript==
// @name         20×10 Grid Overlay
// @namespace    http://tampermonkey.net/
// @version      2024-09-05
// @description  Creates a resizable and movable rectangle divided into a 20x10 grid with customizable visible lines.
// @author       You
// @match        https://jstris.jezevec10.com/?play=1&mode=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jezevec10.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 設定：表示する縦線・横線のインデックス（trueで表示、falseで非表示）
    //const visibleVerticalLines = Array(9).fill(true);  // 10分割なので縦線は9本
    //const visibleHorizontalLines = Array(19).fill(true);  // 20分割なので横線は19本

    const visibleVerticalLines = [false, false, true, false, false, false, true, false, false]; // 最初と最後の縦線のみ表示
    const visibleHorizontalLines = [false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false]; // 最初と最後の縦線のみ表示

    // 初期位置・サイズ
    let initialTop = 102;
    let initialLeft = 400;
    let initialWidth = 241;
    let initialHeight = 480;

    // オーバーレイの作成
    const overlay = createOverlay();
    document.body.appendChild(overlay);

    // 縦線と横線を描画
    renderLines();

    // ドラッグとリサイズ機能を有効化
    enableDragging();
    enableResizing();

    // キーボードショートカット（Shift + O）で表示/非表示を切り替え
    toggleVisibilityOnKey();

    /**
     * オーバーレイを作成する関数
     */
    function createOverlay() {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = `${initialTop}px`; // 初期位置
        div.style.left = `${initialLeft}px`; // 初期位置
        div.style.width = `${initialWidth}px`; // 初期幅
        div.style.height = `${initialHeight}px`; // 初期高さ
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.0)'; // 透明背景
        div.style.border = '2px solid lightblue'; // 水色の枠線 (幅2px)
        div.style.zIndex = '9999'; // 最前面
        div.style.cursor = 'move'; // ドラッグ用のカーソル
        return div;
    }

    /**
     * オーバーレイに縦線と横線を描画する関数
     */
    function renderLines() {
        clearLines(); // リサイズ時のために一度クリア
        createVerticalLines();
        createHorizontalLines();
    }

    /**
     * 縦線を追加する関数（10分割）
     */
    function createVerticalLines() {
        const totalWidth = overlay.clientWidth;
        const sectionWidth = totalWidth / 10; // 10分割

        for (let i = 1; i < 10; i++) {
            if (visibleVerticalLines[i - 1]) {
                createLine(`${sectionWidth * i}px`, '0', 'vertical');
            }
        }
    }

    /**
     * 横線を追加する関数（20分割）
     */
    function createHorizontalLines() {
        const totalHeight = overlay.clientHeight;
        const sectionHeight = totalHeight / 20; // 20分割

        for (let i = 1; i < 20; i++) {
            if (visibleHorizontalLines[i - 1]) {
                createLine('0', `${sectionHeight * i}px`, 'horizontal');
            }
        }
    }

    /**
     * 線を作成する共通関数
     * @param {string} leftOrTop - 線の位置
     * @param {string} topOrLeft - 線の位置
     * @param {string} direction - 'vertical' または 'horizontal'
     */
    function createLine(leftOrTop, topOrLeft, direction) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.backgroundColor = 'lightblue'; // 水色の線
        line.style.width = direction === 'vertical' ? '2px' : '100%';
        line.style.height = direction === 'horizontal' ? '2px' : '100%';
        line.style.left = direction === 'vertical' ? leftOrTop : '0';
        line.style.top = direction === 'horizontal' ? topOrLeft : '0';
        overlay.appendChild(line);
    }

    /**
     * 既存の線をクリアする関数
     */
    function clearLines() {
        Array.from(overlay.children).forEach(child => {
            if (child !== overlay.querySelector('.resizer')) {
                overlay.removeChild(child);
            }
        });
    }

    /**
     * ドラッグ機能を有効化する関数
     */
    function enableDragging() {
        overlay.addEventListener('mousedown', function(e) {
            let shiftX = e.clientX - overlay.getBoundingClientRect().left;
            let shiftY = e.clientY - overlay.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                overlay.style.left = pageX - shiftX + 'px';
                overlay.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
                logPositionAndSize();
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });

        overlay.ondragstart = function() {
            return false;
        };
    }

    /**
     * リサイズ機能を有効化する関数
     */
    function enableResizing() {
        const resizer = document.createElement('div');
        resizer.style.width = '10px';
        resizer.style.height = '10px';
        resizer.style.backgroundColor = 'white';
        resizer.style.position = 'absolute';
        resizer.style.right = '0';
        resizer.style.bottom = '0';
        resizer.style.cursor = 'se-resize';
        resizer.classList.add('resizer'); // クラスを追加して識別

        overlay.appendChild(resizer);

        resizer.addEventListener('mousedown', function(e) {
            e.stopPropagation();

            function onMouseMove(event) {
                overlay.style.width = event.pageX - overlay.getBoundingClientRect().left + 'px';
                overlay.style.height = event.pageY - overlay.getBoundingClientRect().top + 'px';
                renderLines();
                logPositionAndSize();
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });
    }

    /**
     * 現在の位置とサイズをコンソールに出力する関数
     */
    function logPositionAndSize() {
        console.log(`位置: (top: ${overlay.style.top}, left: ${overlay.style.left})`);
        console.log(`サイズ: (width: ${overlay.style.width}, height: ${overlay.style.height})`);
    }

    /**
     * キーボードショートカット（Shift + O）でオーバーレイを表示/非表示に切り替える関数
     */
    function toggleVisibilityOnKey() {
        let overlayVisible = true;

        document.addEventListener('keydown', function(event) {
            if (event.shiftKey && event.key === 'O') {
                overlayVisible = !overlayVisible;
                overlay.style.display = overlayVisible ? 'block' : 'none';
            }
        });
    }

})();
