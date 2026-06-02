import type { HttpContext } from '@adonisjs/core/http'
import { StockService } from '#services/stock_service'
import { StockMovementValidator } from '#validators/stock_movement_validator'
import { PaginationValidator } from '#validators/global/pagination_validator'
import { IdValidator } from '#validators/global/id_validator'


export default class StockMovementsController {
    async list({request}:HttpContext){
        const query_payload = request.validateUsing(PaginationValidator,{data: request.qs()})
        const page = (await query_payload).page ?? 1
        const limit = (await query_payload).limit ?? 10
        const list_stock_movement = await StockService.list(page,limit)
        return ({list_stock_movement})
    }

    async search_stockmovement({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const stock_movement = await StockService.search_stockmovement_id(params.id)
        return ({stock_movement})
    }

    async create({request,auth}:HttpContext){
        let data = await request.validateUsing(StockMovementValidator)
        data.user_id = auth.user!.id
        const stock_movement = await StockService.create(data)
        return ({stock_movement})
    }
}