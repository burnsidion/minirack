exports.up = (knex, Promise) => {
return knex.schema.createTable('minidiscs', (table) => {
  table.increments()
  table.string('title', 255).notNullable().defaultTo('')
  table.string('artist', 255).notNullable().defaultTo('')
  table.string('genre', 255).notNullable().defaultTo('')
  table.text('description').notNullable().defaultTo('')
  table.text('cover_url').notNullable().defaultTo('')
  table.timestamps(true, true)
  // OR
  // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
  // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
})

};

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('minidiscs')
