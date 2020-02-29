const users = [
    {
        "id": 1,
        "username": "fluffy_rabbit",
        "fullname": "Dings Bums",
        "email": "dingsbums@email.com",
        "password": '$2a$12$enwDVw1uuaA0gR/q1WNrBOkWu8U.ztadoEEeIF8CyE6OkJSd6lG3m',
        "profile_pic": '',
        "current_task": 1,
        "do_tasks": [2, 5, 6, 7],
        "done_tasks": [3,4, 8, 9, 10, 11, 12],
    },
    {
        "id": 2,
        "username": "Dulli",
        "fullname": "Dulli Duldul",
        "email": "dulliduldul@email.com",
        "password": '$2a$12$GdCMSyWS7fWkHJDD5DKKQOhgs/o2L7rIYCTfpl1uSk.Hbrn7qbeVm',
        "profile_pic": '',
        "current_task": 1,
        "do_tasks": [2, 10, 8],
        "done_tasks": [3,4],
    }
]

const tasks = [
    {
        "task_id": 1,
        "description": "Jump Trampoline",
        "category": "Body"
    },
    {
        "task_id": 2,
        "description": "Learn Korean Alphabet",
        "category": "Mind",
    },
    {
        "task_id": 3,
        "description": "Meditate",
        "category": "Soul",
    },
    {
        "task_id": 4,
        "description": "Sort all photos you have ever taken",
        "category": "Other",
    },
    {
        "task_id": 5,
        "description": "Adopt a Dog",
        "category": "Soul",
    },
    {
        "task_id": 6,
        "description": "Plant a Tree",
        "category": "Other",
    },
    {
        "task_id": 7,
        "description": "Sleep Outside",
        "category": "Body",
    },
    {
        "task_id": 8,
        "description": "See the Sunrise",
        "category": "Soul",
    },
    {
        "task_id": 9,
        "description": "See the Sunset",
        "category": "Soul",
    },
    {
        "task_id": 10,
        "description": "Take a Yoga Lesson",
        "category": "Body",
    },
    {
        "task_id": 11,
        "description": "Run a Marathon",
        "category": "Body",
    },
    {
        "task_id": 12,
        "description": "Bunjee Jumping",
        "category": "Body",
    },
    {
        "task_id": 13,
        "description": "Jump from a Cliff",
        "category": "Body",
    },
    {
        "task_id": 14,
        "description": "Nightswimming",
        "category": "Mind",
    },
    {
        "task_id": 15,
        "description": "Swim in the Sea/a Lake in Winter",
        "category": "Body",
    },
    {
        "task_id": 16,
        "description": "Bath in Champagne",
        "category": "Soul",
    },
    {
        "task_id": 17,
        "description": "See the Northern Lights",
        "category": "Other",
    },
    {
        "task_id": 18,
        "description": "Build a Treehouse",
        "category": "Other",
    },
]


const posts = [
    {
        "post_id": 1,
        "user_id": 1,
        "content": "I met my friends and we all got a haircut. Don't we look pretty?",
        "post_pic": '',
        "date":  "2020-01-21T16:28:32.615Z"
    },
    {
        "post_id": 2,
        "user_id": 1,
        "content": "Today I went running to train for the marathon.",
        "post_pic": '',
        "date":  "2020-01-22T16:28:32.615Z"
    },
    {
        "post_id": 3,
        "user_id": 1,
        "content": "Partied all weekend. What about you?",
        "post_pic": '',
        "date":  "2020-01-23T16:28:32.615Z"
    },
    {
        "post_id": 4,
        "user_id": 1,
        "content": "What do ypu say about my new hairstyling?",
        "post_pic": '',
        "date":  "2020-01-24T16:28:32.615Z"
    },
    {
        "post_id": 5,
        "user_id": 1,
        "content": "That's my new profile pic. You like it?",
        "post_pic": '',
        "date":  "2020-01-25T16:28:32.615Z"
    },
    {
        "post_id": 6,
        "user_id": 2,
        "content": "Chilling....",
        "post_pic": '',
        "date":  "2020-01-26T16:28:32.615Z"
    },
    {
        "post_id": 7,
        "user_id": 2,
        "content": "Nothing is too big for me. Watch out!",
        "post_pic": '',
        "date":  "2020-01-27T16:28:32.615Z"
    },
    {
        "post_id": 8,
        "user_id": 2,
        "content": "Mood on a cloudy day...",
        "post_pic": '',
        "date":  "2020-01-28T16:28:32.615Z"
    },
    {
        "post_id": 9,
        "user_id": 2,
        "content": "Feeling sexy...",
        "post_pic": '',
        "date":  "2020-01-29T16:28:32.615Z"
    },
    {
        "post_id": 10,
        "user_id": 2,
        "content": "Digging for gold, losers. BLING BLING",
        "post_pic": '',
        "date":  "2020-01-30T16:28:32.615Z"
    },
    {
        "post_id": 11,
        "user_id": 2,
        "content": "SO SAAAAAD :-(",
        "post_pic": '',
        "date":  "2020-01-30T16:28:32.615Z"
    },
    {
        "post_id": 12,
        "user_id": 2,
        "content": "Travelling to the best places. What about you?",
        "post_pic": '',
        "date":  "2020-01-30T16:28:32.615Z"
    }
]


module.exports = { users, tasks, posts }