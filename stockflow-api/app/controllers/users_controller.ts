import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { UserValidator } from '#validators/user_validator'
import { UpdateStatusUserValidador } from '#validators/update_status_user_validator'
import { PaginationValidator } from '#validators/global/pagination_validator'
import { IdValidator } from '#validators/global/id_validator'
export default class UsersController {
    async list({request}:HttpContext){
        const query_payload = request.validateUsing(PaginationValidator,{data:request.qs()})
        const page = (await query_payload).page ?? 1
        const limit = (await query_payload).limit ?? 10
        const list_users = await UserService.list(page,limit)
        return ({list_users})
    }

    async search_user({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const user = await UserService.search_user_id(params.id)
        return user
    }

    async update({request}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const data = await request.validateUsing(UserValidator)
        data.user_id = params.id
        const user = await UserService.update(data)
        return user
    }

    async update_status({request,auth}:HttpContext){
        const {params} = await request.validateUsing(IdValidator)
        const data = await request.validateUsing(UpdateStatusUserValidador)
        data.user_id = params.id
        data.actual_user_id = auth.user!.id
        const user = await UserService.update_status(data)
        if(data.is_active == true){
            return ({message:'User activated successfully',user})
        }
        return ({message:'User deactivated successfully',user})
    }
}