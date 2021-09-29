import { Context} from '@nuxt/types'
import {AuthSignInUserType, AuthSignUpUserType} from "./../auth/auth.interface";
import {UserType, UpdateUserTypeDto, ActionUpdateUserTypeDto} from './users.interface'
export default class UsersModule {

    context:Context;

    constructor(context:Context){
        this.context = context
    }


    async fetchItem() :Promise<void> {
        await this.context.store.dispatch('planyasmile/users/fetchItem')
    }
    async fetchItems():Promise<void> {
        await this.context.store.dispatch('planyasmile/users/fetchItems')
    }
    async loadItem( payload: UserType):Promise<void> {
        await this.context.store.dispatch('planyasmile/users/loadItem', payload)
    }
    async loadItems( payload: UserType[] ):Promise<void> {
        await this.context.store.dispatch('planyasmile/users/loadItems', payload)
    }


    async createItem(payload:AuthSignUpUserType ):Promise<UserType>{
        await this.context.store.dispatch('planyasmile/users/createItem', payload)
        return this.findItems()
    }
    async updateItem(_id:String, object:UpdateUserTypeDto):Promise<UserType>{
        let payload:ActionUpdateUserTypeDto = {
            _id: _id,
            object: object
        }
        await this.context.store.dispatch('planyasmile/users/updateItem', payload )
        return this.findItem()
    }
    async removeItem():Promise<void>{
        await this.context.store.dispatch('planyasmile/users/removeItem')
    }

    findItem():UserType {
        return this.context.store.getters['planyasmile/users/findItem']()
    }
    findItems():UserType {
        return this.context.store.getters['planyasmile/users/findItems']()
    }
}
