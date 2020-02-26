const PostsService = {

    getAllPosts(knex) {
        return knex.select('*').from('posts')
    },

    getById(knex, id) {
        return knex.from('posts')
        .select('*')
        .where('post_id', id)
        .first()
      },

    insertPost(knex, newPost) {
      return knex
        .insert(newPost)
        .into('posts')
        .returning('*')
        .then(rows => {
          return rows[0]
          })
        },

    deletePost(knex, id) {
      return knex('posts')
          .where('post_id', id)
          .delete()
      },
  
    updatePost(knex, id, newPostFields) {
      return knex('posts')
          .where('post_id', id)
          .post(newPostFields)
      }
}


module.exports = PostsService;