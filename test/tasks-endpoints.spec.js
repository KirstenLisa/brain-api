const knex = require('knex')
const app = require('../src/app')
const { makeTasksArray } = require('./test-helpers')

describe(`Tasks service object`, function() {

    let db

    before(() => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
           })
        app.set('db', db)
  })
    
    
    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE tasks RESTART IDENTITY CASCADE'));
    afterEach('cleanup', () => db.raw('TRUNCATE tasks RESTART IDENTITY CASCADE'));
    

  describe('GET/api/tasks', () => {

    context('Given there is NO data in the database', () => {

      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/tasks')
          .expect(200, [])
          })

      })

    context('Given there IS data in the database', () => {

      const testTasks = makeTasksArray()

      beforeEach('insert tasks', () => {
        return db
          .into('tasks')
          .insert(testTasks)
      })

      it('gets tasks from the store', () => {
        return supertest(app)
        .get('/api/tasks')
        .expect(200, testTasks)
           })
         })


  describe('GET/api/tasks/:taskId', () => {

    context('Given there is NO data in the database', () => {

      it(`responds 404 the task doesn't exist`, () => {
        return supertest(app)
          .get(`/api/tasks/123`)
          .expect(404, {
          error: { message: `Task id doesn't exist` }
               })
           })
       })

    context('Given there IS data in the database', () => {

    const testTasks = makeTasksArray()

    beforeEach('insert tasks', () => {
      return db
      .into('tasks')
      .insert(testTasks)
    })

    it('responds with 200 and the specified task', () => {
      const taskId = 2
      const expectedTask = testTasks[taskId - 1]
        return supertest(app)
          .get(`/api/tasks/${taskId}`)
          .expect(200, expectedTask)
         })
       })
      })
      })
    })


