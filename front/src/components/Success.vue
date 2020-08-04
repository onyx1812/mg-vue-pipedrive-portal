<template>
  <div class="steps">
    <h1 class="success-title">
      <span>Success!!!</span>
      Wait {{timer}} second(s) for redirection...
    </h1>
  </div>
</template>
<script>
export default {
  name: 'Success',
  data(){
    return {
      timer: 5
    }
  },
  mounted(){
    setInterval(()=>{
      this.timer = Number(this.timer) - 1;
    }, 1000);
    setTimeout(()=>{
      sessionStorage.setItem('USER_SUCCESS', 'false');
      this.$store.state.step = 2;
      this.$router.push('/');
    }, 5500);
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
