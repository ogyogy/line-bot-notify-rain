# line-bot-notify-rain
## About

指定されたスケジュールに基づきプッシュ通知するBot

```
<天気> <降水確率 00-06時>/<降水確率 06-12時>/<降水確率 12-18時>/<降水確率 18-24時>
```

## Setup

### CodePipelineの設定

[AWS CodePipeline を使用して Lambda アプリケーションの継続的な配信パイプラインを構築する - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/build-pipeline.html)

### CloudWatch イベントで実行するスケジュールの指定

[ルールのスケジュール式 - Amazon CloudWatch Events](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/events/ScheduledEvents.html)

### Lambda 環境変数の設定

[AWS Lambda 環境変数 - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/env_variables.html)

```
ACCESSTOKEN=<Your Access Token>
USERID=<Your User ID>
```

### ローカル環境でテスト

```sh
npm init
npm install @line/bot-sdk
npm install request
npm install xml2js
node localtest.js
```