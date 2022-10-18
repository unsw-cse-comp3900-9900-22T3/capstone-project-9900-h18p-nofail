### Interface: Routes

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
        Throw <code>HTTPError</code> (code <code>400</code>) when
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

<!-- `Recipe_Id` int NOT NULL AUTO_INCREMENT,
`Recipe_Name` varchar(30) NOT NULL,
`Recipe_Username` varchar(10) NOT NULL,
`Recipe_Style` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
`Ingredient` varchar(30) NOT NULL,
`Cooking_Time` int NOT NULL,
`Steps` varchar(100) NOT NULL,
`Recipe_Photo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
`Recipe_Time` timestamp NULL DEFAULT CURRENT_TIMESTAMP, -->

<tr>
    <td>
        <code>/recipe?username=$username</code><br/><br/>
        Get recipes by username
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Return Object</b><br/>
        <code> {Recipe_Id, Recipe_Name, Recipe_Username, Recipe_Style, Ingredient, Cooking_Time, Steps, Recipe_Photo, Recipe_Time}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>There is no recipe for this username <code>"$username"</code></li>
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
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>Recipe_Id does not refer to a recipe</li>
        </ul>
    </td>  
  </tr>


  <tr>
    <td>
        <code>/logout</code><br/><br/>
        Log out
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{username}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        N/A
    </td>
  </tr>
   
<!--  `Username` varchar(10) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Describe` varchar(100) DEFAULT NULL,
  `User_Photo` varchar(100) DEFAULT NULL,
  `Time_Create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -->

<!-- Get user information -->

<tr>
    <td>
        <code>/user?username=$username</code><br/><br/>
        Get user information
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Return Object</b><br/>
        <code>{Username, Email, Password, Describe, User_Photo, Time_Create}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>There is no user with username <code>"$username"</code></li>
        </ul>
    </td>
</tr>
<!-- update user information -->
<tr>
    <td>
        <code>/user/update</code><br/><br/>
        Update user information
    </td>
    <td>
        PUT
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{Username, Email, Password, Describe, User_Photo}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>Username is an empty string <code>""</code></li>
            <li>Email is an empty string <code>""</code></li>
            <li>Password is an empty string <code>""</code></li>
            <li>Describe is an empty string <code>""</code></li>
            <li>User_Photo is an empty string <code>""</code></li>
        </ul>
    </td>
  </tr>
<!-- get follower -->
<tr>
    <td>
        <code>/user/follower?username=$username</code><br/><br/>
        Get follower
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Return Object</b><br/>
        <code>{Username, Email, Password, Describe, User_Photo, Time_Create}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>There is no user with username <code>"$username"</code></li>
        </ul>
    </td>
</tr>
<!-- get following -->
<tr>
    <td>
        <code>/user/following?username=$username</code><br/><br/>
        Get following
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Return Object</b><br/>
        <code>{Username, Email, Password, Describe, User_Photo, Time_Create}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>There is no user with username <code>"$username"</code></li>
        </ul>
    </td>
</tr>

</table>
