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
        v-for="row in workersData"
        :key="row.id"
        :rowData = "row"
      />
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
    return {}
  },
  computed: {}
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
</style>
