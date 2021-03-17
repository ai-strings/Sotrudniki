<template>
  <div class="redact">
    <div class="container">
      <h1>Редактировать сотрудника</h1>
      <form @submit.prevent="handleUpd" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> ФИО сотрудника </label>
          <input type="text" class="vue-input vue-input-lastname" placeholder="Иванов Иван Иванович" v-model="crntWorkerFullname">
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника </label>
          <input v-mask="'####-##-##'" placeholder="год-мм-дд" type="text" class="vue-input vue-input-birthdate" v-model="crntWorker.birthDate">
        <label for="" class="vue-input-wr-label"> Описание сотрудника </label>
          <textarea type="text" class="vue-textarea vue-input-description" maxlength="100" v-model="crntWorker.description"></textarea>
        <div class="btn-controls">
          <button type="submit" class="btn vue-edit-worker-sbmt"> Сохранить </button>
          <button @click="$router.push('/')" class="btn vue-add-worker-sbmt"> Отменить </button>
        </div>
      </form>
      <p сlass="text-errors" v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
      </p>
      <p сlass="text-success" v-if="submitSuccess === true">
        Сотрудник успешно отредактирован!
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'
export default {
  name: 'create',
  components: {
  },
  data: () => {
    return {
      errors: [],
      submitSuccess: false
    }
  },
  directives: {
    mask
  },
  computed: {
    ...mapGetters([
      'getWorker'
    ]),
    crntWorker () {
      return this.getWorker
    },
    crntWorkerFullname: {
      get () {
        return [this.crntWorker.lastName, this.crntWorker.firstName, this.crntWorker.middleName].join(' ').trim()
      },
      set (newValue) {
        const splitFullName = newValue.trim().split(' ').filter(function (str) {
          return /\S/.test(str)
        })
        console.log(splitFullName)
        this.crntWorker.lastName = splitFullName[0] ? splitFullName[0] : ''
        this.crntWorker.firstName = splitFullName[1] ? splitFullName[1] : ''
        this.crntWorker.middleName = splitFullName[2] ? splitFullName[2] : ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getSingleWorker',
      'editWorker'
    ]),
    handleUpd () {
      if (this.crntWorkerFullname !== '' && this.crntWorkerFullname.trim().indexOf(' ') !== -1 && this.crntWorker.birthDate.length === 10) {
        const { firstName, lastName, middleName, birthDate, description, _id } = this.crntWorker
        const updatedWorker = {
          firstName,
          lastName,
          middleName,
          birthDate,
          description,
          _id
        }
        this.editWorker(updatedWorker)
        this.errors = []
        this.submitSuccess = true

        this.crntWorkerFullname = ''
        this.crntWorker.birthDate = ''
        this.crntWorker.description = ''
        setTimeout(() => { this.$router.push({ path: '/' }) }, 3500)
      } else {
        if ((this.crntWorkerFullname === '' || this.crntWorkerFullname.trim().indexOf(' ') === -1) && (this.crntWorker.birthDate.length < 10)) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 4000)
        } else if (this.crntWorkerFullname === '' || this.crntWorkerFullname.trim().indexOf(' ') === -1) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          setTimeout(() => { this.errors = [] }, 4000)
        } else if (this.crntWorker.birthDate.length < 10) {
          console.log(this.crntWorker.birthDate.length < 10)
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 4000)
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.getSingleWorker(this.$route.query.wid)
  }
}
</script>
<style>

</style>
