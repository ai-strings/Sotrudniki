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
        v-for="row in paginatedWorkersData"
        :key="row.id"
        :rowData = "row"
        :load="log(row)"
      />
    </div>
    <div class="vueTable-pagination">
      <a href="" class="prev-page"
         @click.prevent="pageGo(prevPage())"
      > prev </a>
      <div class="page"
           v-for="page in pages"
           :key="page"
           :class="{'page-active': page === pageNumber}"
           @click="pageGo(page)"
      > {{page}} </div>
      <a href="" class="next-page" @click.prevent="pageGo(nextPage())"> next </a>
    </div>
  </div>
</template>

<script>
import vueTableRow from '@/components/tables/vue-table-row'
import { mapActions } from 'vuex'
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
    },
    paginatedWorkersData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      pageNumber: 1,
      pageArrowNum: 1
    }
  },
  methods: {
    ...mapActions([
      'getPaginatedWorkers'
    ]),
    log (item) {
      console.log(item)
    },
    pageGo (page) {
      this.pageNumber = page
      const pageNum = this.pageNumber
      this.getPaginatedWorkers(pageNum)
    },
    prevPage () {
      if (this.pageArrowNum > 1) {
        return --this.pageArrowNum
      } else return this.pageArrowNum
    },
    nextPage () {
      if (this.pageArrowNum < this.pages) {
        return ++this.pageArrowNum
      } else return this.pageArrowNum
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.workersData.length / 10)
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
