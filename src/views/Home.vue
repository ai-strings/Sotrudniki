<template>
  <div class="home">
    <div class="container">
        <button @click="$router.push('create')" class="btn btn-add-worker"> Добавить сотрудника </button>
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
    this.getPaginatedWorkers(0)
  }
}
</script>
