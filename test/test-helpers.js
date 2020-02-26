const bcrypte = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeTasksArray() {
    return [
        {
           "task_id": 1,
           "description": "test description 1",
           "category": "Mind" 
        },
        {
            "task_id": 2,
            "description": "test description 2",
            "category": "Soul" 
         },
         {
            "task_id": 3,
            "description": "test description 3",
            "category": "Body" 
         },
         {
            "task_id": 4,
            "description": "test description 4",
            "category": "Other" 
         },
         {
            "task_id": 4,
            "description": "test description 5",
            "category": "Soul" 
         }
    ]
}

function makeUsersArray() {
   return [
       {
          "id": 1,
          "username": "test-username-1",
          "fullname": "test-fullname-1",
          "email": "test1@email.com",
          "password": "test-password-1",
          "profile_pic": "test-url-1",
          "current_task": 1,
          "do_tasks": [2,3],
          "done_tasks": [4,5]
       },
       {
         "id": 2,
         "username": "test-username-2",
         "fullname": "test-fullname-2",
         "email": "test2@email.com",
         "password": "test-password-2",
         "profile_pic": "test-url-2",
         "current_task": 5,
         "do_tasks": [2, 4],
         "done_tasks": [1,3]
      },
      {
          "id": 3,
          "username": "test-username-3",
          "fullname": "test-fullname-3",
          "email": "test3@email.com",
          "password": "test-password-3",
          "profile_pic": "test-url-3",
          "current_task": 4,
          "do_tasks": [1,2],
          "done_tasks": [3,5]
      },
   ]
}

function makePostsArray() {
   return [
      {
         "post_id": 1,
         "user_id": 1,
         "content": "test-content-1",
         "post_pic": "test-url-1",
         "date": "2019-04-22T16:28:32.615Z"
      },
      {
         "post_id": 2,
         "user_id": 2,
         "content": "test-content-2",
         "post_pic": "test-url-2",
         "date": "2019-04-23T16:28:32.615Z"
      },
      {
         "post_id": 3,
         "user_id": 3,
         "content": "test-content-3",
         "post_pic": "test-url-3",
         "date": "2019-04-24T16:28:32.615Z"
      }
   ]
}

function makeMaliciousUser() {
   const maliciousUser = 
      {
         "id": 1,
         "username": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "fullname": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "email": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "password": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "profile_pic": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "current_task": 1,
         "do_tasks": [2, 3, 4],
         "done_tasks": [5, 6, 7]
      }
   const expectedUser =
      {
         "id": 1,
         "username": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "fullname": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "password": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "profile_pic": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "current_task": 1,
         "do_tasks": [2, 3, 4],
         "done_tasks": [5, 6, 7]
      }
      return {maliciousUser, expectedUser}
   }

function makeMaliciousPost() {
   const maliciousPost = 
      {
         "post_id": 1,
         "user_id": 1,
         "content": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "post_pic": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "date": "2020-01-12T16:28:32.615Z"
      }
   const expectedUpdate =
      {
         "post_id": 1,
         "user_id": 1,
         "content": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "post_pic": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "date": "2020-01-12T16:28:32.615Z"  
         }
         return {maliciousPost, expectedPost}
      }


function makeMaliciousTask() {
   const maliciousTask = 
      {
         "task_id": 1,
         "description": 'Naughty naughty very naughty <script>alert("xss");</script>',
         "category": "Mind",   
      }
   const expectedTask =
      {
         "task_id": 1,
         "description": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
         "category": "Mind",
      }
      return {maliciousTask, expectedTask}
      }

   function seedTasks(db, tasks) {
      return db
          .insert(tasks)
          .into('tasks');
  }

  function seedUsers(db, users) {
   const preppedUsers = users.map(user => ({
       ...user,
       password: bcrypte.hashSync(user.password, 1)
   }))
   return db
       .into('users')
       .insert(preppedUsers);
}

function seedPosts(db, posts) {
   return db
       .insert(posts)
       .into('posts');
}


   function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
      const token = jwt.sign({ user_id: user.user_id }, secret, {
         subject: user.username,
         algorithm: 'HS256',
         })
      return `Bearer ${token}`
      }

module.exports = { 
   makeTasksArray, 
   makeUsersArray, 
   makePostsArray, 
   makeMaliciousUser,
   makeMaliciousPost,
   makeMaliciousTask,
   seedTasks,
   seedUsers,
   seedPosts,
   makeAuthHeader }