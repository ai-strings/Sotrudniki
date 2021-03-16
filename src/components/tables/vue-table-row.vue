<template>
<div class="vue-table-row">
  <div class="vtr-row row-lastname"> {{rowData.lastName}} </div>
  <div class="vtr-row row-firstname"> {{rowData.firstName}} </div>
  <div class="vtr-row row-middlename"> {{rowData.middleName}} </div>
  <div class="vtr-row row-bdate"> {{rowData.birthDate}} </div>
  <div class="vtr-row row-desc"> {{rowData.description}} </div>
  <div class="vtr-row row-actions">
      <button @click="selectWorker(rowData), redirectForEdit()"  class="btn-edit">
        <icon name="edit"></icon>
      </button>
      <button @click="selectWorker(rowData), deleteWorker()" class="btn-del">
        <icon name="trash"></icon>
      </button>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Icon from '@/components/icons/icons'
export default {
  name: 'vue-table-row',
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  components: {
    Icon
  },
  computed: {},
  methods: {
    ...mapActions([
      'delWorker'
    ]),
    selectWorker (rowData) {
      this.currentWorker = rowData
      // console.log(this.currentWorker)
    },
    redirectForEdit () {
      const self = this
      self.$router.push('/redact' + '?wid=' + this.currentWorker.id)
    },
    deleteWorker () {
      const workerToDelete = this.currentWorker
      const msg = confirm('Запись будет удалена. Уверены?')
      if (msg) {
        this.delWorker(workerToDelete)
      }
    }

  }
}
</script>

<style>

</style>
