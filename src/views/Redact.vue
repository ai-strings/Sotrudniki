<template>
  <div class="redact">
    <div class="container">
      <h1>Редактировать сотрудника</h1>
      <form @submit.prevent="handleUpd" class="vue-add-worker">
        <label for="" class="vue-input-wr-label"> Фамилия сотрудника
          <input type="text" class="vue-input vue-input-lastname" v-model="crntWorker.lastName">
        </label>
        <label for="" class="vue-input-wr-label"> Имя сотрудника
          <input placeholder="Иван" type="text" class="vue-input vue-input-firstname" v-model="crntWorker.firstName">
        </label>
        <label for="" class="vue-input-wr-label"> Отчество сотрудника
          <input placeholder="Иванович" type="text" class="vue-input vue-input-middlename" v-model="crntWorker.middleName">
        </label>
        <label for="" class="vue-input-wr-label"> Дата рождения сотрудника
          <input placeholder="1980-12-15" type="text" class="vue-input vue-input-birthdate" v-model="crntWorker.birthDate">
        </label>
        <label for="" class="vue-input-wr-label"> Описание сотрудника
          <textarea type="text" class="vue-textarea vue-input-description" v-model="crntWorker.description"></textarea>
        </label>
        <input type="submit" class="vue-add-worker-sbmt">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'create',
  components: {
  },
  data: () => {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getWorker'
    ]),
    crntWorker () {
      return this.getWorker
    }
  },
  methods: {
    ...mapActions([
      'getSingleWorker',
      'editWorker'
    ]),
    handleUpd () {
      const { firstName, lastName, middleName, birthDate, description, id } = this.crntWorker
      const updatedWorker = {
        id,
        lastName,
        firstName,
        middleName,
        birthDate,
        description
      }
      this.editWorker(updatedWorker)
    }
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
