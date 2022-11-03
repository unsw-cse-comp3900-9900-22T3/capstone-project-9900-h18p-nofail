var favorited=0;
var liked=0;
var followed=0;
var currentUserName = 'Ryan';
var recipeDetail = {
    id: 0, //菜单ID
    recipeAvatar: "",   //菜谱图片
    recipeName: "",         //菜单名
    recipeOwnerName: "",   //菜单拥有者姓名
    recipeDetail: "",      //菜单详情
    recipeSteps: "",  //菜单步骤
    recipeDescription: "", //菜单简介
    recipeFavoriteNumber: 0,    //最爱该菜单的人的统计数量
    recipeLikeNumber: 0,        //喜欢该菜单的人的统计数量
    recipeOwnerFollowerNumber: 0    //菜单拥有者的关注数量
}
$(document).ready(
    function () {
        {
            window.onload = function () {
                currentUserName = localStorage.getItem("username") ? localStorage.getItem("username") : 'Ryan';

                recipeDetail.id = GetQueryString("receipId");

                console.log(recipeDetail)

                var domList = document.getElementsByClassName("currentUserName");
                for (let index = 0; index < domList.length; index++) {
                    const element = domList[index];
                    element.innerHTML = currentUserName;
                }

                init();
            };


            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }


            function init() {
                $.ajax({
                    url: "http://127.0.0.1:8080/recipe/showone/byid",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_id': recipeDetail.id }),
                    type: "POST",
                    success: function (data) {
                        //
                        console.log("sdadsawda")
                        console.log(data)
                        if (data.status === "success") {
                            recipeDetail.recipeName = data.recipe.recipe_name;
                            recipeDetail.recipeOwnerName = data.recipe.recipe_username;
                            console.log(recipeDetail.recipeName)
                            console.log(typeof data.recipe.ingredient_previous);
                            recipeDetail.recipeDetail = "Ingredient : <br/>"+data.recipe.ingredient_previous.split(';').join('<br/>');
                            //recipeDetail.recipeDetail = "Ingredient : <br/>"+data.recipe.ingredient.Others.toString()+"<br/>"+data.recipe.ingredient.vegetable.toString();
                            //recipeDetail.recipeDetail = "Ingredient : <br/>";
                            recipeDetail.recipeSteps = "Steps : <br/>"+data.recipe.steps_previous.split(',').join('<br/>');
                            //recipeDetail.recipeSteps = "Steps :";
                            //recipeDetail.recipeSteps = "Steps : <br/>"+data.recipe.steps;
                            recipeDetail.recipeDescription = data.recipe.description;
                            recipeDetail.recipeLikeNumber = data.recipe.like_num;
                            getfollowingnum();
                        }
                    },
                    error: function (data) {
                        getfollowingnum();
                    }
                })
            }
            function ingredient(name){
                name.replaceAll(";", "<br/>");
                name="Ingredient : <br/>"+name;

            }
            function getfollowingnum() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/getfollowernum",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'username': recipeDetail.recipeOwnerName }),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            recipeDetail.recipeOwnerFollowerNumber = data.follower_num;
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
                    data: JSON.stringify({ 'recipe_id': recipeDetail.id }),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            recipeDetail.recipeFavoriteNumber = data.fav_num;
                        }
                        checkfaved();
                    },
                    error: function (data) {
                        initDetails();
                    }
                })
            }
            function checkfaved() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/checkfav",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_id': recipeDetail.id ,'username': currentUserName}),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            favorited=1;
                            if (favorited==1) {
                               document.getElementById("fav").innerHTML = 'You favorited'; 
                            }
                        }
                        checkliked();
                       // initDetails();
                    },
                    error: function (data) {
                        document.getElementById("fav").innerHTML = 'favorited';
                        initDetails();
                    }
                })
            }
            function checkliked() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/checkfav",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_id': recipeDetail.id ,'username': currentUserName}),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            liked=1;
                            if (liked==1) {
                               document.getElementById("like").innerHTML = 'You liked'; 
                            }
                        }
                        checkfollowed();
                       // initDetails();
                    },
                    error: function (data) {
                        document.getElementById("like").innerHTML = 'like';
                        initDetails();
                    }
                })
            }
            function checkfollowed() {
                $.ajax({
                    url: "http://127.0.0.1:8080/user/checkfollowerstatus",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'self_username': recipeDetail.recipeOwnerName ,'query_username': currentUserName}),
                    type: "POST",
                    success: function (data) {
                        if (data.status == "success") {
                            followed=1;
                            if (followed==1) {
                               document.getElementById("follow").innerHTML = 'You followed';  
                            }
                            else{
                                document.getElementById("follow").innerHTML = 'follow';
                            }
                        }
                        initDetails();
                    },
                    error: function (data) {
                        
                        initDetails();
                    }
                })
            }
            function changetime(currenttime){
                //console.log("type is "+typeof currenttime);
                pastaday=0;
                pastamonth=0;
                //console.log(currenttime);
                timelist=currenttime.split(' ');
                //console.log(timelist[1]);
                exacttimelist=timelist[4].split(':')
                //console.log('hour is '+typeof int(exacttimelist[0]));
                hour=parseInt(exacttimelist[0])+11;
                //console.log('hour is '+hour);
                 if (hour >= 24){
                    pastaday=1;
                    hour-=24;
                 }
                hour=hour.toString();
                newtime=hour+':'+exacttimelist[1]+':'+exacttimelist[2];

                //console.log(newtime);
                //console.log(timelist[-1]);
                timezone=timelist[5]+'+11';
                if (pastaday==1) {
                    if(timelist[0].split(',')[0]=='Mon'){
                        timelist[0]='Tue,';

                    }
                    if(timelist[0].split(',')[0]=='Tue'){
                        timelist[0]='Wed,';

                    }
                    if(timelist[0].split(',')[0]=='Wed'){
                        timelist[0]='Thu,';

                    }
                    if(timelist[0].split(',')[0]=='Thu'){
                        timelist[0]='Fri,';

                    }
                    if(timelist[0].split(',')[0]=='Fri'){
                        timelist[0]='Sat,';

                    }
                    if(timelist[0].split(',')[0]=='Sat'){
                        timelist[0]='Sun,';

                    }
                    if(timelist[0].split(',')[0]=='Sun'){
                        timelist[0]='Mon,';

                    }
                    //console.log('new time is '+timelist[0]);
                    day=parseInt(timelist[1]);
                    if (day<31) {
                        day+=1;
                        if(day<=10){
                            timelist[1]='0'+day.toString();
                        }
                        else{
                            timelist[1]=day.toString();
                        }
                        
                    }
                    else{
                        pastamonth=1;
                        day=1;
                        timelist[1]='0'+day.toString();
                    }
                }
                    if (pastamonth==1) {
                        timelist[2]='Nov';
                    }
                    //console.log('new day is '+timelist[1]);
                    finaltime=timelist[0]+' '+timelist[1]+' '+timelist[2]+' '+timelist[3]+' '+newtime;
                    //console.log('finaltime time is '+ finaltime);
                    return finaltime;
                

            }
            function initDetails() {
                // getfollowingnum();
                //这里获取到了全部的统计数据，并且赋值给recipeDetail对象了，但是因为此时dom对象已经加载完毕了，所以没刷新dom的数字
                //getLikeNumber();
                setTimeout(function () {
                    //利用延时器，在获取完毕数据后，延迟2秒去加载dom对象
                    initRecipeDetails();
                }, 1000)


            }

            function initRecipeDetails() {
                document.getElementsByClassName("recipeOwnerName")[0].innerHTML = recipeDetail.recipeOwnerName;
                document.getElementsByClassName("favoriteNumber")[0].innerHTML = recipeDetail.recipeFavoriteNumber;
                document.getElementsByClassName("followperson")[0].innerHTML = recipeDetail.recipeOwnerFollowerNumber;
                document.getElementsByClassName("likeNumber")[0].innerHTML = recipeDetail.recipeLikeNumber;
                document.getElementById("whosrecipe").innerHTML = recipeDetail.recipeOwnerName;
                document.getElementById("recipeName").innerHTML = recipeDetail.recipeName;
                document.getElementById("recipeDesciption").innerHTML = recipeDetail.recipeDescription;

                document.getElementsByClassName("detailRemark")[0].innerHTML = recipeDetail.recipeDetail;
                document.getElementsByClassName("detailRemark")[1].innerHTML = recipeDetail.recipeSteps;
                initComment();
            }

            function initComment() {

                $.ajax({
                    url: "http://127.0.0.1:8080/comment/showlist/byid",
                    contentType: 'application/json',
                    data: JSON.stringify({ 'recipe_id': recipeDetail.id }),
                    type: "POST",
                    success: function (data) {
                        if (data.status === "success") {

                            for (var i = 0; i < data.comm.length; i++) {
                                let obj = data.comm[i];
                                obj.avatarUrl = "images/logo.png";
                                obj[5]=changetime(obj[5]);
                                var commentContainer =
                                    "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj[1] + "</div><div class='commentContent'>" + obj[4] + "</div></div><div class='commentTime'>" + obj[5] + "</div></div>";

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

function logoJump() {
    window.location.href = 'http://localhost:3000/homepage';
}

function CreateRecipe() {
    window.location.href = 'http://localhost:3000/createrecipe';

}

function logOut() {
    window.location.href = 'http://localhost:3000/login';
}

function likeplus() {
    if (liked==1){
                alert("you have already liked this recipe");
        }
    else{
            $.ajax({
        url: "http://127.0.0.1:8080/user/likerecipe/byid",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_id': recipeDetail.id }),
        type: "POST",
        success: function (data) {
            if (data.status === "success") {
                alert(data.message);
                getLikeNumber();
                document.getElementById("like").innerHTML = 'You liked'; 
            }
        },
        error: function (data) {
            alert("like failed!")
        }

    })
    }


}
function favplus() {
    if (favorited==1){
                alert("you have already favorited this recipe");
        }
    else{
        $.ajax({
        url: "http://127.0.0.1:8080/user/favrecipe/byid",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_id': recipeDetail.id }),
        type: "POST",
        success: function (data) {
            if (data.status === "success" && favorited==0) {
                alert(data.message);
                getFavoriteNumber();
                document.getElementById("fav").innerHTML = 'You favorited'; 
            }
            
        },
        error: function (data) {
            alert("favorite failed!")
        }

    })
    }
    
}
function followplus() {
    console.log("dddd");
    console.log(followed);
    if (followed==1){
        alert("you have already followed this user")
    }
    else{
        $.ajax({
        url: "http://127.0.0.1:8080/user/follow",
        contentType: 'application/json',
        data: JSON.stringify({ 'from_username': currentUserName, 'to_username': recipeDetail.recipeOwnerName }),
        type: "POST",
        success: function (data) {
            console.log(data)
            if (data.status === "success" && followed==0) {
                alert(data.message);
                getfollowingnum();
                document.getElementById("follow").innerHTML = 'You followed'; 
            }
        },
        error: function (data) {
            alert("follow failed!")
        }

    })
    }
    
}
function addComment() {
    var value = $("#currentComment").val();

    $.ajax({
        url: "http://127.0.0.1:8080/comment/add/byid",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': currentUserName, 'recipe_id': recipeDetail.id, 'content': value }),
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
        url: "http://127.0.0.1:8080/comment/showlist",
        contentType: 'application/json',
        data: JSON.stringify({ 'recipe_name': recipeDetail.recipeName, 'recipe_username': recipeDetail.recipeOwnerName }),
        type: "POST",
        success: function (data) {
            if (data.status === "success") {

                for (var i = 0; i < data.comm.length; i++) {
                    let obj = data.comm[i];
                    obj.avatarUrl = "images/logo.png";
                    obj[5]=changetime(obj[5]);
                    var commentContainer =
                        "<div class='commentDiv'><div class='commentAvatar'><div class='commentImgBorder'><img src='" + obj.avatarUrl + "' class='commentImg'/></div></div><div class='commentMain'><div class='commentUserName'>" + obj[1] + "</div><div class='commentContent'>" + obj[4] + "</div></div><div class='commentTime'>" + obj[5] + "</div></div>";

                    document.getElementById("commentContainer").innerHTML += commentContainer;
                }
            }
        },
        error: function (data) {
        }

    })
}

function validateOperate(operation) {
    let requestUrl = "";
    switch (operation) {
        case "like":
            requestUrl = "/user/checklike";
            break;
        case "favorite":
            requestUrl = "/user/checkfav";
            break;
        case "follow":
            requestUrl = "/user/checkfollowerstatus";
            break;
    }
    $.ajax({
        url: `http://127.0.0.1:8080${requestUrl}`,
        contentType: 'application/json',
        data: JSON.stringify(operation == "follow" ? { "self_username": currentUserName, "query_username": recipeDetail.recipeOwnerName } : { 'username': currentUserName, 'recipe_id': recipeDetail.id }),
        type: "POST",
        success: function (data) {
            //console.log("success!!!!!!")
            console.log(data.status)
            
                switch (operation) {
                    case "like":
                        likeplus();
                        break;
                    case "favorite":
                        favplus();
                        break;
                    case "follow":
                        followplus();
                        break;
                }
            
        },
        error: function (data) {
            alert("follow failed!")
        }

    })
}




function getfollowingnum() {
    $.ajax({
        url: "http://127.0.0.1:8080/user/getfollowernum",
        contentType: 'application/json',
        data: JSON.stringify({ 'username': recipeDetail.recipeOwnerName }),
        type: "POST",
        success: function (data) {
            if (data.status == "success") {
                recipeDetail.recipeOwnerFollowerNumber = data.follower_num;
                document.getElementsByClassName("followperson")[0].innerHTML = recipeDetail.recipeOwnerFollowerNumber;
            }
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
                document.getElementsByClassName("likeNumber")[0].innerHTML = recipeDetail.recipeLikeNumber;
            }
        },
        error: function (data) {
        }
    })
}

function getFavoriteNumber() {
    $.ajax({
        url: "http://127.0.0.1:8080/user/getfavrecipenum",
        contentType: 'application/json',
        data: JSON.stringify({ 'recipe_id': recipeDetail.id }),
        type: "POST",
        success: function (data) {
            if (data.status == "success") {
                recipeDetail.recipeFavoriteNumber = data.fav_num;
                document.getElementsByClassName("favoriteNumber")[0].innerHTML = recipeDetail.recipeFavoriteNumber;
            }
        },
        error: function (data) {
            initDetails();
        }
    })
}
function changetime(currenttime){
                //console.log("type is "+typeof currenttime);
                pastaday=0;
                pastamonth=0;
                //console.log(currenttime);
                timelist=currenttime.split(' ');
                //console.log(timelist[1]);
                exacttimelist=timelist[4].split(':')
                //console.log('hour is '+typeof int(exacttimelist[0]));
                hour=parseInt(exacttimelist[0])+11;
                //console.log('hour is '+hour);
                 if (hour >= 24){
                    pastaday=1;
                    hour-=24;
                 }
                hour=hour.toString();
                newtime=hour+':'+exacttimelist[1]+':'+exacttimelist[2];

                //console.log(newtime);
                //console.log(timelist[-1]);
                timezone=timelist[5]+'+11';
                if (pastaday==1) {
                    if(timelist[0].split(',')[0]=='Mon'){
                        timelist[0]='Tue,';

                    }
                    if(timelist[0].split(',')[0]=='Tue'){
                        timelist[0]='Wed,';

                    }
                    if(timelist[0].split(',')[0]=='Wed'){
                        timelist[0]='Thu,';

                    }
                    if(timelist[0].split(',')[0]=='Thu'){
                        timelist[0]='Fri,';

                    }
                    if(timelist[0].split(',')[0]=='Fri'){
                        timelist[0]='Sat,';

                    }
                    if(timelist[0].split(',')[0]=='Sat'){
                        timelist[0]='Sun,';

                    }
                    if(timelist[0].split(',')[0]=='Sun'){
                        timelist[0]='Mon,';

                    }
                    //console.log('new time is '+timelist[0]);
                    day=parseInt(timelist[1]);
                    if (day<31) {
                        day+=1;
                        if(day<=10){
                            timelist[1]='0'+day.toString();
                        }
                        else{
                            timelist[1]=day.toString();
                        }
                        
                    }
                    else{
                        pastamonth=1;
                        day=1;
                        timelist[1]='0'+day.toString();
                    }
                }
                    if (pastamonth==1) {
                        timelist[2]='Nov';
                    }
                    //console.log('new day is '+timelist[1]);
                    finaltime=timelist[0]+' '+timelist[1]+' '+timelist[2]+' '+timelist[3]+' '+newtime;
                    //console.log('finaltime time is '+ finaltime);
                    return finaltime;
                

            }
