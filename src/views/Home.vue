<template>
  <div class="home">
    <div class="container">
      <vue-table
        :workersData = "WorkersList"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vueTable from '@/components/tables/vue-table'

export default {
  name: 'app',
  components: {
    vueTable
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'WorkersList'
    ])
  },
  methods: {
    ...mapActions([
      'getWorkers'
    ])
  },
  mounted () {
    this.getWorkers()
  }
}
</script>
