const { expect } = require('chai')
const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const { seedUsers, seedTasks, makeAuthHeader, makeTasksArray, makeUsersArray } = require('./test-helpers')

describe(`Users service object`, function() {

    let db

    before(() => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
           })
        app.set('db', db)
  })
    
    
    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE tasks, users RESTART IDENTITY CASCADE'));
    afterEach('cleanup', () => db.raw('TRUNCATE tasks, users RESTART IDENTITY CASCADE'));
    





  describe(`POST /users`, () => {
    context(`User Validation`, () => {

      const testTasks = makeTasksArray()
      const testUsers = makeUsersArray()
      const testUser = testUsers[0]

      beforeEach('insert tasks', () =>
        seedTasks(db, testTasks)
     );

    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );

    const requiredFields = ['username', 'fullname', 'email', 'password']
    
    requiredFields.forEach(field => {
        const registerAttemptBody = {
          username: 'test new username',
          fullname: 'Test new user',
          email: 'test@email.com',
          password: 'Test password',
          current_task: 1
         }

         it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            })
        })
      })


      it(`responds 400 'Password must be longer than 7 characters' when empty password`, () => {
        const userShortPassword = {
          username: 'test new username',
          fullname: 'Test new user',
          email: 'test@email.com',
          password: '123456',
          current_task: 1
        }
        return supertest(app)
          .post('/api/users')
          .send(userShortPassword)
          .expect(400, { error: `Password must be longer than 7 characters` })
          })

      it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
        const userLongPassword = {
          username: 'test new username',
          fullname: 'Test new user',
          email: 'test@email.com',
          password: '*'.repeat(73),
          current_task: 1
          }
          return supertest(app)
            .post('/api/users')
            .send(userLongPassword)
            .expect(400, { error: `Password must be less than 72 characters` })
          })

      it(`responds 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
          username: 'test new username',
          fullname: 'Test new user',
          email: 'test@email.com',
          password: ' 1Aa!2Bb@',
          current_task: 1
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` })
      })

      it(`responds 400 error when password ends with spaces`, () => {
        const userPasswordEndsSpaces = {
          username: 'test new username',
          fullname: 'Test new user',
          email: 'test@email.com',
          password: '1Aa!2Bb@ ',
          current_task: 1
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordEndsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` })
      })

      it(`responds 400 error when password isn't complex enough`, () => {
          const userPasswordNotComplex = {
            username: 'test new username',
            fullname: 'Test new user',
            email: 'test@email.com',
            password: '11AAaabb',
            current_task: 1
        }
          return supertest(app)
            .post('/api/users')
            .send(userPasswordNotComplex)
            .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character` })
        })

      it(`responds 400 'User name already taken' when username isn't unique`, () => {
        const duplicateUser = {
          username: testUser.username,
          fullname: 'Test new user',
          email: 'test@email.com',
          password: '11AAaa!!',
          current_task: 1
      }
        return supertest(app)
          .post('/api/users')
          .send(duplicateUser)
          .expect(400, { error: `Username already taken` })
      })
          })
        })
  
  context(`Happy path`, () => {

    const testTasks = makeTasksArray()


    beforeEach('insert tasks', () =>
      seedTasks(db, testTasks)
      );

    it(`creates a user, responding with 201 and the new user`, function() {
      this.retries(3)
      const newUser = {
        username: 'test new username',
        fullname: 'Test new user',
        email: 'test@email.com',
        password: '11AAaa!!',
        current_task: 1
            }
          return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect(res => {
              expect(res.body.username).to.eql(newUser.username)
              expect(res.body.fullname).to.eql(newUser.fullname)
              expect(res.body.email).to.eql(newUser.email)
              expect(res.body).to.not.have.property('password')
              expect(res.body).to.eql(newUser.current_task)
              expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
               })
              .expect(res =>
                db
                  .from('users')
                  .select('*')
                  .where({ username: res.body.username })
                  .first()
                  .then(row => {
                    expect(res.body.username).to.eql(newUser.username)
                    expect(res.body.fullname).to.eql(newUser.fullname)
                    expect(res.body.email).to.eql(newUser.email)
                    expect(res.body.current_task).to.eql(newUser.current_task)

                    return bcrypt.compare(newUser.password, row.password)
              })
                    .then(compareMatch => {
                        expect(compareMatch).to.be.true
                 })
                  )

               .then(postRes =>
                supertest(app)
                .get(`/api/users/${postRes.body.id}`)
                .expect(postRes.body)
                )
            })
    
             }) 
                       

    })


