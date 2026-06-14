import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const CategoryValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(5).maxLength(150),
        description: vine.string().minLength(5).maxLength(300)
    })
)

vine.messagesProvider =
new SimpleMessagesProvider({
    'name.name':
        'Invalid Name!',
    'description.description':
        'Invalid Description!'
})