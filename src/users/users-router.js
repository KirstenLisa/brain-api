const express = require('express')
const path = require('path')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

const serializeUser = user => ({
  id: user.id,
  username: xss(user.username),
  fullname: xss(user.fullname),
  email: xss(user.email),
  profile_pic: xss(user.profile_pic),
  current_task: user.current_task,
  do_tasks: user.do_tasks,
  done_tasks: user.done_tasks
})

usersRouter
  .route('/')

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    UsersService.getAllUsers(knexInstance)
    .then(user => {
      res.json(user.map(serializeUser))
    })
    .catch(next)
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { username, fullname, email, password, profile_pic, current_task } = req.body
    const newUser = { username, fullname, email, password, profile_pic, current_task }

   

    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
        username
        )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })
        
          return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              fullname,
              email,
              password: hashedPassword,
              profile_pic,
              current_task
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(serializeUser(user))
              })
          })
      })
      .catch(next)
  })
  

  usersRouter
    .route('/:username')
    .all((req, res, next) => {
      const knexInstance = req.app.get('db')
      UsersService.getByName(
        knexInstance,
        req.params.username
      )
        .then(user => {
          if (!user) {
            return res.status(404).json({
              error: { message: `User doesn't exist` }
            })
          }
          res.user = user
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(serializeUser(res.user))
   
    })

    .patch(jsonBodyParser, (req, res, next) => {
      const { username, fullname, email, password, profile_pic, current_task, do_tasks, done_tasks } = req.body
      const userToUpdate = { username, fullname, email, password, profile_pic, current_task, do_tasks, done_tasks }
  
      const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain current task`
          }
        })
  
      UsersService.updateUser(
        req.app.get('db'),
        req.params.username,
        userToUpdate
      )
    
      .then(updatedUser => {
        res.status(204)
      })
        .catch(next)
    })



module.exports = usersRouter