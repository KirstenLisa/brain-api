const express = require('express')
const xss = require('xss')
const path = require('path')
const TasksService = require('./tasks-service')

const tasksRouter = express.Router()
const jsonBodyParser = express.json()

const serializeTask = task => ({
    task_id: task.task_id,
    description: xss(task.description),
    category: xss(task.category)
  })

tasksRouter
  .route('/')

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    TasksService.getAllTasks(knexInstance)
    .then(tasks => {
      res.json(tasks.map(serializeTask))
    })
    .catch(next)
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { description, category } = req.body
    const newTask = { description, category }

    for (const [key, value] of Object.entries(newTask)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newTask.description = description;
    newTask.category = category;

    TasksService.insertTask(
      req.app.get('db'),
      newTask
    )
      .then(task => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${task.task_id}`))
          .json(serializeTask(task))
      })
      .catch(next)
  })


tasksRouter
  .route('/:taskId')

  .all((req, res, next) => {
    const knexInstance = req.app.get('db')
    TasksService.getById(
      knexInstance,
      req.params.taskId
    )
      .then(task => {
        if (!task) {
          return res.status(404).json({
            error: { message: `Task id doesn't exist` }
          })
        }
        res.task = task
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeTask(res.task))
  })


  module.exports = tasksRouter