// ==UserScript==
// @name         テトリス盤面用グリッド（invisibleモード訓練用）
// @namespace    http://tampermonkey.net/
// @version      2024-09-19
// @description  Tetris盤面にカスタムグリッドを描画します
// @author       You
// @match        https://blox.askplays.com/map-maker
// @icon         https://www.google.com/s2/favicons?sz=64&domain=askplays.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // グリッド描画に使用する設定
    const GRID_COLOR = 'lightblue';
    const GRID_LINE_WIDTH = 2;
    const COLUMN_DIVISIONS = [3, 7]; // 3:4:3 の分割
    const ROW_DIVISIONS = [2, 5, 8, 11, 14, 17]; // 3:3:3:3:3:3:2 の分割

    window.addEventListener('load', function(){
        // 盤面のcanvas要素とコンテナを取得
        const playingField = document.getElementById('back-canvas'); // 盤面のcanvas
        const container = document.getElementById('cv'); // 全体を囲むdiv

        if (!playingField || !container) {
            console.error("必要な要素が見つかりません。スクリプトを終了します。");
            return;
        }

        // グリッドを表示するためのオーバーレイcanvasを作成
        const gridCanvas = createGridCanvas(playingField, container);
        const ctx = gridCanvas.getContext('2d');

        let cellWidth = gridCanvas.width / 10; // 10列
        let cellHeight = gridCanvas.height / 20; // 20行

        // グリッドを描画
        function drawGrid() {
            ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
            ctx.strokeStyle = GRID_COLOR;
            ctx.lineWidth = GRID_LINE_WIDTH;

            // 縦線を描画
            COLUMN_DIVISIONS.forEach(function(colIndex) {
                const x = colIndex * cellWidth;
                drawLine(ctx, x, 0, x, gridCanvas.height);
            });

            // 横線を描画
            ROW_DIVISIONS.forEach(function(rowIndex) {
                const y = rowIndex * cellHeight;
                drawLine(ctx, 0, y, gridCanvas.width, y);
            });
        }

        // 初回描画
        drawGrid();

        // リサイズ時の処理
        window.addEventListener('resize', handleResize);

        /**
         * グリッドキャンバスを作成し、コンテナに追加する関数
         * @param {HTMLElement} playingField - 盤面のcanvas要素
         * @param {HTMLElement} container - コンテナのdiv要素
         * @returns {HTMLCanvasElement} - 作成したグリッドキャンバス
         */
        function createGridCanvas(playingField, container) {
            const gridCanvas = document.createElement('canvas');

            // 盤面のサイズを設定（正確な幅と高さを取得）
            gridCanvas.width = playingField.width; // 320
            gridCanvas.height = playingField.height; // 640

            // 盤面の位置を取得
            const playingFieldRect = playingField.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // グリッドキャンバスのスタイルを設定
            gridCanvas.style.position = 'absolute';
            gridCanvas.style.left = '0px';
            gridCanvas.style.top = '0px';
            gridCanvas.style.pointerEvents = 'none'; // グリッドがゲーム操作を妨げないようにする
            gridCanvas.style.zIndex = '10'; // 必要に応じて調整
            gridCanvas.style.border = '2px solid lightblue'; // 境界線を水色の2pxに設定

            container.appendChild(gridCanvas);
            return gridCanvas;
        }

        /**
         * 線を描画する関数
         * @param {CanvasRenderingContext2D} ctx - 描画コンテキスト
         * @param {number} x1 - 始点のx座標
         * @param {number} y1 - 始点のy座標
         * @param {number} x2 - 終点のx座標
         * @param {number} y2 - 終点のy座標
         */
        function drawLine(ctx, x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1 + 0.5, y1 + 0.5); // ピクセル境界に合わせるため0.5を加算
            ctx.lineTo(x2 + 0.5, y2 + 0.5);
            ctx.stroke();
        }

        /**
         * リサイズ時の処理を行う関数
         */
        function handleResize() {
            // グリッドキャンバスのサイズを再設定
            gridCanvas.width = playingField.width;
            gridCanvas.height = playingField.height;

            // セルサイズを再計算
            cellWidth = gridCanvas.width / 10; // 10列
            cellHeight = gridCanvas.height / 20; // 20行

            // グリッドを再描画
            drawGrid();
        }
    })

})();
