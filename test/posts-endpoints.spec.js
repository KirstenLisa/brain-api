const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { seedUsers, seedPosts, makeAuthHeader, makeMaliciousPost, makePostsArray, makeUsersArray } = require('./test-helpers')

describe(`Posts service object`, function() {

    let db

    before(() => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
           })
        app.set('db', db)
  })
    
    
    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE users, posts RESTART IDENTITY CASCADE'));
    afterEach('cleanup', () => db.raw('TRUNCATE users, posts RESTART IDENTITY CASCADE'));
    

  describe('GET/api/posts', () => {

    context('Given there are NO posts in the database', () => {

      const testUsers = makeUsersArray()

    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );


    it(`responds 401 'Missing bearer token' when no bearer token`, () => {
      return supertest(app)
        .get(`/api/posts`)
        .expect(401, { error: `Missing bearer token` })
           })

    it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
      const validUser = testUsers[0]
      const invalidSecret = 'bad-secret'
        return supertest(app)
          .get(`/api/posts`)
          .set('Authorization', makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
          })

    it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
      const invalidUser = { username: 'user-not-existy', id: 1 }
        return supertest(app)
          .get(`/api/posts`)
          .set('Authorization', makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
          })


      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/posts')
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(200, [])
          })

      })

    context('Given there ARE posts in the database', () => {

      const testUsers = makeUsersArray()
      const testPosts = makePostsArray()

      beforeEach('insert users', () =>
        seedUsers(db, testUsers)
        );

      beforeEach('insert posts', () =>
        seedPosts(db, testPosts)
        );  


      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return supertest(app)
          .get(`/api/posts`)
          .expect(401, { error: `Missing bearer token` })
             })
  
      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
          return supertest(app)
            .get(`/api/posts`)
            .set('Authorization', makeAuthHeader(validUser, invalidSecret))
            .expect(401, { error: `Unauthorized request` })
            })
  
      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 }
          return supertest(app)
            .get(`/api/posts`)
            .set('Authorization', makeAuthHeader(invalidUser))
            .expect(401, { error: `Unauthorized request` })
            })

      it('gets posts from the store', () => {
        return supertest(app)
        .get('/api/posts')
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .expect(200, testPosts)
           })
         })
    

    context(`Given an XSS attack post`, () => {
      const testUsers = makeUsersArray()
      const { maliciousPost, expectedPost } = makeMaliciousPost()
        

    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );

    beforeEach('insert posts', () =>
      seedPosts(db, maliciousPost)
      );  
                  
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/posts`)
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            expect(res.body[0].content).to.eql(expectedPost.content)
            expect(res.body[0].post_pic).to.eql(expectedPost.post_pic)
                  })
              })
            })
          })




  describe('GET/api/posts/:postId', () => {

    context('Given there are NO posts in the database', () => {

      const testUsers = makeUsersArray()

  beforeEach('insert users', () =>
    seedUsers(db, testUsers)
    );

    it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return supertest(app)
          .get(`/api/posts/123`)
          .expect(401, { error: `Missing bearer token` })
             })
  
    it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
      const validUser = testUsers[0]
      const invalidSecret = 'bad-secret'
          return supertest(app)
            .get(`/api/posts/123`)
            .set('Authorization', makeAuthHeader(validUser, invalidSecret))
            .expect(401, { error: `Unauthorized request` })
            })
  
    it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
      const invalidUser = { username: 'user-not-existy', id: 1 }
          return supertest(app)
            .get(`/api/posts/123`)
            .set('Authorization', makeAuthHeader(invalidUser))
            .expect(401, { error: `Unauthorized request` })
            })
  

      it(`responds 404 the post doesn't exist`, () => {
        return supertest(app)
          .get(`/api/posts/123`)
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(404, {
          error: { message: `Post doesn't exist` }
               })
           })
       })

    context('Given there ARE posts in the database', () => {

        const testUsers = makeUsersArray()
        const testPosts = makePostsArray()

      beforeEach('insert users', () =>
        seedUsers(db, testUsers)
        );

      beforeEach('insert posts', () =>
        seedPosts(db, testPosts)
        );  

        it(`responds 401 'Missing bearer token' when no bearer token`, () => {
          return supertest(app)
            .get(`/api/posts/1`)
            .expect(401, { error: `Missing bearer token` })
               })
    
        it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
          const validUser = testUsers[0]
          const invalidSecret = 'bad-secret'
            return supertest(app)
              .get(`/api/posts/1`)
              .set('Authorization', makeAuthHeader(validUser, invalidSecret))
              .expect(401, { error: `Unauthorized request` })
              })
    
        it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
          const invalidUser = { username: 'user-not-existy', id: 1 }
            return supertest(app)
              .get(`/api/posts/1`)
              .set('Authorization', makeAuthHeader(invalidUser))
              .expect(401, { error: `Unauthorized request` })
              })
    

    it('responds with 200 and the specified post', () => {
      const postId = 2
      const expectedPost = testPosts[postId - 1]
        return supertest(app)
          .get(`/api/posts/${postId}`)
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(200, expectedPost)
         })
       })
      })
      


describe('DELETE /posts/:id', () => {
        
  context(`Given no posts`, () => {

    const testUsers = makeUsersArray()

  beforeEach('insert users', () =>
    seedUsers(db, testUsers)
    );

              
    it(`responds 404 the post doesn't exist`, () => {
      return supertest(app)
        .delete(`/api/posts/123`)
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .expect(404, {
          error: { message: `Post doesn't exist` }
                  })
              })
            })
      
  context('Given there ARE posts in the database', () => {
        const testUsers = makeUsersArray()
        const testPosts = makePostsArray()

      beforeEach('insert users', () =>
        seedUsers(db, testUsers)
        );

      beforeEach('insert posts', () =>
        seedPosts(db, testPosts)
        );  


    it('removes the post by id from the store', () => {
      const idToRemove = 2
      const expectedPost = testPosts.filter(post => post.post_id !== idToRemove)
                return supertest(app)
                  .delete(`/api/posts/${idToRemove}`)
                  .set('Authorization', makeAuthHeader(testUsers[0]))
                  .expect(204)
                  .then(() =>
                    supertest(app)
                      .get(`/api/posts`)
                      .set('Authorization', makeAuthHeader(testUsers[0]))
                      .expect(expectedPost)
                  )
              })
            })
          })  
          
    
          
describe(`PATCH /api/posts/:post_id`, () => {
  context(`Given no posts`, () => {

      const testUsers = makeUsersArray()
      

    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );

  
    it(`responds with 404`, () => {
      const postId = 123456
      return supertest(app)
      .patch(`/api/posts/${postId}`)
      .set('Authorization', makeAuthHeader(testUsers[0]))
      .expect(404, { error: { message: `Post doesn't exist` } })
      })
    })
          
  context('Given there ARE posts in the database', () => {
    const testUsers = makeUsersArray()
    const testPosts = makePostsArray()
 
    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );

    beforeEach('insert posts', () =>
      seedPosts(db, testPosts)
      );  

  it('responds with 204 and updates post', () => {
                        
    const idToUpdate = 2
    const updatedPost = {
      content: 'updated content',
      profile_pic: 'updated pic',
      date: '2019-04-22T16:28:32.615Z'
      }
          
    const expectedPost = {
      ...testPosts[idToUpdate - 1],
      ...updatedPost
                  }
                           
    return supertest(app)
      .patch(`/api/posts/${idToUpdate}`)
      .set('Authorization', makeAuthHeader(testUsers[0]))
      .send(updatedPost)
      .expect(204)
      .then(res =>
        supertest(app)
        .get(`/api/posts/${idToUpdate}`)
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .expect(expectedPost)
      )
    }) 
                
    it(`responds with 400 when no required fields supplied`, () => {
                  
      const idToUpdate = 2
        return supertest(app)
        .patch(`/api/posts/${idToUpdate}`)
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .send({ irrelevantField: 'foo' })
        .expect(400, {
            error: {
              message: `Request body must contain either 'content'`
            }
          })
        })
                
    it(`responds with 204 when updating only a subset of fields`, () => {
                  
      const idToUpdate = 2
      const updatedPost = {
            content: 'updated content',
                               }
      const expectedPost = {
          ...testPosts[idToUpdate - 1],
          ...updatedPost
                  }
                            
      return supertest(app)
        .patch(`/api/posts/${idToUpdate}`)
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .send({
            ...updatedPost,
            fieldToIgnore: 'should not be in GET response'
                            })
        .expect(204)
        .then(res =>
          supertest(app)
          .get(`/api/posts/${idToUpdate}`)
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(expectedPost)
        )
      })
    })
  })
                  



  describe(`POST /posts`, () => {

      const testUsers = makeUsersArray()

    beforeEach('insert users', () =>
      seedUsers(db, testUsers)
      );



    it(`creates a post, responding with 201 and the new post`, function() {
      this.retries(3)
      const newPost = {
        post_id: 5,
        content: 'test new content',
        post_pic: 'test new pic' ,
        date: '2019-04-22T16:28:32.615Z'
        }

      return supertest(app)
        .post('/api/posts')
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body.content).to.eql(newPost.content)
          expect(res.body.post_pic).to.eql(newPost.post_pic)
          const expected = new Intl.DateTimeFormat('en-US').format(new Date(res.body.date))
          const actual = new Intl.DateTimeFormat('en-US').format(new Date(newUpdate.date))
          expect(actual).to.eql(expected)
          expect(res.body).to.have.property('post_id')
          expect(res.headers.location).to.eql(`/api/posts/${res.body.post_id}`)
                })
            .then(postRes =>
              supertest(app)
              .get(`/api/posts/${postRes.body.post_id}`)
              .set('Authorization', makeAuthHeader(testUsers[0]))
              .expect(postRes.body)
                )
            })
            
      const requiredFields = ['content']
            
        requiredFields.forEach(field => {
          const newPost = {
            content: 'test new content'
            }
            
      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newPost[field]
            
        return supertest(app)
          .post('/api/posts')
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .send(newPost)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
                     })
                 })
               })
                 
      it('removes XSS attack content', () => {
        const { maliciousPost, expectedPost } = makeMaliciousPost();
          return supertest(app)
            .post('/api/posts')
            .set('Authorization', makeAuthHeader(testUsers[0]))
            .send(maliciousPost)
            .expect(201)
            .expect(res => {
              expect(res.body.content).to.eql(expectedPost.content)
              expect(res.body.post_pic).to.eql(expectedPost.post_pic)
              expect(res.body.date).to.eql(expectedUpdate.date)
                          
                           })
                        })
                      })

    })


