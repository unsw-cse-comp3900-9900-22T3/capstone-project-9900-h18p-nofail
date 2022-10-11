var nameList = ['John', 'Sophia', 'Edward', 'Lion', 'Derk', 'Linda', 'Steren'];

var commentList = ['so delicious', 'rubbish', 'just so so', 'not specially'];

$(document).ready(
    function () {
        {
            window.onload = function () {
                init();
                
            };

            function init() {
                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;

                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;

                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;

                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;

                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;

                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;
                     
                    var value = Math.round(Math.random() * 3);;

                    var currentName = Math.round(Math.random() * 6);

                    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

                    var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + commentList[value] + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;
  

  
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