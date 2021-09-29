import {Context} from "@nuxt/types";
import {OrdersType, UpdateOrdersTypeDto} from "./orders.interface";

export class OrdersService {

  context:Context;

  constructor(context:Context){
    this.context = context
  }

  async fetchItem(orderID: String):Promise<OrdersType> {
    const res = await this.context.$axios.get(`orders/${orderID}`)
    return res.data
  }
  async fetchItems(patientID:String):Promise<OrdersType[]> {
    // const res = await this.context.$axios.get(`orders/by-patient/${patientID}`)
    const res = await this.context.$axios.get(`patients/${patientID}/orders`)
    return res.data
  }

  async createItem(object:OrdersType):Promise<OrdersType> {
    const res =  await this.context.$axios.post('orders', object)
    return res.data
  }

  async updateItem(_id:String, object:UpdateOrdersTypeDto):Promise<UpdateOrdersTypeDto> {
    const res =  await this.context.$axios.patch(`orders/${_id}`, object)
    return res.data
  }

  async removeItem(_id:String):Promise<OrdersType> {
    return await this.context.$axios.delete(`orders/${_id}`)
  }
}
