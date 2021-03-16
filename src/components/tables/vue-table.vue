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
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters([
      'getWorkersCount'
    ]),
    pages () {
      return Math.ceil(this.getWorkersCount / 10)
    }
  }
}
</script>

<style>

</style>
