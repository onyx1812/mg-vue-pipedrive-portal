<template>
  <div class="steps">
    <Translator :lang_cur="this.$store.state.lang"/>
    <Nav v-if="this.$store.state.step !== 1" />
    <transition name="scale">
      <Account v-if="this.$store.state.step === 1" />
      <Deals v-else-if="this.$store.state.step === 2" />
      <File v-else-if="this.$store.state.step === 3" />
      <Success v-else-if="this.$store.state.step === 4" />
    </transition>
  </div>
</template>
<script>
import Account from '@/components/Account/Account.vue'
import Deals from '@/components/Deals.vue'
import File from '@/components/File.vue'
import Nav from '@/components/Nav.vue'
import Translator from '@/components/Translator.vue'
import Success from '@/components/Success.vue'
export default {
  name: 'Home',
  components: {
    Deals,
    File,
    Account,
    Nav,
    Translator,
    Success
  },
  beforeCreate(){
    const user_data = JSON.parse( sessionStorage.getItem('USER_DATA') );
    if( sessionStorage.getItem('USER_SUCCESS') && sessionStorage.getItem('USER_SUCCESS') === 'true'){
      this.$store.state.step = 4;
    } else if(user_data){
      this.$store.state.logined = true;
      this.$store.state.step = 2;
      this.$store.state.owner_id = user_data.owner_id;
      // sessionStorage.setItem('USER_SUCCESS', 'false');
    }

    const user_lang = sessionStorage.getItem('USER_LANG');
    if(user_lang === 'en'){
      this.$store.state.lang = 'en';
      this.$store.state.txt = this.$store.state.lang_en;
    } else if(user_lang === 'ru'){
      this.$store.state.lang = 'ru';
      this.$store.state.txt = this.$store.state.lang_ru;
    } else if(user_lang === 'fr'){
      this.$store.state.lang = 'fr';
      this.$store.state.txt = this.$store.state.lang_fr;
    } else {
      sessionStorage.setItem('USER_LANG', 'en');
      this.$store.state.lang = 'en';
      this.$store.state.txt = this.$store.state.lang_en;
    }
  }
}
</script>
<style lang="scss" scoped>
.steps{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 75px 15px 30px;
  @media(min-width:768px){
    padding: 50px 30px;
  }
}
</style>
