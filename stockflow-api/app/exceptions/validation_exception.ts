import { Exception } from '@adonisjs/core/exceptions'

export default class ValidationException extends Exception {
  static status = 422
  static status_code = 'E_VALIDATION'

  constructor(message = 'Validation failed'){
    super(message)
  }
}