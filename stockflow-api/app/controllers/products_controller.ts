import type { HttpContext } from '@adonisjs/core/http'
import { ProductService } from '#services/product_service'
import { ProductValidator } from '#validators/product_validator'
import { PaginationValidator } from '#validators/global/pagination_validator'
import { IdValidator } from '#validators/global/id_validator'


export default class ProductsController {
    async list({request}:HttpContext){
        const query_payload = request.validateUsing(PaginationValidator, {data: request.qs()})
        const page = (await query_payload).page ?? 1
        const limit = (await query_payload).limit ?? 10
        const list_products = await ProductService.list(page,limit)
        return {list_products}
    }

    async search_produtc({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const product = await ProductService.search_produtc_id(params.id)
        return product
    }

    async create({request}:HttpContext){
        const data = await request.validateUsing(ProductValidator)
        const product = await ProductService.create(data)
        return ({product})
    }

    async update({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const data = await request.validateUsing(ProductValidator)
        data.product_id = params.id
        const product = await ProductService.update(data)
        return ({product})
    }

    async delete({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const product = await ProductService.delete(params.id)
        return product
    }
}