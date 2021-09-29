import { Context } from '@nuxt/types'
import { OrdersService } from './orders.service'
import { OrdersType, ActionUpdateOrdersTypeDto, UpdateOrdersTypeDto } from "./orders.interface";

interface State {
  data: OrdersType[]
}

export const OrdersStore = (context:Context) => {

  const ordersService = new OrdersService(context)

  return {
    namespaced: true,
    state: ():State => ({
      data:[],
    }),
    mutations: {
      loadItem(state:State, order:OrdersType) {
        if (state.data.find(x => x._id === order._id)) {
          state.data.map(x => x._id === order._id ? order : x)
        } else {
          state.data = [...state.data, order]
        }
      },
      loadItems(state:State, orders:Array<OrdersType>) {
        state.data = orders
      },
      createItem(state:State, order:OrdersType) {
        state.data = [...state.data, order]

      },
      updateItem(state:State, payload:ActionUpdateOrdersTypeDto) {
        state.data = state.data.map(x => { return x._id === payload._id ? Object.assign({}, x, payload.object) : x })
      },
      removeItem(state:State, payload:ActionUpdateOrdersTypeDto) {
        state.data = state.data.filter(x => x._id !== payload._id)
      }
    },
    actions:{
      async fetchItem({commit}:any, orderID: String) {
        let order:OrdersType = await ordersService.fetchItem(orderID)
        commit('loadItem', order)
      },
      async fetchItems({commit}:any, patientID:String) {
        let orders:OrdersType[] = await ordersService.fetchItems(patientID)
        commit('loadItems', orders)
      },
      async loadItem({commit}:any, order: OrdersType) {
        commit('loadItem', order)
      },
      async loadItems({commit}:any, orders: OrdersType[] ) {
        commit('loadItems', orders)
      },

      async createItem({commit}:any, object:OrdersType) {
        let order:OrdersType = await ordersService.createItem(object)
        commit('createItem', order)
        return order
      },
      async updateItem({commit}:any, payload:ActionUpdateOrdersTypeDto) {
        let order:UpdateOrdersTypeDto = await ordersService.updateItem(payload._id, payload.object)
        let payloadUpdate:ActionUpdateOrdersTypeDto = {
          _id: payload._id,
          object: order
        }
        commit('updateItem', payloadUpdate)
      },
      async removeItem({commit}:any, _id:String) {
        let order:OrdersType = await ordersService.removeItem(_id)
        let payloadRemove:ActionUpdateOrdersTypeDto = {
          _id: order._id,
          object: order
        }
        commit('removeItem', payloadRemove)
      }
    },
    getters: {
      findItem: (state:State) => (orderID:string) => {
        return state.data.find(x => x._id === orderID);
      },
      findItems: (state:State) => (patientID: String) => {
        return state.data.filter(x => x.patient === patientID);
      }
    }
  }
}
