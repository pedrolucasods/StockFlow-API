import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PasswordReset from '#models/password_reset'
import PasswordResetUtils from '../../app/utils/password_reset_utils.ts'
import User from '#models/user'
import { faker } from '@faker-js/faker'


export default class extends BaseSeeder {
    async run() {

        for(let i = 0;i<10;i++){
            const idusers = (await User.query().select('id')).map(user => user.id)
            const user_token_reset = await PasswordResetUtils.generate_code()
            const expires_time = await PasswordResetUtils.generate_expires_time()
            
            await PasswordReset.create({
                userId:faker.helpers.arrayElement(idusers),
                recoveryCode:user_token_reset,
                expiresAt:expires_time
            })
        }

        
    }
}