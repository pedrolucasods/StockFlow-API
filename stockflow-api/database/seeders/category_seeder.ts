import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import { faker } from '@faker-js/faker'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    for(let i=0; i<10; i++){
      await Category.create({
        name:faker.commerce.productMaterial(),
        description:faker.commerce.productDescription()
      })
    }
  }
}