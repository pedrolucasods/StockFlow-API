import User from "#models/user";
import hash from "@adonisjs/core/services/hash";
import UnauthorizedException from "#exceptions/unauthorized_exception";
import ValidationException from "#exceptions/validation_exception";
import ForbiddenException from "#exceptions/forbidden_exception";

interface LoginUser{
  email:string,
  password:string
}

interface RegisterUser{
  name:string,
  email:string,
  password:string
}

export class AuthService {
  // Your code here
  static async login(data: LoginUser){
    const find_user = await User.findBy('email',data.email)
    if(!find_user){
      throw new UnauthorizedException('Invalid Credentials')
    }
    if(!find_user.isActive){
      throw new ForbiddenException('User account is inactive!')
    }
    const verify_password = await hash.verify(find_user.password,data.password)
    if(!verify_password){
      throw new UnauthorizedException('Invalid Credentials')
    }
    return find_user
    
  }

  static async register(data:RegisterUser){
    const find_user = await User.findBy('email',data.email)
    if(find_user){
      throw new ValidationException('Registration failed')
    }
    const register_user = await User.create({
      name:data.name,
      email:data.email,
      password:data.password,
      role: 'user',
      isActive:true
    })
    return register_user
  }
}