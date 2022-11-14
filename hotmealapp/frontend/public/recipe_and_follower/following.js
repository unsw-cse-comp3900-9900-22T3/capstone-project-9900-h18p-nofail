var currentUserName = 'Ryan';

$(document).ready(
    function () {
        {
            window.onload = function () {
                currentUserName = localStorage.getItem("username") ? localStorage.getItem("username") : 'Ryan';

                document.getElementsByClassName("currentUserName")[0].innerHTML = currentUserName;
                document.getElementById("curr").href = 'http://localhost:3000/personalpage/' + currentUserName;
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
                                obj.time=changetime(obj.time);
                                var commentContainer =
                                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.user_photo + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'><a href='http://localhost:3000/viewpersonalpage/" + obj.following_username + "'>" + obj.following_username + "</a></div></div><div class='commentTime'>" + obj.time + "</div></div>";

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

function changetime(currenttime) {
    //console.log("type is "+typeof currenttime);
    pastaday = 0;
    pastamonth = 0;
    //console.log(currenttime);
    timelist = currenttime.split(' ');
    //console.log(timelist[1]);
    exacttimelist = timelist[4].split(':')
    //console.log('hour is '+typeof int(exacttimelist[0]));
    hour = parseInt(exacttimelist[0]) + 11;
    //console.log('hour is '+hour);
    if (hour >= 24) {
        pastaday = 1;
        hour -= 24;
    }
    hour = hour.toString();
    newtime = hour + ':' + exacttimelist[1] + ':' + exacttimelist[2];

    //console.log(newtime);
    //console.log(timelist[-1]);
    timezone = timelist[5] + '+11';
    if (pastaday == 1) {
        if (timelist[0].split(',')[0] == 'Mon') {
            timelist[0] = 'Tue,';

        }
        if (timelist[0].split(',')[0] == 'Tue') {
            timelist[0] = 'Wed,';

        }
        if (timelist[0].split(',')[0] == 'Wed') {
            timelist[0] = 'Thu,';

        }
        if (timelist[0].split(',')[0] == 'Thu') {
            timelist[0] = 'Fri,';

        }
        if (timelist[0].split(',')[0] == 'Fri') {
            timelist[0] = 'Sat,';

        }
        if (timelist[0].split(',')[0] == 'Sat') {
            timelist[0] = 'Sun,';

        }
        if (timelist[0].split(',')[0] == 'Sun') {
            timelist[0] = 'Mon,';

        }
        //console.log('new time is '+timelist[0]);
        day = parseInt(timelist[1]);
        if (day < 31) {
            day += 1;
            if (day <= 10) {
                timelist[1] = '0' + day.toString();
            }
            else {
                timelist[1] = day.toString();
            }

        }
        else {
            pastamonth = 1;
            day = 1;
            timelist[1] = '0' + day.toString();
        }
    }
    if (pastamonth == 1) {
        timelist[2] = 'Nov';
    }
    //console.log('new day is '+timelist[1]);
    finaltime = timelist[0] + ' ' + timelist[1] + ' ' + timelist[2] + ' ' + timelist[3] + ' ' + newtime;
    //console.log('finaltime time is '+ finaltime);
    return finaltime;


}
