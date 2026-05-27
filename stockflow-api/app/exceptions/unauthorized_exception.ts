import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  static status = 401
  static status_code = 'E_UNAUTHORIZED'

  constructor(message = 'Unauthorized'){
    super(message)
  }
}