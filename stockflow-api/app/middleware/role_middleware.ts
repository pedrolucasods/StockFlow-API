import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import ForbiddenException from '#exceptions/forbidden_exception'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.user
    if(!user || !allowedRoles.includes(user.role)){
      throw new ForbiddenException('Access denied: Insufficient permissions.')
    }
    return next()
  }
}