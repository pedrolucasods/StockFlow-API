import User from "#models/user";
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";
interface UserStatusUpdate {
    actual_user_id: number,
    user_id: number,
    is_active: boolean
}

export class UserService {

    static async search_user_id(id: any) {
        const user = await User.findBy('id', id)
        if (!user) {
            throw new NotFoundException('User Not Found!')
        }
        return user
    }

    static async total_activated_admins() {
        const result = await User.query().where('is_active', true).where('role', 'admin').count('* as total')
        const total_admins = result[0].$extras.total
        return total_admins
    }

    static async update_status(data: UserStatusUpdate) {
        const find_user = await this.search_user_id(data.user_id)
        if (data.is_active == false) {
            if(find_user.isActive == data.is_active){
                throw new ValidationException('User is already inactive')
            }

            if (find_user.id == data.actual_user_id) {
                throw new ValidationException('You cannot deactivate your own account')
            }

            if (find_user.role == 'admin') {
                const total_admins = await this.total_activated_admins()
                if (total_admins == 1) {
                    throw new ValidationException('Cannot deactivate the last active administrator')
                }
            }
        }else{
            if(find_user.isActive == data.is_active){
                throw new ValidationException('User is already active')
            }
        }


        const update_status_user = find_user.merge({
            isActive: data.is_active
        })

        return await update_status_user.save()

    }
}