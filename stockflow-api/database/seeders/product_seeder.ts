import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import Category from '#models/category'
import Supplier from '#models/supplier'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const idcategories = (await Category.query().select('id')).map(category=>category.id)
    const idsuppliers = (await Supplier.query().select('id')).map(supplier=>supplier.id)
    // Write your database queries inside the run method
    for(let i=0; i<15;i++){
      let productname:string = faker.commerce.productName()
      let sku_value:string = await this.generatesku(productname)
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
  async generatesku(product_name:string){
    const first3letters:string =  (product_name.slice(0,3)).toUpperCase()
    const same_string_sku = await Product.query().where('sku','like',`${first3letters}%`).orderBy('id','desc').first()
    const id_same_sku:number = same_string_sku? parseInt(((same_string_sku.sku).split('-'))[1]) : 0
    const idsku:number = id_same_sku>0 ? id_same_sku+1: 1

    const sku:string = `${first3letters}-0${idsku}`
    return sku
  } 
}
