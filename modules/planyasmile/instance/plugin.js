//1. Here we're importing the source code of our plugin
import Planyasmile from '<%= options.planyasmilePath %>'

//2. We're initiating Vuex to patient-create a store IF(!) no store is setup in `@/store`
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store()

export default async (context, inject) => {

  context['store'] = context.store || store // if nuxt app not using store, patient-create one (still a cause of point 2)

  //3. We're creating an instance of our planyasmile source with the nuxt `context`, so we access teh nuxt context anywhere in our source code.
  //4. We're injecting our planyasmile instance into the nuxt `context`. Inside the entire app, it will be globally available under `this.$planyasmile`.
  inject('planyasmile', new Planyasmile(context))

}

//5. Nothing for you to do here
//6. You can now go to `./src/planyasmile.index.ts`
