import {Context} from "@nuxt/types";
import {ActionUpdateShippingTypeDto, ShippingType, UpdateShippingTypeDto} from "./shipping.interface";

export class ShippingService {

  context:Context;

  constructor(context:Context){
    this.context = context
  }
  async fetchItem():Promise<ShippingType> {
    return await this.context.$axios.get('/shipping')
  }

  async createItem(payload:UpdateShippingTypeDto):Promise<ShippingType> {
    const res = await this.context.$axios.post( `/shipping`, payload)
    return res.data
  }
  async updateItem(_id:String, payload:UpdateShippingTypeDto):Promise<UpdateShippingTypeDto> {
    return payload
  }

  async removeItem(_id:String):Promise<Boolean> {
    return true
  }
}
