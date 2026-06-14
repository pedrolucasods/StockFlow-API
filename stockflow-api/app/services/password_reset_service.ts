import PasswordReset from "#models/password_reset";
import PasswordResetUtils from "../utils/password_reset_utils.ts";
import { UserService } from "./user_service.ts";
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";
import env from '#start/env'
import {Resend} from 'resend'
import { DateTime } from "luxon";
import hash from "@adonisjs/core/services/hash";

interface PasswordResetInterface{
  email:string,
  recovery_code:string,
  password:string
}

export class PasswordResetService {
  static async create_code_reset(email:any){
    try {
      const find_user = await UserService.search_user_email(email)
      if(!find_user || !find_user.isActive){
        throw new NotFoundException('User Not Found!')
      }

      const date_currently = DateTime.now()
      const find_last_code = await this.search_last_code(find_user.id)
      if(find_last_code && (find_last_code.expiresAt >= date_currently)){
        const invalid_code = find_last_code.merge({
          expiresAt: date_currently
        })
        await invalid_code.save()
      }

      const user_code_reset = await PasswordResetUtils.generate_code()
      const expires_time = await PasswordResetUtils.generate_expires_time()
      const save_code = await PasswordReset.create({
        userId:find_user.id,
        recoveryCode:user_code_reset,
        expiresAt:expires_time
      })
      const send_email = await this.send_email_code(find_user.email,user_code_reset)
      if(send_email.error){
        await this.delete(find_last_code.id)
        throw new ValidationException(send_email.error.message)
      }
      return save_code

    } catch (error) {
      throw new ValidationException(error) 
    }
  }

  static search_last_code(user_id:any){
    const find_code = PasswordReset.query().where('user_id',user_id).orderBy('id','desc').first()
    return find_code
  }

  static search_code(code:any,user_id:any){
    const find_code = PasswordReset.query().where('recovery_code',code).where('user_id',user_id).orderBy('id','desc').first()
    return find_code
  }

  static async delete(id:any){
    const find_code = await PasswordReset.findBy('id',id)
    if(!find_code){
      throw new NotFoundException('Code Reset Not Found!')
    }
    return find_code.delete()
  }

  static async send_email_code(email:any,code_reset:any){
    const resend = new Resend(env.get('RESEND_API_KEY'))

    const message = `
    Password Recovery
    We received a request to reset your password.

    Your recovery code is:

    <b>${code_reset}</b>

    This code will expire in 15 minutes.

    If you did not request a password reset, you can safely ignore this email.

    StockFlow Team
    `

    return resend.emails.send({
      from: 'onboarding@resend.dev',
      to:email,
      subject: 'Reset Password Code',
      html:message
    })
  }

  static async reset_password(data:PasswordResetInterface){
    const find_user = await UserService.search_user_email(data.email)
    if(!find_user || !find_user.isActive){
      throw new NotFoundException('User Not Found!')
    }

    const find_code = await this.search_code(data.recovery_code,find_user.id)
    if(!find_code || find_code.expiresAt <= DateTime.now()){
      throw new ValidationException('Invalid code!')
    }

    const verify_same_password = await hash.verify(find_user.password,data.password)
    if(verify_same_password){
      throw new ValidationException('The new password cannot be the same as the current password')
    }
    const reset_password = find_user.merge({password:data.password})
    const invalid_code = find_code.merge({expiresAt:DateTime.now()})
    const changed_password = await reset_password.save()
    await invalid_code.save()
    return changed_password
  }
}