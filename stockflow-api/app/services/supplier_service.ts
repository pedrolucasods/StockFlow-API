import Supplier from "#models/supplier";
import { cnpj } from 'cpf-cnpj-validator'
import NotFoundException from "#exceptions/not_found_exception";
import ValidationException from "#exceptions/validation_exception";

interface SupplierCreate {
    name: string,
    email: string,
    phone: string,
    cnpj: string,
    address: string
}

interface SupplierUpdate {
    supplier_id:string,
    name: string,
    email: string,
    phone: string,
    cnpj: string,
    address: string
}

export class SupplierService {
    // Your code here
    static async list(page:any,limit:any) {
        const suppliers = await Supplier.query().orderBy('id','desc').paginate(page,limit)
        return suppliers
    }

    static async search_supplier_id(id: any) {
        const supplier = await Supplier.findBy('id', id)
        if (!supplier) {
            throw new NotFoundException('Supplier Not Found!')
        }
        return supplier
    }

    static async search_supplier_email(email: any) {
        const supplier = await Supplier.findBy('email', email)
        return supplier
    }

    static async search_supplier_cnpj(cnpj: any) {
        const supplier = await Supplier.findBy('cnpj', cnpj)
        return supplier
    }

    static async create(data: SupplierCreate) {
        const cnpjValidad: boolean = cnpj.isValid(data.cnpj)
        if (!cnpjValidad) {
            throw new ValidationException('Invalid CNPF!')
        }

        const find_supplier = await this.search_supplier_cnpj(data.cnpj)
        if (find_supplier) {
            throw new ValidationException('Registration Failed!')
        }

        const register_supplier = await Supplier.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            cnpj: data.cnpj,
            address: data.address,
        })

        return register_supplier
    }

    static async update(data: SupplierUpdate){
        const cnpjValidad: boolean = cnpj.isValid(data.cnpj)
        if(!cnpjValidad){
            throw new ValidationException('Invalid CNPJ!')
        }

        const find_supplier = await this.search_supplier_id(data.supplier_id)
        if(!find_supplier){
            throw new NotFoundException('Supplier Not Found!')
        }
        
        const supplier_same_cnpj = await this.search_supplier_cnpj(data.cnpj)
        if(supplier_same_cnpj && supplier_same_cnpj.id != find_supplier.id) {
            throw new ValidationException('Registration Failed!')
        }

        const update_supplier = find_supplier.merge({
            name:data.name,
            email:data.email,
            phone:data.phone,
            cnpj:data.cnpj,
            address:data.address
        })

        return await update_supplier.save()
    }

    static async delete(id:any){
        const find_supplier = await this.search_supplier_id(id)
        const delete_supplier = await find_supplier.delete()
        return ({message:"Supplier Deleted!",delete_supplier})
    }
}
