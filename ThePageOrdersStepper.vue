<template>
  <form class="form-horizontal">
    <b-overlay
      variant="white"
      :show="loading"
      rounded="sm">
      <ThePageOrdersStepperStep1 v-model="form_order" v-if="step === 1" class="mb-4"/>
      <ThePageOrdersStepperStep2 v-model="form_order" v-if="step === 2" class="mb-4"/>
      <ThePageOrdersStepperStep3 v-model="assets" v-if="step === 3" class="mb-4"/>
      <ThePageOrdersStepperStep4 v-model="form_order" v-if="step === 4" class="mb-4"/>

      <AppButton @clicked="prevStep" class="button button--white mr-lg-4 mb-3" v-if="step === 1">
        {{$t('ThePageOrdersStepper_Cancel')}}
      </AppButton>
      <AppButton @clicked="prevStep" class="button button--white mr-lg-4 mb-3" v-if="step !== 1">
        {{$t('App_Back')}}
      </AppButton>
      <AppButton @clicked="nextStep" class="button button--default mr-lg-4 mb-3" v-if="step !== 4">
        {{$t('ThePageOrdersStepper_Next')}}
      </AppButton>
      <AppButtonForm @clicked="submit" class="button submit--default mr-lg-4 mb-3" v-if="step === 4">
        {{$t('ThePageOrdersStepper_Order')}}
      </AppButtonForm>
    </b-overlay>
  </form>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppButtonForm from "@/components/AppButtonForm";
import ThePageOrdersStepperStep1 from "@/components/ThePageOrdersStepperStep1";
import ThePageOrdersStepperStep2 from "@/components/ThePageOrdersStepperStep2";
import ThePageOrdersStepperStep3 from "@/components/ThePageOrdersStepperStep3";
import ThePageOrdersStepperStep4 from "@/components/ThePageOrdersStepperStep4";
export default {
  name: "Stepper",
  components: {ThePageOrdersStepperStep1, ThePageOrdersStepperStep2, ThePageOrdersStepperStep3, ThePageOrdersStepperStep4, AppButton, AppButtonForm},
  data() {
    return {
      loading: false,
      assets: {
        patientImages: null,
        cephalometricRadiographies: null,
        panoramicXRays: null,
        intraoralScans: null,
      },
      form_order: {
        anamnese: [],
        class: [],
        teeth: [],
        attachment: null,
        ASR: null,
        desiredDate: '',
        notes: '',
        patient: this.$route.params.id
      }
    }
  },
  computed:{
    order(){
      return this.$planyasmile.orders.findItem(this.orderID)
    },
    orderID(){
      return this.$route.params.order_id
    },
    patientID(){
      return this.$route.params.id
    },
    step(){
      return Number(this.$route.query.step) || 1
    }
  },
  async fetch(){
    if(!this.orderID) return
    await this.$planyasmile.orders.fetchItem(this.orderID)
    this.form_order.anamnese = this.order.anamnese
    this.form_order.class = this.order.class
    this.form_order.teeth = this.order.teeth
    this.form_order.attachment = this.order.attachment
    this.form_order.ASR = this.order.ASR
    this.form_order.desiredDate = this.order.desiredDate
    this.form_order.notes = this.order.notes
  },
  methods:{
    prevStep() {
      this.loading = true
      if (this.step <= 1) {
        this.$router.push(`/patient/${this.patientID}`)
        return
      }
      this.$router.push({path:`/patient/${this.patientID}/order/${this.order._id}`, query:{step:this.step - 1}})
      this.loading = false
    },
    async nextStep() {
      try{
        this.loading = true

        if(this.step === 3){
          let formData = new FormData()
          Object.keys(this.assets).forEach(key => {
            if(!this.assets[key]) return
            this.assets[key].forEach(asset => {
              formData.append(key, asset)
            })
          })
          await this.$axios.patch(`orders/assets/${this.orderID}`, formData)
        }

        var orderID = this.orderID

        if(!this.order) {
          const createdOrder = await this.$planyasmile.orders.createItem(this.form_order)
          orderID = createdOrder._id
          await this.$planyasmile.patients.fetchItems()
        } else {
          await this.$planyasmile.orders.updateItem(this.orderID, this.form_order)
        }

        this.$router.push({path:`/patient/${this.patientID}/order/${orderID}`, query:{step:this.step + 1}})
        this.loading = false

      } catch (e) {
        console.log(e)
      }

      this.loading = false
    },
    async submit(){

      this.loading = true

      try{
        await this.$planyasmile.orders.updateItem(this.orderID, this.form_order)
        await this.$axios.post(`orders/submit/${this.orderID}`)
        await this.$planyasmile.patients.fetchItems()
        this.$router.push({ path: `/patient/${this.$route.params.id}/order/success`})

      } catch(e){
        console.log(e)
      }

      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .button {
    padding: 12px 34px;
    font-size: map-get($theme-fs, '18');
  }
</style>
