const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const { makeAuthHeader, seedTasks, seedUsers, seedPosts, makeTasksArray, makeUsersArray, makePostsArray } = require('./test-helpers')


describe('Auth Endpoints', function() {
    let db

    const testUsers = makeUsersArray()
    const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })
    
    
    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE tasks, users, posts RESTART IDENTITY CASCADE'));
    afterEach('cleanup', () => db.raw('TRUNCATE tasks, users, posts RESTART IDENTITY CASCADE'));
    

  describe(`POST /api/auth/login`, () => {
    const testTasks = makeTasksArray()
    const testUsers = makeUsersArray()
    const testPosts = makePostsArray()
    


      beforeEach('insert tasks', () =>
        seedTasks(db, testTasks)
      );

      beforeEach('insert users', () =>
        seedUsers(db, testUsers)
        );
      
      beforeEach('insert posts', () =>
        seedPosts(db, testPosts)
      );


    const requiredFields = ['username', 'password']
        
    requiredFields.forEach(field => {
        const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password,
    }
        
    it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field]
        
        return supertest(app)
            .post('/api/auth/login')
            .send(loginAttemptBody)
            .expect(400, {
                error: `Missing '${field}' in request body`,
        })
    })

    it(`responds 400 'invalid username or password' when bad username`, () => {
        const userInvalidUser = { username: 'user-not', password: 'existy' }
            return supertest(app)
              .post('/api/auth/login')
              .send(userInvalidUser)
              .expect(400, { error: `Incorrect username or password` })
          })

    it(`responds 400 'invalid username or password' when bad password`, () => {
        const userInvalidPass = { username: testUser.username, password: 'incorrect' }
            return supertest(app)
                .post('/api/auth/login')
                .send(userInvalidPass)
                .expect(400, { error: `Incorrect username or password` })
            })


    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
            username: testUser.username,
            password: testUser.password,
            }
        const expectedToken = jwt.sign(
            { id: testUser.id }, // payload
                process.env.JWT_SECRET,
            {
            subject: testUser.username,
            expiresIn: process.env.JWT_EXPIRY,
            algorithm: 'HS256',
            }
            )
            return supertest(app)
                .post('/api/auth/login')
                .send(userValidCreds)
                .expect(200, {
                authToken: expectedToken,
                })
            })
          })
        })

  describe(`POST /api/auth/refresh`, () => {
    const testTasks = makeTasksArray()
    const testUsers = makeUsersArray()
    const testUser = testUsers[0]
    const testPosts = makePostsArray()
    


      beforeEach('insert tasks', () =>
        seedTasks(db, testTasks)
      );

      beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );

      beforeEach('insert posts', () =>
        seedPosts(db, testPosts)
      );

     
          
      it(`responds 200 and JWT auth token using secret`, () => {
                const expectedToken = jwt.sign(
                  { id: testUser.id },
                  process.env.JWT_SECRET,
                  {
                    subject: testUser.username,
                    expiresIn: process.env.JWT_EXPIRY,
                    algorithm: 'HS256',
                  }
                )
                return supertest(app)
                  .post('/api/auth/refresh')
                  .set('Authorization', makeAuthHeader(testUser))
                  .expect(200, {
                    authToken: expectedToken,
                  })
              })
            })
    })
  