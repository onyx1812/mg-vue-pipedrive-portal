<template>
  <div>
    {{users}}
    <form @submit="getUserData">
      <input type="email" v-model="email" placeholder="Email">
      <input type="submit">
    </form>
    {{user}}
  </div>
</template>
<script>
import Users from '@/services/Users.js';
export default {
  name: 'Test',
  data() {
    return {
      email: null,
      user: {},
      users: {}
    }
  },
  created() {
    this.getUsersData();
  },
  // NEW
  methods: {
    async getUsersData() {
      Users.getUsers()
      .then(
        (users => {
          this.users = users;
        }).bind(this)
      );
    },
    async getUserData(e){
      Users.getUser(this.email)
      .then(
        (user => {
          this.user = user;
        }).bind(this)
      );
      e.preventDefault();
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
