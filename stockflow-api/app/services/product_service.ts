import Product from "#models/product";
import { ProductUtils } from "../utils/products_utils.ts";
import { SupplierService } from "./supplier_service.ts";
import { CategoryService } from "./category_service.ts";
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";

interface ProductCreate{
  name:string,
  description:string,
  cost_price:number,
  quantity:number,
  minimum_quantity:number,
  category_id:number,
  supplier_id:number
}

interface ProductUpdate{
  product_id:number,
  name:string,
  description:string,
  cost_price:number,
  quantity:number,
  minimum_quantity:number,
  category_id:number,
  supplier_id:number
}

export class ProductService {
  // Your code here
  static async list(page:any,limit:any){
    const products = await Product.query().orderBy('id','desc').paginate(page,limit)
    return products
  }

  static async search_produtc_id(id:any){
    const product = await Product.findBy('id',id)
    if(!product){
      throw new NotFoundException('Product Not Found!')
    }
    return product
  }

  static async search_produtc_all_fields(data:ProductCreate){
    const product = await Product.query().where('name',data.name).where('description',data.description)
    .where('cost_price',data.cost_price).where('quantity',data.quantity).where('category_id',data.category_id)
    .where('supplier_id',data.supplier_id)
    return product
  } 

  static async create(data:ProductCreate){
    const same_product = await this.search_produtc_all_fields(data)
    if(same_product[0]){
      throw new ValidationException('Product Already Exist!')
    }
    const find_supplier = await SupplierService.search_supplier_id(data.supplier_id)
    if(!find_supplier){
      throw new NotFoundException('Supplier Not Found!')
    }
    const find_category = await CategoryService.search_category_id(data.category_id)
    if(!find_category){
      throw new NotFoundException('Category Not Found!')
    }
    const sku = await ProductUtils.generatesku(data.name)
    const price = await ProductUtils.generate_price(data.quantity,data.cost_price)
    const barcode = await ProductUtils.genarate_barcode()
    data.sku = sku
    data.price = price
    data.barcode = barcode
    const register_product = await Product.create({
      name: data.name,
      description: data.description,
      sku: data.sku,
      barcode: data.barcode,
      price: data.price,
      costPrice: data.cost_price,
      quantity: data.quantity,
      minimumQuantity: data.minimum_quantity,
      categoryId: data.category_id,
      supplierId: data.supplier_id
    })
    return register_product
  }

  static async update(data:ProductUpdate){
    const find_product = await this.search_produtc_id(data.product_id)
    if(!find_product){
      throw new NotFoundException('Product Not Found!')
    }
    const same_product = await this.search_produtc_all_fields(data)
    if(same_product[0]){
      if(same_product[0].id !=find_product.id){
        throw new ValidationException('Product Already Exist!')
      }
    }
    const find_supplier = await SupplierService.search_supplier_id(data.supplier_id)
    if(!find_supplier){
      throw new NotFoundException('Supplier Not Found!')
    }
    const find_category = await CategoryService.search_category_id(data.category_id)
    if(!find_category){
      throw new NotFoundException('Category Not Found!')
    }
    const new_sku = await ProductUtils.generatesku(data.name)
    const sku = new_sku.split('-')[0] != (find_product.sku).split('-')[0] ? new_sku : find_product.sku
    const price = await ProductUtils.generate_price(data.quantity,data.cost_price)
    const barcode = await ProductUtils.genarate_barcode()
    data.sku = sku
    data.price = price
    data.barcode = barcode
    const update_product = find_product.merge({
      name: data.name,
      description: data.description,
      sku: data.sku,
      barcode: data.barcode,
      price: data.price,
      costPrice: data.cost_price,
      quantity: data.quantity,
      minimumQuantity: data.minimum_quantity,
      categoryId: data.category_id,
      supplierId: data.supplier_id
    })
    return await update_product.save()
  }

  static async delete(id:any){
    const find_product = await this.search_produtc_id(id)
    if(!find_product){
      throw new NotFoundException('Product Not Found!')
    }
    const delete_product = await find_product.delete()
    return ({message:"Product Deleted!",delete_product})
  }
}