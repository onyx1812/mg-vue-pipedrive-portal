<template>
  <Login v-if="this.$store.state.account === 'login'" />
  <Register v-else-if="this.$store.state.account === 'register'" />
  <Profile v-else-if="this.$store.state.account === 'profile'" />
</template>

<script>
import Login from './partials/Login.vue'
import Register from './partials/Register.vue'
import Profile from './partials/Profile.vue'
export default {
  name: 'Account',
  components: {
    Login,
    Register,
    Profile
  }
}
</script>
