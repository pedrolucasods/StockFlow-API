import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const ValidatorResetPassword = vine.compile(
    vine.object({
        email: vine.string().email().maxLength(150),
        recovery_code: vine.string().maxLength(4).minLength(4),
        password: vine.string().minLength(6).maxLength(150)
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'email.email':'O email  informado é inválido!',
    'recovery_code.recovery_code':'O código  informado é inválido!',
    'password.password':'A senha informada é inválida!'
  })