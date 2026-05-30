import Category from "#models/category";
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";

interface CategoryCreate{
  name:string,
  description:string
}

interface CategoryUpdate{
  category_id:number,
  name:string,
  description:string
}

export class CategoryService {
  static async list(page:any, limit:any){
    const categories = await Category.query().orderBy('id','desc').paginate(page,limit)
    return categories
  }

  static async search_category_id(id:any){
    const category = await Category.findBy('id',id)
    if(!category){
      throw new NotFoundException('Category Not Found!')
    }
    return category
  }

  static async search_category_all_fields(name:any,description:any){
    const category = await Category.query().where('name',name).where('description',description)
    return category
  }

  static async create(data:CategoryCreate){
    const same_category = await this.search_category_all_fields(data.name,data.description)
    if(same_category[0]){
      throw new ValidationException('Category Already Exist!')
    }
    const register_category = await Category.create({
      name:data.name,
      description:data.description
    })
    return register_category
  }

  static async update(data:CategoryUpdate){
    const find_category = await this.search_category_id(data.category_id)
    if(!find_category){
      throw new NotFoundException('Category Not Found!')
    }

    const category_same_data = await this.search_category_all_fields(data.name,data.description)
    if(category_same_data[0]){
      if(find_category.id || category_same_data[0].id){
        throw new ValidationException('Category Already Exist!')
      }
    }
    
    const update_category = find_category.merge({
      name:data.name,
      description:data.description
    })

    return await update_category.save()
  }

  static async delete(id:any){
    const find_category = await this.search_category_id(id)
    if(!find_category){
      throw new NotFoundException('Category Not Found!')
    }
    const delete_category = await find_category.delete()
    return ({message:"Category Deleted!",delete_category})
  }
}