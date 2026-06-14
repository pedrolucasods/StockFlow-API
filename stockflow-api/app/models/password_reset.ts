import { PasswordResetSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from './user.ts'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PasswordReset extends PasswordResetSchema {

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}