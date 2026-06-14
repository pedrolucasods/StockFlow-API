import { ProductSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Category from './category.ts'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import Supplier from './supplier.ts'

export default class Product extends ProductSchema {

    @belongsTo(()=> Category)
    declare category: BelongsTo<typeof Category>

    @belongsTo(()=> Supplier)
    declare supplier: BelongsTo<typeof Supplier>
}