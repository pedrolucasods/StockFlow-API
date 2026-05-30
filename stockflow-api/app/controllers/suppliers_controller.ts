import type { HttpContext } from '@adonisjs/core/http'
import { SupplierService } from '#services/supplier_service'
import { SupplierCreateValidator } from '#validators/supplier/create_supplier_validator'
import { SupplierUpdateValidator } from '#validators/supplier/update_supplier_validator'
import { IdValidator } from '#validators/global/id_validator'
import { PaginationValidator } from '#validators/global/pagination_validator'
export default class SuppliersController {
    async list({request}:HttpContext){
        const query_payload = request.validateUsing(PaginationValidator,{data: request.qs()})
        const page = (await query_payload).page ?? 1
        const limit = (await query_payload).limit ?? 10
        const list_suppliers = await SupplierService.list(page,limit)
        return ({list_suppliers})
    }

    async search_supplier({params}:HttpContext){
        const params_url = {supplier_id:params.id}
        const supplier = await SupplierService.search_supplier_id(params_url.supplier_id)
        return supplier
    }

    async create({request}: HttpContext){
        const data = await request.validateUsing(SupplierCreateValidator)
        const supplier = await SupplierService.create(data)
        return ({supplier})
    }

    async update({request,params}: HttpContext){
        const params_url = {supplier_id:params.id}
        const data = await request.validateUsing(SupplierUpdateValidator)
        data.supplier_id = params_url.supplier_id
        const supplier = await SupplierService.update(data)
        return ({supplier})
    }

    async delete({request}: HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const supplier = await SupplierService.delete(params.id)
        return supplier
    }
}