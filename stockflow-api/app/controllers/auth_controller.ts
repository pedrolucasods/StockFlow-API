import type { HttpContext } from '@adonisjs/core/http'
import { ValidatorLogin } from '#validators/auth/login_validator'
import { ValidatorRegister } from '#validators/auth/register_validator'
import { ValidatorResetPassword } from '#validators/auth/password_reset_validator'
import { ValidatorForgotPassword } from '#validators/auth/forgot_password_validator'
import { AuthService } from '#services/auth/auth_service'
import { PasswordResetService } from '#services/password_reset_service'

export default class AuthController {
    async login({request, auth}:HttpContext){
        const data = await request.validateUsing(ValidatorLogin)
        const user = await AuthService.login(data)
        const token = await auth.use('jwt').generate(user)
        return {token,user}
    }

    async register({request}:HttpContext){
        const data = await request.validateUsing(ValidatorRegister)
        const user = await AuthService.register(data)
        return {user} 
    }

    async forgot_password({request}:HttpContext){
        const data = await request.validateUsing(ValidatorForgotPassword)
        const token_reset = await PasswordResetService.create_code_reset(data.email)
        return ({message:"Recovery code sent"})
    }

    async reset_password({request}:HttpContext){
        const data = await request.validateUsing(ValidatorResetPassword)
        const reset_password = await PasswordResetService.reset_password(data)
        return ({message:'Password changed!'})
    }
}