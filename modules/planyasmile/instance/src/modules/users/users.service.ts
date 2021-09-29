import { Context} from '@nuxt/types'
import {ActionUpdateUserTypeDto, UpdateUserTypeDto, UserType} from './users.interface'
import {AuthSignInUserType,AuthSignUpUserType} from "./../auth/auth.interface";

export class UsersService {

    context:Context;

    constructor(context:Context){
        this.context = context
    }

    async createItem(payload:AuthSignUpUserType ):Promise<UserType> {
        const resToken = await this.context.$axios.post('auth/signup', payload)
        await this.context.$auth.setUserToken(resToken.data.token, resToken.data.refresh_token);
        const resUser = await this.context.$axios.get('users/me')

        return resUser.data.user
    }

    async fetchItem():Promise<UserType> {
        const resUser = await this.context.$axios.get('users/me')
        return resUser.data.user
    }
    async fetchItems():Promise<UserType> {
        return await this.context.$axios.get('users/all')
    }

    async updateItem(payload:ActionUpdateUserTypeDto):Promise<UpdateUserTypeDto> {
        let formData = new FormData()

        Object.entries(payload.object).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const res = await this.context.$axios.patch('users/me', formData)
        return res.data;

    }

    async removeItem():Promise<Boolean> {
        const res = await this.context.$axios.delete('users/me');
        await this.context.$auth.logout()
        return res.status === 200;
    }

}
