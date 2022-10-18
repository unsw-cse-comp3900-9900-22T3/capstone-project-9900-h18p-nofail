### Interface: Routes

<table>
  <tr>
    <th>Name & Description</th>
    <th>HTTP Method</th>
    <th>Data Types</th>
    <th>Errors</th>
  </tr>
  <tr>
    <td>
        <code>/login</code><br /><br />
        for user to login to hotmeal app
    </td>
    <td>
        post
    </td>
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
        post
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
        <code>/recipe</code><br/><br/>
        Create a recipe and return the recipe id
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Body Parameters</b><br/>
        <code>{title, description, ingredients, steps, image}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{status, message, recipe_id}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>quizTitle is an empty string, <code>""</code></li>
            <li>quizSynopsis is an empty string <code>""</code></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/quiz/details</code><br/><br/>
        Get the full details about a quiz
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{quizId}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{quiz}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>quizId does not refer to a valid quiz
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/quiz/edit</code><br /><br />
        Edit a quiz
    </td>
    <td>
        PUT
    </td>
    <td>
        <b>Body Parameters</b><br/>
        <code>{quizId, quizTitle, quizSynopsis}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>quizId does not refer to a valid quiz
            <li>quizTitle is an empty string, <code>""</code></li>
            <li>quizSynopsis is an empty string <code>""</code></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/quiz/remove</code><br/><br/>
        Remove a quiz
    </td>
    <td>
        DELETE
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{quizId}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>quizId does not refer to a valid quiz
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/quizzes/list</code><br/><br/>
        Get brief details about all quizzes, in the order that they were created.
        <br/><br/>
        For example, if we create <code>q1</code>, <code>q2</code> and <code>q3</code>, the returned order is
        <code>[q1, q2, q3]</code>.
    </td>
    <td>
        GET
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{quizzes}</code>
    </td>
    <td>
        N/A
    </td>
  </tr>
  <tr>
    <td>
        <code>/question/add</code><br/><br/>
        Add a question to a quiz
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Body Parameters</b><br/>
        <code>{quizId, questionString, questionType, answers}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{questionId}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>quizId does not refer to a valid quiz
            <li>questionString is an empty string <code>""</code></li>
            <li>questionType is not either "single" or "multiple"
            <li>the questionType is "single" and there is not exactly 1 correct answer</li>
            <li>there are no correct answers</li>
            <li>any of the <code>answerString</code> is an empty string, <code>""</code></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/question/edit</code><br/><br/>
        Edits a question
    </td>
    <td>
        POST
    </td>
    <td>
        <b>Body Parameters</b><br/>
        <code>{questionId, questionString, questionType, answers}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>questionId does not refer to a valid question
            <li>questionString is an empty string <code>""</code></li>
            <li>questionType is not either "single" or "multiple"
            <li>the questionType is "single" and there is not exactly 1 correct answer</li>
            <li>there are no correct answers</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/question/remove</code><br/><br/>
        Remove a question
    </td>
    <td>
        DELETE
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{questionId}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{}</code>
    </td>
    <td>
        Throw <code>HTTPError</code> (code <code>400</code>) when
        <ul>
            <li>questionId does not refer to a valid question
        </ul>
    </td>
  </tr>
  <tr>
    <td>
        <code>/clear</code><br/><br/>
        Clear all data.
    </td>
    <td>
        DELETE
    </td>
    <td>
        <b>Query Parameters</b><br/>
        <code>{}</code>
        <br/><br/>
        <b>Return Object</b><br/>
        <code>{}</code>
    </td>
    <td>
        N/A
    </td>
  </tr>
</table>