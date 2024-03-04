# hongo-v3

## Develop

```bash
npm install
# iOSでの実行の場合
npm run dev:ios
# Androidでの実行の場合
npm run dev:android
```

## 開発ビルド

```bash
# iOS用ビルド
npm run build:dev:ios
# Android用ビルド
npm run build:dev:android
```

スマートフォンで QR コードを読み込むと、実機で動作する開発ビルドアプリをインストールできる。
インストール後、

```bash
npm run dev
```

にてビルドサーバーを立ち上げ、QR コードを読みとることで、実機での動作確認ができる。
