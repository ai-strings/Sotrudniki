import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'

// const resourceUri = 'http://localhost:3000/workers'
const store = createStore({
  state: {
    // workers: [],
    paginatedWorkers: [],
    singleWorker: {},
    workersCount: null
  },
  actions: {
    // getWorkers ({ commit }) {
    //   return axios('http://localhost:3000/workers/', {
    //     method: 'GET'
    //   })
    //     .then((response) => {
    //       commit('setWorkers', response.data)
    //     })
    // },
    getPaginatedWorkers ({ commit }, pageNum) {
      return axios('http://haemmid.ru:3000/workers?_sort=id&_order=desc&_page=' + pageNum, {
        method: 'GET'
      })
        .then((response) => {
          console.log(response.headers['x-total-count'])
          commit('setPaginatedWorkers', response.data)
          commit('setWorkersCount', response.headers['x-total-count'])
        })
    },
    addWorker ({ commit }, payload) {
      axios.post('http://haemmid.ru:3000/workers', payload.worker)
        .then((response) => {
          // commit('newWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSingleWorker ({ commit }, wid) {
      return axios('http://haemmid.ru:3000/workers/' + wid, {
        method: 'GET'
      })
        .then((response) => {
          console.log(response.data)
          commit('setSingleWorker', response.data)
        })
    },
    editWorker ({ commit }, updatedWorker) {
      axios.put('http://haemmid.ru:3000/workers/' + updatedWorker.id, updatedWorker)
        .then((response) => {
          commit('updWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    delWorker ({ commit }, workerToDelete) {
      axios.delete('http://haemmid.ru:3000/workers/' + workerToDelete.id)
        .then((response) => {
          commit('removeWorker', workerToDelete)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
  mutations: {
    setWorkers: (state, workers) => {
      state.workers = workers
    },
    setWorkersCount: (state, workersCount) => {
      state.workersCount = workersCount
    },
    setPaginatedWorkers: (state, paginatedWorkers) => {
      state.paginatedWorkers = paginatedWorkers
    },
    // newWorker: (state, worker) => {
    //   state.workers.unshift(worker)
    // },
    setSingleWorker: (state, singleWorker) => {
      state.singleWorker = singleWorker
    },
    updWorker: (state) => (updatedWorker) => {
      const index = state.paginatedWorkers.findIndex(worker => {
        return worker.id === updatedWorker.id
      })
      if (index !== -1) {
        state.paginatedWorkers.splice(index, 1, updatedWorker)
      }
    },
    removeWorker: (state, workerToDelete) => {
      state.paginatedWorkers = state.paginatedWorkers.filter(w => workerToDelete.id !== w.id)
    }
  },
  getters: {
    WorkersList (state) {
      return state.workers
    },
    getWorkersCount (state) {
      return state.workersCount
    },
    paginatedWorkersList (state) {
      return state.paginatedWorkers
    },
    getWorker (state) {
      return state.singleWorker
    }

  }
})

const app = createApp(App).use(router)
app.use(store)
app.mount('#app')
