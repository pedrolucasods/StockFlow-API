import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const SupplierDeleteValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().positive()
        })
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'id.id':
      'Invalid id!'
  })