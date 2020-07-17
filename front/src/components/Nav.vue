<template>
  <ul>
    <li><button @click="goToDeals">Deals</button></li>
    <li><button @click="goToUploads">Uploads</button></li>
    <li><button @click="logOut">logOut</button></li>
  </ul>
</template>
<script>
export default {
  name: 'Nav',
  methods: {
    goToDeals(e){
      this.$store.state.step = 2;
    },
    goToUploads(e){
      this.$store.state.step = 3;
    },
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
ul{
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translate(-50%, 0);
}
li{
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}
button{
  background: none;
  border: none;
  color: #35495e;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  &:hover{
    opacity: .7;
  }
}
</style>
