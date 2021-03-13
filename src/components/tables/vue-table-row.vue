<template>
<div class="vue-table-row">
  <div class="vtr-row row-lastname"> {{rowData.lastName}} </div>
  <div class="vtr-row row-firstname"> {{rowData.firstName}} </div>
  <div class="vtr-row row-middlename"> {{rowData.middleName}} </div>
  <div class="vtr-row row-bdate"> {{rowData.birthDate}} </div>
  <div class="vtr-row row-desc"> {{rowData.description}} </div>
  <div class="vtr-row row-actions"> </div>
</div>
</template>

<script>
export default {
  name: 'vue-table-row',
  props: {
    rowData: {
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
</style>
