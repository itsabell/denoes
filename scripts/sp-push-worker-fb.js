"use strict";
var sServerApi = "https://pushdata.sendpulse.com:4434",
    source_pushpush = "pushpush",
    pushPushUrl = "https://click.pushpush.io/show.php";
self.addEventListener("install", (function(t) {
    t.waitUntil(self.skipWaiting())
})), self.addEventListener("push", (function(t) {
    var i = !1,
        e = !1,
        a = null;
    t.data && ((i = t.data.json()).message && i.message.source === source_pushpush && (e = !0, a = i.message.task_id_new), i.data && i.data.source === source_pushpush && (e = !0, a = i.data.task_id_new)), t.waitUntil(self.registration.pushManager.getSubscription().then((function(t) {
        if (e && a) {
            var o = {},
                n = a;
            return "string" == typeof n && (n = JSON.parse(n)), fetch(pushPushUrl, {
                method: "post",
                body: JSON.stringify({
                    task_info: n
                })
            }).then((function(t) {
                return t.json()
            })).then((function(t) {
                if (void 0 === t) {
                    return self.registration.showNotification("Oops! We couldn't fetch the notification", {
                        body: "Sorry, the notification could not be displayed due to an ad blocker or network connection issue.",
                        tag: "notification-error"
                    })
                }
                return o.body = t.body, o.icon = t.icon, o.data = {}, o.data.redirectUrl = t.link, o.image = t.image, self.registration.showNotification(t.title, o)
            })).catch((function(t) {
                return self.registration.showNotification("Oops! We couldn't fetch the notification", {
                    body: "Sorry, the notification could not be displayed due to an ad blocker or network connection issue.",
                    tag: "notification-error"
                })
            }))
        }
        if (!i) {
            r = "Oops! We couldn't fetch the notification", s = "Sorry, the notification could not be displayed due to an ad blocker or network connection issue.", c = "notification-error";
            return self.registration.showNotification(r, {
                body: s,
                tag: c
            })
        }
        if (!i.message) {
            if (i.notification) var r = i.notification.title,
                s = i.notification.body,
                d = i.notification.icon;
            else {
                var r = void 0,
                    s = void 0;
                d = void 0
            }
            if (void 0 === r) r = i.data.title;
            if (void 0 === s) s = i.data.body;
            if (void 0 === d) d = i.data.icon;
            var c = i.collapse_key,
                f = i.data.url,
                u = i.data.subscription,
                h = "true" == i.data.requireInteraction,
                l = parseInt(i.data.task_id),
                g = parseInt(i.data.user_id);
            o = {
                body: s,
                icon: d,
                tag: c,
                data: {
                    redirectUrl: f
                },
                requireInteraction: h
            };
            if (void 0 !== i.data.buttons) {
                if ("string" == typeof i.data.buttons) var p = JSON.parse(i.data.buttons);
                else p = i.data.buttons;
                o.actions = p, o.data.buttons = p
            }
            void 0 !== i.data.image && (o.image = i.data.image);
            var v = {
                action: "statisctic",
                subscriptionId: u,
                statisctic_action: "delivered",
                task_id: l,
                user_id: g
            };
            return void 0 !== i.data.addData && (v.addData = i.data.addData), fetch(sServerApi, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(v)
            }).then((function(t) {
                return self.registration.showNotification(r, o)
            })).catch((function(t) {
                return self.registration.showNotification(r, o)
            }))
        }
        self.registration.pushManager.getSubscription().then((function(t) {
            var e = null,
                a = (e = "subscriptionId" in t ? t.subscriptionId : t.endpoint).split("/");
            e = a[a.length - 1];
            var o = Base64.decode(i.message.title),
                n = {
                    body: Base64.decode(i.message.message),
                    icon: i.message.icon,
                    tag: i.message.tag,
                    data: {
                        redirectUrl: Base64.decode(i.message.url)
                    },
                    requireInteraction: !0
                };
            void 0 !== i.message.buttons && (n.actions = i.message.buttons, n.data.buttons = i.message.buttons), void 0 !== i.message.image && (n.image = i.message.image);
            var r = {
                action: "statisctic",
                subscriptionId: e,
                statisctic_action: "delivered",
                task_id: i.message.task_id,
                user_id: i.message.user_id
            };
            return void 0 !== i.message.addData && (r.addData = i.message.addData), fetch(sServerApi, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(r)
            }).then((function(t) {
                return self.registration.showNotification(o, n)
            })).catch((function(t) {
                return self.registration.showNotification(o, n)
            }))
        }))
    })))
})), self.addEventListener("notificationclick", (function(t) {
    var i = t.notification.data.redirectUrl;
    if (void 0 !== t.action) {
        var e = t.action;
        if (void 0 !== t.notification.data.buttons)
            for (var a = 0; a < t.notification.data.buttons.length; a++) t.notification.data.buttons[a].action == e && (i = t.notification.data.buttons[a].url)
    }
    t.notification.close(), t.waitUntil(clients.matchAll({
        type: "window"
    }).then((function(t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e];
            if ("/" == a.url && "focus" in a) return a.focus()
        }
        if (clients.openWindow) return clients.openWindow(i)
    })))
}));
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var i, e, a, o, n, r, s, d = "",
            c = 0;
        for (t = Base64._utf8_encode(t); c < t.length;) o = (i = t.charCodeAt(c++)) >> 2, n = (3 & i) << 4 | (e = t.charCodeAt(c++)) >> 4, r = (15 & e) << 2 | (a = t.charCodeAt(c++)) >> 6, s = 63 & a, isNaN(e) ? r = s = 64 : isNaN(a) && (s = 64), d = d + this._keyStr.charAt(o) + this._keyStr.charAt(n) + this._keyStr.charAt(r) + this._keyStr.charAt(s);
        return d
    },
    decode: function(t) {
        var i, e, a, o, n, r, s = "",
            d = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < t.length;) i = this._keyStr.indexOf(t.charAt(d++)) << 2 | (o = this._keyStr.indexOf(t.charAt(d++))) >> 4, e = (15 & o) << 4 | (n = this._keyStr.indexOf(t.charAt(d++))) >> 2, a = (3 & n) << 6 | (r = this._keyStr.indexOf(t.charAt(d++))), s += String.fromCharCode(i), 64 != n && (s += String.fromCharCode(e)), 64 != r && (s += String.fromCharCode(a));
        return s = Base64._utf8_decode(s)
    },
    _utf8_encode: function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var i = "", e = 0; e < t.length; e++) {
            var a = t.charCodeAt(e);
            a < 128 ? i += String.fromCharCode(a) : a > 127 && a < 2048 ? (i += String.fromCharCode(a >> 6 | 192), i += String.fromCharCode(63 & a | 128)) : (i += String.fromCharCode(a >> 12 | 224), i += String.fromCharCode(a >> 6 & 63 | 128), i += String.fromCharCode(63 & a | 128))
        }
        return i
    },
    _utf8_decode: function(t) {
        for (var i = "", e = 0, a = 0, o = 0, n = 0; e < t.length;)(a = t.charCodeAt(e)) < 128 ? (i += String.fromCharCode(a), e++) : a > 191 && a < 224 ? (o = t.charCodeAt(e + 1), i += String.fromCharCode((31 & a) << 6 | 63 & o), e += 2) : (o = t.charCodeAt(e + 1), n = t.charCodeAt(e + 2), i += String.fromCharCode((15 & a) << 12 | (63 & o) << 6 | 63 & n), e += 3);
        return i
    }
};
