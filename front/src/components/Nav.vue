<template>
  <div>
    <a @click="logOut" :title="this.$store.state.txt.logout">{{this.$store.state.txt.logout}}</a>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  methods: {
    logOut(e){
      this.$store.state.account = 'login';
      this.$store.state.step = 1;
      this.$store.state.logined = false;
      sessionStorage.clear();
    }
  },
};
</script>
<style lang="scss" scoped>
a{
  position: fixed;
  right: 130px;
  top: 8px;
  font-size: 0;
  width: 20px;
  height: 30px;
  background: none;
  border:none;
  border-left: 2px solid #4fc08d;
  border-top: 2px solid #4fc08d;
  border-bottom: 2px solid #4fc08d;
  &:before{
    content: "→";
    color: #4fc08d;
    font-weight: 700;
    font-size: 20px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-25%, -50%);
    transition: transform .5s ease;
  }
  &:hover{
    opacity: .9;
    &:before{
      transform: translate(0, -50%);
    }
  }
}
</style>
