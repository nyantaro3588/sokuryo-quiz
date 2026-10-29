/*
 * 測点ノート内アフィリエイト設定（もしもアフィリエイト／楽天市場）
 *
 * 2026-10-29：もしもサポートからインストール型PWAへの広告掲載可能、
 * 同一URLのブラウザ版・PWA版では追加メディア登録不要との回答を受領。
 * 2026-10-29：提携済み楽天市場プログラムの正式なテキスト広告ID 621を設置。
 * 発行HTMLはリンクと1×1表示計測画像を含み、原文のまま保存する。
 *
 * 実際の広告遷移・成果計測や個別プロモーション規定の遵守は運営者責任。
 * オフラインや登録URL以外では広告枠を表示しない。
 * 表示を一時停止するときは enabled:false とする。
 */
window.SOKUTEN_AFFILIATE = {
  enabled: true,
  approvedForPwa: true,
  registeredMedia: "https://nyantaro3588.github.io/sokuryo-quiz/",
  provider: "もしもアフィリエイト／楽天市場",
  disclosure: "PR・広告｜リンク先で商品が購入されると、サイト運営者に報酬が発生する場合があります。リンク先は外部サイトです。",
  heading: "学習に役立つ商品を探す",
  offers: [
    {
      id: "moshimo-rakuten-621",
      placement: "both",
      // 下記はもしもアフィリエイトの「広告ID 621」の発行ソースを改変せず転載
      html: `<a href="//af.moshimo.com/af/c/click?a_id=5866297&p_id=54&pc_id=54&pl_id=621" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>楽天市場</a><img src="//i.moshimo.com/af/i/impression?a_id=5866297&p_id=54&pc_id=54&pl_id=621" width="1" height="1" style="border:none;" loading="lazy">`
    }
  ]
};
