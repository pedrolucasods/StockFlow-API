import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('sku').notNullable().unique()
      table.string('barcode').unique().nullable()
      table.decimal('price',8,2).notNullable()
      table.decimal('cost_price',8,2).nullable()
      table.integer('quantity').notNullable()
      table.integer('minimum_quantity').nullable()
      table.integer('category_id').notNullable().unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('supplier_id').notNullable().unsigned().references('id').inTable('suppliers').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}