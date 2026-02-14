# sample-todo-webapp

Node.js + Express + EJS + SQLite を使ったシンプルなToDo管理Webアプリケーション。

## 📋 プロジェクト概要

このプロジェクトは、個人利用を想定したシンプルなToDo管理Webアプリケーションです。軽量でセットアップが簡単なため、学習目的やプロトタイピングにも適しています。

### 主な特徴

- **軽量・シンプル**: 最小限の依存関係で動作
- **データ永続化**: SQLiteによるローカルデータベース
- **レスポンシブUI**: EJSテンプレートによる柔軟なビュー
- **CRUD操作完備**: ToDo項目の作成・閲覧・更新・削除に対応
- **優先度管理**: タスクの優先度設定とフィルタリング機能
- **期限管理**: 期限の設定と管理が可能
- **Docker対応**: コンテナ化による簡単なデプロイ

## 🛠️ 技術スタック

### フロントエンド
- **EJS** (Embedded JavaScript Templates): サーバーサイドテンプレートエンジン
- **CSS**: スタイリング

### バックエンド
- **Node.js**: JavaScript実行環境
- **Express** (^4.18.2): Webアプリケーションフレームワーク
- **SQLite3** (^5.1.6): 軽量データベースエンジン

### テスト
- **Jest** (^30.2.0): JavaScriptテストフレームワーク

### コンテナ化
- **Docker**: アプリケーションのコンテナ化

### アーキテクチャパターン
- **MVC (Model-View-Controller)**: 関心の分離によるコード構造化
- **サービス層**: ビジネスロジックの分離

## 📦 必要な環境

- **Node.js**: 18.x 以上推奨
- **npm**: Node.jsに付属するパッケージマネージャー
- **Docker** (オプション): コンテナ環境で実行する場合

## 🚀 セットアップ手順

### 通常のインストール

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/ryuta-maehara/sample-todo-webapp.git
   cd sample-todo-webapp
   ```

2. **依存パッケージのインストール**
   ```bash
   npm install
   ```

3. **アプリケーションの起動**
   ```bash
   npm start
   ```

4. **アクセス**
   
   ブラウザで http://localhost:3000 にアクセス

### 初回起動時の注意事項

- 初回起動時に自動的にデータベースファイル（`data/todo.db`）が作成されます
- ポート3000が既に使用されている場合は、`src/app.js`のPORT定数を変更してください

## 🐳 Docker での起動

Dockerを使用すると、環境構築なしで簡単にアプリケーションを実行できます。

### Dockerイメージのビルド

```bash
docker build -t sample-todo-webapp .
```

### コンテナの起動

```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data sample-todo-webapp
```

- `-p 3000:3000`: ホストの3000番ポートをコンテナの3000番ポートにマッピング
- `-v $(pwd)/data:/app/data`: データベースファイルをホストにマウント（データの永続化）

ブラウザで http://localhost:3000 にアクセスしてください。

## 💻 開発

### 開発環境のセットアップ

1. 依存パッケージのインストール（開発用依存関係を含む）
   ```bash
   npm install
   ```

2. 開発時は、ファイル変更時の自動再起動のためにnodemonの使用を推奨
   ```bash
   npm install -g nodemon
   nodemon src/app.js
   ```

### テストの実行

```bash
npm test
```

Jestを使用したユニットテストが実行されます。テストファイルは`src/tests`ディレクトリに配置されています。

## 📁 ディレクトリ構成

```
sample-todo-webapp/
├── src/                      # アプリケーション本体
│   ├── app.js               # メインエントリーポイント（Expressサーバー設定）
│   ├── controllers/         # コントローラー層（リクエスト処理）
│   │   └── TodoController.js # ToDo関連のコントローラー
│   ├── services/            # サービス層（ビジネスロジック）
│   │   └── TodoService.js   # ToDo操作のサービス
│   ├── routes/              # ルーティング定義
│   │   └── todo.js          # ToDoのルーティング
│   ├── views/               # EJSテンプレート
│   │   ├── index.ejs        # ToDo一覧画面
│   │   ├── new.ejs          # ToDo作成画面
│   │   └── edit.ejs         # ToDo編集画面
│   ├── public/              # 静的ファイル（CSS、画像など）
│   │   └── style.css        # スタイルシート
│   └── tests/               # テストコード
│       └── TodoService.test.js # サービス層のテスト
├── data/                     # データベース関連
│   └── todo.db              # SQLiteデータベースファイル（自動生成）
├── .github/                  # GitHub関連設定
├── .dockerignore            # Docker用の除外ファイル設定
├── Dockerfile               # Docker イメージ定義
├── package.json             # プロジェクト設定と依存関係
├── package-lock.json        # 依存関係のロックファイル
└── README.md                # このファイル
```

## 機能

### ToDo管理機能
- **作成**: 新しいToDoアイテムの追加
- **一覧表示**: 登録されている全ToDoの表示
- **編集**: 既存ToDoの内容変更
- **削除**: 不要なToDoの削除
- **フィルタリング**: 優先度による絞り込み
- **ソート**: 期限順での並べ替え

### データ項目
各ToDoアイテムは以下の情報を保持します：
- **タイトル** (title): ToDo のタイトル
- **内容** (content): 詳細な説明
- **期限** (due_date): 完了予定日
- **優先度** (priority): 高・中・低の3段階

### 特記事項
- ユーザー管理機能なし（個人利用向け）
- 認証機能なし（ローカル環境での使用を想定）

## 🌐 APIエンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/` | ToDo一覧を表示（クエリパラメータでフィルタ・ソート可能）|
| GET | `/new` | ToDo作成フォームを表示 |
| POST | `/create` | 新しいToDoを作成 |
| GET | `/edit/:id` | 指定IDのToDo編集フォームを表示 |
| POST | `/update/:id` | 指定IDのToDoを更新 |
| POST | `/delete/:id` | 指定IDのToDoを削除 |

### クエリパラメータ
- `priority`: 優先度でフィルタリング（例: `?priority=高`）
- `sort`: ソート順（`asc` または `desc`）

## 🔮 今後の予定・改善点

以下の機能追加や改善を検討しています：

- [ ] ユーザー認証機能の追加
- [ ] カテゴリー・タグ機能
- [ ] 完了/未完了のステータス管理
- [ ] 検索機能
- [ ] ページネーション
- [ ] APIのREST化（JSON レスポンス対応）
- [ ] フロントエンドのモダン化（React/Vue.js等）
- [ ] リマインダー・通知機能
- [ ] データのエクスポート/インポート機能
- [ ] ダークモード対応

## 📄 ライセンス

MIT

---

## 🤝 コントリビューション

バグ報告や機能提案は、GitHubのIssuesでお願いします。プルリクエストも歓迎します！

## 📮 お問い合わせ

プロジェクトに関する質問や提案がありましたら、GitHubのIssuesまたはDiscussionsをご利用ください。
