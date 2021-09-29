import { Context } from '@nuxt/types'
import { PatientsService } from './patients.service'
import { PatientsType, ActionUpdatePatientsTypeDto, UpdatePatientsTypeDto } from "./patients.interface";


interface State {
  data: PatientsType[]
}

export const PatientsStore = (context:Context) => {

  const patientsService = new PatientsService(context)

  return {
    namespaced: true,
    state: ():State => ({
      data:[],
    }),
    mutations: {
      loadItem(state:State, patient:PatientsType) {
        if (state.data.find(x => x._id === patient._id)) {
          state.data.map(x => x._id === patient._id ? patient : x)
        } else {
          state.data = [...state.data, patient]
        }
      },
      loadItems(state:State, patients:Array<PatientsType>) {
        state.data = patients
      },
      createItem(state:State, patient:PatientsType) {
        state.data = [...state.data, patient]
      },
      updateItem(state:State, payload:ActionUpdatePatientsTypeDto) {
        state.data = state.data.map(x => { return x._id === payload._id ? Object.assign({}, x, payload.object) : x })
      },
      removeItem(state:State, _id:String) {
        state.data = state.data.filter(x => x._id !== _id)
      }
    },
    actions:{
      async fetchItem({commit}:any, _id: String) {
        let patient:PatientsType = await patientsService.fetchItem(_id)
        commit('loadItem', patient)
      },
      async fetchItems({commit}:any, query: Object) {
        let patients:PatientsType[] = await patientsService.fetchItems(query)
        commit('loadItems', patients)
      },
      async loadItem({commit}:any, patient: PatientsType) {
        commit('loadItem', patient)
      },
      async loadItems({commit}:any, patients: PatientsType[] ) {
        commit('loadItems', patients)
      },

      async createItem({commit}:any, object:PatientsType) {
        let patient:PatientsType = await patientsService.createItem(object)
        commit('createItem', patient)
      },
      async updateItem({commit}:any, payload:ActionUpdatePatientsTypeDto) {
        let patient:UpdatePatientsTypeDto = await patientsService.updateItem(payload._id, payload.object)
        let payloadUpdate:ActionUpdatePatientsTypeDto = {
          _id: payload._id,
          object: patient
        }
        commit('updateItem', payloadUpdate)
      },
      async removeItem({commit}:any, _id:String) {
        await patientsService.context.redirect('/')
        await patientsService.removeItem(_id)
        commit('removeItem', _id)
      }
    },
    getters: {
      getItem: (state:State) => () => {
        return state.data[state.data.length - 1];
      },
      findItem: (state:State) => (_id:String) => {
        return state.data.find(x => x._id === _id)
      },
      findItems: (state:State) => () => {
        return state.data;
      }
    }
  }
}
