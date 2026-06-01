import Product from "#models/product"
import { faker } from "@faker-js/faker"
export class ProductUtils {
    static async generatesku(product_name: string) {
        const first3letters: string = (product_name.slice(0, 3)).toUpperCase()
        const same_string_sku = await Product.query().where('sku', 'like', `${first3letters}%`).orderBy('sku', 'desc').first()
        const id_same_sku: number = same_string_sku ? parseInt(((same_string_sku.sku).split('-'))[1]) : 0
        const idsku: number = id_same_sku > 0 ? id_same_sku + 1 : 1

        const sku: string = `${first3letters}-0${idsku}`
        return sku
    }

    static async generate_price(quantity:number,cost_price:number){
        const price = quantity*cost_price
        return price
    }

    static async genarate_barcode(){
        const barcode = faker.commerce.isbn()
        return barcode 
    }
}
