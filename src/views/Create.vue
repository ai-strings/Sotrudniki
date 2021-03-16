<template>
  <div class="create">
    <div class="container">
    <h1>Добавить сотрудника</h1>
      <form @submit.prevent="handleSubmit" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> ФИО сотрудника
          <input placeholder="Иванов Иван Иванович" type="text" class="vue-input vue-input-fullname" v-model="formData.fullName">
        </label>
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника
          <input v-mask="'####-##-##'" placeholder="1980-12-15" type="tel" class="vue-input vue-input-birthdate" v-model="formData.birthDate">
        </label>
        <label for="" class="vue-input-wr-label"> Описание сотрудника
          <textarea type="text" class="vue-textarea vue-input-description" v-model="formData.description"></textarea>
        </label>
        <input type="submit" class="vue-add-worker-sbmt">
      </form>
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
      formData: {
        fullName: '',
        birthDate: '',
        description: ''
      }
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
    }
  },
  mounted () {
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
