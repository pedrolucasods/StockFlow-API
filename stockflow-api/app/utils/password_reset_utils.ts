import { customAlphabet } from "nanoid"
import { DateTime } from "luxon"

export default class PasswordResetUtils {
  static async generate_expires_time(){
    const date_advanced = DateTime.now().plus({minutes:15})
    return date_advanced
  }

  static async generate_code(){
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 4)
    return nanoid().toUpperCase()
  }
}
