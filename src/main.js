import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'

const store = createStore({
  state: {
    workers: []
  },
  actions: {
    getWorkers ({ commit }) {
      return axios('http://localhost:3000/workers', {
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
    }
  },
  mutations: {
    setWorkers: (state, workers) => {
      state.workers = workers
    },
    newWorker: (state, worker) => {
      state.workers.unshift(worker)
    }
  },
  getters: {
    WorkersList (state) {
      return state.workers
    }
  }
})

const app = createApp(App).use(router)
app.use(store)
app.mount('#app')
