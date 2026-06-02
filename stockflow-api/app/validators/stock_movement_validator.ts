import vine,{SimpleMessagesProvider} from '@vinejs/vine'
 
const NotZero = vine.createRule((value, _,field)=>{
    if(typeof value !== 'number') return
    if(value === 0){
        field.report('The {{ field }} field cannot be zero','notZero',field)
    }
})

export const StockMovementValidator = vine.compile(
    vine.object({
        product_id:vine.number().withoutDecimals().positive(),
        type:vine.enum(['ENTRY','EXIT','ADJUSTMENT']),
        quantity:vine.number().use(NotZero()).withoutDecimals(),
        reason:vine.string().maxLength(255)
    })
)


vine.messagesProvider =
  new SimpleMessagesProvider({
    'product_id.product_id':
      'Invalid product!',

    'type.type':
        'Invalid type!',
    
    'quantity.quantity':
      'Invalid quantity!',

    'reason.reason':
      'Invalid reason!'
  })