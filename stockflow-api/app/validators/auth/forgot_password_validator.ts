import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const ValidatorForgotPassword = vine.compile(
    vine.object({
        email: vine.string().email().maxLength(150)
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'email.email':
      'O email informado é inválido!'
})