import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'
import faker from 'faker-br'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    for(let i=0; i<5; i++){
      await Supplier.create({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        cnpj: faker.br.cnpj(),
        address: faker.address.streetName()
      })
    }
  }
}