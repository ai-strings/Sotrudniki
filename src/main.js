import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'

// const resourceUri = 'http://localhost:3000/workers'
const apikey = '6051197bff8b0c1fbbc28b4d'

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
    getPaginatedWorkers ({ commit }, wPerPage) {
      return axios(`https://workers-3347.restdb.io/rest/db?apikey=${apikey}&sort=_id&dir=-1&skip=${wPerPage}&max=10&totals=true`, {
        method: 'GET'
      })
        .then((response) => {
          console.log(response)
          commit('setPaginatedWorkers', response.data.data)
          commit('setWorkersCount', response.data.totals.total)
        })
    },
    addWorker ({ commit }, payload) {
      axios.post(`https://workers-3347.restdb.io/rest/db?apikey=${apikey}`, payload.worker)
        .then((response) => {
          // commit('newWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSingleWorker ({ commit }, wid) {
      return axios(`https://workers-3347.restdb.io/rest/db/${wid}?apikey=${apikey}`, {
        method: 'GET'
      })
        .then((response) => {
          console.log(response.data)
          commit('setSingleWorker', response.data)
        })
    },
    editWorker ({ commit }, updatedWorker) {
      axios.put(`https://workers-3347.restdb.io/rest/db/${updatedWorker._id}?apikey=${apikey}`, updatedWorker)
        .then((response) => {
          commit('updWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    delWorker ({ commit }, workerToDelete) {
      axios.delete(`https://workers-3347.restdb.io/rest/db/${workerToDelete._id}?apikey=${apikey}`)
        .then((response) => {
          commit('removeWorker', workerToDelete)
          console.log(response)
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
      state.paginatedWorkers = state.paginatedWorkers.filter(w => workerToDelete._id !== w._id)
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
