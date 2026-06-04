import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import ForbiddenException from '#exceptions/forbidden_exception'

export default class ActiveUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user
    if(!user?.isActive){
      throw new ForbiddenException('User account is inactive!')
    }
    return next()
  }
}