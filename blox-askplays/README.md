# Tampermonkey スクリプトのインポート

このリポジトリには、Tampermonkey 用のスクリプトが含まれています。以下の手順に従って、スクリプトを Tampermonkey にインポートしてください。

## スクリプトのインポート手順

1. **Tampermonkey をインストール**  
   Tampermonkey がインストールされていない場合は、[Tampermonkey の公式サイト](https://www.tampermonkey.net/)からブラウザに追加してください。

2. **スクリプトのインポート**  
   以下の URL からスクリプトをインポートできます。

   - [blox_util.js](https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/user_script/blox_util.js)
   - [exercise.js](https://raw.githubusercontent.com/tetoteto-beep/tampermonkey_script/main/blox-askplays/user_script/exercise.js)

   Tampermonkey のダッシュボードを開き、**「新しいスクリプトを追加」** をクリックします。次に、上記の URL をそれぞれのスクリプトとしてインポートします。

## スクリプトの説明

- **blox_util.js**  
  このスクリプトは、Blox のユーティリティ関数を提供します。特定の操作を効率的に行うための便利な関数が含まれています。

- **exercise.js**  
  このスクリプトは、特定の演習やタスクを実行するための機能を提供します。Blox の特定の動作をカスタマイズするために使用します。

## 使用方法

スクリプトをインポートした後は、Tampermonkey のダッシュボードからスクリプトを有効化してください。スクリプトが有効化されると、自動的に指定された機能がブラウザで利用できるようになります。

## キー設定について

以下の定数は、スクリプトで使用されるキーの設定を管理します。

```javascript
const GO_TO_NEXT_KEY = 'r'; // ！！注意！！　リトライキーと同じキーを設定すること
const BACK_TO_PREVONE_KEY = 'R'; // 問題を一つ戻るキー
