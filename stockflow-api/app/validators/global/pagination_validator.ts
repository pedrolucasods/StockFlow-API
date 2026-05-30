import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const PaginationValidator = vine.compile(
    vine.object({
        page: vine.number().positive().optional(),
        limit: vine.number().positive().max(100).optional()
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'page.page':
      'Invalid page!',

    'limit.limit':
        'Invalid limit!'
  })