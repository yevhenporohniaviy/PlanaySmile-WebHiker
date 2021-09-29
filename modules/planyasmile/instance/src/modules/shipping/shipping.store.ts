import { Context } from '@nuxt/types';
import { ShippingType, ActionUpdateShippingTypeDto, UpdateShippingTypeDto } from "./shipping.interface";
import {ShippingService} from "./shipping.service";

interface State {
  data: ShippingType[]
}

export const ShippingStore = (context:Context) => {

  const shippingService = new ShippingService(context)

  return {

    namespaced: true,
    state: ():State => ({
      data:[],
    }),
    actions:{
      async fetchItem({commit}:any) {
        let shipping:ShippingType = await shippingService.fetchItem()
        commit('fetchItem', shipping)
      },
      async loadItem({commit}:any, shipping: ShippingType) {
        commit('loadItem', shipping)
      },
      async createItem({commit}:any, payload:UpdateShippingTypeDto,) {
        let shipping:ShippingType = await shippingService.createItem(payload)
        commit('createItem', shipping)
      },
      async updateItem({commit}: any, payload:ActionUpdateShippingTypeDto) {
        let shipping:UpdateShippingTypeDto = await shippingService.updateItem(payload._id, payload.object)
        let payloadUpdate:ActionUpdateShippingTypeDto = {
          _id: payload._id,
          object: shipping
        }
        commit('updateItem', payloadUpdate)
      },
      async removeItem({commit}:any, _id:String) {
        await shippingService.removeItem(_id)
        commit('removeItem', _id)
      }

    },
    mutations: {
      loadItem(state:State, shipping:ShippingType) {
        if (state.data.find(x => x._id === shipping._id)) {
          state.data.map(x => x._id === shipping._id ? shipping : x)
        } else {
          state.data = [...state.data, shipping]
        }
      },
      createItem(state:State, shipping:ShippingType) {
        state.data = [...state.data, shipping]
      },
      updateItem(state:State, payload:ActionUpdateShippingTypeDto) {
        state.data = state.data.map(x => { return x._id === payload._id ? Object.assign({}, x, payload.object) : x })
      },
      removeItem(state:State, payload:ActionUpdateShippingTypeDto) {
        state.data = state.data.filter(x => x._id !== payload._id)
      }
    },
    getters: {
      findItems: (state:State) => () => {
        return state.data;
      },
      findItem: (state:State) => () => {
        return state.data[state.data.length - 1];
      }
    }
  }
}
