var nameList = ['John', 'Sophia', 'Edward', 'Lion', 'Derk', 'Linda', 'Steren'];

var commentList = ['Im a bot', 'Im a bot', 'Im a bot', 'Im a bot'];

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
  

                    // $.ajax({
                    //     url: "http://127.0.0.1:8080/user/getfollower",
                    //     contentType: 'application/json',
                    //     data: JSON.stringify({ 'username': 'Katherine' }),
                    //     type: "POST",
                    //     success: function (data) {
                    //         for (var i = 0; i < data.length; i++) {
                    //             let obj = data[i];
                    //             obj.avatarUrl = "images/logo.png";
    
                    //             var commentContainer =
                    //                 "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj[1] + "</div><div class='commentContent'>" + obj[4] + "</div></div><div class='commentTime'>" + obj[5] + "</div></div>";
    
                    //             document.getElementById("commentContainer").innerHTML += commentContainer;
                    //         }
                    //     },
                    //     error: function (data) {
                    //     }
    
                    // })
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