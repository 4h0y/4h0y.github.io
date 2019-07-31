document.addEventListener('DOMContentLoaded', ahoy_yo);

function ahoy_key(event) {
    if (!event || (!event.key && !event.keyCode)) return;
    var key='';'Enter'===event.key||13===event.keyCode?key='fullscreen':'Left'===event.key||'ArrowLeft'===event.key||37===event.keyCode?key='prev':'Right'===event.key||'ArrowRight'===event.key||39===event.keyCode?key='next':'Up'===event.key||'ArrowUp'===event.key||38===event.keyCode?key='up':'Down'===event.key||'ArrowDown'===event.key||40===event.keyCode?key='down':'0'===event.key||48===event.keyCode?key='0':'1'===event.key||49===event.keyCode?key='1':'2'===event.key||50===event.keyCode?key='2':'3'===event.key||51===event.keyCode?key='3':'4'===event.key||52===event.keyCode?key='4':'5'===event.key||53===event.keyCode?key='5':'6'===event.key||54===event.keyCode?key='6':'7'===event.key||55===event.keyCode?key='7':'8'===event.key||56===event.keyCode?key='8':'9'!==event.key&&57!==event.keyCode||(key='9');
    if (key && (key === 'up' || key === 'down')) {
        var a = document.querySelector('.yohoho-active');
        console.log(key, a.dataset.event, a && a.dataset && a.dataset.event && parseInt(a.dataset.event));
        if (a && a.dataset && a.dataset.event && parseInt(a.dataset.event)) {
            var u = key === 'up'
                ? document.querySelector('[data-event="' + (parseInt(a.dataset.event)-1) + '"]:not([style*="display:none"]):not([style*="display: none"]')
                : document.querySelector('[data-event="' + (parseInt(a.dataset.event)+1) + '"]:not([style*="display:none"]):not([style*="display: none"]');
            if (!u && key === 'up') {
                var p = document.querySelector('[data-event="prev"]:not([style*="display:none"]):not([style*="display: none"]');
                if (p && typeof p.onclick === 'function') {
                    p.onclick.apply(p);
                }
            }
            else if (!u && key === 'down') {
                var n = document.querySelector('[data-event="next"]:not([style*="display:none"]):not([style*="display: none"]');
                if (n && typeof n.onclick === 'function') {
                    n.onclick.apply(n);
                }
            }
            else if (u && typeof u.onclick === 'function') {
                u.onclick.apply(u);
            }
        }
    }
    else if (key && key === 'fullscreen') {
        fullscreen();
    }
    else {
        var e = document.querySelectorAll('[data-event]:not([style*="display:none"]):not([style*="display: none"]');
        if (e && e.length) {
            for (var i = 0; i < e.length; i++) {
                if (key && e[i].dataset.event === key && typeof e[i].onclick === 'function') {
                    e[i].onclick.apply(e[i]);
                    return;
                }
            }
        }
    }
}

function ahoy_yo() {
    var a = document.querySelectorAll('[data-ahoy]');
    if (a && a.length) {
        for (var i in a) {
            if (a.hasOwnProperty(i) && a[i]) {
                a[i].addEventListener('click', function() {
                    yo(this.getAttribute('data-ahoy'));
                });
            }
        }
    }
    else {
        yo();
    }
}

function yo(sel) {
    var h, a, w, i, l, y, s, t = false, p = '';

    y = document.querySelector('#' + ((sel) ? sel : 'yohoho'));
    if (!y) {
        y = document.querySelector('#yohoho-online');
        if (!y) {
            y = document.querySelector('#yohoho-torrent');
            if (!y) {
                return false;
            }
            else {
                t = true;
            }
        }
    }

    var yohoho = document.createElement('div');
    var attr = Array.prototype.slice.call(y.attributes);
    while(a = attr.pop()) {yohoho.setAttribute(a.nodeName, a.nodeValue);}
    yohoho.innerHTML = y.innerHTML;
    y.parentNode.replaceChild(yohoho, y);

    var options = [].slice.call(yohoho.attributes).reduce(function (o, a) {
        return /^data-/.test(a.name) && (o[a.name.substr(5)] = decodeURIComponent(a.value)), o;
    }, {});

    if ((options.title && /трейлер|trailer|teaser/i.test(options.title)) || t) {
        options.player = 'trailer';
    }

    options.player = ((options.title && /трейлер|trailer|teaser/i.test(options.title)) || t)
        ? 'trailer'
        : (!options.player)
            ? 'moonwalk,hdgo,kodik,iframe,videocdn,trailer,torrent'
            : options.player;

    var bg = (options.bg && options.bg.replace(/[^0-9a-z]/ig, ''))
        ? options.bg.replace(/[^0-9a-z]/ig, '')
        : '2A3440';

    var language = (options.language && !/ru/i.test(options.language))
        ? {"trailer":"TRAILER","torrent":"DOWNLOAD","next":"NEXT","prev":"PREV"}
        : {"trailer":"ТРЕЙЛЕР","torrent":"СКАЧАТЬ","next":"ВПЕРЕД","prev":"НАЗАД"};

    var btns = {};
    options.button = (options.button)
        ? options.button
        : 'moonwalk: {Q} {T}, hdgo: {Q} {T}, kodik: {Q} {T}, iframe: {Q} {T}, videocdn: {Q} {T}';
    if (options.button) {
        options.button.split(',').forEach(function (button) {
            var btn = button.split(':');
            if (btn.length === 2 && btn[0] && btn[1]) {
                btns[btn[0].trim().toLowerCase()] = btn[1].trim();
            }
        });
    }
    options.button_limit = (options.button_limit && parseInt(options.button_limit) < 8)
        ? parseInt(options.button_limit)
        : 8;
    options.button_size = (options.button_size && parseFloat(options.button_size))
        ? parseFloat(options.button_size)
        : 1;
    options.separator = (options.separator)
        ? options.separator
        : ',';

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

    if (!options.kinopoisk && !options.title && !options.imdb && !options.tmdb) {
        return false;
    }

    if (options.tv) {
        document.addEventListener('keydown', ahoy_key);
    }

    var yohoho_loading = document.querySelector('#yohoho-loading');
    if (yohoho_loading) {
        yohoho_loading.parentNode.removeChild(yohoho_loading);
    }
    var yohoho_buttons = document.querySelector('#yohoho-buttons');
    if (yohoho_buttons) {
        yohoho_buttons.parentNode.removeChild(yohoho_buttons);
    }
    var yohoho_iframe = document.querySelector('#yohoho-iframe');
    if (yohoho_iframe) {
        yohoho_iframe.parentNode.removeChild(yohoho_iframe);
    }
    var data_ahoy = document.querySelectorAll('[data-ahoy]');
    for (var da in data_ahoy) {
        if (data_ahoy.hasOwnProperty(da) && data_ahoy[da]) {
            var yohoho_da = document.querySelector('#' + data_ahoy[da].getAttribute('data-ahoy'));
            if (yohoho_da) {
                yohoho_da.removeAttribute('style');
            }
        }
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var css = '#yohoho-loading{z-index:9999;position:absolute;left:0;top:0;width:100%;height:100%;background:#' + bg + ' url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpcmFsIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgY2xhc3M9ImJrIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU0LjUgODkuOWMtOS42IDAtMTguNi0zLjktMjUuNC0xMSAtNi44LTcuMS0xMC41LTE2LjYtMTAuNS0yNi43IDAtOC45IDMuMy0xNy4yIDkuMi0yMy41UzQxLjcgMTkgNTAuMiAxOWM4LjQgMCAxNi40IDMuNCAyMi4zIDkuNyA2IDYuMyA5LjIgMTQuNiA5LjIgMjMuNSAwIDE1LjgtMTIuMiAyOC43LTI3LjMgMjguNyAtMTUgMC0yNy4zLTEyLjktMjcuMy0yOC43IDAtMTMuMyAxMC4zLTI0LjIgMjMtMjQuMnMyMyAxMC44IDIzIDI0LjJjMCAxMC44LTguNCAxOS42LTE4LjcgMTkuNiAtMTAuMyAwLTE4LjctOC44LTE4LjctMTkuNiAwLTguMyA2LjUtMTUuMSAxNC40LTE1LjEgNy45IDAgMTQuNCA2LjggMTQuNCAxNS4xIDAgNS44LTQuNSAxMC42LTEwLjEgMTAuNnMtMTAuMS00LjgtMTAuMS0xMC42YzAtMy40IDIuNi02LjEgNS44LTYuMSAzLjIgMCA1LjggMi43IDUuOCA2LjEgMCAwLjktMC43IDEuNi0xLjUgMS42IC0wLjggMC0xLjUtMC43LTEuNS0xLjYgMC0xLjYtMS4zLTIuOS0yLjgtMi45IC0xLjUgMC0yLjggMS4zLTIuOCAyLjkgMCA0LjEgMy4yIDcuNCA3LjEgNy40czcuMS0zLjMgNy4xLTcuNGMwLTYuNi01LjEtMTItMTEuNC0xMiAtNi4zIDAtMTEuNCA1LjQtMTEuNCAxMiAwIDkuMSA3IDE2LjUgMTUuNyAxNi41IDguNiAwIDE1LjctNy40IDE1LjctMTYuNSAwLTExLjYtOS0yMS0yMC0yMXMtMjAgOS40LTIwIDIxYzAgMTQuMSAxMC45IDI1LjUgMjQuMyAyNS41czI0LjMtMTEuNCAyNC4zLTI1LjVjMC0xNi42LTEyLjgtMzAtMjguNi0zMCAtMTUuOCAwLTI4LjYgMTMuNS0yOC42IDMwIDAgOS4yIDMuNCAxNy45IDkuNiAyNC40IDYuMiA2LjUgMTQuNSAxMC4xIDIzLjIgMTAuMXMxNy0zLjYgMjMuMi0xMC4xYzYuMi02LjUgOS42LTE1LjIgOS42LTI0LjQgMC0xMC40LTMuOS0yMC4yLTEwLjktMjcuNiAtNy03LjQtMTYuMy0xMS40LTI2LjMtMTEuNHMtMTkuMyA0LjEtMjYuMyAxMS40UzEzIDQxLjggMTMgNTIuMmMwIDAuOS0wLjcgMS42LTEuNSAxLjZTMTAgNTMuMSAxMCA1Mi4yYzAtMTEuMyA0LjItMjEuOSAxMS44LTI5LjkgNy42LTggMTcuNy0xMi40IDI4LjQtMTIuNCAxMC43IDAgMjAuOCA0LjQgMjguNCAxMi40IDcuNiA4IDExLjggMTguNiAxMS44IDI5LjkgMCAxMC4xLTMuNyAxOS41LTEwLjUgMjYuN0M3My4xIDg2IDY0LjEgODkuOSA1NC41IDg5Ljl6IiBmaWxsPSIjZmZmIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA1MCA1MCIgdG89IjM2MCA1MCA1MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+PC9zdmc+) 50% 50% no-repeat}#yohoho-buttons{position:absolute;z-index:9999;right:0;top:50px;text-align:left}#yohoho-buttons:hover{right:0!important}#yohoho-buttons div{font-family:Verdana,sans-serif;font-weight:normal;text-shadow:none;line-height:normal;font-size:' + 12 * options.button_size + 'px;color:#fff;background:#' + bg + ';border-radius:5px 0 0 5px;padding:5px;margin:5px 0 5px 5px;opacity:.7;}#yohoho-buttons div:hover,#yohoho-buttons div.yohoho-active{color:#fff;background:#' + bg + ';cursor:pointer;opacity:1}';
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

    if (parseInt(yohoho.offsetHeight) && parseInt(yohoho.offsetHeight) < 370) {
        if (parseInt(yohoho.parentNode.offsetHeight) && parseInt(yohoho.parentNode.offsetHeight) >= 370) {
            h = parseInt(yohoho.parentNode.offsetHeight);
        }
        else {
            h = 370;
        }
    }
    else if (parseInt(yohoho.offsetHeight) && w/3 < parseInt(yohoho.offsetHeight)) {
        h = parseInt(yohoho.offsetHeight);
    }
    else if (parseInt(yohoho.parentNode.offsetHeight) && w/3 < parseInt(yohoho.parentNode.offsetHeight)) {
        h = parseInt(yohoho.parentNode.offsetHeight);
    }
    else {
        h = w/2;
    }

    var style = 'width:' + w + 'px;height:' + h + 'px;border:0;margin:0;padding:0;overflow:hidden;position:relative';
    i.setAttribute('style', style);
    i.setAttribute('width', w);
    i.setAttribute('height', h);
    yohoho.setAttribute('style', style);

    httpGetAsync('https://ahoy.yohoho.cc', p,
        function (players) {
            var first = true;
            var buttons = document.createElement('div');
            buttons.setAttribute('id', 'yohoho-buttons');
            var keys = options.player.split(options.separator);
            if (/\/\/|%2F%2F/i.test(options.player)) {
                var p = [];
                for (var k = 0; k < keys.length; k++) {
                    var re = keys[k].match(/^(.*?)(http.*|\/\/.*)$/i);
                    if (!re || !re[1] || !re[1].trim()) continue;
                    p.push(re[1].trim());
                }
                keys = p.length ? p : Object.keys(players);
            }
            var j = 0;
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i].toLowerCase().trim();
                if (players.hasOwnProperty(key) && players[key] && players[key].iframe) {
                    if (key === 'moonwalk') {
                        if (options.start_episode) {
                            var reg = options.start_episode.match(/^([a-z0-9]*?)\|([0-9]*?)\|([0-9]*?)$/i);
                            if (reg && reg.length === 4) {
                                players[key].iframe = players[key].iframe
                                    .replace(/serial\/([a-z0-9]*?)\//i, 'serial/' + reg[1] + '/');
                                players[key].iframe = (players[key].iframe.indexOf('?')+1)
                                    ? players[key].iframe + '&season=' + reg[2] + '&episode=' + reg[3]
                                    : players[key].iframe + '?season=' + reg[2] + '&episode=' + reg[3]
                            }
                        }
                        if (options.start_time) {
                            players[key].iframe = (players[key].iframe.indexOf('?')+1)
                                ? players[key].iframe + '&start_time=' + options.start_time
                                : players[key].iframe + '?start_time=' + options.start_time
                        }
                    }
                    players[key].quality = (players[key].quality)
                        ? players[key].quality.replace(/"/g, '\'')
                        : '';
                    players[key].translate = (players[key].translate)
                        ? players[key].translate.replace(/"/g, '\'')
                        : '';
                    var option = document.createElement('div');
                    option.setAttribute('onclick', 'showPlayer("' + encodeURIComponent(players[key].iframe) + '", "' + players[key].quality + '", "' + players[key].translate + '", this, "' + options.button_size + '")');
                    option.dataset.event = '' + (j+1);
                    option.dataset.page = Math.ceil((j+1)/options.button_limit) + '';
                    option.dataset.iframe = players[key].iframe;
                    option.dataset.quality = players[key].quality;
                    option.dataset.translate = players[key].translate;
                    if (btns.hasOwnProperty(key) && btns[key]) {
                        var q = (players[key].quality)
                            ? (players[key].quality.toUpperCase().search(/TS|TC|SCR|CAM/gi)+1)
                                ? 'ЭКРАН'
                                : (players[key].quality.toUpperCase().search(/720P/gi)+1)
                                    ? '720P'
                                    : (players[key].quality.toUpperCase().search(/1080P/gi)+1)
                                        ? '1080P'
                                        : players[key].quality
                                            .toUpperCase()
                                            .replace(/\s?ХОРОШЕЕ\s?|\s?СРЕДНЕЕ\s?|\s?ПЛОХОЕ\s?/gi, '')
                            : '';
                        var t = (players[key].translate)
                            ? (players[key].translate.toUpperCase().indexOf('ДУБЛ')+1)
                                ? 'ДУБЛЯЖ'
                                : (players[key].translate.toUpperCase().indexOf('ПРОФ')+1)
                                    ? 'ПРОФ.'
                                    : (players[key].translate.toUpperCase().indexOf('ЛЮБИТ')+1)
                                        ? 'ЛЮБИТ.'
                                        : (players[key].translate.toUpperCase().indexOf('АВТОР')+1)
                                            ? 'АВТОР.'
                                            : (players[key].translate.toUpperCase().indexOf('МНОГОГОЛ')+1)
                                                ? 'МНОГОГОЛ.'
                                                : (players[key].translate.toUpperCase().indexOf('ОДНОГОЛ')+1)
                                                    ? 'ОДНОГОЛ.'
                                                    : (players[key].translate.toUpperCase().indexOf('ДВУХГОЛ')+1)
                                                        ? 'ДВУХГОЛ.'
                                                        : (players[key].translate.toUpperCase().indexOf('ОРИГИНАЛ')+1)
                                                            ? 'ОРИГИНАЛ'
                                                            : players[key].translate.toUpperCase()
                            : '';
                        j++;
                        btns[key] = btns[key]
                            .replace('{N}', j)
                            .replace('{Q}', q)
                            .replace('{T}', t)
                            .replace(/\s+/g, ' ')
                            .replace(/(^\s*)|(\s*)$/g, '');
                        btns[key] = (btns[key]) ? btns[key] : key.toUpperCase();
                        option.innerText = j + '► ' + btns[key];
                    }
                    else if (key === 'trailer') {
                        j++;
                        option.innerText = j + '► ' + language.trailer.toUpperCase();
                    }
                    else if (key === 'torrent') {
                        j++;
                        option.innerText = j + '► ' + language.torrent.toUpperCase();
                    }
                    else {
                        j++;
                        option.innerText = j + '► ' + key.toUpperCase();
                    }
                    if (first) {
                        showPlayer(players[key].iframe, players[key].quality, players[key].translate, option, buttons, options.button_size);
                        first = false;
                    }
                    buttons.appendChild(option);
                    if (j && !(j % options.button_limit) && keys[i+1]) {
                        var next = document.createElement('div');
                        next.setAttribute('onclick', 'showPage(' + Math.ceil((j+1)/options.button_limit) + ');' + 'showPlayer("' + encodeURIComponent(players[keys[i+1].toLowerCase().trim()].iframe) + '", "' + players[keys[i+1].toLowerCase().trim()].quality + '", "' + players[keys[i+1].toLowerCase().trim()].translate + '", document.querySelector(\'[data-event="' + (j+1) + '"]\'), "' + options.button_size + '")');
                        next.dataset.event = 'next';
                        next.dataset.page = Math.ceil(j/options.button_limit) + '';
                        next.innerText = '-► ' + language.next;
                        buttons.appendChild(next);

                        var prev = document.createElement('div');
                        prev.setAttribute('onclick', 'showPage(' + Math.ceil(j/options.button_limit) + ');' + 'showPlayer("' + encodeURIComponent(players[keys[i-1].toLowerCase().trim()].iframe) + '", "' + players[keys[i-1].toLowerCase().trim()].quality + '", "' + players[keys[i-1].toLowerCase().trim()].translate + '", document.querySelector(\'[data-event="' + (j) + '"]\'), "' + options.button_size + '")');
                        prev.dataset.event = 'prev';
                        prev.dataset.page = Math.ceil((j+1)/options.button_limit) + '';
                        prev.innerText = '◄- ' + language.prev;
                        buttons.appendChild(prev);
                    }
                }
            }
            if (j < 1) {
                var yohohoLoading = document.querySelector('#yohoho-loading');
                yohohoLoading.style.display = 'none';
            }
            else if (j > 1) {
                yohoho.appendChild(buttons);
                if (keys.length > options.button_limit) {
                    showPage(1);
                }
            }
        });

}

function showPlayer(iframe, quality, translate, element, buttons, size) {
    window.parent.postMessage({"quality": quality, "translate": translate}, "*");
    var yohohoLoading = document.querySelector('#yohoho-loading');
    yohohoLoading.style.display = 'block';
    setTimeout(function () {
        yohohoLoading.style.display = 'none';
    }, 2000);
    var yohohoIframe = document.querySelector('#yohoho-iframe');
    yohohoIframe.style.display = 'block';
    if (iframe.indexOf('4h0y') + 1) {
        httpGetAsync(decodeURIComponent(iframe), '',function (json, html) {
            yohohoIframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
        });
    } else {
        yohohoIframe.setAttribute('src', decodeURIComponent(iframe));
    }
    yohohoIframe.setAttribute('class', '');
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
    size = size ? parseFloat(size) : 1;
    if (yohohoButtons) {
        yohohoButtons.style.right = '0';
        setTimeout(function () {
            var btn = setInterval(function () {
                if (parseInt(yohohoButtons.style.right) > -parseInt(yohohoButtons.offsetWidth)+(30*size))  {
                    yohohoButtons.style.right = (parseInt(yohohoButtons.style.right)-1) + 'px';
                }
                else {
                    clearInterval(btn);
                }
            }, 5);
        }, 5000);
    }
}

function showPage(page) {
    var yohohoPages = document.querySelectorAll('div[data-page]');
    if (yohohoPages) {
        for (var i = 0; i < yohohoPages.length; i++) {
            yohohoPages[i].style.display = 'none';
        }
    }
    var yohohoPage = document.querySelectorAll('div[data-page="' + page + '"]');
    if (yohohoPage) {
        for (var j = 0; j < yohohoPage.length; j++) {
            yohohoPage[j].style.display = 'block';
        }
    }
    var yohohoButtons = document.querySelector('#yohoho-buttons');
    if (yohohoButtons) {
        yohohoButtons.style.right = 0;
    }
}

function httpGetAsync(url, body, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(tryParseJSON(xmlHttp.responseText), xmlHttp.responseText);
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

function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var iframe = document.querySelector('#yohoho-iframe');
    if (!isInFullScreen) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullScreen) {
            iframe.webkitRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}