<template>
  <div class="redact">
    <div class="container">
      <h1>Редактировать сотрудника</h1>
      <form @submit.prevent="handleUpd" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> ФИО сотрудника </label>
          <input type="text" class="vue-input vue-input-lastname" placeholder="Иванов Иван Иванович" v-model="crntWorkerFullname">
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника </label>
          <input v-mask="'##-##-####'" placeholder="дд-мм-год" type="text" class="vue-input vue-input-birthdate" v-model="crntWorkerBirthD">
        <label for="" class="vue-input-wr-label"> Описание сотрудника </label>
          <textarea placeholder="Макс. 100 символов" type="text" class="vue-textarea vue-input-description" maxlength="100" v-model="getWorker.description"></textarea>
        <div class="btn-controls">
          <button type="submit" class="btn vue-edit-worker-sbmt"> Сохранить </button>
          <button @click="$router.push('/')" class="btn vue-add-worker-sbmt"> Отменить </button>
        </div>
      </form>
      <div class="messages">
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
      submitSuccess: false,
      componentLoaded: false
    }
  },
  directives: {
    mask
  },
  computed: {
    ...mapGetters([
      'getWorker'
    ]),
    // crntWorker () {
    //   return this.getWorker
    // },
    crntWorkerFullname: {
      get () {
        return [this.getWorker.lastName, this.getWorker.firstName, this.getWorker.middleName].join(' ').trim()
      },
      set (newValue) {
        const splitFullName = newValue.trim().split(' ').filter(function (str) {
          return /\S/.test(str)
        })
        // console.log(splitFullName)
        this.getWorker.lastName = splitFullName[0] ? splitFullName[0] : ''
        this.getWorker.firstName = splitFullName[1] ? splitFullName[1] : ''
        this.getWorker.middleName = splitFullName[2] ? splitFullName[2] : ''
      }
    },
    crntWorkerBirthD: {
      get () {
        if (!this.componentLoaded) {
          return null
        } else {
          return this.getWorker.birthDate.trim().split('-').reverse().join('-')
        }
      },
      set (newVal) {
        if (!this.componentLoaded) {
          return null
        } else {
          const splitBdate = newVal.trim().split('-').reverse().join('-')
          console.log(splitBdate)
          this.getWorker.birthDate = splitBdate
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getSingleWorker',
      'editWorker'
    ]),
    handleUpd () {
      console.log(this.getWorker.birthDate)
      if ((this.crntWorkerFullname !== '' &&
        this.crntWorkerFullname.trim().indexOf(' ') !== -1) &&
        (this.getWorker.birthDate.length === 10 &&
        parseInt(this.getWorker.birthDate.substring(5, 7)) <= 12 &&
        parseInt(this.getWorker.birthDate.substring(8, 10)) <= 31)) {
        const { firstName, lastName, middleName, description, id } = this.getWorker
        const birthDate = this.getWorker.birthDate
        const updatedWorker = {
          firstName,
          lastName,
          middleName,
          birthDate,
          description,
          id
        }
        // console.log(parseInt(this.crntWorker.birthDate.substring(5, 7)))
        this.editWorker(updatedWorker)
        this.errors = []
        this.submitSuccess = true
        this.crntWorkerFullname = ''
        this.getWorker.birthDate = ''
        this.getWorker.description = ''
        setTimeout(() => { this.$router.push({ path: '/' }) }, 2000)
      } else {
        // console.log(parseInt(this.crntWorker.birthDate.substring(8, 10)))
        if ((this.crntWorkerFullname === '' ||
          this.crntWorkerFullname.trim().indexOf(' ') === -1) && (this.getWorker.birthDate.length < 10)) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 3000)
        } else if (this.crntWorkerFullname === '' || this.crntWorkerFullname.trim().indexOf(' ') === -1) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          setTimeout(() => { this.errors = [] }, 3000)
        } else if (this.getWorker.birthDate.length < 10) {
          // console.log(this.crntWorker.birthDate.length < 10)
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 3000)
        } else if (parseInt(this.getWorker.birthDate.substring(5, 7)) > 12) {
          this.errors.push('В году может быть не более 12 месяцев :)')
          setTimeout(() => {
            this.errors = []
          }, 3000)
        } else if (parseInt(this.getWorker.birthDate.substring(8, 10)) > 31) {
          this.errors.push('В месяце может быть не более 31 дня :)')
          setTimeout(() => {
            this.errors = []
          }, 3000)
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.getSingleWorker(this.$route.query.wid)
    this.componentLoaded = true
  }
}
</script>
<style>

</style>
