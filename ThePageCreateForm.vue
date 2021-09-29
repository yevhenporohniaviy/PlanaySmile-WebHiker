<template>
  <b-overlay
    variant="white"
    :show="loading"
    rounded="sm">
    <ValidationObserver
      @submit.prevent="submit()"
      v-slot="{ invalid }"
      ref="observer"
      tag="form">

      <b-row>
        <b-col cols="12" lg="3">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <AppAvatar size="lg" class="mb-3" :image="preview" :sizeIcon="'3x'"/>
            <b-button class="img-upload d-flex justify-content-center align-items-center px-3 py-3" @click="onFilePick">
              {{ $t('App_Upload') }}
            </b-button>
            <b-form-file
              class="d-none" ref="fileInput"
              accept=".png,.jpeg,.jpg"
              v-model="form.photo"
              @change="onFileChange"
            ></b-form-file>
          </div>
        </b-col>
        <b-col cols="12" lg="9">
          <b-row>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_FirstName')" rules="required" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_FirstName')"
                  v-model="form.firstName"
                  :rules="errors"
                  :label_for="'firstName'"
                  :id="'firstName'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_LastName')" rules="required" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_LastName')"
                  v-model="form.lastName"
                  :rules="errors"
                  :label_for="'lastName'"
                  :id="'lastName'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_SocialSecurityNumber')"  rules="numeric" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_SocialSecurityNumber')"
                  v-model="form.socialSecurityNumber"
                  :rules="errors"
                  :label_for="'socialSecurityNumber'"
                  :id="'socialSecurityNumber'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_Street')"  v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_Street')"
                  v-model="form.address"
                  :rules="errors"
                  :label_for="'address'"
                  :id="'address'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_PostalCode')" rules="numeric" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_PostalCode')"
                  v-model="form.postalCode"
                  :rules="errors"
                  :label_for="'postalCode'"
                  :id="'postalCode'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_City')" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_City')"
                  v-model="form.city"
                  :rules="errors"
                  :label_for="'city'"
                  :id="'city'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_Phone')" rules="" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_Phone')"
                  v-model="form.phone"
                  :rules="errors"
                  :label_for="'phone'"
                  :id="'phone'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_Email')" mode="passive" rules="email" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_Email')"
                  v-model="form.email"
                  :rules="errors"
                  :label_for="'email'"
                  :id="'email'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_Sex')" v-slot="{ errors, failedRules }">
                <AppInputTextSmall
                  :label="$t('App_Sex')"
                  v-model="form.sex"
                  :rules="errors"
                  :label_for="'sex'"
                  :id="'sex'"
                />
              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <ValidationProvider :name="$t('App_DateOfBirth')"   v-slot="{ errors, failedRules }">
                <ThePatientInputDate
                  :label="$t('App_DateOfBirth')"
                  v-model="form.dateOfBirth"
                  value_type="YYYY-MM-DD"
                  default_value="1990-01-01"
                  :rules="errors"
                  :label_for="'dateOfBirth'"
                  :id="'dateOfBirth'"/>

              </ValidationProvider>
            </b-col>
            <b-col cols="12" lg="6">
              <div class="d-flex align-items-center h-100 mt-1">
                <AppButton class="button button--grey mr-3" @clicked="goBack" v-if="patient">
                  {{ $t('App_Back') }}
                </AppButton>
                <AppButtonForm class="submit submit--default" @clicked="submit">
                  {{!patient
                  ? $t('ThePagePatientCreate_SubmitCreate')
                  : $t('ThePagePatientCreate_SubmitUpdate')}}
                </AppButtonForm>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </ValidationObserver>
  </b-overlay>
</template>

<script>
import AppAvatar from '@/components/AppAvatar'
import AppButton from "@/components/AppButton";
import AppButtonForm from "@/components/AppButtonForm";
import AppInputTextSmall from "@/components/AppInputTextSmall";
import ThePatientInputDate from "@/components/ThePatientInputDate";
import { setInteractionMode } from 'vee-validate'
setInteractionMode('passive')
export default {
  name: "Form",
  components: {
    AppAvatar,
    AppButton,
    AppButtonForm,
    AppInputTextSmall,
    ThePatientInputDate
  },
  props: ['patient'],
  data() {
    return {
      loading: false,
      preview: null,
      form: {
        firstName: '',
        lastName: '',
        socialSecurityNumber: '',
        address: '',
        postalCode: '',
        city: '',
        phone: '',
        email: '',
        sex: '',
        dateOfBirth: null,
        photo: null
      }
    }
  },
  methods: {
    goBack() {
      if (this.patient) {
        this.$router.push(`/patient/${this.patient._id}`)
      }
    },
    onFilePick () {
      this.$refs.fileInput.$refs.input.click()
    },
    onFileChange(event) {
      const files = event.target.files
      if (files.length <= 0) {
        return;
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.preview = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.form.photo = files[0]
    },
    setFields() {
      if (this.patient) {
        this.preview = this.patient.imageURL?.url
        this.form = Object.assign(this.form, this.patient)
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loading = true
        try{
          if (!this.patient) {
            const patient = await this.$planyasmile.patients.createItem(this.form)
            this.$toast.success(this.$t('SUCCESS_CREATE_PATIENT'))
            this.loading = false
            this.$router.push(`/patient/${patient._id}/success`)
          } else {
            await this.$planyasmile.patients.updateItem(this.patient._id, this.form)
            this.$toast.success(this.$t('SUCCESS_EDIT_PATIENT'))
            this.loading = false
            this.$router.push(`/patient/${this.patient._id}`)
          }
        }catch (e) {
          this.loading = false
          console.error(e)
        }
      }
    },
  },
  mounted() {
    this.setFields();
  }
}
</script>

<style scoped lang="scss">
.submit, .button{
  padding: 12px 34px;
  font-size: map-get($theme-fs, '18');
}
.img-upload {
  border: 1px solid $white-snow;
  border-radius: 10px;
  background-color: $white-snow;
  color: $mint-light;
  font-size: map-get($theme-fs, '16');
  font-weight: 500;
  line-height: 28px;
  transition: all .3s ease-out;
  &:hover {
    color: $white;
    border: 1px solid $theme-secondary-color;
    background-color: $theme-secondary-color;
  }
}
</style>
