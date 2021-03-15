<template>
  <div class="home">
    <div class="container">
      <vue-table
        :paginatedWorkersData = "paginatedWorkersList"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vueTable from '@/components/tables/vue-table'

export default {
  name: 'home',
  components: {
    vueTable
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'WorkersList',
      'paginatedWorkersList'
    ])
  },
  methods: {
    ...mapActions([
      'getWorkers',
      'getPaginatedWorkers'
    ])
  },
  mounted () {
    // this.getWorkers()
    this.getPaginatedWorkers(1)
  }
}
</script>
