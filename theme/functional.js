$(function() {
    function t(t, a) {
        for (var e = 0; e < t[a].link.length; e++)
            if ("alternate" == t[a].link[e].rel) {
                var s = t[a].link[e].href;
                break
            } return s
    }

    function a(t, a, e) {
        return '<a href="' + e + '">' + t[a].title.$t + "</a>"
    }

    function e(t, a) {
        return '<span class="post-author">' + t[a].author[0].name.$t + " </span>"
    }

    function s(t, a) {
        var e = t[a].published.$t,
            s = e.substring(0, 4),
            i = e.substring(5, 7),
            l = e.substring(8, 10);
        return '<span class="post-date">' + (monthFormat[parseInt(i, 10) - 1] + " " + l + ", " + s) + "</span>"
    }

    function i(t, a) {
        var e = t[a].title.$t;
        if (_0xf943x2b = t[a].content.$t, "media$thumbnail" in t[a]) {
            var s = t[a].media$thumbnail.url;
            s.includes("/s72-c") ? (_0xf943x2d = s.replace("/s72-c", "/w640"), _0xf943x2e = s.replace("/s72-c", "/w280"), _0xf943x2f = s.replace("/s72-c", "/w100")) : (_0xf943x2d = s.replace("=s72-c", "=w640"), _0xf943x2e = s.replace("=s72-c", "=w280"), _0xf943x2f = s.replace("=s72-c", "=w100")), _0xf943x2b.indexOf("youtube.com/embed") > -1 && (_0xf943x2d = s.replace("/default.", "/hqdefault."), _0xf943x2e = s.replace("/default.", "/mqdefault."), _0xf943x2f = s)
        } else _0xf943x2d = noThumbnail, _0xf943x2e = noThumbnail.replace("/s680", "/w280"), _0xf943x2f = noThumbnail.replace("/s680", "/w100");
        return ['<img class="post-thumb" alt="' + e + '" src="' + _0xf943x2d + '"/>', '<img class="post-thumb" alt="' + e + '" src="' + _0xf943x2e + '"/>', '<img class="post-thumb" alt="' + e + '" src="' + _0xf943x2f + '"/>']
    }

    function l(t, a) {
        if (null != t[a].category) var e = '<span class="post-tag">' + t[a].category[0].term + "</span>";
        else e = "";
        return e
    }

    function n(t, a) {
        var e = t[a].content.$t.replace(/<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi, "<img$1 hiddensrc=$2$3$2");
        return '<p class="post-snippet">' + $("<div>").html(e).text().trim().substr(0, 86) + "…</p>"
    }

    function c(c, o, r, m) {
        if (o.match("mega-menu") || o.match("hot-posts") || o.match("feat-big") || o.match("col-left") || o.match("col-right") || o.match("grid-small") || o.match("grid-big") || o.match("feat-list") || o.match("post-list") || o.match("related")) {
            var h = "";
            if ("recent" == m) h = "/feeds/posts/default?alt=json-in-script&max-results=" + r;
            else if ("random" == m) h = "/feeds/posts/default?max-results=" + r + "&start-index=" + (Math.floor(Math.random() * r) + 1) + "&alt=json-in-script";
            else h = "/feeds/posts/default/-/" + m + "?alt=json-in-script&max-results=" + r;
            $.ajax({
                url: h,
                type: "get",
                dataType: "jsonp",
                beforeSend: function() {
                    o.match("hot-posts") && c.html('<div class="hot-loader"/>').parent().addClass("show-hot")
                },
                success: function(r) {
                    if (o.match("mega-menu")) var h = '<ul class="mega-menu-inner">';
                    else if (o.match("hot-posts")) h = '<ul class="hot-posts">';
                    else if (o.match("feat-big")) h = '<ul class="feat-big">';
                    else if (o.match("col-right") || o.match("col-left")) h = '<ul class="feat-col">';
                    else if (o.match("grid-small")) h = '<ul class="grid-small">';
                    else if (o.match("grid-big")) h = '<ul class="grid-big">';
                    else if (o.match("feat-list")) h = '<ul class="feat-list">';
                    else if (o.match("post-list")) h = '<ul class="custom-widget">';
                    else if (o.match("related")) h = '<ul class="related-posts">';
                    var d = r.feed.entry;
                    if (null != d) {
                        for (var p = 0, f = d; p < f.length; p++) {
                            var u = t(f, p),
                                g = a(f, p, u),
                                v = i(f, p),
                                b = l(f, p),
                                $ = e(f, p),
                                x = s(f, p),
                                w = n(f, p),
                                k = "";
                            o.match("mega-menu") ? k += '<div class="mega-item item-' + p + '"><div class="mega-content"><div class="post-image-wrap"><a class="post-image-link" href="' + u + '">' + v[1] + '</a></div><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></div>" : o.match("hot-posts") ? k += 0 == p ? '<li class="hot-item item-' + p + '"><div class="hot-item-inner"><a class="post-image-link" href="' + u + '">' + v[0] + '</a><div class="post-info">' + b + '<h2 class="post-title">' + g + '</h2><div class="post-meta">' + $ + x + "</div></div></div></li>" : '<li class="hot-item item-' + p + '"><div class="hot-item-inner"><a class="post-image-link" href="' + u + '">' + v[0] + '</a><div class="post-info">' + b + '<h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></div></li>" : o.match("feat-big") ? k += 0 == p ? '<li class="feat-item item-big item-' + p + '"><div class="feat-inner"><a class="post-image-link" href="' + u + '">' + v[0] + "</a>" + b + '<div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + $ + x + "</div>" + w + "</div></div></li>" : '<li class="feat-item item-small item-' + p + '"><a class="post-image-link" href="' + u + '">' + v[1] + '</a><div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></li>" : o.match("col-left") || o.match("col-right") ? k += 0 == p ? '<li class="feat-item item-big item-' + p + '"><div class="feat-inner"><a class="post-image-link" href="' + u + '">' + v[0] + "</a>" + b + '<div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + $ + x + "</div>" + w + "</div></div></li>" : '<li class="feat-item item-small item-' + p + '"><a class="post-image-link" href="' + u + '">' + v[2] + '</a><div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></li>" : o.match("grid-small") ? k += '<li class="feat-item item-small item-' + p + '"><a class="post-image-link" href="' + u + '">' + v[1] + '</a><div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></li>" : o.match("grid-big") ? k += '<li class="feat-item item-big item-' + p + '"><div class="feat-inner"><a class="post-image-link" href="' + u + '">' + v[0] + "</a>" + b + '<div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + $ + x + "</div>" + w + "</div></div></li>" : o.match("feat-list") ? k += '<li class="feat-item item-' + p + '"><div class="feat-inner"><a class="post-image-link" href="' + u + '">' + v[0] + "</a>" + b + '<div class="post-info"><h2 class="post-title">' + g + '</h2><div class="post-meta">' + $ + x + "</div>" + w + "</div></div></li>" : o.match("post-list") ? k += '<li class="item-' + p + '"><a class="post-image-link" href="' + u + '">' + v[2] + '</a><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></div></li>" : o.match("related") && (k += '<li class="related-item item-' + p + '"><a class="post-image-link" href="' + u + '">' + v[1] + '</a><h2 class="post-title">' + g + '</h2><div class="post-meta">' + x + "</div></li>"), h += k
                        }
                        h += "</ul>"
                    } else h = '<ul class="no-posts">Error: No Posts Found <i class="fa fa-frown-o"/></ul>';
                    o.match("mega-menu") ? (c.addClass("has-sub mega-menu").append(h), c.find("a:first").attr("href", function(t, a) {
                        return a = "recent" == m || "random" == m ? a.replace(a, "/search/?&max-results=" + postPerPage) : a.replace(a, "/search/label/" + m + "?&max-results=" + postPerPage)
                    })) : o.match("hot-posts") ? c.html(h).parent().addClass("show-hot") : o.match("feat-big") || o.match("feat-list") || o.match("col-left") || o.match("col-right") || o.match("grid-small") || o.match("grid-big") ? (c.parent().find(".widget-title").append('<a class="view-all" href="/search/label/' + m + "?&max-results=" + postPerPage + '">' + messages.viewAll + "</a>"), (o.match("col-left") || o.match("col-right")) && (o.match("col-right") && c.parent().addClass("col-right"), c.parent().addClass("col-width")), c.html(h).parent().addClass("show-widget")) : c.html(h)
                }
            })
        }
    }
    $("#main-menu").each(function() {
        for (var t = $(this).find(".LinkList ul > li").children("a"), a = t.length, e = 0; e < a; e++) {
            var s = t.eq(e),
                i = s.text();
            if ("_" !== i.charAt(0))
                if ("_" === t.eq(e + 1).text().charAt(0)) {
                    var l = s.parent();
                    l.append('<ul class="sub-menu m-sub"/>')
                }
            "_" === i.charAt(0) && (s.text(i.replace("_", "")), s.parent().appendTo(l.children(".sub-menu")))
        }
        for (e = 0; e < a; e++) {
            var n = t.eq(e),
                c = n.text();
            if ("_" !== c.charAt(0))
                if ("_" === t.eq(e + 1).text().charAt(0)) {
                    var o = n.parent();
                    o.append('<ul class="sub-menu2 m-sub"/>')
                }
            "_" === c.charAt(0) && (n.text(c.replace("_", "")), n.parent().appendTo(o.children(".sub-menu2")))
        }
        $("#main-menu ul li ul").parent("li").addClass("has-sub"), $("#main-menu .widget").addClass("show-menu")
    }), $("#main-menu-nav").clone().appendTo(".mobile-menu"), $(".mobile-menu .has-sub").append('<div class="submenu-toggle"/>'), $(".mobile-menu ul > li a").each(function() {
        var t = $(this),
            a = t.attr("href").trim(),
            e = a.toLowerCase(),
            s = a.split("/")[0];
        e.match("mega-menu") && t.attr("href", "/search/label/" + s + "?&max-results=" + postPerPage)
    }), $(".slide-menu-toggle").on("click", function() {
        $("body").toggleClass("nav-active"), $(".overlay").fadeToggle(170)
    }), $(".mobile-menu ul li .submenu-toggle").on("click", function(t) {
        $(this).parent().hasClass("has-sub") && (t.preventDefault(), $(this).parent().hasClass("show") ? $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170) : $(this).parent().addClass("show").children(".m-sub").slideToggle(170))
    }), $(".show-search, .show-mobile-search").on("click", function() {
        $("#nav-search, .mobile-search-form").fadeIn(250).find("input").focus()
    }), $(".hide-search, .hide-mobile-search").on("click", function() {
        $("#nav-search, .mobile-search-form").fadeOut(250).find("input").blur()
    }), $(".Label a, a.b-label").attr("href", function(t, a) {
        return a.replace(a, a + "?&max-results=" + postPerPage)
    }), $(".avatar-image-container img").attr("src", function(t, a) {
        return a = (a = a.replace("/s35-c/", "/s45-c/")).replace("//img1.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png")
    }), $(".index-post .post-image-link img").attr("src", function(t, a) {
        return a = a.replace("https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4-&ndash;I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/w680/nth.png", noThumbnail)
    }), $(".author-description a").each(function() {
        $(this).attr("target", "_blank")
    }), $(".post-nav").each(function() {
        var t = $("a.prev-post-link").attr("href"),
            a = $("a.next-post-link").attr("href");
        $.ajax({
            url: t,
            type: "get",
            success: function(t) {
                var a = $(t).find(".blog-post h1.post-title").text();
                $(".post-prev a .post-nav-inner p").text(a)
            }
        }), $.ajax({
            url: a,
            type: "get",
            success: function(t) {
                var a = $(t).find(".blog-post h1.post-title").text();
                $(".post-next a .post-nav-inner p").text(a)
            }
        })
    }), $(".post-body strike").each(function() {
        var t = $(this),
            a = t.text();
        a.match("left-sidebar") && t.replaceWith("<style>.item #main-wrapper{float:right;padding:0 0 0 25px}.item #sidebar-wrapper{float:left}</style>"), a.match("right-sidebar") && t.replaceWith("<style>.item #main-wrapper{float:left;padding:0 25px 0 0}.item #sidebar-wrapper{float:right}</style>"), a.match("full-width") && t.replaceWith("<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}</style>")
    }), $("#main-wrapper, #sidebar-wrapper").each(function() {
        1 == fixedSidebar && $(this).theiaStickySidebar({
            additionalMarginTop: 25,
            additionalMarginBottom: 25
        })
    }), $(".back-top").each(function() {
        var t = $(this);
        $(window).on("scroll", function() {
            $(this).scrollTop() >= 100 ? t.fadeIn(250) : t.fadeOut(250)
        }), t.click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 500)
        })
    }), $("#main-menu #main-menu-nav li").each(function() {
        var t = $(this),
            a = t.find("a").attr("href").trim();
        c(t, a.toLowerCase(), 4, a.split("/")[0])
    }), $("#hot-section .widget-content").each(function() {
        var t = $(this),
            a = t.text().trim();
        c(t, a.toLowerCase(), 4, a.split("/")[0])
    }), $(".featured-posts .widget-content").each(function() {
        var t = $(this),
            a = t.text().trim(),
            e = a.toLowerCase(),
            s = a.split("/");
        if (e.match("feat-big")) var i = 5,
            l = s[0];
        else i = s[0], l = s[1];
        c(t, e, i, l)
    }), $(".common-widget .widget-content").each(function() {
        var t = $(this),
            a = t.text().trim(),
            e = a.toLowerCase(),
            s = a.split("/");
        c(t, e, s[0], s[1])
    }), $(".related-ready").each(function() {
        var t = $(this),
            a = t.find(".related-tag").data("label");
        c(t, "related", 3, a)
    }), $(".blog-post-comments").each(function() {
        var t, a = commentsSystem,
            e = (disqus_blogger_current_url, '<div class="fb-comments" data-width="100%" data-href="' + $(location).attr("href") + '" data-numposts="5"></div>'),
            s = "comments-system-" + a;
        "blogger" == a ? $(this).addClass(s).show() : "disqus" == a ? ((t = document.createElement("script")).type = "text/javascript", t.async = !0, t.src = "//" + disqusShortname + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t), $("#comments, #gpluscomments").remove(), $(this).append('<div id="disqus_thread"/>').addClass(s).show()) : "facebook" == a ? ($("#comments, #gpluscomments").remove(), $(this).append(e).addClass(s).show()) : "hide" == a ? $(this).hide() : $(this).addClass("comments-system-default").show()
    })
});
