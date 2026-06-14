import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const UserValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(5).maxLength(150),
        email: vine.string().email().maxLength(150)
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'name.name':'Invalid Name!',
    'email.email':'Invalid Email!'
    
  })