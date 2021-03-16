<template>
  <div class="redact">
    <div class="container">
      <h1>Редактировать сотрудника</h1>
      <form @submit.prevent="handleUpd" class="vue-add-worker">
        <p v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
        </p>
        <p v-if="submitSuccess === true">
          Сотрудник успешно отредактирован!
        </p>
        <label for="" class="vue-input-wr-label"> ФИО сотрудника
          <input type="text" class="vue-input vue-input-lastname" v-model="crntWorkerFullname">
        </label>
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника
          <input v-mask="'####-##-##'" placeholder="1980-12-15" type="text" class="vue-input vue-input-birthdate" v-model="crntWorker.birthDate">
        </label>
        <label for="" class="vue-input-wr-label"> Описание сотрудника
          <textarea type="text" class="vue-textarea vue-input-description" maxlength="100" v-model="crntWorker.description"></textarea>
        </label>
        <input type="submit" class="vue-add-worker-sbmt">
      </form>
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
        const { firstName, lastName, middleName, birthDate, description, id } = this.crntWorker
        const updatedWorker = {
          firstName,
          lastName,
          middleName,
          birthDate,
          description,
          id
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
  .vue-add-worker {
    display: flex;
    flex-direction: column;
  }
  .vue-input-wr-label {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  .vue-input {
    width: 300px;
    height: 35px;
    padding: 0px 5px;
  }
  .vue-textarea {
    width: 300px;
    height: 100px;
    padding: 10px 5px;
    resize: none;
  }
  .vue-input:focus, .vue-textarea:focus {
    outline: none;
  }
  .vue-add-worker-sbmt {
    width: 200px;
    height: 35px;
  }
</style>
