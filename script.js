$(function () {
    const $link = $(".nav ul a");
    const textArea = $('.main .area-text');
    const home = $('.nav ul li a#home');
    let jsonData;
    $link.on('click', function (evt) {
        evt.preventDefault();
        let url = this.href;
        $link.removeClass('active');
        $(this).addClass('active');
        $('.container .text p').fadeOut(500);
        textArea.load(url + ' #content').hide().fadeIn(1000);
    });

    function loadJson() {
        $.getJSON('outline.json').done(function (data) {
            jsonData = data;
        }).fail(function () {
            $('.container .text p').fadeIn(1000).html("Sorry, We are down at the moment !");
        })
    };
    loadJson();

    textArea.on('click', '.content ul li a', function (evt) {
        evt.preventDefault();
        $('.content ul li a').removeClass('current');
        $(this).addClass('current');
        let loc = this.id.toUpperCase();
        let jsonLoc = jsonData[loc];

        let newContent;
        for (let i = 0; i < jsonLoc.length; i++) {
            newContent += '<h1>' + jsonLoc[i].header + '</h1>';
            newContent += '<p>' + jsonLoc[i].para + '</p>';
        }

        $('.content .details').hide().fadeIn(500).html('<section>' + newContent + '</section>');
        document.querySelector('.details section').firstChild.remove();
    });
});