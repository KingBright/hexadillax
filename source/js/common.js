var cors = function (target, callback) {
    $.getJSON("http://query.yahooapis.com/v1/public/yql?" +
        "q=select * from html where url='" +
        encodeURIComponent(target) +
        "'&callback=?", function (response) {
        var data = response;
        if (data.results) {
            data = data.results[0];
            if (data) {
                data = data.replace(/<\/?[^>]*>/g, '');
                data = data.replace(/[ | ]*\n/g, '\n');
                data = data.replace(/&nbsp;/ig, '');
            }
        }
        callback && callback(data);
    })
}
$(function () {
    cors("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", function (data) {
        var json = JSON.parse(data);
        var images = json.images;
        if (!images || images.length == 0) {
            console.log("Oops! No Image.");
            return
        }

        var image = images[0];
        var imageUrl = "https://www.bing.com" + image.url;
        var time = image.fullstartdate;

        if (localStorage) {
            var lastUpdateTime = localStorage.getItem("update_time");
            var lastImageUrl = localStorage.getItem("image_url");
            if (lastUpdateTime == time && lastImageUrl == imageUrl) {
                $.backstretch(imageUrl);
                return;
            }

            localStorage.setItem("update_time", time);
            localStorage.setItem("image_url", imageUrl);
        }

        console.log(imageUrl)

        $.backstretch(imageUrl);
    });

    $("nav[role=banner]").headroom({
        offset: 10,
        onNotTop: function () {
            $("nav[role=banner]").stop().animate({top: "-50px"});
        },
        onTop: function () {
            $("nav[role=banner]").stop().animate({top: "0"});
        },
        onPin: function () {
            $("nav[role=banner]").stop().animate({top: "0"});
        },
        onUnpin: function () {
            $("nav[role=banner]").stop().animate({top: "-50px"});
        }
    });

    $(".post-body p").each(function () {
        if ($(this).find("img").length) {
            $(this).css("text-align", "center");
        }
    });

    $(".post-body img").addClass("img-thumbnail img-responsive");
});
