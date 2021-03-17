<template>
<tr class="vue-table-row">
  <td class="column1 vtr-row row-lastname"> {{rowData.lastName}} </td>
  <td class="column2 vtr-row row-firstname"> {{rowData.firstName}} </td>
  <td class="column3 vtr-row row-middlename"> {{rowData.middleName}} </td>
  <td class="column4 vtr-row row-bdate"> {{rowData.birthDate}} </td>
  <td class="column5 vtr-row row-desc"> {{rowData.description}} </td>
  <td class="column6 vtr-row row-actions">
      <button @click="selectWorker(rowData), redirectForEdit()"  class="btn-edit">
        <icon name="edit"></icon>
      </button>
      <button @click="selectWorker(rowData), deleteWorker()" class="btn-del">
        <icon name="trash"></icon>
      </button>
  </td>
</tr>
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
    },
    currentPage: {
      type: Number,
      default: null
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
      'delWorker',
      'getPaginatedWorkers'
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
        // console.log(this.currentPage)
        setTimeout(() => {
          this.getPaginatedWorkers(this.currentPage)
        }, 400)
      }
    }

  }
}
</script>

<style>

</style>
