import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'
import {faker,fakerPT_BR} from '@faker-js/faker'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    for(let i=0; i<5; i++){
      await Supplier.create({
        name: `${fakerPT_BR.person.firstName()} ${fakerPT_BR.person.lastName()}`,
        email: faker.internet.email(),
        phone: fakerPT_BR.phone.number(),
        cnpj: fakerPT_BR.commerce.isbn(),
        address: faker.location.streetAddress()
      })
    }
  }
}