const express = require('express');
const path = require('path');
const xss = require('xss');
const PostsService = require('./posts-service');
const { requireAuth } = require('../middleware/jwt-auth');


const postsRouter = express.Router()
const jsonBodyParser = express.json()

const serializePost = post => ({
  post_id: post.post_id,
  user_id: post.user_id,
  content: xss(post.content),
  post_pic: xss(post.post_pic),
  date: post.date
})


postsRouter
  .route('/')
  //.all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getAllPosts(knexInstance)
    .then(post => {
      res.json(post.map(serializePost))
    })
    .catch(next)
  })

  .post(jsonBodyParser, (req, res, next) => {
    console.log('inside post');
    const { content, post_pic, user_id, date } = req.body
    const newPost = { content, post_pic, user_id, date }
    console.log(newPost);

    for (const [key, value] of Object.entries(newPost)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newPost.content = content;
    newPost.post_pic = post_pic;
    newPost.user_id = user_id;
    newPost.date = date;

    
    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.user_id}/${post.post_id}`))
          .json(serializePost(post))
      })
      .catch(next)
  })

postsRouter
  .route('/:userId')
  //.all(requireAuth)
  .all((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getByUser(
      knexInstance,
      req.params.userId
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `User posts do not exist` }
          })
        }
        res.post = post
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.post.map(post => serializePost(post)))
  })


postsRouter
  .route('/:userId/:postId')
  //.all(requireAuth)
  .all((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getById(
      knexInstance,
      req.params.postId
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `Post does not exist` }
          })
        }
        res.post = post
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializePost(res.post))
  })

  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.postId
    )
      .then(numRowsAffected => {
        res.status(204).end()
        console.log('deleted')
      })
      .catch(next)
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { content, post_pic, user_id, date } = req.body
    const postToUpdate = { content, post_pic, user_id, date }

    const numberOfValues = Object.values(postToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain 'content'`
        }
      })

    PostsService.updatePost(
      req.app.get('db'),
      req.params.postId,
      postToUpdate
    )
  
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = postsRouter;