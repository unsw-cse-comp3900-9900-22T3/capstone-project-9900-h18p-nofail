### Interface: Routes

<!-- /user/getfollowernum  GET-->
<!-- Query Parameters: username -->
<!-- return: status, message,  follower_num-->
|API|Description|HTTP Method|query|return|Errors
|:---|:----|:---|:---|:----|:---|
|```/user/favrecipe```|Add a recipe to user's favorite list|POST|```{username,recipe_name,recipe_username}```|status, message||
<!-- |```/unfollow```|Unfollow a user|POST|```{from_username,to_username}```|status, message||
|```/user/follow```|Follow a user|POST|```{from_username,to_username}```|status, message||
|```/user/getfollowernum```|Get the number of followers of a user|GET|```{username}```|status, message, follower_num||
|```/user/getfollowingnum```|Get the number of users that a user is following|GET|```{username}```|status, message, following_num||
|```/user/getfollowinglist```|Get the list of users that a user is following|GET|```{username}```|status, message, following_list||
|```/user/getfollowerlist```|Get the list of followers of a user|GET|```{username}```|status, message, follower_list||
|```/user/getfavrecipelist```|Get the list of favorite recipes of a user|GET|```{username}```|status, message, fav_recipe_list||
|```/user/getfavrecipenum```|Get the number of favorite recipes of a user|GET|```{username}```|status, message, fav_recipe_num|| -->



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
        <code>{Recipe_Name, Recipe_Username, Recipe_Style, Ingredient, Cooking_Time, Steps, Recipe_Photo}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, recipe_id}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>Recipe_Name is an empty string <code>""</code></li>
            <li>Recipe_Username is an empty string <code>""</code></li>
            <li>Recipe_Style is an empty string <code>""</code></li>
            <li>Ingredient is an empty string <code>""</code></li>
            <li>Cooking_Time is an empty string <code>""</code></li>
            <li>Steps is an empty string <code>""</code></li>
            <li>Recipe_Photo is an empty string <code>""</code></li>
        </ul>
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
        <code>{Recipe_Name, Recipe_Username, Recipe_Style, Ingredient, Cooking_Time, Steps, Recipe_Photo}</code>
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
        DELETE
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{Recipe_Id}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>Recipe_Id does not refer to a recipe</li>
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
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, recipe_list}</code>
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
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username, Recipe_Name}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code><json>{status:"success", message:"you have successfully get the one recipe", recipe:{Recipe_Name,Recipe_Username,Recipe_Style,Ingredient,Cooking_Time,Steps,Recipe_Photo, Description}}</json></code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>no recipe is referring to the username</li>
        </ul>
    </td>
</tr>

<!-- /ingredient/create -->
<!-- Query Parameters: ingredient, in_type -->
<!-- return: status, message -->
<tr>
    <td>
        <code>/ingredient/insert</code><br/><br/>
        Insert an ingredient
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{ingredient, in_type}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>ingredient is an empty string <code>""</code></li>
            <li>in_type is an empty string <code>""</code></li>
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

<!-- /user/getfollowernum  GET-->
<!-- Query Parameters: username -->
<!-- return: status, message,  follower_num-->
<tr>
    <td>
        <code>/user/getfollowernum</code><br/><br/>
        Get the number of followers of a user
    </td>
    <td>
        GET
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

<!-- /user/getfollowingnum  GET-->
<!-- Query Parameters: username -->
<!-- return: status, message,  following_num-->
<tr>
    <td>
        <code>/user/getfollowingnum</code><br/><br/>
        Get the number of following of a user
    </td>
    <td>
        GET
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

<!-- /user/getfavlist  GET-->
<!-- Query Parameters: username -->
<!-- return: status, message, fav_list-->
<tr>
    <td>
        <code>/user/getfavlist</code><br/><br/>
        Get the favorite list of a user
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, fav_list}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/unfavrecipe  POST-->
<!-- Query Parameters: username,favourite_recipe,favourite_name -->
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
        <code>{username,favourite_recipe,favourite_name}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>username is an empty string <code>""</code></li>
            <li>favourite_recipe is an empty string <code>""</code></li>
            <li>favourite_name is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

<!-- /user/getfavrecipenum  GET-->
<!-- Query Parameters: username -->
<!-- return: status, message, fav_num-->
<tr>
    <td>
        <code>/user/getfavrecipenum</code><br/><br/>
        Get the number of favorite recipes of a user
    </td>
    <td>
        GET
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

<!-- /recipe/getlikenum  GET-->
<!-- Query Parameters: recipe_name,recipe_username -->
<!-- return: status, message, re_like_num-->
<tr>
    <td>
        <code>/recipe/getlikenum</code><br/><br/>
        Get the number of likes of a recipe
    </td>
    <td>
        GET
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

<!-- /recipe/getcommentlist  GET-->
<!-- Query Parameters: recipe_name,recipe_username -->
<!-- return: status, message, comm-->
<tr>
    <td>
        <code>/comment/showlist</code><br/><br/>
        Get the comment list of a recipe
    </td>
    <td>
        GET
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

<!-- /comment/getnum  GET-->
<!-- Query Parameters: recipe_name,recipe_username-->
<!-- return: status, message, comm_num-->
<tr>
    <td>
        <code>/comment/getnum</code><br/><br/>
        Get the number of comments of a recipe
    </td>
    <td>
        GET
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

<!-- /recipe/search  GET-->
<!-- Query Parameters: search_content,difficult,style_name,ingredient -->
<!-- return: status, message, return_recipe-->
<tr>
    <td>
        <code>/search/recipe</code><br/><br/>
        Search recipes
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{search_content,difficult,style_name,ingredient}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, return_recipe}</code>
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

<!-- /search/user  GET-->
<!-- Query Parameters: search_content -->
<!-- return: status, message, return_user-->
<tr>
    <td>
        <code>/search/user</code><br/><br/>
        Search users
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{search_content}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, return_user}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (status <code>fail</code>) when
        <ul>
            <li>search_content is an empty string <code>""</code></li>
        </ul>
    </td>
</tr>

</table>
