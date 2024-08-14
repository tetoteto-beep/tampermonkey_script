// CSSスタイルをJavaScriptで定義
function addStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        pointer-events: auto;
    }

    #selectionWindow {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    #selectionWindow h2 {
        margin-bottom: 20px;
        text-align: center;
        color: #000;
    }

    #selectionWindow select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 20px;
    }

    #selectionWindow button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    #exerciseTitle {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        background-color: rgba(0, 0, 0, 0.8);
        color: #ccc;
        text-align: center;
        padding: 8px;
        font-size: 16px;
        z-index: 1000;
        border-top: 2px solid #4CAF50;
    }
`;
    document.head.appendChild(style);
}

// 初期化時にCSSスタイルを追加
addStyles();
