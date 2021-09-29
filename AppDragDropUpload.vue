
<template>
  <div>
    <div
      :class="typeof(rules) !== 'undefined' && rules.length > 0  ? 'invalid':''"
      class="dropzone d-flex justify-content-center align-items-center"
      @click="uploadHandler">
      <b-form-file
        class="d-none"
        ref="filesPatient"
        :value="value"
        :multiple="multiple"
        @change="selectFiles"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png,.pdf"
      ></b-form-file>
      <transition name="fade">
      <div v-if="value" class="d-flex justify-content-center align-items-center flex-column">
        <font-awesome-icon class="dropzone__icon" :icon="['fas', 'check-circle' ]"/>
        <div class="dropzone__title" >
          {{$t('App_Dropzone_Success')}}
        </div>
      </div>
      <div v-else class="d-flex justify-content-center align-items-center flex-column">
        <font-awesome-icon class="dropzone__icon" :icon="['fas', 'cloud-upload-alt' ]"/>
        <div class="dropzone__title" >
          {{$t('App_Dropzone_Upload')}}
        </div>

      </div>
      </transition>
    </div>
    <transition name="fade"><span v-if="rules" class="error-message mt-2" v-text="rules[0]"/></transition>

  </div>
</template>

<script>

export default {
  props: {
    rules: {
      type: Array
    },
    value: {},
    multiple: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    uploadHandler() {
      this.$refs.filesPatient.$refs.input.click()
    },
    async selectFiles(event) {
      const files = event.target.files
      if (files.length <= 0) {
        return;
      }
      if (this.multiple) {
        const rebuild = []

        Object.entries(files).forEach(([key, value]) => {
          rebuild.push(value)
        })

        this.$emit('input', rebuild);
      } else {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.preview = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.$emit('input', files[0]);
      }

    }
  }
}
</script>

<style scoped lang="scss">
  .dropzone {
    cursor: pointer;
    width: 100%;
    min-height: 90px;
    height: 90px;
    background-color: $white;
    border: 1px solid $mint-light;
    border-radius: 5px;
    color: $mint-light;
    &.invalid {
      color: $danger;
      border-color: $danger;
      .dropzone__title {
        color: $danger;
      }
    }
    &__icon {
      font-size: 2em;
    }
    &__title {
      font-size: map-get($theme-fs,'12');
      font-weight: 400;
      line-height: 28px;
    }
  }
  @include media-breakpoint-up(lg) {
    .dropzone {
      &__icon {
        font-size: 3em;
      }
      width: 185px;
    }
  }
</style>
