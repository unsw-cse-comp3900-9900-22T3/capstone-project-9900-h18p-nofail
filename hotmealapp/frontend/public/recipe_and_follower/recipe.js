var nameList = ['Ryan', 'Ryan', 'Ryan', 'Ryan', 'Ryan', 'Ryan', 'Ryan'];
var likeflag = 0;
var favflag = 0;
var followflag = 0;
var commentList = ['so delicious', 'rubbish', 'just so so', 'not specially'];
var favoriteNumber = 10;
var likeNumber = 10;
var folloingNumber = 100;
var currentUserName = 'Ryan';
$(document).ready(
    function () {
        {
            window.onload = function () {
                currentUserName = localStorage.getItem("token") ? localStorage.getItem("token") : 'Ryan';


                init();
                initDetails();
                initComment();
            };

            function init() {

                // $.ajax({
                //     url: "http://127.0.0.1:8080/user/getfollower",
                //     contentType: 'application/json',
                //     data: JSON.stringify({ 'username': currentUserName }),
                //     type: "POST",
                //     success: function (data) {

                //     },
                //     error: function (data) {
                //     }

                // })

                document.getElementsByClassName("favoriteNumber")[0].innerHTML = "favorite: " + favoriteNumber;
                document.getElementsByClassName("likeNumber")[0].innerHTML = "like: " + likeNumber;
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




                document.getElementsByClassName("followperson")[0].innerHTML = "following person: " + folloingNumber;

            }

            function initComment() {

                $.ajax({
                    url: "http://127.0.0.1:8080/recipe/showcomment",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_name': 'Malatang', 'recipe_username': 'Katherine' }),
                    type: "POST",
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            let obj = data[i];
                            obj.avatarUrl = "images/logo.png";

                            var commentContainer =
                                "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj[1] + "</div><div class='commentContent'>" + obj[4] + "</div></div><div class='commentTime'>" + obj[5] + "</div></div>";

                            document.getElementById("commentContainer").innerHTML += commentContainer;
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

function logoJump() {
    window.location.href = 'https://wenqingbucket2.s3.ap-southeast-2.amazonaws.com/homepage/index.html';
}

function CreateRecipe() {
    window.location.href = 'http://localhost:3000/createrecipe';

}

function logOut() {
    window.location.href = 'http://localhost:3000/login';
}

function likeplus() {
    if (likeflag == 0) {
        $.ajax({
            url: "http://127.0.0.1:8080/user/like",
            contentType: 'application/json',
            data: JSON.stringify({ 'username': currentUserName, 'recipe_name': 'Katherine', 'follow_username': 'kk' }),
            type: "POST",
            success: function (data) {
                if (data.status === "success") {
                    alert(data.message);
                }
            },
            error: function (data) {
                alert("follow failed!")
            }

        })
    }
    else {
        alert("you already liked this recipe")
    }
}
function favplus() {
    if (favflag == 0) {
        $.ajax({
            url: "http://127.0.0.1:8080/user/favrecipe",
            contentType: 'application/json',
            data: JSON.stringify({ 'username': currentUserName, 'recipe_name': 'Katherine', 'follow_username': 'kk' }),
            type: "POST",
            success: function (data) {
                if (data.status === "success") {
                    alert(data.message);
                }
            },
            error: function (data) {
                alert("follow failed!")
            }

        })
    }
    else {
        alert("you already favorited this recipe")
    }
}
function followplus() {
    if (followflag == 0) {
        $.ajax({
            url: "http://127.0.0.1:8080/user/follow",
            contentType: 'application/json',
            data: JSON.stringify({ 'username': currentUserName, 'follow_username': 'kk' }),
            type: "POST",
            success: function (data) {
                if (data.status === "success") {
                    alert(data.message);
                }
            },
            error: function (data) {
                alert("follow failed!")
            }

        })
    }
    else {
        alert("you already followed this recipe")
    }
}
function addComment() {
    var value = $("#currentComment").val();

    $.ajax({
        url: "http://127.0.0.1:8080/comment/recipe",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_username': 'Katherine', 'recipe_name': 'Malatang', 'content': value }),
        type: "POST",
        success: function (data) {
            if (data.status === "success") {
                alert(data.message);
                setTimeout(
                    getCommentList(), 500)
            }
        },
        error: function (data) {
            alert("comment failed!")
        }
    })

    $("#currentComment").val("");

}


function getCommentList() {
    document.getElementById("commentContainer").innerHTML = "";
    $.ajax({
        url: "http://127.0.0.1:8080/recipe/showcomment",
        contentType: 'application/json',
        data: JSON.stringify({ 'recipe_name': 'Malatang', 'recipe_username': 'Katherine' }),
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                let obj = data[i];
                obj.avatarUrl = "images/logo.png";

                var commentContainer =
                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj[1] + "</div><div class='commentContent'>" + obj[4] + "</div></div><div class='commentTime'>" + obj[5] + "</div></div>";

                document.getElementById("commentContainer").innerHTML += commentContainer;
            }
        },
        error: function (data) {
        }

    })


}