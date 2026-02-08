# sample-todo-webapp

Node.js + Express + EJS + SQLite を使ったシンプルなToDo管理Webアプリ。

## 機能
- ToDoの作成・一覧・編集・削除
- タイトル、内容、期限、優先度を保持
- ユーザー管理なし（個人利用向け）

## 起動方法
1. `npm install` で依存パッケージをインストール
2. `npm start` でアプリ起動（http://localhost:3000）

## フォルダ構成
- /src アプリ本体
  - /routes ルーター
  - /controllers 業務ロジック
  - /views ビュー
  - /public 静的コンテンツ
- /data データベース関連

## ライセンス
MIT
