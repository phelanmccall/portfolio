var animate = !1, mobileAdjusted = !1, parallax = [], activeSection = "ataglance", section = {}, scrollTimer = !1, indexOf = function (f) { indexOf = "function" === typeof Array.prototype.indexOf ? Array.prototype.indexOf : function (f) { for (var c = 0, e = -1, c = 0; c < this.length; c++)if (this[c] === f) { e = c; break } return e } }; function isMobile() { return $("#mobiledetect").is(":visible") }
function loadSection(f) {
    if (f in section && !1 === section[f].loaded && 0 < section[f].container.find(".loading").length) {
        var h = section[f].container, c = h.find(".loading").first().animate({ opacity: 1 }, 400), e = c.find(".loading-bar-progress").first(), k = c.find(".loading-text").first(), a = 0, b = 0, d = setInterval(function () { k.fadeOut(500).fadeIn(300) }, 800), g = [], l = function (a) { -1 === indexOf.call(g, a) && g.push(a) }; section[f].loaded = !0; h.find("div.item").each(function () {
            var a = $(this).data(); "preview" in a && l("images/previews/" +
                a.preview); "logo" in a && l("images/logos/" + a.logo); "logoinactive" in a && l("images/logos/" + a.logoinactive)
        }); h.find("img").each(function () { g.push($(this).attr("src")) }); h.css({ "min-height": h.height() }); $.each(g, function (g, l) {
            b++; $(document.createElement("img")).attr("src", l).css({ position: "absolute", visibility: "hidden" }).appendTo(c).on("load", function () {
                a++; var g = a / b, g = e.parent().width() * g; e.stop(!0).animate({ width: g }, 500); a >= b && (clearInterval(d), c.css({
                    position: "absolute", top: c.offset().top, left: c.offset().left,
                    width: "100%"
                }).fadeOut(500, function () { $(this).empty().remove() }), initSection(f), section[f].init = !0)
            })
        })
    }
}
function initSection(f) {
    if ("portfolio" == f) {
        $("#portfolioMenu").data({ pos: 0, moving: !1, touched: !1 }).on({
            mousewheel: function (e) {
                if ("wheelDelta" in e.originalEvent) {
                    var c = 0 < e.originalEvent.wheelDelta, a = $(this).children(".item-wrap.active").first(), b = function () { e.preventDefault(); e.stopPropagation(); return e.returnValue = !1 }; if (c) { if ($prev = a.prev(), 0 < $prev.length) return portfolioPage($prev.data("page")), b() } else if ($next = a.next(), console.log($next), 0 < $next.length) return portfolioPage($next.data("page")),
                        b()
                }
            }, touchstart: function (e) { if ("touches" in e.originalEvent) { e = e.originalEvent.touches[0].pageY; var c = parseInt($(this).css("top")); isNaN(c) && (c = 0); $(this).data({ init: c, pos: e, touched: !0 }) } }, touchmove: function (c) {
                if ("touches" in c.originalEvent && !0 === $(this).data().touched) {
                    var f = c.originalEvent.touches[0].pageY, a = f - $(this).data().pos + $(this).data().init; if ("lastTouch" in $(this).data()) { var b = $(this).data().lastTouch, b = f - b; $(this).data({ velocity: b }) } c.preventDefault(); 0 < a && (a = 0); $(this).data({
                        lastTouch: f,
                        moving: !0, touched: !0
                    }).css({ top: a })
                }
            }, touchend: function (c) { $(this).data({ touched: !1 }); if ("touches" in c.originalEvent && !0 === $(this).data().moving) { var f = -1 * parseInt($(this).data({ moving: !1 }).css("top")), a = !1, b = !1; $(this).children(".item-wrap").each(function () { var d = Math.abs($(this).position().top - f); if (!1 === a || d < a) a = d, b = $(this).data().page }); portfolioPage(b) } }
        }).children(".item-wrap").on("click", function () { !1 === $(this).parent().data().moving && portfolioPage($(this).data().page) }); $("#portfolioTitle").resizeFont({ max: 42 });
        $(window).resize(function () { $("#portfolioTitle").resizeFont({ max: 42 }) }); portfolioPage($("#portfolioMenu").children(".item-wrap").first().data().page, !0); $("#portfolioContent").css({ opacity: 0 }).animate({ height: "show" }, 500, function () { $(window).trigger("resize"); $(this).animate({ opacity: 1 }, 500, function () { $("#portfolio").css({ "min-height": "" }) }) }); var h = setInterval(function () { $("#portfolioTooltip").animate({ bottom: "110%" }, 300).animate({ bottom: "108%" }, 500) }, 800); f = $(document.createElement("div")).addClass("tooltip-arrow");
        var c = $(document.createElement("div")).addClass("tooltip").text("Click, scroll, or swipe!").attr({ id: "portfolioTooltip" }).append(f); setTimeout(function () { clearInterval(h); c.fadeOut(500, function () { c.empty().remove() }) }, 4E3); c.delay(500).css({ opacity: 0, left: 30, width: 120, bottom: "108%" }).appendTo($(".portfolio-content").first()).animate({ opacity: 1, bottom: "110%" }, 300).animate({ bottom: "108%" }, 500)
    }
}
function portfolioPage(f, h) {
    h = "undefined" === typeof h ? !1 : h; var c = $("#pdata div#" + f); if (0 < c.length && !1 === animate) {
        var e = c.data(); c.html(); var k = $("#portfolioMenu"), a = k.find(".item-wrap[data-page='" + f + "']").first(); if (!1 === c.is(".active")) {
            if (h) $("#portfolioTitle").empty().html(e.title).resizeFont({ max: 42 }), $("#portfolioSubtitle").empty().html(e.subtitle), $("#portfolioPreview img").not(".portfolio-preview-image-blank").remove(), $(document.createElement("img")).attr({
                src: "images/previews/" + e.preview,
                alt: e.title
            }).appendTo("#portfolioPreview"), $("#portfolioBlurb").empty().html(c.html()); else {
                $("#portfolioHeader").offset(); $(".header-wrap").outerHeight(); var b = c.html(), d = $("#portfolioBlurb").clone().css({ position: "absolute", visibility: "hidden" }).insertAfter("#portfolioBlurb").empty().html(b), g = $("#portfolioBlurb").height(), l = d.height() - g, l = g + l; d.empty().remove(); $("#portfolioContent").find("*").stop(!0); "coap" !== f && $("#portfolioTooltip").fadeOut(500, function () { $(this).empty().remove() }); $("#portfolioTitle").animate({ opacity: 0 },
                    400, function () { $(this).html(e.title).resizeFont({ max: 42 }).animate({ opacity: 1 }, 400) }); $("#portfolioSubtitle").animate({ opacity: 0 }, 400, function () { $(this).html(e.subtitle).animate({ opacity: 1 }, 400) }); $("#portfolioPreview img").not(".portfolio-preview-image-blank").fadeOut(400, function () { $(this).remove() }); $(document.createElement("img")).css("opacity", 0).attr({ src: "images/previews/" + e.preview, alt: e.title }).appendTo("#portfolioPreview").animate({ opacity: 1 }, 400); $("#portfolioBlurb").css({
                        overflow: "hidden",
                        height: g
                    }).animate({ opacity: 0, height: l }, 400, function () { $(this).empty().html(b).css({ height: "" }).animate({ opacity: 1 }, 400) })
            } c.addClass("active").siblings().removeClass("active"); $("#previewMockup").attr("alt", e.title)
        } a.addClass("active").siblings().removeClass("active"); h ? k.data({ moving: !1 }) : (k.animate({ top: -1 * a.position().top }, 500, "easeInOutQuad"), setTimeout(function () { k.data({ moving: !1 }).trigger("mousemove") }, 500))
    }
}
function scrollCheck() { var f = $(window).scrollTop() + 0.6 * $(window).height(); scrollTimer = !1; $.each(section, function (h, c) { var e = c.container, k = e.offset().top, e = e.offset().top + e.outerHeight(); if (f >= k && (!1 === c.loaded && loadSection(h), f <= e)) return $(".header-link").removeClass("active"), activeSection = h, null != c.headerLink && c.headerLink.addClass("active"), !1 }) }
$(document).ready(function () {
    $.extend($.easing, { easeOutBack: function (a, b, d, g, c, e) { void 0 == e && (e = 1.70158); return g * ((b = b / c - 1) * b * ((e + 1) * b + e) + 1) + d }, easeInOutQuad: function (a, b, d, g, c) { return 1 > (b /= c / 2) ? g / 2 * b * b + d : -g / 2 * (--b * (b - 2) - 1) + d } }); (function (a) {
        var b = a(document.createElement("input")), d = !1; a.support.placeholder = !1; "placeholder" in b[0] && (a.support.placeholder = !0); b.empty().remove(); a.fn.resizeFont = function (b) {
            opt = a.extend({ max: 72, min: 8 }, b); 256 < opt.max && (opt.max = 256); 3 > opt.min && (opt.min = 3); return this.each(function () {
                var b =
                    -1; a(this).css("font-size") && (b = parseInt(a(this).css("font-size"))); if (-1 != b) {
                        var d = a(this).css({ display: "inline-block", "white-space": "nowrap" }), c = b < opt.max ? b + 1 : !1, g = b > opt.min ? b - 1 : !1, e = d.width(), f = d.parent().width(), h = 0, k = 0, p = !1, q = !1, s = !0; for (e < f ? g = !1 : e >= f && (c = !1); s;)if (!1 !== c || !1 !== g) {
                            e = d.width(); f = d.parent().width(); if (!1 !== c) {
                                d.css({ "font-size": c + "px" }); var m = d.width(), n = d.parent().width(), t = m + Math.abs(m - e), r = Math.abs(f - n); k++; h++; m >= n ? (1 < k && (p = c - 1), c = !1) : 0 < r ? c = !1 : t > n ? (p = c, c = !1) : (c++ , c > opt.max &&
                                    (p = c - 1, c = !1))
                            } if (!1 !== g) { d.css({ "font-size": g + "px" }); m = d.width(); n = d.parent().width(); Math.abs(e - m); var r = Math.abs(f - n); h++; m < n ? 0 < r ? (g-- , g < opt.min && (q = opt.min, g = !1)) : (q = g + 1, g = !1) : (g-- , g < opt.min && (q = opt.min, g = !1)) } 200 <= h && (g = c = !1)
                        } else s = !1; !1 !== p ? d.css({ "font-size": p + "px" }) : !1 !== q ? d.css({ "font-size": q + "px" }) : d.css({ "font-size": b + "px" })
                    }
            })
        }; a.fn.formMsg = function (b, d) {
            d = "undefined" === typeof d ? !0 : d; return this.each(function () {
                if (a(this).is(".field")) {
                    var c = a(this); c.children(".msg").fadeOut(300, function () { a(this).empty().remove() });
                    "good" == b ? c.removeClass("bad").addClass("good") : "" != b ? (a(document.createElement("div")).addClass("msg").css({ opacity: 0 }).html(b).appendTo(c).animate({ opacity: 1 }, 300), c.removeClass("good"), d && c.addClass("bad")) : c.removeClass("good bad")
                }
            })
        }; a.fn.countOn = function () {
            var a = this.countOff().first(); if (a.attr("maxlength")) {
                var b = a.attr("maxlength"), c = a.attr("data-min") ? parseInt(a.attr("data-min")) : 0; d = setInterval(function () {
                    var d = a.val().length, d = d < c && 0 < d ? "<span style='color:#c00;'>" + d + "</span>" : d; a.siblings(".count").html(d +
                        " / " + b)
                }, 50)
            } return this
        }; a.fn.countOff = function () { !1 !== d && (clearInterval(d), d = !1); return this }
    })(jQuery); $("section").each(function () { var a = $(this).attr("id"); section[a] = { container: $(this), headerLink: 0 < $(".header-link[data-section='" + a + "']").length ? $(".header-link[data-section='" + a + "']").first() : null, init: "ataglance" == a ? !0 : !1, loaded: "ataglance" == a ? !0 : !1 } }); parallax.push($("section.ataglance")); $(window).scroll(function () {
        if (!isMobile()) {
            mobileAdjusted = !1; for (var a = 0; a < parallax.length; a++) {
                var b =
                    parallax[a], d = b.offset().top, c = b.offset().top + b.outerHeight(), e = $(window).scrollTop(), f = $(window).scrollTop() + $(window).height(); if (e >= d && e <= c || f >= d && f <= c) d = "50% " + -($(window).scrollTop() / 8) + "px", b.css({ backgroundPosition: d })
            }
        } else if (!mobileAdjusted) for (a = 0; a < parallax.length; a++)parallax[a].css({ backgroundPosition: "50% 0px" }), mobileAdjusted = !0; !1 !== scrollTimer && clearTimeout(scrollTimer); scrollTimer = setTimeout(function () { scrollCheck() }, 150)
    }); $("body").on("click.pages", ".pageturn", function () {
        if (!1 ==
            animate) {
            var a = $("#" + $(this).data("content")); 
            if (0 < a.length && !a.is(":visible")) {
                $(this).addClass("active").siblings().removeClass("active"); 
                var b = a.parent(); 
                animate = !0; 
                a.css({ position: "absolute", left: -2E3, top: -2E3, visibility: "hidden" }).show(0); 
                var d = a.outerHeight(); 
                a.hide(0).css({ position: "", left: "", top: "", visibility: "visible" }); 
                b.css({ height: b.height() }).animate({ height: d }, 400, function () { b.delay(400).css({ height: "" }) }); b.css({ overflow: "visible" }); a.parent().children(".page").fadeOut(400); a.delay(400).fadeIn(400,
                    function () { animate = !1; var b = 0; a.children(".fetch").each(function () { var a = $(this); $.post("fetch.php", { mode: $(this).data("fetch") }, function (d) { $render = $(document.createElement("div")).addClass("fetched").css({ visibility: "hidden" }).html(d).insertAfter(a); var c = $render.height(); $render.empty().remove(); a.delay(b).css({ height: a.height() }).animate({ opacity: "0", height: c + "px" }, 400, function () { a.html(d).removeClass("fetch").addClass("fetched").css({ height: "auto" }).animate({ opacity: "1" }, 400) }) }); b += 400 }) })
            }
        }
    });
    $("body").on("click", "a[href='#']", function () { return !1 }).on("click", ".field", function () { $(this).children("input[type='text'],textarea").first().focus() }); $(".header-link").on("click", function () { var a = $(this).data().section; a in section && ($(this).addClass("active").siblings().removeClass("active"), a = Math.min(section[a].container.offset().top - $(".header-wrap").outerHeight(), $(document).height()), $("body").animate({ scrollTop: a }, 500, "easeInOutQuad")) }); var f = /^((?:[^\W\d_]|')(?:[^\W\d_]|['-](?!['-]))*(?:[^\W\d_]|'))$/g,
        h = /^((?:[^\W\d_]|['-](?!['-]+))+[\.]?)$/g, c = /[\s]([\s]+)/g, e = /^([^@ "']+@[^@. "']+\.[^@ "']+)$/g, k = function () { if (this.attr("maxlength")) { var a = this.attr("data-min") ? parseInt(this.attr("data-min")) : 0, b = this.val().length, d = parseInt(this.attr("maxlength")), b = b < a && 0 < b ? "<span style='color:#c00;'>" + b + "</span>" : b; this.siblings(".count").html(b + " / " + d) } }; $("#contactName").on("blur", function () {
            var a = $.trim($(this).val()).replace(c, " "); msg = ""; $field = $(this).parent(); $(this).countOff().val(a); k.call($(this));
            if (1 < a.length) if (a = a.split(" "), 1 < a.length) {
                for (var b = a.length - 1, d = b; 0 <= d; d--)if (0 == d || d == b) { var e = 0 == d ? "first" : "last"; 1 < a[d].length ? "" != a[d].replace(f, "") && (msg = "The " + e + " name you gave is invalid.") : msg = "Please give your full " + e + " name."; a[d] = a[d].substr(0, 1).toUpperCase() + a[d].substr(1) } else "" != a[d].replace(h, "") && (msg = "Please give a valid middle name or initial (or no middle name)."), -1 === $.inArray(a[d], "de der van von la le al".split(" ")) && (a[d] = a[d].substr(0, 1).toUpperCase() + a[d].substr(1),
                    "" == a[d].replace(/^([A-Za-z])$/, "") && (a[d] += ".")); msg = "" == msg ? "good" : msg; $(this).val(a.join(" "))
            } else msg = "Please give at least your first and last name."; else msg = 0 < a.length ? "Mysterious, aren't we?" : $(this).hasClass("final") ? "Please provide your name." : ""; $field.formMsg(msg)
        }); $("#contactEmail").on("blur", function () {
            var a = $.trim($(this).val()).replace(c, " "), b = $(this).parent(); $(this).countOff().val(a); k.call($(this)); 4 < a.length ? "" != a.replace(e, "") ? b.formMsg("Please provide a valid e-mail address.") :
                b.formMsg("good") : 0 < a.length ? b.formMsg("Please provide a valid e-mail address.") : $(this).hasClass("final") ? b.formMsg("Please enter your e-mail address.") : b.formMsg("")
        }); $("#contactCompany").on("blur", function () { var a = $.trim($(this).val()).replace(c, " "), b = $(this).parent(); $(this).countOff().val(a); k.call($(this)); 5 > a.length ? 0 < a.length ? b.formMsg("Company name must be at least 5 characters.") : b.formMsg("") : b.formMsg("good") }); $("#contactSubject").on("blur", function () {
            var a = $.trim($(this).val()).replace(c,
                " "), b = $(this).parent(); $(this).countOff().val(a); k.call($(this)); 15 > a.length ? 0 < a.length ? b.formMsg("Subject must be at least 15 characters.") : $(this).hasClass("final") ? b.formMsg("Please enter a subject.") : b.formMsg("") : b.formMsg("good")
        }); $("#contactMessage").on("blur", function () {
            var a = $.trim($(this).val()), b = $(this).parent(); $(this).countOff().val(a); k.call($(this)); 100 > a.length ? 0 < a.length ? b.formMsg("At least 100 characters, please!") : $(this).hasClass("final") ? b.formMsg("Please enter your message.") :
                b.formMsg("") : b.formMsg("good")
        }); $("#contactHuman").on("blur", function () { $(this).countOff(); k.call($(this)); 0 === $(this).val().length && $(this).hasClass("final") && $(this).parent().formMsg("Please answer the security question.") }); $("#contactName, #contactEmail, #contactCompany, #contactSubject, #contactMessage, #contactHuman").on("focus", function () { $(this).countOn(); $(this).parent().formMsg("") }); $("#getNewChallenge").on("click", function () {
        !1 === $("#contactSubmit").hasClass("active") && ($("#contactSubmit").addClass("active").animate({ opacity: 0 },
            400, function () { $(this).css({ visibility: "hidden" }) }), $("#contactSubmit").parent().css({ background: "url('images/load-contact.gif') no-repeat center center", "background-size": "contain" }), $("#contactHuman").val(""), $.post("default.php", { mode: "newnum" }, null, "json").done(function (a) { $("#contactChallenge").animate({ opacity: 0 }, 300, function () { $(this).html("What is <b>" + a.challenge + "?</b>").animate({ opacity: 1 }, 300) }); $("#contactHuman").attr("data-min", a.min).formMsg("") }).fail(function (a, b, d) {
                $("#contactHuman").siblings(".msg").fadeOut(300);
                $(document.createElement("div")).addClass("msg").html("Request failed; please try again later. (" + b + ")").css({ opacity: 0 }).appendTo($("#contactHuman").parent()).animate({ opacity: 1 }, 300)
            }).always(function () { $("#contactSubmit").removeClass("active").stop(!0).css({ visibility: "visible" }).animate({ opacity: 1 }, 300).parent().css({ background: "" }) }))
        }); $("#contactSubmit").on("click", function () {
            if (!1 === $(this).hasClass("active")) {
                var a = $("input[id^='contact'], textarea[id^='contact']").addClass("final").trigger("blur").removeClass("final");
                if (0 === a.parent(".bad").length && a.parent(".good").length >= a.not("[data-optional], #contactHuman").length) {
                    var b = { mode: "send", name: $("#contactName").val(), email: $("#contactEmail").val(), company: $("#contactCompany").val(), subject: $("#contactSubject").val(), message: $("#contactMessage").val(), challenge: $("#contactHuman").val() }; $(this).addClass("active").animate({ opacity: 0 }, 400, function () { $(this).css({ visibility: "hidden" }) }); console.log("%o", b); $(this).parent().css({
                        background: "url('images/load-contact.gif') no-repeat center center",
                        "background-size": "contain"
                    }); $.post("default.php", b, null, "json").done(function (a) {
                        console.log("%o", a); if ("status" in a) {
                            var b = "success" == a.status ? "#fff" : "#aa0000"; $("#contactResponse").css({ color: b }).animate({ opacity: 0 }, 300, function () { $(this).html(a.message).animate({ opacity: 1 }, 300) }); if ("failure" == a.status) {
                                if ("errors" in a) for (b = 0; b < a.errors.length; b++)$("[name='" + a.errors[b].field + "']").parent().formMsg(a.errors[b].message); "newchallenge" in a && ($("#contactChallenge").animate({ opacity: 0 }, 300, function () {
                                    $(this).html("What is <b>" +
                                        a.newchallenge.text + "?</b>").animate({ opacity: 1 }, 300)
                                }), $("#contactHuman").val("").attr("data-min", a.newchallenge.min).parent(), 0 == $("#contactHuman").parent().find(".msg").length && $("#contactHuman").parent().formMsg("Please answer another challenge question. Sorry!"))
                            } else "success" == a.status && ($("#contactForm").animate({ opacity: 0, height: "toggle" }, 500, function () { $(this).empty().remove() }), $("#contactSubmit").off())
                        }
                    }).fail(function (a, b, c) {
                        $("#contactResponse").css({ color: "#aa0000" }).html("Your request couldn't be completed because of a technical error. Please try again later.");
                        $("#contactForm").animate({ opacity: 0, height: "toggle" }, 500, function () { $(this).empty().remove() }); $("#contactSubmit").off()
                    }).always(function () { setTimeout(function () { $("#contactSubmit").removeClass("active").stop(!0).css({ visibility: "visible" }).animate({ opacity: 1 }, 300).parent().css({ background: "" }) }, 1E3) })
                } else a.parent(".bad").css({ background: "#eccbcb" }), setTimeout(function () { a.parent().css({ background: "" }) }, 300)
            }
        }); $.support.placeholder || $("#noPlaceholder").html("Prove you're human!<br><b>" + $("#contactHuman").attr("data-query") +
            "</b>")
});