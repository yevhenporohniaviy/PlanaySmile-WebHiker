import {Context} from "@nuxt/types";
import {PatientsType, UpdatePatientsTypeDto} from "./patients.interface";

export class PatientsService {

  context:Context;

  constructor(context:Context){
    this.context = context
  }

  async fetchItem(_id: String):Promise<PatientsType> {
    const res =  await this.context.$axios.get(`patients/${_id}`)
    return res.data
  }
  async fetchItems(query:Object):Promise<PatientsType[]> {
     const res = await this.context.$axios.get('patients', {
      params: {
        ...query
      }
    })
    return res.data
  }

  async createItem(object:PatientsType):Promise<PatientsType> {
    let formData = new FormData()

    Object.entries(object).forEach(([key, value]) => {
      if(value) formData.append(key, value)
    })

    const res =  await this.context.$axios.post('patients', formData)
    return res.data
  }

  async updateItem(_id:String, object:UpdatePatientsTypeDto):Promise<UpdatePatientsTypeDto> {
    let formData = new FormData()

    Object.entries(object).forEach(([key, value]) => {
      if(value) formData.append(key, value)
    })

    const res = await this.context.$axios.patch(`patients/${_id}`, formData)
    return res.data
  }

  async removeItem(_id:String):Promise<void> {
    await this.context.$axios.delete(`patients/${_id}`)
  }
}
