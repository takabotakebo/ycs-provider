#YCS-PROVIDER

##動作環境

- Node.js v8.4.0
- npm v5.3.0
- MySQL 5.7.19
- TouchDesigner
- Arduino


##フォルダ構成

```bash
provider
 ├─ backend						<= サーバー用ソフトウェア
 │   ├ app.js					<= サーバ │   ├ public					<= データ置き場
 │   ├ routes					<= ルーティング
 │   ├ views					<= 管理画面のビュー
 │   ├ mysqlConnection.js		<= MySQLの設定ファイル
 │   ├ bin					 │   ├ package.json					<= パッケージ管理
 │   └ package-lock.json
 │
 ├─ TD			<= ビジュアライズ用 └─ Arduino	<= ハード制御

```

##導入方法

クローン後

```bash
# backend 直下で

$ npm install                //モジュールのインストール
$ npm install -g nodemon     //管理画面の起動にnodemon使用するので必要なら

```

##起動方法

###本番実行

```bash
# backend/routes 直下で
// OSC:4000で同じWifi上にあるProviderが起動してあるPCに入力データを送信(IP設定必須)
//exchangerとProviderの同じ階層にcommonconfig.jsを設置し、後述のようにする。

$ node receive_from_ex.js     //OSCを通じてフロントからデータ受信。(データ登録) :4000
$ node receive_from_td.js     //OSCを通じてTDからデータ受信。(データ書き出し)  :5000


```

###管理画面

```bash
# backend 直下で

$ nodemon provider     //localhost:3000でブラウザで見る


```

###設定ファイル

```bash
# exchanger 同階層に

module.exports = {
    providerIp: 'IPアドレス'
};



```
