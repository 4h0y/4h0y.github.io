(function flashWord() {
    var seo = document.querySelector('.index-seo').innerText;
    var items = seo.split(' ');
    var i = 0;

    function run(item) {
        setTimeout(function () {
            document.querySelector('.index-seo').innerHTML = seo.replace(new RegExp(' ' + item + ' ', 'g'), ' <span style="color: #fff">' + item + '</span> ');
            i = getRandom(0, items.length - 1);
            run(items[i].replace(/[^A-Za-zА-Яа-яёЁ0-9]/gim, ''));
        }, 100);
    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    run(items[i]);
})();

(function countMovies() {
    var date = new Date();
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    var total = ((year-2014)*121680) + (month*10140) + (day * 338) + (hours * 14) + minutes + seconds;
    document.querySelector('#count').innerHTML = (total + '').replace(/([0-9]{3})([0-9]{3})/, '$1 $2');
    setInterval(function() {
        total += Math.floor(Math.random() * 3);
        document.querySelector('#count').innerHTML = (total + '').replace(/([0-9]{3})([0-9]{3})/, '$1 $2');
    },1000);
})();