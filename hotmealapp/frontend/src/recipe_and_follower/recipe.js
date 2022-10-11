var nameList = ['John', 'Sophia', 'Edward', 'Lion', 'Derk', 'Linda', 'Steren'];

var commentList = ['so delicious', 'rubbish', 'just so so', 'not specially'];
var favoriteNumber = 10;
var likeNumber = 10;
var folloingNumber = 100;
$(document).ready(
    function () {
        {
            window.onload = function () {
                init();
                initDetails();
                initComment();
            };

            function init() {


                document.getElementsByClassName("favoriteNumber")[0].innerHTML = "favorite: "+favoriteNumber;
                document.getElementsByClassName("likeNumber")[0].innerHTML = "like: "+likeNumber;
            }

            function initDetails() {
                var name = "Recipe Name: Steak";
                var description = "Recipe Description: Easy home make";

                document.getElementById("recipeName").innerHTML = name;
                document.getElementById("recipeDesciption").innerHTML = description;


                var details = "Ingredient Details<br/>Beef soup<br/>1.Beef mince<br/>2.Onion";
                var steps = "Steps<br/>1.cut<br/>2.stir";

                document.getElementsByClassName("detailRemark")[0].innerHTML = details;
                document.getElementsByClassName("detailRemark")[1].innerHTML = steps;


                

                document.getElementsByClassName("followperson")[0].innerHTML = "following person: "+folloingNumber;

            }

            function initComment() {
                for (var i = 0; i < nameList.length; i++) {
                    var contentIndex = Math.round(Math.random() * 3);
                    var obj = {
                        avatarUrl: "images/logo.png",
                        commentUserName: nameList[i],
                        commentContent: commentList[contentIndex],
                        commentTime: new Date().format("yyyy-MM-dd hh:mm:ss")
                    }

                    var commentContainer =
                        "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj.commentUserName + "</div><div class='commentContent'>" + obj.commentContent + "</div></div><div class='commentTime'>" + obj.commentTime + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;
                }
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

function logoJump() {
    alert("logoJump");
}

function CreateRecipe() {
    alert("CreateRecipe");
}

function logOut() {
    alert("logOut");
}



function addComment() {
    //获取评论内容
    var value = $("#currentComment").val();

    var currentName = Math.round(Math.random() * 6);

    var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss");

    var commentContainer =
        "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='images/logo.png' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + nameList[currentName] + "</div><div class='commentContent'>" + value + "</div></div><div class='commentTime'>" + currentDate + "</div></div>";

    document.getElementById("commentContainer").innerHTML += commentContainer;

    $("#currentComment").val("");
}