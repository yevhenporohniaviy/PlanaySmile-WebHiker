<template>
  <AppViewContainer :breadcrumb_title="$t('ThePagePatient_BreadcrumbTitle')">
    <template slot="head">
      <b-col cols="12" lg="6">
        <b-row class="justify-content-end align-items-center ">
          <b-col cols="12" lg="6">
            <AppInputFilterSearch v-model="query.search"/>
          </b-col>
          <b-col cols="12" lg="6">
            <AppInputFilterSelect v-model="query.filter" :options="options"/>
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template slot="body">
      <AppTable :items="patients" :fields="fields" @sort="fetchResults"/>
    </template>
  </AppViewContainer>
</template>

<script>
import AppBreadcrumb from "@/components/AppBreadcrumb";
import AppInputFilterSearch from "@/components/AppInputFilterSearch";
import AppInputFilterSelect from "@/components/AppInputFilterSelect";
import AppTable from "@/components/AppTable";
import AppViewContainer from "@/components/AppViewContainer";
export default {
  components: {
    AppViewContainer,
    AppBreadcrumb,
    AppTable,
    AppInputFilterSelect,
    AppInputFilterSearch
  },
  data() {
    return {
      awaitingSearch: false,
      query: {
        page: 1,
        search: null,
        sortBy: null,
        filter: null,
        sort: null
      },
      options: [
        { value: null, text: this.$t('App_All')},
        { value: 'draft', text: this.$t('App_Draft') },
        { value: 'pending', text: this.$t('App_Pending')},
        { value: 'review', text: this.$t('App_Review') },
        { value: 'accepted', text: this.$t('App_Accepted') },
        { value: 'active', text: this.$t('App_Active') },
        { value: 'sent', text: this.$t('App_Sent') },
        { value: 'received', text: this.$t('App_Received') },
      ],
      fields: [
        { key: 'lastName', class: 'content', thClass: 'head-content head-content--dashboard p-4', tdClass: 'body-content body-content--dashboard p-4'},
        { key: 'socialSecurityNumber', class: 'content', thClass: 'head-content head-content--dashboard p-4', tdClass: 'body-content p-4'},
        { key: 'createdAt', class: 'content', thClass: 'head-content head-content--dashboard p-4', tdClass: 'body-content p-4'},
        { key: 'orderStatus', class: 'content', thClass: 'head-content head-content--dashboard p-4', tdClass: 'body-content p-4'  }
      ]
    }
  },
  watch: {
    'query.filter': function () {
      this.fetchResults();
    },
    'query.search': function () {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchResults();
          this.awaitingSearch = false;
        }, 1000);
      }
      this.awaitingSearch = true;
    },
  },
  methods: {
    async fetchResults(e) {
      this.query = { ...this.query, ...e}
      await this.$planyasmile.patients.fetchItems(this.query)
    }
  },
  computed: {
    patients(){
      return this.$planyasmile.patients.findItems()
    }
  },
  async fetch() {
    try {
      await Promise.all([
        this.$planyasmile.patients.fetchItems()
      ])
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

