/*
 * 測点ノート内アフィリエイト設定
 *
 * Amazonアソシエイトのアプリ向け規約や提携ASPの条件を必ず確認してください。
 * インストール可能なPWA内での広告表示が許可され、媒体登録と広告主の
 * 提携審査が済むまでは有効化しないこと。
 * "enabled" と "approvedForPwa" の両方が true で、媒体名・告知文
 * と適格な https URL が揃うと、ホームと演習結果の広告枠に表示されます。
 * 承認のない広告やテスト用の仮リンクは挿入しないでください。
 */
window.SOKUTEN_AFFILIATE = {
  enabled: false,
  approvedForPwa: false,
  provider: "",
  disclosure: "この枠にはアフィリエイト広告が含まれます。",
  offers: [
    /* 記入例（本番は提携先が発行したリンクを一切変更せず設定）:
    {
      id: "book-basic",
      placement: "home", // "home" or "result" or "both"
      category: "参考書",
      title: "正式な商品名",
      description: "対象者と学習上の特徴を一文で説明",
      url: "https://example.com/approved-affiliate-link"
    }
    */
  ]
};
