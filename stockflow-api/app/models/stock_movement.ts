import { StockMovementSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Product from './product.ts'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class StockMovement extends StockMovementSchema {

    @belongsTo(()=> Product)
    declare product: BelongsTo<typeof Product>

    @belongsTo(()=> User)
    declare user: BelongsTo<typeof User>
}