### Interface: Routes

<!-- /user/getfollowernum  POST-->
<!-- Query Parameters: username -->
<!-- return: status, message,  follower_num-->
<!-- |API|HTTP Method|query|return|
|:---|:---|:---|:---|
|```/login```|POST|```{username, password}```|```{status, message}```||
|```/register```|POST|```{username, password}```|```{status, message}```||
|```/recipe/create```|POST|```{username, password}```|```{status, message}```||
|```/recipe/delete```|POST|```{username, password}```|```{status, message}```||
|```/recipe/update```|PUT||```{status, message}```||
|```/recipe/get```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getall```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbyuser```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||
|```/recipe/getallbytag```|POST|```{username, password}```|```{status, message}```||| -->




<table>
    <tr>
        <th>Name & Description</th>
        <th>HTTP Method</th>
        <th>JSON Data</th>
        <th>Errors</th>
    </tr>
<tr>
    <td>
        <code>/login</code><br /><br />
        for user to login to hotmeal app
    </td>
    <!-- make post in yellow -->
    <td>POST</td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username, password}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw error message if username or password is wrong
    </td>
</tr>
<tr>
    <td>
        <code>/register</code><br/><br/>
        for user to register to hotmeal app
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username, email, password}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw error message if username or email is already registered
    </td>
</tr>

<tr>
    <td>
        <code>/recipe/create</code><br/><br/>
        Create a recipe and return the recipe id
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name, recipe_username, recipe_style, ingredient, cooking_time, steps, recipe_photo, description}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, recipe_id}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>Recipe_Name is an empty string <code>""</code></li>
    </td>
</tr>
<!-- update recipe -->
<tr>
    <td>
        <code>/recipe/update</code><br/><br/>
        Update a recipe
    </td>
    <td>
        PUT
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name, recipe_username, recipe_style, ingredient, cooking_time, steps, recipe_photo, description}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        NAN
    </td>
  </tr>
<!-- delete recipe -->
  <tr>
    <td>
        <code>/recipe/delete</code><br/><br/>
        Delete a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name, recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>recipe_name does not refer to a recipe</li>
            <li>recipe_username does not refer to a user</li>
        </ul>
    </td>
  </tr>
<!-- /recipe/showlist -->
<!-- Query Parameters: username -->
<!-- return: Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo, Description  -->
<tr>
    <td>
        <code>/recipe/showlist</code><br/><br/>
        Show recipe list for user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "You have successfully get the recipe list!",
    "recipe_list": [
        {
            "cooking_time": 20,
            "description": "good",
            "ingredient": "Potato; cabbage; chili",
            "like_num": 1,
            "recipe_id": 2,
            "recipe_name": "Malatang",
            "recipe_photo": "spicy",
            "recipe_style": "Sichuan cuisine",
            "recipe_username": "Katherine",
            "steps": "Put potato and cabbage into boiling water, then put chili, and it will finish in 20 minutes"
        }
    ],
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no recipe is referring to the username</li>
        </ul>
    </td>
</tr>

<!-- /recipe/showall -->
<!-- Query Parameters: username -->
<!-- return: Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo, Description  -->
<tr>
    <td>
        <code>/recipe/showall</code><br/><br/>
        Show recipe list for user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "You have successfully get the recipe list!",
    "recipe_list": [
        {
            "cooking_time": 20,
            "description": "good",
            "ingredient": "Potato; cabbage; chili",
            "like_num": 1,
            "recipe_id": 2,
            "recipe_name": "Malatang",
            "recipe_photo": "spicy",
            "recipe_style": "Sichuan cuisine",
            "recipe_username": "Katherine",
            "steps": "Put potato and cabbage into boiling water, then put chili, and it will finish in 20 minutes"
        },
        ...
    ],
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no recipe is referring to the username</li>
        </ul>
    </td>
</tr>


<!-- /recipe/showone -->
<!-- Query Parameters: username, Recipe_Name -->
<!-- return: Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo, Description  -->
<tr>
    <td>
        <code>/recipe/showone</code><br/><br/>
        Show one recipe for user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username, Recipe_Name}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "You have successfully got the recipe!",
    "recipe": {
        "cooking_time": 12,
        "description": "qwe",
        "ingredient": "qwe;ewq;tre;beef;chicken;pork;",
        "like_num": 0,
        "recipe_id": 19,
        "recipe_name": "qwe",
        "recipe_photo": "C:/fakepath/3671C38C-A544-436A-B61A-CE7FC2E3293A.jpeg",
        "recipe_style": "two",
        "recipe_username": "kk",
        "steps": "qwe,ewq,tre,"
    },
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no recipe is referring to the username</li>
        </ul>
    </td>
</tr>


<!-- /user/getpersonalinfo -->
<!-- Query Parameters: username -->
<!-- return: username, email, phone, address, profile_photo -->
<tr>
    <td>
        <code>/user/getpersonalinfo</code><br/><br/>
        Get personal information for user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "You have successfully got the user information!",
    "personal_info": [
        {
            "description": "Hungry!",
            "email": "z5324823@ad.unsw.edu.au",
            "follower_num": 3,
            "following_num": 3,
            "update_time": "Wed, 05 Oct 2022 07:15:00 GMT",
            "user_photo": "cool",
            "username": "Katherine"
        }
    ],
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no recipe is referring to the username</li>
        </ul>
    </td>
</tr>

<!-- /follow  POST-->
<!-- Query Parameters: username, follow_username -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/follow</code><br/><br/>
        Follow a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{from_username, to_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>follow_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/checkfollowerstatus -->
<!-- Query Parameters: self_username, aim_username -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/checkfollowerstatus</code><br/><br/>
        Check follower status
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{self_username, aim_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>self_username is an empty string <code>""</code></li>
            <li>aim_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/checkfollowingstatus -->
<!-- Query Parameters: self_username, query_username -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/checkfollowingstatus</code><br/><br/>
        Check following status
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{self_username, query_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "You have this user in your follower list!",
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>self_username is an empty string <code>""</code></li>
            <li>query_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/checkfollowingstatus -->
<!-- Query Parameters: self_username, query_username -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/checkfollowingstatus</code><br/><br/>
        Check following status
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{self_username, query_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "message": "This user is following you!",
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>self_username is an empty string <code>""</code></li>
            <li>query_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>
    
<!-- /user/getfollower -->
<!-- Query Parameters: username -->
<!-- return: follower_username -->
<tr>
    <td>
        <code>/user/getfollower</code><br/><br/>
        Get follower for user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
            <pre>
exp.
{
    "follower": [
        {
            "follower_username": "Katherine"
        },
        {
            "follower_username": "Katherine"
        },
        {
            "follower_username": "Katherine"
        }
    ],
    "message": "You have successfully got the follower!",
    "status": "success"
}
        </pre>
    </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no follower is referring to the username</li>
        </ul>
    </td>
</tr>
    
<!-- /user/getfollowing -->
<!-- Query Parameters: username -->
<!-- return: following_username -->
<tr>
    <td>
        <code>/user


<!-- /unfollow  POST-->
<!-- Query Parameters: from_username, to_username -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/unfollow</code><br/><br/>
        Unfollow a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{from_username, to_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>from_username is an empty string <code>""</code></li>
            <li>to_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/getfollowernum  POST-->
<!-- Query Parameters: username -->
<!-- return: status, message,  follower_num-->
<tr>
    <td>
        <code>/user/getfollowernum</code><br/><br/>
        Get the number of followers of a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, follower_num}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/getfollowingnum  POST-->
<!-- Query Parameters: username -->
<!-- return: status, message,  following_num-->
<tr>
    <td>
        <code>/user/getfollowingnum</code><br/><br/>
        Get the number of following of a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, following_num}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/favrecipe  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/user/favrecipe</code><br/><br/>
        Favorite a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/checkfav -->
<!-- Query Parameters: username,recipe_id -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/checkfav</code><br/><br/>
        Check if a recipe is favorited by a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_id}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_id is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>


<!-- /user/getfavlist  POST-->
<!-- Query Parameters: username -->
<!-- return: status, message, fav_list-->
<tr>
<td>
    <code>/user/getfavlist</code><br/><br/>
    Get the favorite list of a user
</td>
<td>
    POST
</td>
<td>
    <b>Query Parameters</b><br/>
    <code>{username}</code>
    <br/><br/>
    <b>Return Object</b><br/>
    <code>
        <pre>
exp.
{
    "fav_list": [
        {
            "cooking_time": 20,
            "ingredient": "Potato; cabbage; chili",
            "recipe_create_time": "Wed, 05 Oct 2022 07:19:12 GMT",
            "recipe_id": 2,
            "recipe_name": "Malatang",
            "recipe_photo": "spicy",
            "recipe_style": "Sichuan cuisine",
            "recipe_username": "Katherine",
            "steps": "Put potato and cabbage into boiling water, then put chili, and it will finish in 20 minutes"
        },
        ...
    ],
    "message": "You have successfully got your favorite list!",
    "status": "success"
}
        </pre>
    </code>

</td>

<td>
    Throw <code>HTTPError</code> (status <code>fail</code>) when
    <ul>
        <li>username is an empty string <code>""</code></li>
    </ul>
</td>
</tr>

<!-- /user/unfavrecipe  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/user/unfavrecipe</code><br/><br/>
        Unfavorite a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/getfavrecipenum  POST-->
<!-- Query Parameters: username -->
<!-- return: status, message, fav_num-->
<tr>
    <td>
        <code>/user/getfavrecipenum</code><br/><br/>
        Get the number of favorite recipes of a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, fav_num}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/likerecipe  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/user/likerecipe</code><br/><br/>
        Like a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/checklike -->
<!-- Query Parameters: username,recipe_id -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/user/checklike</code><br/><br/>
        Check if a recipe is liked by a user
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_id}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_id is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/unlikerecipe  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/user/unlikerecipe</code><br/><br/>
        Unlike a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /recipe/getlikenum  POST-->
<!-- Query Parameters: recipe_name,recipe_username -->
<!-- return: status, message, re_like_num-->
<tr>
    <td>
        <code>/recipe/getlikenum</code><br/><br/>
        Get the number of likes of a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, re_like_num}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /recipe/getcommentlist  POST-->
<!-- Query Parameters: recipe_name,recipe_username -->
<!-- return: status, message, comm-->
<tr>
    <td>
        <code>/comment/showlist</code><br/><br/>
        Get the comment list of a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, comm}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/addrecipecomment  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username,content -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/comment/add</code><br/><br/>
        Add a comment to a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username,content}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
            <li>content is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/replycomment  POST-->
<!-- Query Parameters: username,recipe_name,recipe_username,comment_id,content -->
<!-- return: status, message-->
<tr>
    <td>
        <code>/comment/reply</code><br/><br/>
        Add a comment to a comment
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username,recipe_name,recipe_username,comment_id,content}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
            <li>comment_id is an empty string <code>""</code></li>
            <li>content is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /comment/delete  POST-->
<!-- Query Parameters: comment_id-->
<!-- return: status, message-->
<tr>
    <td>
        <code>/comment/delete</code><br/><br/>
        Delete a comment
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{comment_id}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>comment_id is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /comment/getnum  POST-->
<!-- Query Parameters: recipe_name,recipe_username-->
<!-- return: status, message, comm_num-->
<tr>
    <td>
        <code>/comment/getnum</code><br/><br/>
        Get the number of comments of a recipe
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{recipe_name,recipe_username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, comm_num}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>recipe_name is an empty string <code>""</code></li>
            <li>recipe_username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /recipe/search  POST-->
<!-- Query Parameters: search_content,difficult,style_name,ingredient -->
<!-- return: status, message, return_recipe-->
<tr>
    <td>
        <code>/search/recipe</code><br/><br/>
        Search recipes
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{search_content,difficult,style_name,ingredient}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>
        <pre>
exp.
{
    "status": "success"
    "message": "You have successfully searched a recipe!",
    "return_recipe": [
        {
            "cooking_time": 20,
            "description": "good",
            "ingredient": "Potato; cabbage; chili",
            "recipe_create_time": "Wed, 05 Oct 2022 07:19:12 GMT",
            "recipe_id": 2,
            "recipe_name": "Malatang",
            "recipe_photo": "spicy",
            "recipe_style": "Sichuan cuisine",
            "recipe_username": "Katherine",
            "steps": "Put potato and cabbage into boiling water, then put chili, and it will finish in 20 minutes"
        },
        ...
    ]
}
        </pre>
        </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>search_content is an empty string <code>""</code></li>
            <li>difficult is an empty string <code>""</code></li>
            <li>style_name is an empty string <code>""</code></li>
            <li>ingredient is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /search/user  POST-->
<!-- Query Parameters: search_content -->
<!-- return: status, message, return_user-->
<tr>
    <td>
        <code>/search/user</code><br/><br/>
        Search users
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{search_content}</code>
        <br/><br/>
        <b>Return Object</b><br/>
         <code>
        <pre>
exp.
{
    "message": "You have successfully searched a user!",
    "status": "success"
    "return_user": [
        {
            "bio": "shixinyi",
            "email": "z5324823@ad.unsw.edu.au",
            "user": "Hungry",
            "username": "Katherine"
        },
        ...
    ]
}
        </pre>
        </code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>search_content is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

</table>
