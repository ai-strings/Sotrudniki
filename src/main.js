import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'

// const resourceUri = 'http://localhost:3000/workers'
const store = createStore({
  state: {
    workers: []
  },
  actions: {
    getWorkers ({ commit }) {
      return axios('http://localhost:3000/workers/', {
        method: 'GET'
      })
        .then((response) => {
          commit('setWorkers', response.data)
        })
    },
    addWorker ({ commit }, payload) {
      axios.post('http://localhost:3000/workers', payload.worker)
        .then((response) => {
          commit('newWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editWorker ({ commit }, updatedWorker) {
      axios.put('http://localhost:3000/workers/' + updatedWorker.id, updatedWorker)
        .then((response) => {
          commit('updWorker', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    delWorker ({ commit }, workerToDelete) {
      axios.delete('http://localhost:3000/workers/' + workerToDelete.id)
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
    newWorker: (state, worker) => {
      state.workers.unshift(worker)
    },
    updWorker: (state) => (updatedWorker) => {
      const index = state.workers.findIndex(worker => {
        return worker.id === updatedWorker.id
      })
      if (index !== -1) {
        state.workers.splice(index, 1, updatedWorker)
      }
    },
    removeWorker: (state, workerToDelete) => {
      state.workers = state.workers.filter(w => workerToDelete.id !== w.id)
    }
  },
  getters: {
    WorkersList (state) {
      return state.workers
    },
    getWorker: (state) => (wid) => {
      return state.workers.find(worker => { return worker.id === wid })
    }

  }
})

const app = createApp(App).use(router)
app.use(store)
app.mount('#app')
