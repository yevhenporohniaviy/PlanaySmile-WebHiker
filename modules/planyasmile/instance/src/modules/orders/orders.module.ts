import { Context } from '@nuxt/types'
import { OrdersType, UpdateOrdersTypeDto, ActionUpdateOrdersTypeDto} from "./orders.interface";

export default class OrdersModule {

  context:Context;

  constructor(context:Context){
    this.context = context
  }

  async loadItem(payload: OrdersType):Promise<void> {
    await this.context.store.dispatch('planyasmile/orders/loadItem', payload)
  }
  async loadItems(payload: OrdersType[]):Promise<void> {
    await this.context.store.dispatch('planyasmile/orders/loadItems', payload)
  }
  async fetchItem(orderID: String):Promise<OrdersType> {
    await this.context.store.dispatch('planyasmile/orders/fetchItem', orderID)
    return this.findItem(orderID)
  }
  async fetchItems(patientID: String):Promise<OrdersType[]> {
    await this.context.store.dispatch('planyasmile/orders/fetchItems', patientID)
    return this.findItems(patientID)
  }

  async createItem(order:UpdateOrdersTypeDto):Promise<OrdersType> {
    const createdOrder = await this.context.store.dispatch('planyasmile/orders/createItem', order)
    return this.findItem(createdOrder._id)
  }

  async updateItem(_id:String, object:UpdateOrdersTypeDto):Promise<OrdersType> {
    let payload:ActionUpdateOrdersTypeDto = {
      _id: _id,
      object: object
    }
    await this.context.store.dispatch('planyasmile/orders/updateItem', payload)
    return this.findItem(_id)
  }

  async removeItem(_id:String):Promise<void> {
    await this.context.store.dispatch('planyasmile/orders/removeItem', _id)
  }

  findItem(orderID: String):OrdersType {
    return this.context.store.getters['planyasmile/orders/findItem'](orderID)
  }

  findItems(patientID: String):Array<OrdersType> {
    return this.context.store.getters['planyasmile/orders/findItems'](patientID)
  }

}
