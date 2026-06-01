import vine,{SimpleMessagesProvider} from '@vinejs/vine'

export const ProductValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(5).maxLength(150),
        description: vine.string().minLength(5).maxLength(300),
        cost_price: vine.number().positive(),
        quantity: vine.number().withoutDecimals().min(0),
        minimum_quantity: vine.number().withoutDecimals().positive(),
        category_id: vine.number().withoutDecimals().positive(),
        supplier_id: vine.number().withoutDecimals().positive()
    })
)

vine.messagesProvider = 
new SimpleMessagesProvider({
    'name.name': 'Invalid Name!',
    'description.description': 'Invalid Description!',
    'cost_price.cost_price': 'Invalid Cost Price!',
    'quantity.quantity': 'Invalid Quantity!',
    'minimum_quantity.minimum_quantity': 'Invalid Minimum Quantity!',
    'category_id.category_id': 'Invalid Category Id!',
    'supplier_id.supplier_id': 'Invalid Supplier Id!',
})