import { HttpContext } from '@adonisjs/core/http'
import { CategoryService } from '#services/category_service'
import { CategoryCreateValidator } from '#validators/category/create_category_validator'
import { CategoryUpdateValidator } from '#validators/category/update_category_validator'
import { PaginationValidator } from '#validators/global/pagination_validator'
import { IdValidator } from '#validators/global/id_validator'

export default class CategoriesController {
    async list({request}:HttpContext){
        const query_payload = request.validateUsing(PaginationValidator)
        const page = (await query_payload).page ?? 1
        const limit = (await query_payload).limit ?? 10
        const list_categories = await CategoryService.list(page,limit)
        return ({list_categories})
    }

    async search_category({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const category = await CategoryService.search_category_id(params.id)
        return category
    }

    async create({request}:HttpContext){
        const data = await request.validateUsing(CategoryCreateValidator)
        const category = await CategoryService.create(data)
        return category
    }

    async update({request,params}:HttpContext){
        const params_url = {category_id:params.id}
        const data = await request.validateUsing(CategoryUpdateValidator)
        data.category_id = params_url.category_id
        const category = await CategoryService.update(data)
        return category
    }

    async delete({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const category = await CategoryService.delete(params.id)
        return category
    }
}