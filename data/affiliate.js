/*
 * 測点ノート内アフィリエイト設定（もしもアフィリエイト／楽天市場）
 *
 * 2026-10-29：もしもサポートからインストール型PWAへの広告掲載可能、
 * 同一URLのブラウザ版・PWA版では追加メディア登録不要との回答を受領。
 * ただし実際の広告遷移・成果計測、媒体の確認は運営者の責任。
 * 広告主・プロモーションごとの個別条件を優先すること。
 *
 * enabled は、承認済みの広告取得ページで発行された正規リンクを
 * offers に設定し、個別掲載条件と実機動作を確認するまで false に保つ。
 * 発行されたURLにパラメータを付加・削除したり、広告ソースを改変しない。
 * オフライン・登録URL以外では広告枠を表示しない。
 */
window.SOKUTEN_AFFILIATE = {
  enabled: false,
  approvedForPwa: true, // ASPのPWA掲載回答。広告の成果を保証するものではない
  registeredMedia: "https://nyantaro3588.github.io/sokuryo-quiz/",
  provider: "もしもアフィリエイト／楽天市場",
  disclosure: "PR・広告｜このリンクから商品が購入されると、サイト運営者に報酬が発生する場合があります。リンク先は外部サイトです。",
  heading: "学習に役立つ商品",
  offers: [
    /* 正規のテキストリンク掲載が許される場合のみ記入（仮URL禁止）
    {
      id: "rakuten-reference-book",
      placement: "both", // "home" / "result" / "both"
      category: "参考書",
      title: "正確な商品名または紹介内容",
      description: "学習に役立つ特徴を事実に即して簡潔に記載",
      url: "ここに広告取得ページが発行したHTTPSの正規リンクをそのまま設定"
    }
    */
  ]
};
