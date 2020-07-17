<template>
  <div class="steps">
    <Nav v-if="this.$store.state.step !== 1" />
    <transition name="scale">
      <Account v-if="this.$store.state.step === 1" />
      <Deals v-else-if="this.$store.state.step === 2" />
      <Uploads v-else-if="this.$store.state.step === 3" />
    </transition>
  </div>
</template>
<script>
import Account from '@/components/Account/Account.vue'
import Deals from '@/components/Deals.vue'
import Uploads from '@/components/Uploads.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'Home',
  components: {
    Deals,
    Uploads,
    Account,
    Nav
  }
}
</script>
<style lang="scss" scoped>
.steps{
  position: relative;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
