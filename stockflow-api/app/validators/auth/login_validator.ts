import vine,{SimpleMessagesProvider} from '@vinejs/vine'


export const ValidadorLogin = vine.compile(
    vine.object({
        email: vine.string().email().maxLength(150),
        password: vine.string().minLength(6).maxLength(150)
    })
)
vine.messagesProvider =
  new SimpleMessagesProvider({
    'email.email':
      'O email informado é inválido!',

    'password.minLength':
      'A senha deve possuir no mínimo 6 caracteres!',
  })