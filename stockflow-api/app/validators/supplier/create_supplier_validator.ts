import vine,{SimpleMessagesProvider} from '@vinejs/vine'

const brPhoneRegex = /^(?:\+55\s?)?(?:\(?([1-9][1-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

export const SupplierCreateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(5).maxLength(150),
        email: vine.string().maxLength(150),
        phone: vine.string().regex(brPhoneRegex),
        cnpj: vine.string(),
        address: vine.string().minLength(5).maxLength(150)
    })
)

vine.messagesProvider =
  new SimpleMessagesProvider({
    'name.name':
      'Invalid name!',

    'email.email':
        'Invalid email!',
    
    'phone.phone':
      'Invalid phone!',

    'cnpj.cnpj':
      'Invalid cnpj!',

    'address.address':
      'Invalid address!',
  })