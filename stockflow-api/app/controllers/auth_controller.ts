import type { HttpContext } from '@adonisjs/core/http'
import { ValidadorLogin } from '#validators/auth/login_validator'
import { ValidadorRegister } from '#validators/auth/register_validator'
import { ValidatorForgotPassword } from '#validators/auth/forgot_password_validator'
import { AuthService } from '#services/auth/auth_service'
import { PasswordResetService } from '#services/password_reset_service'

export default class AuthController {
    async login({request, auth}:HttpContext){
        const data = await request.validateUsing(ValidadorLogin)
        const user = await AuthService.login(data)
        const token = await auth.use('jwt').generate(user)
        return {token,user}
    }

    async register({request}:HttpContext){
        const data = await request.validateUsing(ValidadorRegister)
        const user = await AuthService.register(data)
        return {user} 
    }

    async forgot_password({request}:HttpContext){
        const data = await request.validateUsing(ValidatorForgotPassword)
        const token_reset = await PasswordResetService.create_code_reset(data.email)
        return ({message:"Recovery code sent"})
    }
}