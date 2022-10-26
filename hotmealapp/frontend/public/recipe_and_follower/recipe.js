var currentUserName = 'Ryan';
var recipeDetail = {
    id: 2, //菜单ID
    recipeName: "Malatang",         //菜单名
    recipeOwnerName: "Katherine",   //菜单拥有者姓名
    recipeDetail: "Ingredient Details<br/>Beef soup<br/>1.Beef mince<br/>2.Onion",      //菜单详情
    recipeSteps: "Steps<br/>1.cut<br/>2.stir",  //菜单步骤
    recipeDescription: "Spicy", //菜单简介
    recipeFavoriteNumber: 0,    //最爱该菜单的人的统计数量
    recipeLikeNumber: 0,        //喜欢该菜单的人的统计数量
    recipeOwnerFollowerNumber: 0    //菜单拥有者的关注数量
}
$(document).ready(
    function () {
        {
            window.onload = function () {
                currentUserName = localStorage.getItem("username") ? localStorage.getItem("username") : 'Ryan';

                var domList = document.getElementsByClassName("currentUserName");
                for (let index = 0; index < domList.length; index++) {
                    const element = domList[index];
                    element.innerHTML = currentUserName;
                }

                init();
            };

            function init() {
                $.ajax({
                    url: "http://127.0.0.1:8080/recipe/showone",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_name': recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName }),
                    type: "POST",
                    success: function (data) {
                        initDetails();
                    },
                    error: function (data) {
                        initDetails();
                    }
                })
            }

            function getfollowingnum() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/getfollowingnum",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'username': recipeDetail.recipeOwnerName }),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            recipeDetail.recipeOwnerFollowerNumber = data.following_num;
                        }
                        getLikeNumber();
                    },
                    error: function (data) {
                    }
                })
            }

            function getLikeNumber() {
                $.ajax({
                    url: "http://127.0.0.1:8080/recipe/getlikenum",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_name': recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName }),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            recipeDetail.recipeLikeNumber = data.re_like_num;
                        }
                        getFavoriteNumber();
                    },
                    error: function (data) {
                    }
                })
            }

            function getFavoriteNumber() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/getfavrecipenum",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'username': recipeDetail.recipeOwnerName }),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            recipeDetail.recipeFavoriteNumber = data.fav_num;
                            initComment();
                        }
                    },
                    error: function (data) {
                    }
                })
            }

            function initDetails() {
                getfollowingnum();

                document.getElementsByClassName("recipeOwnerName")[0].innerHTML = recipeDetail.recipeOwnerName;
                document.getElementsByClassName("favoriteNumber")[0].innerHTML = recipeDetail.recipeFavoriteNumber;
                document.getElementsByClassName("followperson")[0].innerHTML = recipeDetail.recipeOwnerFollowerNumber;
                document.getElementsByClassName("likeNumber")[0].innerHTML = recipeDetail.recipeLikeNumber;

                document.getElementById("recipeName").innerHTML = recipeDetail.recipeName;
                document.getElementById("recipeDesciption").innerHTML = recipeDetail.recipeDescription;

                document.getElementsByClassName("detailRemark")[0].innerHTML = recipeDetail.recipeDetail;
                document.getElementsByClassName("detailRemark")[1].innerHTML = recipeDetail.recipeSteps;


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
    $.ajax({
        url: "http://127.0.0.1:8080/user/likerecipe",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_name':  recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName}),
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
function favplus() {
    $.ajax({
        url: "http://127.0.0.1:8080/user/favrecipe",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_name': recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName }),
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
function followplus() {
    $.ajax({
        url: "http://127.0.0.1:8080/user/follow",
        contentType: 'application/json',
        data: JSON.stringify({ 'from_username': currentUserName, 'to_username': recipeDetail.recipeOwnerName }),
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
function addComment() {
    var value = $("#currentComment").val();

    $.ajax({
        url: "http://127.0.0.1:8080/comment/add",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_username': recipeDetail.recipeOwnerName, 'recipe_name': recipeDetail.recipeName, 'content': value }),
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
        data: JSON.stringify({ 'recipe_name': recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName }),
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