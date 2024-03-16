# hongo-v3

## Develop

```bash
npm install
# iOSでの実行の場合
npm run dev:ios
# Androidでの実行の場合
npm run dev:android
```

## dev-client のビルド

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

## 備考

Google Cloud サービスアカウント: `hongov3@hongo-291507.iam.gserviceaccount.com`

- EAS submit に必要
- `npm run submit:android` 時にサービスアカウントの json を聞かれた場合、Keeper に保存されている `Google Service Account (hongov3) Private Key` を指定する（秘密鍵なので取り扱い注意）
