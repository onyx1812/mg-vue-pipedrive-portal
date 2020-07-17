<template>
  <div class="content content-login">
    <form @submit="formSubmit" id="login" class="form form-login">
      <h2>Log In</h2>
      <ul class="fields">
        <li class="field">
          <input type="email" name="email" v-model="email" placeholder="Email" >
        </li>
        <li class="field">
          <input type="password" name="password" v-model="password" placeholder="Password" >
        </li>
        <li class="field">
          <input type="submit" value="LOGIN">
        </li>
      </ul>
      <div>Don't have an account? <a @click="accRegister">Register</a></div>
      <transition name="fade">
        <div class="error" v-if="error">{{error}}</div>
        <div class="sucess" v-if="sucess">{{sucess}}</div>
        <div class="loader" v-if="loader"></div>
      </transition>
    </form>
  </div>
</template>

<script>
import Users from '@/services/Users.js';
export default {
  beforeCreate(){
    const user_data = JSON.parse( sessionStorage.getItem('USER_DATA') );
    if(user_data){
      this.$store.state.logined = true;
      this.$store.state.step = 2;
      this.$store.state.owner_id = user_data.owner_id;
    }
  },
  data() {
    return {
      loader: false,
      error: false,
      sucess: false,
      email: null,
      password: null,
    };
  },
  methods: {
    formSubmit(e) {
      this.loader = true;
      if(this.email && this.password) {
        Users.getUser(this.email, this.password)
          .then(
            (user => {
              this.loader = false;
              if(user.length > 0){
                sessionStorage.setItem('USER_DATA', JSON.stringify(user[0]));
                this.sucess = `Welcome ${user[0].name}!`;
                setTimeout(() => {
                  this.$store.state.logined = true;
                  this.$store.state.step = 2;
                }, 1500);
              } else{
                this.loader = false;
                this.error = 'Please check all fields and try againe!';
              }
            }).bind(this)
          )
          .catch(err => {
            this.loader = false;
            this.error = err;
            console.error(err);
            setTimeout(() => {
              this.error = false;
              this.sucess = false;
            }, 1500);
          });
      } else if (!this.email || !this.password) {
        this.loader = false;
        this.error = 'Please check all fields and try again!';
      }
      setTimeout(() => {
        this.error = false;
        this.sucess = false;
      }, 1500);
      e.preventDefault();
    },
    accRegister(e){
      this.$store.state.account = 'register';
    }
  }
};
</script>
