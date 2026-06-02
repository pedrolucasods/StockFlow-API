import StockMovement from "#models/stock_movement";
import { ProductService } from "./product_service.ts";
import { ProductUtils } from "../utils/products_utils.ts";
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";

interface StockMovementCreate {
    product_id: number,
    user_id: number,
    type: string,
    quantity: number,
    reason: string
}

export class StockService {
    static async list(page: any, limit: any) {
        let stock_movements = await StockMovement.query()
            .preload('user',(userQuery)=>[
                userQuery.select('id','name','email')
            ])
            .orderBy('stock_movements.id', 'desc')
            .paginate(page, limit)


        return stock_movements
    }

    static async search_stockmovement_id(id:any){
        let stock_movement = await StockMovement.query()
            .where('id',id)
            .preload('user',(userQuery)=>{
                userQuery.select('id','name','email')
            })
        
        return stock_movement
    }

    static async create(data: StockMovementCreate) {
        let new_price: number = 0
        let new_quantity_product: number = 0
        const find_product = await ProductService.search_produtc_id(data.product_id)
        if (!find_product) {
            throw new NotFoundException('Product Not Found!')
        }

        if (data.type === 'ENTRY' && data.quantity>0) {

            new_quantity_product = find_product.quantity + data.quantity
            new_price = await ProductUtils.generate_price(new_quantity_product, find_product.costPrice)

        } else if (data.type === 'EXIT' && data.quantity>0) {

            new_quantity_product = find_product.quantity - data.quantity
            if (new_quantity_product < 0) {
                throw new ValidationException('Insufficient Stock!')
            }
            new_price = await ProductUtils.generate_price(new_quantity_product, find_product.costPrice)

        } else if (data.type === 'ADJUSTMENT') {
            if (data.quantity > 0) {
                new_quantity_product = find_product.quantity + data.quantity
            } else {
                new_quantity_product = find_product.quantity + (data.quantity)
                if (new_quantity_product < 0) {
                    throw new ValidationException('Insufficient Stock!')
                }
            }

            new_price = await ProductUtils.generate_price(new_quantity_product, find_product.costPrice)
        }else{
            throw new ValidationException('Quantity or Type Invalid!')
        }

        const register_stock_movement = await StockMovement.create({
            productId: find_product.id,
            userId: data.user_id,
            type: data.type,
            quantity: data.quantity,
            reason: data.reason
        })

        const update_product = find_product.merge({
            price: new_price,
            quantity: new_quantity_product
        })

        await update_product.save()
        return register_stock_movement
    }
}