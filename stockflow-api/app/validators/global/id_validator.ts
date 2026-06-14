import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const IdValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().withoutDecimals().positive()
        })
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'id.id':
      'Invalid id!'
  })