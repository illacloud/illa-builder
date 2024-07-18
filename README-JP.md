
<div align="center">
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
    <img alt="ILLA Design Logo" width="120px" height="120px" src="https://github.com/illacloud/.github/blob/main/assets/images/illa-logo.svg"/>
  </a>
</div>

<h1 align="center"><a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">ILLA Builder</a></h1>

<p align="center">ILLA は、開発者が内部ツールを構築するための堅牢なオープン ソースのローコード プラットフォームです。 コンポーネントとアクションのILLAのライブラリを使用することで、開発者はツールの構築にかかる時間を大幅に節約できます。 </p>

<div align="center">
<a href="https://github.com/illacloud/illa-builder/blob/beta/README.md">English</a> | <a href="https://github.com/illacloud/illa-builder/blob/beta/README-CN.md">简体中文</a> | <a href="https://github.com/illacloud/illa-builder/blob/beta/README-DE.md">Deutsch</a> | 日本語
</div>

<br>
<p align="center">
<a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
  <img width="800" alt="GitHub - Readme - jp" src="https://github.com/illacloud/illa-builder/assets/112603073/eeb65cb6-e307-4f16-9a7a-2fcb9d3a37a3">
</a>
</p>

[![Discord](https://img.shields.io/badge/chat-Discord-7289DA?logo=discord)](https://discord.gg/illacloud)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=x&logoColor=white)](https://twitter.com/illa_cloud)
[![Discussions](https://img.shields.io/badge/discussions-GitHub-333333?logo=github)](https://github.com/orgs/illacloud/discussions)
[![Crowdin](https://badges.crowdin.net/illa-builder/localized.svg)](https://crowdin.com/project/illa-builder)
[![CI (Rolling and Humble)](https://github.com/illacloud/illa-builder/actions/workflows/build-docker.yml/badge.svg?query=branch%3Amain)](https://github.com/illacloud/illa-builder/actions/workflows/build-docker.yml?query=branch%3Amain)
[![PR:s Welcome](https://img.shields.io/badge/PR:s-welcome-brightgreen.svg)](https://github.com/illacloud/illa-builder/pulls)
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg?style=socialflat-square&)](https://www.apache.org/licenses/LICENSE-2.0.html)

## 🚀始めましょう
[ILLA Cloud](https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme) にサインアップしてログインするのが最も便利です。招待コードを入手するには、この [Google Form](https://forms.gle/XFRSUc3yFpzbCdcWA) に記入し、できるだけ多くの情報を提供してください。ご提出いただいた内容は、最大2営業日以内にレビューし、できるだけ早くご連絡いたします。
レビュープロセスを迅速化するために、[Discordコミュニティ](https://discord.gg/illacloud) に参加して、より迅速に招待コードを入手できるようにすることもできます。

また、ILLAユーティリティを手動で（Docker、docker-compose、k8s）展開および自己ホストすることもできます。

<p>
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme"><img src="https://raw.githubusercontent.com/illacloud/.github/main/assets/images/ILLA%20Cloud.png" height=120 />
</p>



## ✨ 特徴

1. ⚽ **リアルタイム コラボレーション:** すべてをリアルタイムで一緒に作成できます。
2. 🤖 **サポートの自動化:** すべてを接続して 5 秒で自動化します。
3. 🖥 **自己ホスト型:** Docker と k8s をサポート
4. 📝 **ページのサポート:** コンテンツが豊富で UI に適したツールを作成するための基盤。
5. 🎨 **[ILLA Design](https://github.com/illacloud/illa-design) を利用:** コンポーネントによって想像力が制約されることはありません。
## Self-hosted
    
ILLA CLI を使用すると、ILLA Builder を想像よりも速く展開できます。 [ここをクリック](https://docs.illacloud.com/self-hosted-deployment) 詳細については。
デプロイが正常に完了したら、電子メール アドレスで登録するか、次の情報でログインできます。
<p align="left">Username (email): root</p>
<p align="left">Password: password</p>

    
    
## ツールの作成方法

#### 🎯 Step 1: Connect to your database
<p align="center">
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
    <img src="https://github.com/illacloud/.github/blob/main/assets/images/sql.jpeg">
  </a>
</p>

#### 🎨 ステップ 2: 組み込みコンポーネントを使用して UI を構築する
コンポーネントをキャンバスにドラッグして、UI を構築します。 Illa Builder および Illa Design には、チャート、テーブル、フォームなど、多数のコンポーネントが用意されています。 コンポーネントが重なっている場合、それらの位置は自動的に調整されるため、レイアウト開発が容易かつ柔軟になります。
    
<p align="center">
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
    <img src="https://github.com/illacloud/.github/blob/main/assets/images/edit-ui-with-components.gif">
  </a>
</p>

#### 🔌 ステップ 3: データに接続する
GUI データ コネクタを介して MySQL または REST API に接続します。 また、近日中に 10 を超えるデータベースと API を追加する予定です。
<p align="center">
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
    <img src="https://github.com/illacloud/.github/blob/main/assets/images/connect-your-data.gif">
  </a>
</p>

#### 🚀 ステップ 4: アプリをデプロイする
アプリをデプロイして自己ホストします。
<p align="center">
  <a href="https://cloud.illacloud.com?utm_source=github&utm_medium=readme&utm_campaign=github-readme">
    <img src="https://github.com/illacloud/.github/blob/main/assets/images/deploy.gif">
  </a>
</p>


## 💬 コミュニティ

ILLA コミュニティに参加して、アイデア、提案、質問を共有し、他のユーザーや貢献者とつながりましょう。
</br>[![Chat on Discord](https://img.shields.io/badge/chat-Discord-7289DA?logo=discord)](https://discord.gg/illacloud)   [![Discuss on GitHub](https://img.shields.io/badge/discussions-GitHub-333333?logo=github)](https://github.com/orgs/illacloud/discussions)   

## 🌱 貢献

貢献を考えていますか？ ILLA へのあらゆる種類の貢献を歓迎します。 参加方法の詳細については、[貢献ガイド](./CONTRIBUTING.md) をご覧ください。
<p>からのすべての貢献に感謝します ❤︎  <a href="https://github.com/illacloud/illa-builder/graphs/contributors">貢献者</a></p>

## 📢 翻訳

`apps/builder/src/i18n/locale/*` ディレクトリは Crowdin によって自動的に更新されます。貢献したい場合は、[公式翻訳ページ](https://crowdin.com/project/illa-builder) を参照してください。

## ライセンス

このプロジェクトは [Apache License 2.0](./LICENSE) です。
