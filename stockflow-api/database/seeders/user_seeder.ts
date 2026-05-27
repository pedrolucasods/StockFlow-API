import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import faker from 'faker-br'
export default class extends BaseSeeder {
  async run() {
    const UserRoles = {
      ADMIN: 'admin',
      USER: 'user'
    }
    // Write your database queries inside the run method
    for(let i=0; i<3;i++){
      await User.create({
        name:`${faker.person.firstName()} ${faker.person.lastName()} `,
        email:faker.internet.email(),
        password:faker.internet.password(),
        role:faker.helpers.enumValue(UserRoles)
      })
    }
  }
}