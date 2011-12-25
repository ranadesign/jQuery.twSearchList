/**
 * twSearchList jQuery Plugin
 *
 * Simple Twitter search list.
 *
 * @author     RaNa design associates, inc.
 * @copyright  2011 RaNa design associates, inc.
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    Release: 1.2
 * @since      2010-09-16
 * @link       https://github.com/ranadesign/jQuery.twSearchList
 */

(function($, window, document, undefined) {

// Variable to keep index of instance
$.twSearchList = { index: 0 };

// jQuery Interface
$.fn.twSearchList = function(options) {
	$(this).each(function() {
		var instanceName = "instance" + $.twSearchList.index;
		// Make new instance in $.twSearchList array object
		$.twSearchList[instanceName] = new $.TwSearchList(options);
		var twObj = $.twSearchList[instanceName].initialize();
		$(this).html(twObj);
	});
	return this;
};

// TwSearchList Constructor
$.TwSearchList = function(options) {
	this.options = {
//        query: "from%3Atoptweets_ja",
		// Query Example
		//   %23TagName
		//   from%3AUserName
		length: 5,
		showUserImg: true,
		showUserName: true,
		showDate: true,
		userLink: true,
		replyLink: true,
		tagLink: true,
		dateLink: true,
		URLLink: true,
		loading: true,
		loadingImg: "loading.gif",
		loadingWrapperId: "twSearchListLoadingWrapper",
		wrapperClassName: "twSearchListWrapper",
		innerClassName: "twSearchListInner",
		more: false,
		moreText: "もっと読む",
		moreClassName: "more",
		complete: function () {
			// callback
		},
		dateFormat: function(y, m, d, hs, ms ,ss) {
			return " (" + y + "-" + m + "-" + d + " " + hs + ":" + ms + ":" + ss + ")";
		},
		noResultContent: '<div class="noResult">No search result.</div>'
	};
	$.extend(this.options, options);
	if (!this.options.query) { return; }
	this.wrapper = {};
	this.page = 1;
	this.callbackName = "jQuery.twSearchList.instance" + $.twSearchList.index + ".callback";
	$.twSearchList.index ++;
};

$.TwSearchList.prototype = {
	initialize: function() {
		var opt = this.options,
			index = $.twSearchList.index;
		// Append wrapper element
		this.wrapper = $('<div/>', {
				"class": opt.wrapperClassName
			});
		// Insert loading image
		if (opt.loading) { this.createLoadingImg(); }
		// Insert Twitter JSONP script
		$('<script/>', {
				"src": "http://search.twitter.com/search.json?q=" + opt.query + "&rpp=" + opt.length + "&callback=" + this.callbackName
			}).appendTo("head");
		return this.wrapper;
	},
	callback: function(data) {
		var self = this,
			opt = this.options,
			res = data.results;
		if (opt.loading) { this.$loadingWrapper.hide(); }

		// Build tweet list container
		var $twSearchListInner = $('<ul/>', {
				"class":opt.innerClassName
				});
		// Build Tweet List
		$.each(res, function(i) {
			var resUser = res[i].from_user,
				resText = res[i].text,
				resDate = res[i].created_at;
			// Build HTML parts
			var $row = $('<li class="tweet tweet' + i + '"/>'),
				$imgWrapper = $('<div class="img"/>'),
				$imgLink = $('<a/>', {
					"href": "http://twitter.com/" + res[i].from_user,
					"target": "_blank"
				}),
				$contentCell = $('<div class="content"/>'),
				$contentInner = $('<div class="contentInner"/>'),
				$contentInner2 = $('<div class="contentInner2"/>'),
				$contentFooter = $('<div class="footer"/>'),
				$contentAuthor = $('<p class="author"/>'),
				$contentDate = $('<p class="date"/>');
			// Build user image section
			if (opt.showUserImg) {
				$('<img/>', {
						"src": res[i].profile_image_url
					}).appendTo($imgLink);
				$imgWrapper.append($imgLink).appendTo($row);
			}

			// Build content section
				// tweet text
					// with text replacement
					// - This execution sequence has a point.
			if (opt.URLLink) { resText = self.createURLLink(resText); }
			if (opt.replyLink) { resText = self.createReplyLink(resText); }
			if (opt.tagLink) { resText = self.createTagLink(resText); }
			$('<p class="text"/>')
				.html(resText)
				.appendTo($contentInner2);
				// Author
			if (opt.showUserName) {
				if (opt.userLink) { resUser = self.createUserLink(resUser); }
				$contentAuthor.append(resUser);
				$contentFooter.append($contentAuthor);
			}
				// Date
			if (opt.showDate) {
				resDate = self.htmlspecialchars(self.createDateText(resDate));
				if (opt.dateLink) {
					resDate = $('<a/>', {
							"href": "http://twitter.com/" + res[i].from_user + "/status/" + res[i].id_str,
							"target": "_blank"
						}).html(resDate);
				}
				$contentDate.append(resDate);
				$contentFooter.append($contentDate);
			}

			$contentInner2.append($contentFooter).appendTo($contentInner);
			$contentCell.append($contentInner).appendTo($row);
			// Insert row to table
			$twSearchListInner.append($row);
		});
		if (res.length) {
			// Publish tweet table
			$(this.wrapper).append($twSearchListInner);
		} else {
			// No results
			$(this.wrapper).append(opt.noResultContent);
		}
		// Build and publish "More" link
		if (opt.more) {
			this.$moreLinkWrapper = $('<div/>', {
					"class": opt.moreClassName
				});
			$('<a href="#"/>')
				.html(opt.moreText)
				.click(function(e) {
					e.preventDefault();
					self.requestMoreTweet();
				})
				.appendTo(this.$moreLinkWrapper);
			$(this.wrapper).append(this.$moreLinkWrapper);
		}
		opt.complete();
	},
	requestMoreTweet: function() {
		var opt = this.options;
		// Show loading
		this.$loadingWrapper.appendTo(this.wrapper).show();
		// Remove "More" button
		this.$moreLinkWrapper.remove();
		// Increment current page
		this.page ++;
		$('<script/>', {
			"src": "http://search.twitter.com/search.json?q=" + opt.query + "&rpp=" + opt.length + "&page=" + this.page + "&callback=" + this.callbackName
		}).appendTo("head");
	},
	createLoadingImg: function() {
		var opt = this.options;
		if (opt.loading) {
			this.$loadingWrapper = $("<div/>", {
				"id": opt.loadingWrapperId
			});
			var $loadingImg = $("<img/>", {
				"src": opt.loadingImg
			}).appendTo(this.$loadingWrapper);
			$(this.wrapper).append(this.$loadingWrapper);
		}
	},
	createDateText: function(responseDateText) {
		// ResponseDateText example:
		// ["Fri,", "17", "Sep", "2010", "06:28:39", "+0000"]
		var created_at = responseDateText.split(" ");
		var d = new Date(created_at[2] + " " + created_at[1] + ", " + created_at[3] + ", " + created_at[4]);
		d.setHours(d.getHours() + 9); // UTC -> JST
		var dY = d.getFullYear(),
			dM = (d.getMonth() + 101).toString().slice(1),
			dD = (d.getDate() + 100).toString().slice(1),
			dHs = (d.getHours() + 100).toString().slice(1),
			dMs = (d.getMinutes() + 100).toString().slice(1),
			dSs = (d.getSeconds() + 100).toString().slice(1);
		return this.options.dateFormat(dY,dM,dD,dHs,dMs,dSs);
	},
	htmlspecialchars: function(s) {
		s = s.replace(/&/g,"&amp;").replace(/&amp;amp;/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
		return s;
	},
	createUserLink: function(text) {
		text = '<a href="http://twitter.com/' + text + '" target="_blank">' + text + '</a>';
		return text;
	},
	createReplyLink: function(text) {
		text = text.replace(/@([\w_]+)/g, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
		return text;
	},
	createTagLink: function(text) {
		text = text.replace(/#([\w_]+)/g, '<a href="http://twitter.com/#search?q=%23$1" target="_blank">#$1</a>');
		return text;
	},
	createURLLink: function(text) {
		text = text.replace(/(https?:\/\/[^\s　]+)/g, '<a href="$1" target="_blank">$1</a>');
		return text;
	}
};

})(jQuery, window, document);

