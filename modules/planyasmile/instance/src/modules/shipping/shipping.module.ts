import { Context } from '@nuxt/types'
import { ShippingType, UpdateShippingTypeDto, ActionUpdateShippingTypeDto } from "./shipping.interface";

export default class ShippingModule {

  context:Context;

  constructor(context:Context){
    this.context = context
  }
  async loadItem(payload: ShippingType):Promise<void> {
    await this.context.store.dispatch('planyasmile/shipping/loadItem', payload)
  }
  async loadItems(payload: ShippingType[]):Promise<void> {
    await this.context.store.dispatch('planyasmile/shipping/loadItems', payload)
  }
  async fetchItem():Promise<void> {
    await this.context.store.dispatch('planyasmile/shipping/fetchItem')
  }
  async fetchItems():Promise<void> {
    await this.context.store.dispatch('planyasmile/shipping/fetchItems')
  }

  async createItem(object:UpdateShippingTypeDto):Promise<ShippingType> {
    await this.context.store.dispatch('planyasmile/shipping/createItem', object)
    return this.findItem()
  }

  async updateItem(_id: String, object:UpdateShippingTypeDto):Promise<ShippingType> {
    let payload:ActionUpdateShippingTypeDto = {
      _id: _id,
      object: object
    }
    return await this.context.store.dispatch('planyasmile/shipping/updateItem', payload )
  }

  async removeItem(_id: String):Promise<void> {
    return await this.context.store.dispatch('planyasmile/shipping/removeItem', _id )
  }

  findItem():ShippingType {
    return this.context.store.getters['planyasmile/shipping/findItem']()
  }
}
