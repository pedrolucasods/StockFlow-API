import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const UpdateStatusUserValidador = vine.compile(
    vine.object({
        is_active:vine.boolean()
    })
)
vine.messagesProvider =
  new SimpleMessagesProvider({
    'is_active.is_active':
      'Invalid is active!'
  })