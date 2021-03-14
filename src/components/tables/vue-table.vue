<template>
  <div class="vueTable">
    <div class="vueTable-header">
      <span> Фамилия </span>
      <span> Имя </span>
      <span> Отчество </span>
      <span> Дата Рождения </span>
      <span> Описание </span>
      <span> Действия </span>
    </div>
    <div class="vueTable-body">
      <vueTableRow
        v-for="row in paginatedWorkers"
        :key="row.id"
        :rowData = "row"
        :load="log(row)"
      />
    </div>
    <div class="vueTable-pagination">
      <div class="page"
           v-for="page in pages"
           :key="page"
           :class="{'page-active': page === pageNumber}"
           @click="pageGo(page)"
      > {{page}} </div>
    </div>
  </div>
</template>

<script>
import vueTableRow from '@/components/tables/vue-table-row'
export default {
  name: 'vue-table',
  components: {
    vueTableRow
  },
  props: {
    workersData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      workersPerPage: 10,
      pageNumber: 1
    }
  },
  methods: {
    log (item) {
      console.log(item)
    },
    pageGo (page) {
      this.pageNumber = page
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.workersData.length / 10)
    },
    paginatedWorkers () {
      const from = (this.pageNumber - 1) * this.workersPerPage
      const to = from + this.workersPerPage
      return this.workersData.slice(from, to)
    }
  }
}
</script>

<style>
  .vueTable {
    margin-top: 60px;
  }
  .vueTable-header {
    display: flex;
    justify-content: space-around;
  }
  .vueTable-header span{
    flex-basis: 16.6%;
    padding: 10px 0;
  }
  .vueTable-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 25px;
  }
  .page {
    padding: 8px;
    margin-right: 5px;
    border: 2px solid grey;
  }
  .page:hover {
    background: blue;
    cursor: pointer;
  }
  .page-active {
    background: yellow;
  }
</style>
