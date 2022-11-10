var currentUserName = 'Ryan';

$(document).ready(
    function () {
        {
            window.onload = function () {
                currentUserName = localStorage.getItem("username") ? localStorage.getItem("username") : 'Ryan';

                document.getElementsByClassName("currentUserName")[0].innerHTML = currentUserName;

                setTimeout(function () {
                    //利用延时器，在获取完毕数据后，延迟2秒去加载dom对象
                    init();
                }, 300)

            };

            function init() {

                $.ajax({
                    url: "http://127.0.0.1:8080/user/getfollowinglist",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'username': currentUserName }),
                    type: "POST",
                    success: function (data) {
                        if (data.status === "success") {
                            for (var i = 0; i < data.following_list.length; i++) {
                                let obj = data.following_list[i];
                                obj.avatarUrl = "images/logo.png";

                                var commentContainer =
                                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.user_photo + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'><a href='viewpersonalpage/" + obj.following_username + "'>" + obj.following_username + "</a></div></div><div class='commentTime'>" + obj.time + "</div></div>";

                                document.getElementById("commentContainer").innerHTML += commentContainer;
                            }
                        }

                    },
                    error: function (data) {
                    }

                })
            }
        }
    }
)

Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};