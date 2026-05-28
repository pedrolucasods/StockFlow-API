import type { HttpContext } from '@adonisjs/core/http'
import { ValidadorLogin } from '#validators/auth/login_validator'
import { ValidadorRegister } from '#validators/auth/register_validator'
import { UserService } from '#services/auth/user_service'


export default class AuthController {
    async login({request, auth}:HttpContext){
        const data = await request.validateUsing(ValidadorLogin)
        const user = await UserService.login(data)
        const token = await auth.use('jwt').generate(user)
        return {token,user}
    }

    async register({request}:HttpContext){
        const data = await request.validateUsing(ValidadorRegister)
        const user = await UserService.register(data)
        return {user} 
    }
}