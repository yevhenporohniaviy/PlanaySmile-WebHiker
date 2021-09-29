//1. We're importing the nuxt `Context` type. This is just a typescript type, so typescript knows what we mean when we say `Context`.
import { Context } from '@nuxt/types'

//2. We're importing our modules, and attach them to our Planyasmile instance, so we can access all modules accross the entire app
import UsersModule from './modules/users/users.module'
import PatientsModule from './modules/patients/patients.module'
import OrdersModule from './modules/orders/orders.module'
import ShippingModule from './modules/shipping/shipping.module'

//3. We're importing a vuex store for each model, so we have a nice, encapsulated store for each model
import { UsersStore } from './modules/users/users.store'
import { PatientsStore } from './modules/patients/patients.store'
import { OrdersStore } from './modules/orders/orders.store'
import { ShippingStore } from './modules/shipping/shipping.store'

//4. This is just a function to help us registering vuex store modules
import { registerStore } from './common/common.index'

export default class Planyasmile {

    context:Context;
    users:UsersModule;
    patients:PatientsModule;
    orders:OrdersModule;
    shipping:ShippingModule;


    constructor(context:Context){


        registerStore({
            modules:{
                users:UsersStore(context),
                patients:PatientsStore(context),
                orders:OrdersStore(context),
                shipping:ShippingStore(context)
            },
            store:context.store,
            namespace:'planyasmile'
        })


        this.users = new UsersModule(context)
        this.patients = new PatientsModule(context)
        this.orders = new OrdersModule(context)
        this.shipping = new ShippingModule(context)
        this.context = context
    }

}
