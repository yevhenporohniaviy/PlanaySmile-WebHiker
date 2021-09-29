import { Context} from '@nuxt/types'

import {AuthSignUpUserType} from "./../auth/auth.interface";
import {ActionUpdateUserTypeDto, UpdateUserTypeDto, UserType} from "./users.interface";

import { UsersService } from './users.service'
import {ActionUpdatePatientsTypeDto} from "~/modules/planyasmile/instance/src/modules/patients/patients.interface";




interface State {
  data: UserType[]
}

export const UsersStore = (context:Context) => {

  const usersService = new UsersService(context)

  return {

    namespaced: true,

    state: ():State => ({
      data:[],
    }),

    mutations: {
      createItem(state:State, user:UserType) {
        state.data = [...state.data, user]
      },
      loadItem(state:State, user:UserType) {
        state.data = [user]
      },
      loadItems(state:State, users:UserType[]) {
        state.data = users
      },
      updateItem(state:State, payload:ActionUpdatePatientsTypeDto) {
        state.data = state.data.map(x => { return x._id === payload._id ? Object.assign({}, x, payload.object) : x })
      },
      removeItem(state:State, _id:String) {
        state.data = state.data.filter(x => x._id !== _id)
      }
    },
    actions:{
      async createItem({commit}: any, payload: AuthSignUpUserType) {
        let user:UserType = await usersService.createItem(payload)
        commit('createItem', user)
      },
      async loadItem({commit}: any, payload: UserType) {
        commit('loadItem', payload)
      },
      async loadItems({commit}: any, payload: UserType[]) {
        commit('loadItems', payload)
      },
      async fetchItem({commit}: any) {
        let user:UserType = await usersService.fetchItem()
        commit('loadItem', user)
      },
      async fetchItems({commit}: any ) {
        let user:UserType = await usersService.fetchItems()
        commit('loadItems', user)
      },
      async updateItem({commit}:any, payload:ActionUpdateUserTypeDto) {
        let user:UpdateUserTypeDto = await usersService.updateItem(payload)
        let payloadUpdate:ActionUpdateUserTypeDto = {
          _id: payload._id,
          object: user
        }
        commit('updateItem', payloadUpdate)
      },

      async removeItem({commit}: any) {
        await usersService.removeItem()
      }
    },
    getters:{
      findItem: (state:State) => () => {
        return state.data[state.data.length - 1];
      },
      findItems: (state:State) => () => {
        return state.data;
      }
    }
  }
}
