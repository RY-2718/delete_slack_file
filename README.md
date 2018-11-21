# Slackのファイルを消すやつ

Slackのファイルを消すやつです．

node.js v8.0.0以降の環境を想定して作ってます．

## 現状

ピン留めされたファイル，1MB未満のファイル，2018/04/01 00:00:00 JST以降にアップロードされたファイルは消えません．多分．

## install

```shell
> npm install
```

## usage

まず，`.env_sample` を参考に `.env` というファイルを作ってください．

TOKENはslackのlegacy tokenです．

起動は以下のコマンドで行います．

```shell
> npm run
```