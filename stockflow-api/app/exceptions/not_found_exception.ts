import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static status = 404
  static status_code = 'E_NOT_FOUND'

  constructor(message = 'Resource not found'){
    super(message)
  }
}