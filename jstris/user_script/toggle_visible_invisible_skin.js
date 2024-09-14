// ==UserScript==
// @name         Toggle Invisible/Visible Skin
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Switch between invisible and visible skin with the 'c' key
// @author       You
// @match        https://jstris.jezevec10.com/?play=1&*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const INVISIBLE_SKIN_ID = 'bs01';
    const VISIBLE_SKIN_ID = 'bs0';

    const INVISIBLE_TOGGLE_KEY = 'C'; // Key to switch to invisible skin
    const VISIBLE_TOGGLE_KEY = 'c'; // Key to switch to visible skin
    const RETRY_GAME_KEY = 'r';

    const VISIBLE_DURATION = 1000; // Time in milliseconds the skin is visible
    const INVISIBLE_DURATION = 7000; // Time in milliseconds the skin is invisible

    /**
     * Changes the skin, saves settings, focuses on the canvas, and clicks the specified element.
     * @param {string} skinId - The ID of the radio button to switch skins
     */
    function changeSkin(skinId) {
        // Click the settings button to display the settings window
        document.getElementById('settings').click();

        // Switch to the specified skin
        document.getElementById(skinId).click();

        // Save settings and close the window
        document.getElementById('settingsSave').click();

        // Focus on the canvas and click it
        document.getElementById('myCanvas').focus();
        document.getElementById('myCanvas').click();

        // Click the element labeled "click here to continue"
        document.querySelector('.gCapt').click();
    }

    function changeSkinToInvisible() {
        changeSkin(INVISIBLE_SKIN_ID);
    }

    function changeSkinToVisible() {
        changeSkin(VISIBLE_SKIN_ID);
    }

    //function cycleSkin() {
    //    changeSkinToVisible();
    //
    //    setTimeout(changeSkinToInvisible, VISIBLE_DURATION);
    //}
    //setInterval(cycleSkin, INVISIBLE_DURATION + VISIBLE_DURATION);

    document.addEventListener('keydown', function(event) {

        // ゲーム開始時とトグルキーを押下した際にinvisibleにする
        if ((event.key === RETRY_GAME_KEY) || (event.key === INVISIBLE_TOGGLE_KEY)) {
            changeSkinToInvisible();
        }
        // 表示用のトグルキーを押下することで1秒だけ表示する
        else if (event.key === VISIBLE_TOGGLE_KEY) {
            changeSkinToVisible();

            // 1秒後にinvisibleに戻す
            setTimeout(function() {
                changeSkinToInvisible();
            }, 1000);
        }
    });

    // デフォルトでinvisibleにしたい。
    window.addEventListener('load', changeSkinToInvisible);

})();
