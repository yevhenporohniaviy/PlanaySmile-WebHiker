import { Context } from '@nuxt/types'
import { PatientsType, UpdatePatientsTypeDto, ActionUpdatePatientsTypeDto} from "./patients.interface";

export default class PatientsModule {

  context:Context;

  constructor(context:Context){
    this.context = context
  }

  async loadItem(payload: PatientsType):Promise<void> {
    await this.context.store.dispatch('planyasmile/patients/loadItem', payload)
  }
  async loadItems(payload: PatientsType[]):Promise<void> {
    await this.context.store.dispatch('planyasmile/patients/loadItems', payload)
  }
  async fetchItem(_id: String):Promise<PatientsType> {
    await this.context.store.dispatch('planyasmile/patients/fetchItem', _id)
    return this.findItem(_id)
  }
  async fetchItems(query: Object):Promise<void> {
    await this.context.store.dispatch('planyasmile/patients/fetchItems', query)
  }

  async createItem(patient:UpdatePatientsTypeDto):Promise<PatientsType> {
    await this.context.store.dispatch('planyasmile/patients/createItem', patient)
    return this.getItem()
  }

  async updateItem(_id:String, object:UpdatePatientsTypeDto):Promise<PatientsType> {
    let payload:ActionUpdatePatientsTypeDto = {
      _id: _id,
      object: object
    }
    await this.context.store.dispatch('planyasmile/patients/updateItem', payload)
    return this.findItem(_id)
  }

  async removeItem(_id:String):Promise<void> {
    await this.context.store.dispatch('planyasmile/patients/removeItem', _id)
  }

  getItem():PatientsType {
    return this.context.store.getters['planyasmile/patients/getItem']()
  }

  findItem(_id:String):PatientsType {
    return this.context.store.getters['planyasmile/patients/findItem'](_id)
  }

  findItems():Array<PatientsType> {
    return this.context.store.getters['planyasmile/patients/findItems']()
  }

}
