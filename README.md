# hongo-v3

## 環境変数

`.env`ファイルを作成し次をセットすることでデバッグ画面を表示できる。

```sh
EXPO_PUBLIC_DEBUG_SCREEN=1
```

コメントアウトすればデバッグ画面は表示されない。

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

### EAS submit

Google Cloud サービスアカウント: `hongov3@hongo-291507.iam.gserviceaccount.com`

- EAS submit に必要
- `npm run submit:android` 時にサービスアカウントの json を聞かれた場合、Keeper に保存されている `Google Service Account (hongov3) Private Key` を指定する（秘密鍵なので取り扱い注意）

### Async Atom の仕様について

- 非同期 atom は、参照時は Suspense モードで動き Promise が解消される点に注意
- set\*\*\*で更新する際は、現状の値を利用する場合は Promise の解決が必要な点に注意 https://jotai.org/docs/utilities/storage#notes-with-asyncstorage-since-v2-2-0
- unwrap()することで Suspense を発動させないようにもできる(描画待機が重い場合などに導入を考えてもよいかも)

## トラブルシューティング

### dev build がないと言われたとき

症状: `npm run dev:ios`を実行したら次のメッセージが表示された
`CommandError: No development build (jp.co.andgo.hongov3) for this project is installed. Please make and install a development build on the device first.`

対応:

1. `npm run build:dev`
2. `s`を押して Expo Go モードに切り替える
3. `i`を押して iOS simulator を起動する
