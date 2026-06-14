import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import Category from '#models/category'
import Supplier from '#models/supplier'
import { faker } from '@faker-js/faker'
import { ProductUtils } from '../../app/utils/products_utils.ts'
export default class extends BaseSeeder {
  async run() {
    const idcategories = (await Category.query().select('id')).map(category=>category.id)
    const idsuppliers = (await Supplier.query().select('id')).map(supplier=>supplier.id)
    // Write your database queries inside the run method
    for(let i=0; i<15;i++){
      let productname:string = faker.commerce.productName()
      let sku_value:string = await ProductUtils.generatesku(productname)
      let cost_price:number = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 })
      let quantity_product:number = faker.number.int({min:20, max:200})
      let resultprice:number = Number((cost_price*quantity_product).toFixed(2))

      await Product.create({
        name:productname,
        description:faker.commerce.productDescription(),
        sku:sku_value,
        barcode:faker.commerce.isbn(),
        price:resultprice,
        costPrice:cost_price,
        quantity:quantity_product,
        minimumQuantity:faker.number.int({min:1,max:10}),
        categoryId:faker.helpers.arrayElement(idcategories),
        supplierId:faker.helpers.arrayElement(idsuppliers)
      })
    }
  }
}
