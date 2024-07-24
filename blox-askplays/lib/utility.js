/**
 * @fileoverview
 * このファイルには、一般的なユーティリティ関数が含まれています。
 * 
 * @module utility
 * 
 * @version 1.0.0
 * @since 2024-07-23
 * 
 * @license MIT
 * 
 * @description
 * - `mod`: 正の余りを返すモジュロ関数。
 * - `simulateKeyPress`: キーイベントをシミュレートして、特定のキーが押されたことをエミュレートします。
 * - `shuffleString`: 文字列をランダムにシャッフルします。
 * - `parseConstraints`: 制約文字列を解析して、制約のペアリストを生成します。
 * - `applyConstraints`: 制約リストに従ってシャッフルされた文字列を調整します。
 */

/**
 * 正の余りを返すモジュロ関数。
 * 
 * @param {number} a 割られる数
 * @param {number} b 割る数
 * @returns {number} 正の余り
 * 
 * @example
 * // 出力例: 2
 * console.log(mod(10, 8));
 */
function mod(a, b) {
    return ((a % b) + b) % b;
}

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

//=================================
// graphUtils.js

/**
 * グラフがサイクルを含むかどうかをチェックする関数
 * @param {Object} graph - ノードとエッジの定義を含むグラフ
 * @returns {boolean} - サイクルが存在する場合は true、それ以外の場合は false
 */
function hasCycle(graph) {
    const visited = new Set();
    const stack = new Set();

    function visit(node) {
        if (stack.has(node)) {
            return true; // サイクル検出
        }
        if (visited.has(node)) {
            return false;
        }

        visited.add(node);
        stack.add(node);

        for (const neighbor of graph[node].outEdges) {
            if (visit(neighbor)) {
                return true;
            }
        }

        stack.delete(node);
        return false;
    }

    for (const node in graph) {
        if (visit(node)) {
            return true;
        }
    }

    return false;
}

/**
 * グラフからノードを削除し、エッジを更新する関数
 * @param {Object} graph - ノードとエッジの定義を含むグラフ
 * @param {string} node - 削除するノード
 */
function removeNode(graph, node) {
    const outEdges = graph[node].outEdges;
    delete graph[node];
    outEdges.forEach(outEdge => {
        if (graph[outEdge]) {
            graph[outEdge].inEdges--;
        }
    });
}

/**
 * エッジのないノードを取得する関数
 * @param {Object} graph - ノードとエッジの定義を含むグラフ
 * @returns {Array} - エッジのないノードの配列
 */
function getNodesWithNoInEdges(graph) {
    const nodes = [];
    for (const node in graph) {
        if (graph[node].inEdges === 0) {
            nodes.push(node);
        }
    }
    return nodes;
}

/**
 * ランダムにノードを取得する関数
 * @param {Array} nodes - ノードの配列
 * @returns {string} - ランダムに選ばれたノード
 */
function getRandomNode(nodes) {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex];
}

/**
 * ノードとエッジを使用してグラフを構築する関数
 * @param {Array} edges - エッジの配列（各エッジは [before, after] 形式）
 * @param {string} str - ノードとして使用する文字列
 * @returns {Object} - 構築されたグラフ
 */
function buildGraph(edges, str) {
    const graph = {};
    str.split('').forEach(char => {
        if (!graph[char]) {
            graph[char] = { inEdges: 0, outEdges: [] };
        }
    });
    edges.forEach(([before, after]) => {
        if (!graph[before]) {
            graph[before] = { inEdges: 0, outEdges: [] };
        }
        if (!graph[after]) {
            graph[after] = { inEdges: 0, outEdges: [] };
        }
        graph[before].outEdges.push(after);
        graph[after].inEdges++;
    });
    return graph;
}


//============================================

// 制約を解析してエッジのリストを生成する関数
function parseConstraints(constraints) {
    const constraintList = [];
    const individualConstraints = constraints.split(" and ");
    individualConstraints.forEach(constraint => {
        const [before, after] = constraint.split("<");
        const beforeChars = before.replace(/[{}]/g, '').split(",").map(char => char.trim());
        const afterChars = after.replace(/[{}]/g, '').split(",").map(char => char.trim());
        beforeChars.forEach(beforeChar => {
            afterChars.forEach(afterChar => {
                constraintList.push([beforeChar, afterChar]);
            });
        });
    });
    return constraintList;
}

// 制約付き文字列シャッフル関数
function shuffleConstrainedString(str, constraints) {
    const parsedConstraints = parseConstraints(constraints);
    const graph = buildGraph(parsedConstraints, str);

    // サイクル検出
    if (hasCycle(graph)) {
        throw new Error("The graph contains a cycle and cannot be processed.");
    }

    let result = "";
    let hold = null;

    while (Object.keys(graph).length > 0) {
        let node;

        // ホールドが未使用の場合、すべてのノードの集合からランダムに選択
        if (!hold) {
            const allNodes = Object.keys(graph);
            node = getRandomNode(allNodes);

            if (graph[node].inEdges > 0) {
                hold = node;
                result += node;
                // ノードの削除はホールド解除時に行う
            } else {
                result += node;
                removeNode(graph, node);
            }
        } else {
            // ホールド使用状態の場合
            const nodesWithNoInEdges = getNodesWithNoInEdges(graph);
            node = getRandomNode(nodesWithNoInEdges);
            result += node;
            removeNode(graph, node);
        }

        // ホールド解除チェック
        if (hold && graph[hold].inEdges === 0) {
            removeNode(graph, hold);
            hold = null;
        }
    }

    return result;
}

// 使用例
//const str = "sztj";
//const constraints = "s<j and z<{s,t}";
//const shuffledString = shuffleConstrainedString(str, constraints);
//console.log(shuffledString); // 例: "stzj", "ztsi", など
