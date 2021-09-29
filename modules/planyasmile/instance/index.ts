//Here we're using the internal nuxt provided function `addPlugin` to add our own plugin, which we can access from anywhere in the app.
//As the Plugin options we're sending the planyasmilePath so we can properly import the plugin and all dependencies.
//Nothing for you to do here.
//You can now go to `./plugin.js`

import path from 'path'

export default class PlanyasmileInstance{
    
    constructor(nuxtBuild:any){
        this.addPlugin(nuxtBuild)
    }

    addPlugin(nuxtBuild:any){

        nuxtBuild.addPlugin({
            src: path.resolve(__dirname, './plugin.js'),
            options:{
                planyasmilePath:path.resolve(__dirname, './src/planyasmile.index'),
            }
        })         
    }
}