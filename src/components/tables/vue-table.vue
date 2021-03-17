<template>
  <div class="table-wrapper">
    <table class="vueTable fl-table">
      <thead>
        <tr class="vueTable-header">
          <th class="column1"> Фамилия </th>
          <th class="column2"> Имя </th>
          <th class="column3"> Отчество </th>
          <th class="column4"> Дата Рождения </th>
          <th class="column5"> Описание </th>
          <th class="column6"> Действия </th>
        </tr>
      </thead>
      <tbody class="vueTable-body">
        <vueTableRow
          v-for="row in paginatedWorkersData"
          :key="row.id"
          :rowData = "row"
          :load="log(row)"
        />
      </tbody>
    </table>
  </div>
  <div class="vueTable-pagination">
    <a href="" class="prev-page"
       @click.prevent="pageGo(prevPage())"
    > <icon name="chev-left"></icon> </a>
    <div class="page"
         v-for="page in pages"
         :key="page"
         :class="{'page-active': page === pageNumber}"
         @click="pageGo(page)"
    > {{page}} </div>
    <a href="" class="next-page" @click.prevent="pageGo(nextPage())"> <icon name="chev-right"></icon> </a>
  </div>
</template>

<script>
import vueTableRow from '@/components/tables/vue-table-row'
import { mapActions, mapGetters } from 'vuex'
import Icon from '@/components/icons/icons'

export default {
  name: 'vue-table',
  components: {
    vueTableRow,
    Icon
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
      // const pageNum = this.pageNumber
      const wPerPage = (this.pageNumber - 1) * 10
      this.getPaginatedWorkers(wPerPage)
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
