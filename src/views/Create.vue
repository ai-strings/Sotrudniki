<template>
  <div class="create">
    <div class="container">
    <h1>Добавить сотрудника</h1>
      <form @submit.prevent="handleSubmit" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> Фамилия сотрудника
          <input placeholder="Иванов" type="text" class="vue-input vue-input-lastname" v-model="formData.lastName">
        </label>
        <label for="" class="vue-input-wr-label"> Имя сотрудника
          <input placeholder="Иван" type="text" class="vue-input vue-input-firstname" v-model="formData.firstName">
        </label>
        <label for="" class="vue-input-wr-label"> Отчество сотрудника
          <input placeholder="Иванович" type="text" class="vue-input vue-input-middlename" v-model="formData.middleName">
        </label>
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника
          <input placeholder="1980-12-15" type="text" class="vue-input vue-input-birthdate" v-model="formData.birthDate">
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
export default {
  name: 'create',
  components: {
  },
  data: () => {
    return {
      formData: {
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        description: ''
      }
    }
  },
  computed: {

  },
  methods: {
    ...mapActions([
      'addWorker'
    ]),
    handleSubmit () {
      const { firstName, lastName, middleName, birthDate, description } = this.formData
      const payload = {
        worker: {
          lastName,
          firstName,
          middleName,
          birthDate,
          description
        }
      }
      this.addWorker(payload)
      this.formData = {
        firstName: '',
        lastName: '',
        middleName: '',
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
