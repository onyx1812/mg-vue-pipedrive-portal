<template>
  <div class="switcher">
    <button
      v-for="lang in languages"
      :class="(lang === lang_cur) ? 'active' : ''"
      @click="translate"
    >{{lang}}</button>
  </div>
</template>
<script>
export default {
  name: 'Translator',
  props: {
    lang_cur: String
  },
  data(){
    return {
      languages: ['en', 'fr', 'ru']
    }
  },
  methods: {
    translate(e){
      this.$store.state.lang = e.target.innerHTML;
      sessionStorage.setItem('USER_LANG', JSON.stringify(e.target.innerHTML))
      const user_lang = e.target.innerHTML;
      if(user_lang === 'en'){
        this.$store.state.lang = 'en';
        this.$store.state.txt = this.$store.state.lang_en;
      } else if(user_lang === 'ru'){
        this.$store.state.lang = 'ru';
        this.$store.state.txt = this.$store.state.lang_ru;
      } else if(user_lang === 'fr'){
        this.$store.state.lang = 'fr';
        this.$store.state.txt = this.$store.state.lang_fr;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.switcher{
  position: fixed;
  right: 15px;
  top: 15px;
  display: flex;
}
button{
  background: none;
  border: none;
  color: #35495e;
  font-size: 16px;
  font-weight: 400;
  display: block;
  width: 30px;
  position: relative;
  padding: 0;
  text-align: center;
  &.active{
    font-weight: 700;
  }
  &:not(:first-child){
    margin-left: 4px;
    &:before{
      font-weight: 400;
      content: "|";
      color: #4fc08d;
      position: absolute;
      left: 0; top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
