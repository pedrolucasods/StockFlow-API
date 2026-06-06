import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { IdValidator } from '#validators/global/id_validator'
import { UpdateStatusUserValidador } from '#validators/update_status_user_validator'

export default class UsersController {
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