import { Exception } from '@adonisjs/core/exceptions'

export default class ForbiddenException extends Exception {
  static status = 403
  static status_code = 'E_FORBIDDEN'

  constructor(message = 'Access denied'){
    super(message)
  }
}