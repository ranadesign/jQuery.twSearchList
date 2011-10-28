#&quot;jQuery.twSearchList&quot; jQuery plugin

##Description
Twitter Search API( https://dev.twitter.com/docs/api/1/get/search )を使い、ツイートのリストを表示するjQueryプラグインです。

---
##Required
###jQuery (Developed on 1.4.2)
http://jquery.com/

---
##Demos
http://kaelab.ranadesign.com/blog/demo/jquery-twSearchList/

---
##Usage

###Step01
head要素内で jquery.js、jquery.twSearchList.jsを順番に読み込みます。また、jquery.twSearchList.cssも必要に応じて読み込みましょう。

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery.twSearchList.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery.twSearchList.css" />

###Step02
Step01の通りスクリプトファイルを読み込んだ後に、以下の例のように実行します。
コンテナとなる要素をjQueryセレクタで指定して、実行します。引数でオプションを指定できます。

	<script type="text/javascript">
	$(function() {
		$('#list1').twSearchList({
			// some options...
			query: "from%3Atoptweets_ja",
			loadingImg: "resources/loading.gif",
			more: true,
			dateLink: 0,
			dateFormat: function(y, m, d, hs, ms ,ss) {
				return y + "-" + m + "-" + d + " " + hs + ":" + ms + ":" + ss;
			}
		});
	});
	</script>
	...
	<div id="list1"></div>

オプションの一覧は次の表の通りです。

<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>オプション名<br>(option name)</th>
<th>デフォルト値<br>(default value)</th>
<th>備考<br>(note)</th>
</tr>
</thead>
<tbody>
<tr>
<td>query</td>
<td>null</td>
<td>Twitter Search APIに投げるクエリ。クエリに書ける内容は <a href="https://dev.twitter.com/docs/using-search">Using the Twitter Search API | Twitter Developers</a> を参考にしてください。
<strong>必須項目</strong><br>
	例：'TagName'タグを検索 -> %23TagName
	'UserName'ユーザーを検索 -> from%3AUserName
</td>
</tr>
<tr>
<td>length</td>
<td>5</td>
<td>一度に表示するリストの数</td>
</tr>
<tr>
<td>userLink</td>
<td>true</td>
<td>ユーザー表示にリンクを行うか</td>
</tr>
<tr>
<td>replyLink</td>
<td>true</td>
<td>@hogehoge などといったユーザー名にリンクを行うか</td>
</tr>
<tr>
<td>tagLink</td>
<td>true</td>
<td>#fugafuga などといったハッシュタグ名にリンクを行うか</td>
</tr>
<tr>
<td>dateLink</td>
<td>true</td>
<td>日付表示にリンクを行うか</td>
</tr>
<tr>
<td>URLLink</td>
<td>true</td>
<td>URL表示にリンクを行うか</td>
</tr>
<tr>
<td>loadingImg</td>
<td>'loading.gif'</td>
<td>データを読み込み中に表示する画像のURL</td>
</tr>
<tr>
<td>loadingWrapperId</td>
<td>'twSearchListLoadingWrapper'</td>
<td>データを読み込み中に表示する画像を格納するボックス（div要素）のid属性</td>
</tr>
<tr>
<td>wrapperClassName</td>
<td>'twSearchListWrapper'</td>
<td>リストとナビゲーション全体を包むボックス（div要素）のclass属性</td>
</tr>
<tr>
<td>innerClassName</td>
<td>'twSearchListInner'</td>
<td>リストを包むボックス（table要素）のclass属性</td>
</tr>
<tr>
<td>more</td>
<td>false</td>
<td>リストを追加するリンクボタンを表示するか</td>
</tr>
<tr>
<td>moreText</td>
<td>'もっと読む'</td>
<td>リストを追加するリンクボタンのラベルテキスト</td>
</tr>
<tr>
<td>moreClasssName</td>
<td>'more'</td>
<td>リストを追加するリンクボタンを包むボックス（div要素）のclass属性</td>
</tr>
<tr>
<td>dateFormat</td>
<td>function(y, m, d, hs, ms ,ss) { return " (" + y + "-" + m + "-" + d + " " + hs + ":" + ms + ":" + ss + ")"; }</td>
<td>日付表示のフォーマットを返す関数。引数に 年/月/日/時/分/秒 を順番に6つ受け取るのでそれを使って適当な文字列を返すようにします。</td>
</tr>
</tbody>
</table>

---
##License
<a href="http://www.opensource.org/licenses/mit-license.html">MIT License</a><br />
参考: <a href="https://secure.wikimedia.org/wikipedia/ja/wiki/MIT_License">MIT License - Wikipedia</a>

---
##Contact
<a href="http://kaelab.ranadesign.com/blog/author/naoki-sekiguchi/">Naoki Sekiguchi - かえラボBlog</a>

---
##Note
- <a href="https://dev.twitter.com/docs/api/1/get/search#api-param-with_twitter_user_id">GET search | Twitter Developers</a>
- <a href="https://dev.twitter.com/docs/using-search">Using the Twitter Search API | Twitter Developers</a>

