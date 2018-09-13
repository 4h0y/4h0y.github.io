document.addEventListener('DOMContentLoaded', ahoy_yo);

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
    var h, w, i, l, s, t = false, p = '';

    var yohoho = document.querySelector('#' + ((sel) ? sel : 'yohoho'));
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
        return /^data-/.test(a.name) && (o[a.name.substr(5)] = decodeURIComponent(a.value)), o;
    }, {});

    if (options.title && options.title.indexOf('трейлер')+1 || t) {
        options.player = 'trailer';
    }

    options.player = (options.title && options.title.indexOf('трейлер')+1 || t)
        ? 'trailer'
        : (!options.player)
            ? 'moonwalk,hdgo,iframe,hdbaza,kodik,trailer,torrent'
            : options.player;

    var bg = (options.bg && options.bg.replace(/[^0-9a-z]/ig, ''))
        ? options.bg.replace(/[^0-9a-z]/ig, '')
        : '2A3440';

    var btns = {};
    options.button = (options.button)
        ? options.button
        : 'moonwalk: {Q} {T}, hdgo: {Q} {T}, hdbaza: {Q} {T}, kodik: {Q} {T}, iframe: {Q} {T}';
    if (options.button) {
        options.button.split(',').forEach(function (button) {
            var btn = button.split(':');
            if (btn.length === 2 && btn[0] && btn[1]) {
                btns[btn[0].trim().toLowerCase()] = btn[1].trim();
            }
        });
    }

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
    var css = '#yohoho-loading{z-index:9999;position:absolute;left:0;top:0;width:100%;height:100%;background:#' + bg + ' url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpcmFsIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgY2xhc3M9ImJrIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU0LjUgODkuOWMtOS42IDAtMTguNi0zLjktMjUuNC0xMSAtNi44LTcuMS0xMC41LTE2LjYtMTAuNS0yNi43IDAtOC45IDMuMy0xNy4yIDkuMi0yMy41UzQxLjcgMTkgNTAuMiAxOWM4LjQgMCAxNi40IDMuNCAyMi4zIDkuNyA2IDYuMyA5LjIgMTQuNiA5LjIgMjMuNSAwIDE1LjgtMTIuMiAyOC43LTI3LjMgMjguNyAtMTUgMC0yNy4zLTEyLjktMjcuMy0yOC43IDAtMTMuMyAxMC4zLTI0LjIgMjMtMjQuMnMyMyAxMC44IDIzIDI0LjJjMCAxMC44LTguNCAxOS42LTE4LjcgMTkuNiAtMTAuMyAwLTE4LjctOC44LTE4LjctMTkuNiAwLTguMyA2LjUtMTUuMSAxNC40LTE1LjEgNy45IDAgMTQuNCA2LjggMTQuNCAxNS4xIDAgNS44LTQuNSAxMC42LTEwLjEgMTAuNnMtMTAuMS00LjgtMTAuMS0xMC42YzAtMy40IDIuNi02LjEgNS44LTYuMSAzLjIgMCA1LjggMi43IDUuOCA2LjEgMCAwLjktMC43IDEuNi0xLjUgMS42IC0wLjggMC0xLjUtMC43LTEuNS0xLjYgMC0xLjYtMS4zLTIuOS0yLjgtMi45IC0xLjUgMC0yLjggMS4zLTIuOCAyLjkgMCA0LjEgMy4yIDcuNCA3LjEgNy40czcuMS0zLjMgNy4xLTcuNGMwLTYuNi01LjEtMTItMTEuNC0xMiAtNi4zIDAtMTEuNCA1LjQtMTEuNCAxMiAwIDkuMSA3IDE2LjUgMTUuNyAxNi41IDguNiAwIDE1LjctNy40IDE1LjctMTYuNSAwLTExLjYtOS0yMS0yMC0yMXMtMjAgOS40LTIwIDIxYzAgMTQuMSAxMC45IDI1LjUgMjQuMyAyNS41czI0LjMtMTEuNCAyNC4zLTI1LjVjMC0xNi42LTEyLjgtMzAtMjguNi0zMCAtMTUuOCAwLTI4LjYgMTMuNS0yOC42IDMwIDAgOS4yIDMuNCAxNy45IDkuNiAyNC40IDYuMiA2LjUgMTQuNSAxMC4xIDIzLjIgMTAuMXMxNy0zLjYgMjMuMi0xMC4xYzYuMi02LjUgOS42LTE1LjIgOS42LTI0LjQgMC0xMC40LTMuOS0yMC4yLTEwLjktMjcuNiAtNy03LjQtMTYuMy0xMS40LTI2LjMtMTEuNHMtMTkuMyA0LjEtMjYuMyAxMS40UzEzIDQxLjggMTMgNTIuMmMwIDAuOS0wLjcgMS42LTEuNSAxLjZTMTAgNTMuMSAxMCA1Mi4yYzAtMTEuMyA0LjItMjEuOSAxMS44LTI5LjkgNy42LTggMTcuNy0xMi40IDI4LjQtMTIuNCAxMC43IDAgMjAuOCA0LjQgMjguNCAxMi40IDcuNiA4IDExLjggMTguNiAxMS44IDI5LjkgMCAxMC4xLTMuNyAxOS41LTEwLjUgMjYuN0M3My4xIDg2IDY0LjEgODkuOSA1NC41IDg5Ljl6IiBmaWxsPSIjZmZmIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA1MCA1MCIgdG89IjM2MCA1MCA1MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+PC9zdmc+) 50% 50% no-repeat}#yohoho-buttons{position:absolute;z-index:9999;right:0;top:50px;text-align:left}#yohoho-buttons:hover{right:0!important}#yohoho-buttons div{font-family:Verdana,sans-serif;font-weight:normal;text-shadow:none;line-height:normal;font-size:12px;color:#fff;background:#' + bg + ';border-radius:5px 0 0 5px;padding:5px;margin:5px 0 5px 5px;opacity:.7;}#yohoho-buttons div:hover,#yohoho-buttons div.yohoho-active{color:#fff;background:#' + bg + ';cursor:pointer;opacity:1}';
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

    httpGetAsync('https://4h0y.yohoho.cc', p,
        function (players) {
            var first = true;
            var buttons = document.createElement('div');
            buttons.setAttribute('id', 'yohoho-buttons');
            var keys = options.player.split(',');
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
                    option.setAttribute('onclick', 'showPlayer("' + players[key].iframe + '", "' + players[key].quality + '", "' + players[key].translate + '", this)');
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
                        option.innerText = j + '► ТРЕЙЛЕР';
                    }
                    else if (key === 'torrent') {
                        j++;
                        option.innerText = j + '► СКАЧАТЬ';
                    }
                    else {
                        j++;
                        option.innerText = j + '► ' + key.toUpperCase();
                    }
                    if (first) {
                        showPlayer(players[key].iframe, players[key].quality, players[key].translate, option, buttons);
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
                yohoho.appendChild(buttons);
            }
        });

}

function showPlayer(iframe, quality, translate, element, buttons) {
    window.parent.postMessage({"quality": quality, "translate": translate}, "*");
    var yohohoLoading = document.querySelector('#yohoho-loading');
    yohohoLoading.style.display = 'block';
    setTimeout(function () {
        yohohoLoading.style.display = 'none';
    }, 2000);
    var yohohoIframe = document.querySelector('#yohoho-iframe');
    yohohoIframe.style.display = 'block';
    yohohoIframe.setAttribute('src', iframe);
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
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
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