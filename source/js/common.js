function dateFormat(date, format) {
    if (format === undefined) {
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

$(function () {
    // Set background image, read from Bing.com and uses yql to make cors
    (function (target, callback) {
        var today = dateFormat(new Date(), 'yyyy-MM-dd');
        today = today.replace(new RegExp('-', 'g'), '');

        if (localStorage) {
            var startDate = localStorage.getItem("start_time");
            var endDate = localStorage.getItem("end_time");
            if (startDate == today || endDate == today) {
                var imageUrl = localStorage.getItem("image_url");
                if (imageUrl) {
                    $.backstretch(imageUrl);
                    return;
                }
            }
        }

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
    })("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", function (data) {
        var json = JSON.parse(data);
        var images = json.images;
        if (!images || images.length == 0) {
            console.log("Oops! No Image.");
            return
        }

        var image = images[0];
        var imageUrl = "https://www.bing.com" + image.url;
        var startTime = image.startdate;
        var endTime = image.enddate;

        if (localStorage) {
            localStorage.setItem("start_time", startTime);
            localStorage.setItem("end_time", endTime);
            localStorage.setItem("image_url", imageUrl);
        }
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
