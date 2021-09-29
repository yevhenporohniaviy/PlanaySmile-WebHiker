<template>
  <AppViewContainer :breadcrumb_title="$t('ThePageShipping_BreadcrumbTitle')">
    <template slot="body">
      <b-row>
        <b-col>
          <b-overlay
            variant="white"
            :show="loading"
            rounded="sm">
          <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" >
            <b-row>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_CollectionDate')" rules="required" v-slot="{ errors, failedRules }">
                  <AppInputDateSmall
                    :label="$t('App_CollectionDate')"
                    :disabled_date="true"
                    :placeholder="$t('App_CollectionDateLabel')"
                    value_type="YYYYMMDD"
                    v-model="form.collectionDate"
                    :parentDisableDate="disableDate"
                    :rules="errors"
                    :label_for="'collectionDate'"
                    :id="'collectionDate'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_EarliestCollectionDate')" rules="required" v-slot="{ errors, failedRules }">
                  <AppInputTimePickerSmall
                    :label="$t('App_EarliestCollectionDate')"
                    :placeholder="$t('App_TimeCollectionDateLabel')"
                    v-model="form.earliestCollectionDate"
                    :rangehour="[[6,14]]"
                    :rules="errors"
                    :label_for="'earliestCollectionDate'"
                    :id="'earliestCollectionDate'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_LatestCollectionDate')" rules="required" v-slot="{ errors, failedRules }">
                  <AppInputTimePickerSmall
                    :label="$t('App_LatestCollectionDate')"
                    :placeholder="$t('App_TimeCollectionDateLabel')"
                    :rangehour="[[13,23]]"
                    v-model="form.latestCollectionDate"
                    :rules="errors"
                    :label_for="'latestCollectionDate'"
                    :id="'latestCollectionDate'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_Country')" rules="required" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :disabled="true"
                    :label="$t('App_Country')"
                    v-model="country"
                    :rules="errors"
                    :label_for="'country'"
                    :id="'country'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_Street')" rules="required|min:1|max:35" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :label="$t('App_Street')"
                    v-model="form.streetAddress"
                    :rules="errors"
                    :label_for="'streetAddress'"
                    :id="'streetAddress'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_CityLabel')" rules="required|min:1|max:30" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :label="$t('App_CityLabel')"
                    v-model="form.city"
                    :rules="errors"
                    :label_for="'city'"
                    :id="'city'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_PostalCodeLabel')" rules="required|numeric|min:1|max:8" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :label="$t('App_PostalCodeLabel')"
                    v-model="form.postalCode"
                    :rules="errors"
                    :label_for="'postalCode'"
                    :id="'postalCode'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_Phone')" rules="required|regex:^([0-9]+-)*[0-9]+$|min:1|max:25" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :label="$t('App_Phone')"
                    v-model="form.phone"
                    :rules="errors"
                    :label_for="'phone'"
                    :id="'phone'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="4">
                <ValidationProvider :name="$t('App_CompanyLabel')" rules="required|min:1|max:27" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextSmall
                    :label="$t('App_CompanyLabel')"
                    v-model="form.company"
                    :rules="errors"
                    :label_for="'company'"
                    :id="'company'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12" md="8">
                <ValidationProvider :name="$t('App_Instructions')" v-slot="{ errors, failedRules }"
                >
                  <AppInputTextArea
                    :label="$t('App_Instructions')"
                    v-model="form.instructions"
                    :rules="errors"
                    :label_for="'instructions'"
                    :id="'instructions'"
                  />
                </ValidationProvider>
              </b-col>
              <b-col cols="12">
                <AppButtonForm class="submit--white" rules="min:1|max:57" @clicked="submit">
                  {{ $t('App_Send') }}
                </AppButtonForm>
              </b-col>
            </b-row>
          </ValidationObserver>
          </b-overlay>
        </b-col>
      </b-row>
    </template>
  </AppViewContainer>
</template>

<script>
import AppButtonForm from '@/components/AppButtonForm'
import AppViewContainer from "@/components/AppViewContainer";
import AppInputTextArea from "@/components/AppInputTextArea";
import AppInputTimePickerSmall from "@/components/AppInputTimePickerSmall";
import AppInputDateSmall from "@/components/AppInputDateSmall";
import AppInputTextSmall from "@/components/AppInputTextSmall";
import { setInteractionMode } from 'vee-validate'
setInteractionMode('passive')

export default {
  name: "index",
  components: {
    AppButtonForm,
    AppViewContainer,
    AppInputTextArea,
    AppInputTimePickerSmall,
    AppInputDateSmall,
    AppInputTextSmall,
  },
  data() {
    return {
      loading: false,
      country: 'Austria',
      form: {
        collectionDate: '',
        earliestCollectionDate: '10:00',
        latestCollectionDate: '16:00',
        streetAddress: '',
        country: "AT",
        city: '',
        postalCode: '',
        phone: '',
        company: '',
        instructions: ''
      }
    }
  },
  watch: {
    'form.earliestCollectionDate': function (newVal) {
      let latestTime = this.$moment(this.form.latestCollectionDate, 'HH:mm')
      let earliestTime = this.$moment(newVal, 'HH:mm')
      if (latestTime) {
        let diff = this.getDifferenceInMinutes(latestTime, earliestTime)
        if(diff >= -90 && diff <= 90 || latestTime.isBefore(earliestTime)){
          this.form.latestCollectionDate = this.$moment(earliestTime).add(90, 'minutes').format('HH:mm')
        }
      }
    },
    'form.latestCollectionDate': function (newVal) {
      let latestTime = this.$moment(newVal, 'HH:mm')
      let earliestTime = this.$moment(this.form.earliestCollectionDate, 'HH:mm')
      if (earliestTime) {
        let diff = this.getDifferenceInMinutes(earliestTime, latestTime)
        if(  diff >= -90 && diff <= 90 || earliestTime.isAfter(latestTime)){
          this.form.earliestCollectionDate = this.$moment(latestTime).subtract(90, 'minutes').format('HH:mm')
        }
      }
    },
  },
  methods: {
    getDifferenceInMinutes(firstVal, secondVal) {
      let firstValMoment = this.$moment(firstVal, 'HHmm')
      let secondValMoment = this.$moment(secondVal, 'HHmm')
      let duration = this.$moment.duration(firstValMoment.diff(secondValMoment));
      let minutes = duration.asMinutes();
      return minutes
    },
    setFields() {
      this.form.company = this.user.company || null
      this.form.phone = this.user.phone || null
      this.form.streetAddress = this.user.street || null
      this.form.city = this.user.city || null
      this.form.postalCode = this.user.postalCode || null
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loading = true
        try{
          this.form.earliestCollectionDate = this.form.earliestCollectionDate.replace(':', '')
          this.form.latestCollectionDate = this.form.latestCollectionDate.replace(':', '')
          await this.$planyasmile.shipping.createItem(this.form)
          this.$toast.success(this.$i18n.t('SUCCESS_SEND_SHIPPING'))
          this.loading = false
          this.$router.push({
            name: `shipping-success___${this.$i18n.locale}`,
            params: {
              collectionDate: this.form.collectionDate,
              earliestCollectionDate: this.form.earliestCollectionDate,
              latestCollectionDate: this.form.latestCollectionDate,
            }
          })
        }catch (e) {
          this.loading = false
          console.error(e)
        }
      }
    },
    disableDate(date) {
      let disable = false
      if(this.$moment(date).weekday() === 0) disable = true
      if(this.$moment(date).weekday() === 6) disable = true
      if(this.$moment(date).add(1, 'd').format() < this.$moment().format()) disable = true
      if(this.todayIsDisabled && this.dateIsEqualToToday(date)) disable = true
      return disable
    },
    dateIsEqualToToday(date){
      return this.$moment(date).format('YYYYMMDD') === this.$moment().format('YYYYMMDD')
    }    
  },
  computed: {
    user() {
      return this.$planyasmile.users.findItem()
    },
    todayIsDisabled(){
      return this.$moment(new Date(), 'HH:mm').isAfter(this.$moment('10:00', 'HH:mm'))      
    },        
  },
  mounted() {
    this.setFields()
  }
}
</script>

<style scoped lang="scss">
  .shipping-title{
    color: $slate-light;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 34px;
  }
  .shipping-country{
    color: $slate-light;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 32px;
  }
</style>
