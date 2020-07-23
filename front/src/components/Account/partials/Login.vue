<template>
  <div class="content content-login">
    <form @submit="formSubmit" id="login" class="form form-login">
      <h2>{{this.$store.state.txt.login_title}}</h2>
      <ul class="fields">
        <li class="field">
          <input type="email" name="email" v-model="email" :placeholder="this.$store.state.txt.email" >
        </li>
        <li class="field">
          <input type="password" name="password" v-model="password" :placeholder="this.$store.state.txt.password" >
        </li>
        <li class="field">
          <input type="submit" :value="this.$store.state.txt.login_title">
        </li>
      </ul>
      <div>{{this.$store.state.txt.login_question}} <a @click="accRegister">{{this.$store.state.txt.registration_title}}</a></div>
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
  data() {
    return {
      loader: false,
      error: false,
      sucess: false,
      email: null,
      password: null
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
                this.sucess = `${this.$store.state.txt.welcome} ${user[0].name}!`;
                setTimeout(() => {
                  this.$store.state.logined = true;
                  this.$store.state.step = 2;
                }, 1500);
              } else{
                this.loader = false;
                this.error = this.$store.state.txt.error_fields;
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
        this.error = this.$store.state.txt.error_fields;
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
