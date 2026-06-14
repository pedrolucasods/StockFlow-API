import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const ValidatorRegister = vine.compile(
    vine.object({
        name: vine.string().minLength(5).maxLength(150),
        email: vine.string().email().maxLength(150),
        password: vine.string().minLength(6).maxLength(150)
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'name.name':'O nome  informado é inválido!',
    'email.email':'O email  informado é inválido!',
    'password.minLength':'A senha deve possuir no mínimo 6 caracteres!',
    
  })