import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// import User from 'App/Models/User';

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title');
      table.string('image');
      table.string('slug').unique();
      table.string('content', 1000);
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
