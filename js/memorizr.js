$(function () {


    var prices = {
        "1": {
            "name": "Gorra",
            "clicks": "5"
        },
        "2": {
            "name": "Libreta",
            "clicks": "10"
        },
        "3": {
            "name": "Cartuchera",
            "clicks": "15"
        },
        "4": {
            "name": "Pelota",
            "clicks": "20"
        },
        "5": {
            "name": "Esfero",
            "clicks": "25"
        },
        "6": {
            "name": "Resaltador",
            "clicks": "60"
        }
    };

    var imgUrls = ["img/uno.png", "img/dos.png", "img/tres.png", "img/cuatro.png", "img/cinco.png", "img/seis.png", "img/siete.png", "img/ocho.png", "img/nueve.png", "img/diez.png", "img/once.png", "img/doce.png", "img/uno.png", "img/dos.png", "img/tres.png", "img/cuatro.png", "img/cinco.png", "img/seis.png", "img/siete.png", "img/ocho.png", "img/nueve.png", "img/diez.png", "img/once.png", "img/doce.png"];

    var imgUrlsArr = imgUrls;
    imgUrlsArr = shuffleArray(imgUrlsArr);

    // append images 
    for (i = 0; i < imgUrls.length; i++) {
        $(".items").append(
            "<div class='container'><div class='front'>" + imgUrls[i] + "</div><div class='back'><img class='image' src=' " + imgUrls[i] + "'/></div></div>"
        );
    };

    var first,
        second;

    var total_clicks = 0;
    var count = 0;

    function checkLevel() {
        if (total_clicks === 10) {
            $(".first-svg").removeClass("level");
        } else if (total_clicks === 15) {
            $(".second-svg").removeClass("level");
        } else if (total_clicks === 20) {
            $(".third-svg").removeClass("level");
        }
    }

    function gameOver() {
        if ($(".matched").length === 48) {

            for (var key in prices) {
                if (prices[key].clicks >= total_clicks) {
                    var prize = prices[key].name;
                    break;

                }
            }

            setTimeout(function () {
                alert("Felicidades, haz ganado: " + prize + "!!!\n Total de clicks: " + total_clicks)
            }, 1200);

            setTimeout(function () {
                location.reload();
            }, 1800);

        }
    }


    // for mozilla issue, make opacity 0 as default
    $('.image').addClass('noOpacity');

    $(".front").click(function (e) {

        // for mozilla issue, play opacity of .image
        var self = this;
        setTimeout(function () {
            $(self).next('.back').find('.image').addClass('yesOpacity');
        }, 300);

        count++;

        // prevent fast click
        if ($(e.target).data('oneclicked') != 'yes') {
            $(e.target).css("pointer-events", "none")
            setTimeout(function () {
                $(e.target).css("pointer-events", "auto")
            }, 400);
        }


        if (count === 1) {

            $(this, ".front").addClass("showBack-front").addClass("clicked");
            $(this).next('.back').addClass("showBack-back").addClass("clicked");

            first = $(this, ".front").text();

        } else {

            $(this, ".front").addClass("showBack-front").addClass("clicked");;
            $(this).next('.back').addClass("showBack-back").addClass("clicked");;

            second = $(this, ".front").text();
            count = 0;

            $(".front").css("pointer-events", "none");

            setTimeout(function () {

                if (first === second) {

                    total_clicks = total_clicks - 1;

                    $('.clicked').addClass('animated tada matched no-pointer-events');

                    // check if game is over
                    gameOver();

                } else {

                    $(".front").removeClass("showBack-front");
                    $(".back").removeClass("showBack-back");

                    $('.clicked').addClass('animated shake');

                    setTimeout(function () {
                        $(".clicked").removeClass("clicked shake");

                        // for mozilla issue, play opacity of .image
                        $('.image').not('section .matched').removeClass('yesOpacity');
                        $('.image').not('section .matched').addClass('noOpacity');

                    }, 500);

                }

                $(".front").css("pointer-events", "auto");

                total_clicks++;
                $(".total_clicks span").text(total_clicks);
                checkLevel();

            }, 525);

        }

        return false;
    });


    // shuffle array
    function shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

});