<template>
  <div class="create">
    <div class="container">
    <h1>Добавить сотрудника</h1>
      <form @submit.prevent="handleSubmit" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> ФИО сотрудника </label>
          <input placeholder="Иванов Иван Иванович" type="text" class="vue-input vue-input-fullname" v-model="formData.fullName">
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника </label>
          <input v-mask="'####-##-##'" placeholder="год-мм-дд" type="tel" class="vue-input vue-input-birthdate" v-model="formData.birthDate">
        <label for="" class="vue-input-wr-label"> Описание сотрудника </label>
          <textarea type="text" class="vue-textarea vue-input-description" maxlength="100"  v-model="formData.description"></textarea>
        <div class="btn-controls">
          <button @submit="checkFullname" type="submit" class="btn vue-add-worker-sbmt"> Сохранить </button>
          <button @click="$router.push('/')" class="btn vue-add-worker-sbmt"> Отменить </button>
        </div>
      </form>
      <p сlass="text-errors" v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
      </p>
      <p сlass="text-success" v-if="submitSuccess === true">
        Сотрудник успешно добавлен!
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
export default {
  name: 'create',
  components: {
  },
  data: () => {
    return {
      errors: [],
      formData: {
        fullName: '',
        birthDate: '',
        description: ''
      },
      submitSuccess: false
    }
  },
  directives: {
    mask
  },
  computed: {

  },
  methods: {
    ...mapActions([
      'addWorker'
    ]),
    handleSubmit () {
      if (this.formData.fullName !== '' && this.formData.fullName.trim().indexOf(' ') !== -1 && this.formData.birthDate.length === 10) {
        const splitFullName = { ...this.formData.fullName.split(/(\s+)/).filter(function (e) { return e.trim().length > 0 }) }
        const { firstName, lastName, middleName } = { firstName: splitFullName[1], lastName: splitFullName[0], middleName: splitFullName[2] }
        const { birthDate, description } = this.formData
        const payload = {
          worker: {
            firstName,
            lastName,
            middleName,
            birthDate,
            description
          }
        }
        this.addWorker(payload)
        this.formData = {
          fullName: '',
          birthDate: '',
          description: ''
        }
        this.submitSuccess = true
        this.errors = []
        setTimeout(() => { this.$router.push({ path: '/' }) }, 3500)
      } else {
        if ((this.formData.fullName === '' || this.formData.fullName.trim().indexOf(' ') === -1) && (this.formData.birthDate.length < 10)) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 4000)
        } else if (this.formData.fullName === '' || this.formData.fullName.trim().indexOf(' ') === -1) {
          this.errors.push('Требуется указать хотя бы имя и фамилию.')
          setTimeout(() => { this.errors = [] }, 4000)
        } else if (this.formData.birthDate.length < 10) {
          console.log(this.formData.birthDate.length < 10)
          this.errors.push('Введите дату в формате: год-мм-дд')
          setTimeout(() => { this.errors = [] }, 4000)
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style>

</style>
