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
  .vue-table-row {
    display: flex;
    justify-content: space-around;
    text-align: center;
    /*align-items: center;*/
    border-top: 2px solid #bdbdbd;
    border-left: 2px solid #bdbdbd;
    border-right: 1px solid #bdbdbd;
  }
  .vue-table-row:last-child {
    border-bottom: 1px solid #bdbdbd;
  }
  .vue-table-row .vtr-row {
    flex-basis: 16.6%;
    padding: 10px 5px;
    border-right: 1px solid #bdbdbd;
    text-align: center;
  }
  .vue-table-row:nth-child(odd) {
    background: #fbfbfb;
  }
  .vue-table-row:nth-child(even) {
    background: #eaeaea;
  }
  .vtr-row.row-actions {
    display: flex;
    justify-content: space-around;
  }
  .btn-edit, .btn-del {
    width: 35px;
    height: 35px;
    background: #9696a0;
  }
  .btn-edit svg, .btn-del svg {
    width: 21px;
    height: 21px;
    fill: white;
  }
</style>
