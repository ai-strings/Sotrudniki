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
    }
  },
  mutations: {
    setWorkers: (state, workers) => {
      state.workers = workers
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
