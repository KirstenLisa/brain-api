const TasksService = {

    getAllTasks(knex) {
        return knex.select('*').from('tasks')
    },

    getById(knex, id) {
        return knex.from('tasks')
        .select('*')
        .where('task_id', id)
        .first()
      },

      insertTask(knex, newTask) {
        return knex
          .insert(newTask)
          .into('tasks')
          .returning('*')
          .then(rows => {
            return rows[0]
            })
          },
}


module.exports = TasksService