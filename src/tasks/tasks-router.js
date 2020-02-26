const express = require('express')
const xss = require('xss')
const TasksService = require('./tasks-service')

const tasksRouter = express.Router()

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


tasksRouter
  .route('/:taskId')

  .all((req, res, next) => {
    const knexInstance = req.app.get('db')
    TeachersService.getById(
      knexInstance,
      req.params.teacherId
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