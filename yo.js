document.addEventListener('DOMContentLoaded', yo);

function yo() {
    var h, w, i, l, s, t = false, p = '';

    var yohoho = document.querySelector('#yohoho');
    if (!yohoho) {
        yohoho = document.querySelector('#yohoho-online');
        if (!yohoho) {
            yohoho = document.querySelector('#yohoho-torrent');
            if (!yohoho) {
                return false;
            }
            else {
                t = true;
            }
        }
    }

    var options = [].slice.call(yohoho.attributes).reduce(function (o, a) {
        return /^data-/.test(a.name) && (o[a.name.substr(5)] = a.value), o;
    }, {});

    if (options.title.indexOf('трейлер')+1) {
        options.player = 'trailer';
    }
    else if (t) {
        options.player = 'torrent';
    }

    options.player = (options.player)
        ? options.player
        : 'moonwalk,hdgo,iframe,kodik,allserials,trailer,torrent';

    for (var data in options) {
        if (options.hasOwnProperty(data) && options[data]) {
            p += (p)
                ? '&' + data + '=' + encodeURIComponent(options[data])
                : data + '=' + encodeURIComponent(options[data]);
        }
        else {
            options[data] = '';
        }
    }

    if (!options.kinopoisk && !options.title) {
        return false;
    }

    if (window.top.location.protocol == 'https:') {
        options.player = options.player
            .replace('moonwalk', '')
            .replace('kodik', '')
            .replace('allserials', '')
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var css = '#yohoho{border:0;margin:0;padding:0;overflow:hidden;position:relative}#yohoho-loading{z-index:9999;position:absolute;left:0;top:0;width:100%;height:100%;background:#2A3440 url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpcmFsIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgY2xhc3M9ImJrIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU0LjUgODkuOWMtOS42IDAtMTguNi0zLjktMjUuNC0xMSAtNi44LTcuMS0xMC41LTE2LjYtMTAuNS0yNi43IDAtOC45IDMuMy0xNy4yIDkuMi0yMy41UzQxLjcgMTkgNTAuMiAxOWM4LjQgMCAxNi40IDMuNCAyMi4zIDkuNyA2IDYuMyA5LjIgMTQuNiA5LjIgMjMuNSAwIDE1LjgtMTIuMiAyOC43LTI3LjMgMjguNyAtMTUgMC0yNy4zLTEyLjktMjcuMy0yOC43IDAtMTMuMyAxMC4zLTI0LjIgMjMtMjQuMnMyMyAxMC44IDIzIDI0LjJjMCAxMC44LTguNCAxOS42LTE4LjcgMTkuNiAtMTAuMyAwLTE4LjctOC44LTE4LjctMTkuNiAwLTguMyA2LjUtMTUuMSAxNC40LTE1LjEgNy45IDAgMTQuNCA2LjggMTQuNCAxNS4xIDAgNS44LTQuNSAxMC42LTEwLjEgMTAuNnMtMTAuMS00LjgtMTAuMS0xMC42YzAtMy40IDIuNi02LjEgNS44LTYuMSAzLjIgMCA1LjggMi43IDUuOCA2LjEgMCAwLjktMC43IDEuNi0xLjUgMS42IC0wLjggMC0xLjUtMC43LTEuNS0xLjYgMC0xLjYtMS4zLTIuOS0yLjgtMi45IC0xLjUgMC0yLjggMS4zLTIuOCAyLjkgMCA0LjEgMy4yIDcuNCA3LjEgNy40czcuMS0zLjMgNy4xLTcuNGMwLTYuNi01LjEtMTItMTEuNC0xMiAtNi4zIDAtMTEuNCA1LjQtMTEuNCAxMiAwIDkuMSA3IDE2LjUgMTUuNyAxNi41IDguNiAwIDE1LjctNy40IDE1LjctMTYuNSAwLTExLjYtOS0yMS0yMC0yMXMtMjAgOS40LTIwIDIxYzAgMTQuMSAxMC45IDI1LjUgMjQuMyAyNS41czI0LjMtMTEuNCAyNC4zLTI1LjVjMC0xNi42LTEyLjgtMzAtMjguNi0zMCAtMTUuOCAwLTI4LjYgMTMuNS0yOC42IDMwIDAgOS4yIDMuNCAxNy45IDkuNiAyNC40IDYuMiA2LjUgMTQuNSAxMC4xIDIzLjIgMTAuMXMxNy0zLjYgMjMuMi0xMC4xYzYuMi02LjUgOS42LTE1LjIgOS42LTI0LjQgMC0xMC40LTMuOS0yMC4yLTEwLjktMjcuNiAtNy03LjQtMTYuMy0xMS40LTI2LjMtMTEuNHMtMTkuMyA0LjEtMjYuMyAxMS40UzEzIDQxLjggMTMgNTIuMmMwIDAuOS0wLjcgMS42LTEuNSAxLjZTMTAgNTMuMSAxMCA1Mi4yYzAtMTEuMyA0LjItMjEuOSAxMS44LTI5LjkgNy42LTggMTcuNy0xMi40IDI4LjQtMTIuNCAxMC43IDAgMjAuOCA0LjQgMjguNCAxMi40IDcuNiA4IDExLjggMTguNiAxMS44IDI5LjkgMCAxMC4xLTMuNyAxOS41LTEwLjUgMjYuN0M3My4xIDg2IDY0LjEgODkuOSA1NC41IDg5Ljl6IiBmaWxsPSIjZmZmIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA1MCA1MCIgdG89IjM2MCA1MCA1MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+PC9zdmc+) 50% 50% no-repeat}#yohoho-buttons{position:absolute;z-index:9999;right:0;top:50px;text-align:left}#yohoho-buttons:hover{right:0!important}#yohoho-buttons div{font-family:Verdana,sans-serif;font-weight:normal;text-shadow:none;line-height:normal;font-size:12px;color:#fff;background:#2A3440;border-radius:5px 0 0 5px;padding:5px;margin:5px 0 5px 5px;opacity:.7;}#yohoho-buttons div:hover,#yohoho-buttons div.yohoho-active{color:#fff;background:#2F3A46;cursor:pointer;opacity:1}';
    s = document.createElement('style');
    s.type = 'text/css';
    if (s.styleSheet) {
        s.styleSheet.cssText = css;
    }
    else {
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);

    l = document.createElement('div');
    l.setAttribute('id', 'yohoho-loading');
    yohoho.innerHTML = '';
    yohoho.appendChild(l);

    i = document.createElement('iframe');
    i.setAttribute('id', 'yohoho-iframe');
    i.setAttribute('frameborder', '0');
    i.setAttribute('allowfullscreen', 'allowfullscreen');
    yohoho.appendChild(i);

    if (parseInt(yohoho.offsetWidth)) {
        w = parseInt(yohoho.offsetWidth);
    }
    else if (parseInt(yohoho.parentNode.offsetWidth)) {
        w = (yohoho.parentNode.offsetWidth);
    }
    else {
        w = 610;
    }

    if (parseInt(yohoho.offsetHeight) && w/3 < parseInt(yohoho.offsetHeight)) {
        h = parseInt(yohoho.offsetHeight);
    }
    else if (parseInt(yohoho.parentNode.offsetHeight) && w/3 < parseInt(yohoho.parentNode.offsetHeight)) {
        h = parseInt(yohoho.parentNode.offsetHeight);
    }
    else {
        h = w/2;
    }

    var style = 'width:' + w + 'px;height:' + h + 'px';
    i.setAttribute('style', style);
    i.setAttribute('width', w);
    i.setAttribute('height', h);
    yohoho.setAttribute('style', style);

    var protocol = window.top.location.protocol || 'http';
    httpGetAsync(protocol + '//4h0y.yohoho.cc', p,
        function (players) {
            var first = true;
            var buttons = document.createElement('div');
            buttons.setAttribute('id', 'yohoho-buttons');
            var keys = options.player.split(',');
            var j = 0;
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i].toLowerCase().trim();
                if (players.hasOwnProperty(key) && players[key]) {
                    var option = document.createElement('div');
                    option.setAttribute('onclick', 'showPlayer("' + players[key] + '", this)');
                    option.dataset.iframe = players[key];
                    if (key == 'trailer') {
                        j++;
                        option.innerText = j + '► ТРЕЙЛЕР';
                    }
                    else if (key == 'torrent') {
                        j++;
                        option.innerText = j + '► СКАЧАТЬ';
                    }
                    else {
                        j++;
                        option.innerText = j + '► ' + key.toUpperCase();
                    }
                    if (first) {
                        showPlayer(players[key], option, buttons);
                        first = false;
                    }
                    buttons.appendChild(option);
                }
            }
            if (j < 1) {
                var yohohoLoading = document.querySelector('#yohoho-loading');
                yohohoLoading.style.display = 'none';
            }
            else if (j > 1) {
                document.querySelector('#yohoho').appendChild(buttons);
            }
        });

}

function showPlayer(iframe, element, buttons) {
    var yohohoLoading = document.querySelector('#yohoho-loading');
    yohohoLoading.style.display = 'block';
    setTimeout(function () {
        yohohoLoading.style.display = 'none';
    },2000);
    var yohohoIframe = document.querySelector('#yohoho-iframe');
    yohohoIframe.setAttribute('src', iframe);
    if (typeof element.setAttribute === 'function') {
        var yohohoActive = document.querySelectorAll('.yohoho-active');
        if (yohohoActive) {
            for (var i = 0; i < yohohoActive.length; i++) {
                yohohoActive[i].setAttribute('class', '');
            }
        }
        element.setAttribute('class', 'yohoho-active');
    }
    var yohohoButtons = (buttons) ? buttons : document.querySelector('#yohoho-buttons');
    if (yohohoButtons) {
        yohohoButtons.style.right = 0;
        setTimeout(function () {
            var btn = setInterval(function () {
                if (parseInt(yohohoButtons.style.right) > -parseInt(yohohoButtons.offsetWidth)+30)  {
                    yohohoButtons.style.right = (parseInt(yohohoButtons.style.right)-1) + 'px';
                }
                else {
                    clearInterval(btn);
                }
            }, 5);
        }, 5000);
    }
}

function httpGetAsync(url, body, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(tryParseJSON(xmlHttp.responseText));
        }
    };
    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(body);
}

function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return {};
}

!function(){function e(){!window.XMLHttpRequest||d?this._object=new window.ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest.isNormalizedObject?this._object=new a:this._object=new window.XMLHttpRequest,this._listeners=[]}function f(){return new e}function g(a){if(a._object.send(a._data),b&&!a._async)for(a.readyState=f.OPENED,j(a);a.readyState<f.DONE;)if(a.readyState++,h(a),a._aborted)return}function h(a){f.onreadystatechange&&f.onreadystatechange.apply(a),a.dispatchEvent({type:"readystatechange",bubbles:!1,cancelable:!1,timeStamp:(new Date).getTime()})}function i(a){var b=a.responseXML,d=a.responseText;return c&&d&&b&&!b.documentElement&&a.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)&&(b=new window.ActiveXObject("Microsoft.XMLDOM"),b.async=!1,b.validateOnParse=!1,b.loadXML(d)),b&&(c&&0!=b.parseError||!b.documentElement||b.documentElement&&"parsererror"==b.documentElement.tagName)?null:b}function j(a){try{a.responseText=a._object.responseText}catch(a){}try{a.responseXML=i(a._object)}catch(a){}try{a.status=a._object.status}catch(a){}try{a.statusText=a._object.statusText}catch(a){}}function k(a){a._object.onreadystatechange=new window.Function}var a=window.XMLHttpRequest,b=!!window.controllers,c=!!window.document.namespaces,d=c&&window.navigator.userAgent.match(/MSIE 7.0/);f.prototype=e.prototype,b&&a.wrapped&&(f.wrapped=a.wrapped),f.isNormalizedObject=!0,f.UNSENT=0,f.OPENED=1,f.HEADERS_RECEIVED=2,f.LOADING=3,f.DONE=4,f.prototype.UNSENT=f.UNSENT,f.prototype.OPENED=f.OPENED,f.prototype.HEADERS_RECEIVED=f.HEADERS_RECEIVED,f.prototype.LOADING=f.LOADING,f.prototype.DONE=f.DONE,f.prototype.readyState=f.UNSENT,f.prototype.responseText="",f.prototype.responseXML=null,f.prototype.status=0,f.prototype.statusText="",f.prototype.priority="NORMAL",f.prototype.onreadystatechange=null,f.onreadystatechange=null,f.onopen=null,f.onsend=null,f.onabort=null,f.prototype.open=function(a,d,e,g,i){var l=a.toLowerCase();if("connect"==l||"trace"==l||"track"==l)throw new Error(18);delete this._headers,arguments.length<3&&(e=!0),this._async=e;var m=this,n=this.readyState,o=null;c&&e&&(o=function(){n!=f.DONE&&(k(m),m.abort())},window.attachEvent("onunload",o)),f.onopen&&f.onopen.apply(this,arguments),arguments.length>4?this._object.open(a,d,e,g,i):arguments.length>3?this._object.open(a,d,e,g):this._object.open(a,d,e),this.readyState=f.OPENED,h(this),this._object.onreadystatechange=function(){if(!b||e)return m.readyState=m._object.readyState,j(m),m._aborted?void(m.readyState=f.UNSENT):void(m.readyState==f.DONE&&(delete m._data,k(m),c&&e&&window.detachEvent("onunload",o),n!=m.readyState&&h(m),n=m.readyState))}},f.prototype.send=function(a){f.onsend&&f.onsend.apply(this,arguments),arguments.length||(a=null),a&&a.nodeType&&(a=window.XMLSerializer?(new window.XMLSerializer).serializeToString(a):a.xml,this._headers["Content-Type"]||this._object.setRequestHeader("Content-Type","application/xml")),this._data=a,g(this)},f.prototype.abort=function(){f.onabort&&f.onabort.apply(this,arguments),this.readyState>f.UNSENT&&(this._aborted=!0),this._object.abort(),k(this),this.readyState=f.UNSENT,delete this._data},f.prototype.getAllResponseHeaders=function(){return this._object.getAllResponseHeaders()},f.prototype.getResponseHeader=function(a){return this._object.getResponseHeader(a)},f.prototype.setRequestHeader=function(a,b){return this._headers||(this._headers={}),this._headers[a]=b,this._object.setRequestHeader(a,b)},f.prototype.addEventListener=function(a,b,c){for(var e,d=0;e=this._listeners[d];d++)if(e[0]==a&&e[1]==b&&e[2]==c)return;this._listeners.push([a,b,c])},f.prototype.removeEventListener=function(a,b,c){for(var e,d=0;(e=this._listeners[d])&&(e[0]!=a||e[1]!=b||e[2]!=c);d++);e&&this._listeners.splice(d,1)},f.prototype.dispatchEvent=function(a){var b={type:a.type,target:this,currentTarget:this,eventPhase:2,bubbles:a.bubbles,cancelable:a.cancelable,timeStamp:a.timeStamp,stopPropagation:function(){},preventDefault:function(){},initEvent:function(){}};"readystatechange"==b.type&&this.onreadystatechange&&(this.onreadystatechange.handleEvent||this.onreadystatechange).apply(this,[b]);for(var d,c=0;d=this._listeners[c];c++)d[0]!=b.type||d[2]||(d[1].handleEvent||d[1]).apply(this,[b])},f.prototype.toString=function(){return"[object XMLHttpRequest]"},f.toString=function(){return"[XMLHttpRequest]"},window.Function.prototype.apply||(window.Function.prototype.apply=function(a,b){b||(b=[]),a.__func=this,a.__func(b[0],b[1],b[2],b[3],b[4]),delete a.__func}),window.XMLHttpRequest=f}();