<h1>Brain App</h1>

About
Server is used for back end of app and connects to client.

URL: https://thawing-basin-06464.herokuapp.com/api

Technologies Used
Client side: React, JavaScript, Zeit, HTML and CSS.

Server side: Express.js, Node.js, PostgreSQL, aws and Heroku.


<h1>URL/ Endpoints:</h1>

<h2>/auth/login</h2>

Method: POST 

Data Params { username: "Dulli", password: "Password!123" }

Success Response:

Code: 200
Content: { "authToken": "" }

Error Response:

Code: 400
Content: { :error": Incorrect username or password }
Code: 400
Content: { :error": Missing 'username' in request body}
Code: 400
Content: { :error": Missing 'password' in request body }

<h2>/auth/refresh/</h2>

Method: POST

Success Response:

Code: 200
Content: { "authToken": "" }

<h2>/tasks</h2>

Method: GET
Gets and renders tasks stored in database

Success Response:

Code: 200
Content:

    [{
        "task_id": 1,
        "description": "Jump Trampoline",
        "category": "Body"
    }, ...
    ]

<h2>/tasks/:taskId</h2>

Method: GET
Gets task by id

Success Response:

Code: 200
Content:

   {
    "task_id": 1,
    "description": "Jump Trampoline",
    "category": "Body"
}

Error Response:

Code: 404
Content: { error: {message: 'Task id doesn't exist'} }


<h2>/users</h2>

Method: GET
Gets and renders users stored in database

Success Response:

Code: 200
Content:

    [{
        "id": 1,
        "username": "fluffy_rabbit",
        "fullname": "Dings Bums",
        "email": "dingsbums@email.com",
        "profile_pic": "https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_funny.jpg",
        "current_task": 1,
        "do_tasks": [2, 5, 6, 7],
        "done_tasks": [3, 4, 8, 9, 10, 11, 12]
    }, ...
    ]

<h2>/users/:username</h2>

Method: GET
Gets specific user by username

Success Response:

Code: 200
Content:

{
    "id": 2,
    "username": "Dulli",
    "fullname": "Dulli Duldul",
    "email": "dulliduldul@email.com",
    "profile_pic": "https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/Dully.JPG",
    "current_task": 2,
    "do_tasks": [
        2,
        10,
        8
    ],
    "done_tasks": [
        3,
        4
    ]
}

Error Response:

Code: 404

Content:
{
    "error": { "message": "User doesn't exist" }
}

Method: POST
Lets user register as a new user

Success Response:

Code: 201

Content:

{
    "id": 3,
    "username": "username",
    "fullname": "fullname",
    "email": "email@email.com",
    "profile_pic": "URL",
    }

Error Response:

Code: 400

Content: 

{ error: `Missing 'fullname' in request body`}
{ error: `Missing 'username' in request body`}
{ error: `Username already taken` }

Method: PATCH
changes existing user

Success response:

Code: 204

{
    "id": 2,
    "username": "Dulli",
    "fullname": "Dulli Duldul",
    "email": "dulliduldul@email.com",
    "profile_pic": "https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/Dully.JPG",
    "current_task": new current task,
    "do_tasks": [
        2,
        10,
        8, new task
    ],
    "done_tasks": [
        3,
        4, new task
    ]
}

Error Response:

Code: 400

Content:
 error: { message: `Request body must contain current task` }



<h2>/posts</h2>

Method: GET
GET: Retrieves all posts from database 

Success Response:

Code: 200
Content:

[{
        "post_id": 1,
        "user_id": 1,
        "content": "I met my friends and we all got a haircut. Do we look pretty?",
        "post_pic": "https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpakas.jpg",
        "date": "2020-03-06T13:55:39.900Z"
    }, ...
]


Error Response:

Code: 401

Content: 
{
    "error": "Missing bearer token"
}

Method: POST
posts post

Success response:

Code: 201

[
    {
        "post_id": 20,
        "user_id": 1,
        "content": "new content",
        "post_pic": "new post image url",
        "date": new Date()
    },

Error Response:

Code: 400

Content:
 error: { message: `Missing 'content' in request body` }


<h2>/:userId/postId</h2>

Method: GET
gets specific post for specific user 

Success Response:

Code: 200

Content: 

    {
        "post_id": 8,
        "user_id": 2,
        "content": "Mood on a cloudy day...",
        "post_pic": "https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_beach.jpeg",
        "date": "2020-03-06T13:55:39.900Z"
    },

Error Response:

Code: 404

Content:
{ error: { message: `Post does not exist` } }


Method: DELETE
deletes specific post from database

Success Response:

Code: 204

Error Response:

Code: 400

Content:
{ error: { message: `Post does not exist` } }


<h2>/sign-s3</h2>

Method: GET

gets URL for saved image on aws

Success Response:

Code: 200

Content: 

"https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_funny.jpg"

Error Response:

Code: 404

'Could not upload file.'
