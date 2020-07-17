<template>
  <div class="content content-profile">
      <form @submit="formSubmit" class="form form-profile">
        <h2>Profile</h2>
        <ul class="fields">
          <li class="field">
            <label>Имя:</label>
            <input type="text" v-model="first_name" name="first_name">
          </li>
          <li class="field">
            <label>Фамилия:</label>
            <input type="text" v-model="last_name" name="last_name">
          </li>
          <li class="field">
            <label>Email:</label>
            <input type="email" v-model="email" name="email">
          </li>
          <li class="field">
            <label>Телефон:</label>
            <input type="tel" v-model="phone" name="phone">
          </li>
          <li class="field">
            <label>Страна:</label>
            <input type="text" v-model="country" name="country">
          </li>
          <li class="field">
            <label>Город:</label>
            <input type="text" v-model="city" name="city">
          </li>
          <li class="field">
            <label>Адресс:</label>
            <input type="text" v-model="address" name="address">
          </li>
          <li class="field">
            <label>Пароль:</label>
            <input type="password" v-model="password" name="address">
          </li>
          <li class="field">
            <input type="password" name="password2" id="password2" v-model="password2" placeholder="Подтвердите пароль" required>
          </li>
          <li class="field">
            <label>Баланс:</label>
            <span>${{balance}}</span>
          </li>
          <li class="field">
            <label>История:</label>
            <ul class="story">
              <li v-for="(game, i) in story.games" @click="storyClick($event, i)">
                <span class="date">
                  {{ dateFormating(game.date) }}
                </span>
                <span>
                  items:
                  <b v-for="g in game.items">item: {{g.item}} <br> bet: ${{g.bet}}</b>
                </span>
                <span>rate: {{game.rate}}</span>
                <span>won: {{game.won}}</span>
                <span>result: {{game.result}}</span>
              </li>
            </ul>
          </li>
          <li class="field">
            <input type="submit" value="UPDATE">
          </li>
        </ul>
        <div class="error" v-if="error">{{error_msg}}</div>
        <div class="sucess" v-if="sucess">{{sucess_msg}}</div>
        <div class="loader" v-if="loader"></div>
      </form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data(){
    return {
      data: [],
      error: false,
      error_msg: null,
      sucess: false,
      sucess_msg: null,
      loader: false,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      country: null,
      city: null,
      address: null,
      balance: null,
      story: null,
      password: null,
      password2: null,
      password_confirm: false,
    }
  },
  beforeMount(){
    const user_data = JSON.parse( sessionStorage.getItem('USER_DATA') );
    console.log(user_data);
    if(user_data){
      this.first_name = user_data.first_name;
      this.last_name = user_data.last_name;
      this.email = user_data.email;
      this.phone = user_data.phone;
      this.country = user_data.country;
      this.city = user_data.city;
      this.address = user_data.address;
      this.password = user_data.password;
      this.balance = user_data.balance;
      this.story = JSON.parse(user_data.story);
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    dateFormating: date => {
      console.log(date);
      const formated = moment(date, 'DD-MM-YYYY, HH:mm:ss').format('DD-MM-YYYY, HH:mm:ss');
      return formated;
    },
    storyClick: (e, i) => {
      e.target.parentNode.classList.toggle('active');
    },
    formSubmit(e) {

      if(this.password2 !== this.password){
        document.getElementById('password2').value = '';
        this.error = true;
        this.error_msg = 'Please confirm your password';
        setTimeout(()=>{
          this.error = false;
          this.error_msg = null;
          this.loader = false;
        }, 1500);
      } else {
        this.password_confirm = true;
      }

      this.loader = true;
      if(this.first_name && this.last_name && this.email && this.phone && this.country && this.city && this.address && this.password && this.password_confirm) {
        const url = '/api/user/update';
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          country: this.country,
          city: this.city,
          address: this.address,
          password: this.password
        };
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if(data == false){
              this.error = true;
              this.error_msg = 'Что то пошло не так.';
              this.loader = false;
              setTimeout(()=>{
                this.error = false;
                this.error_msg = null;
                this.loader = false;
              }, 1500);
            } else {
              sessionStorage.setItem('USER_DATA', JSON.stringify(data[0]));
              this.sucess = true;
              this.sucess_msg = 'Your data was updated!'
              setTimeout(()=>{
                this.sucess = false;
                this.sucess_msg = null;
                this.loader = false;
              }, 1500);
            }
          })
          .catch(err => {
            this.loader = false;
            console.error(err);
          });
      }

      e.preventDefault();
    }
  }
}
</script>
<style lang="scss" scoped>
.story{
  width: calc(100% - 30px);
  margin-left: 30px;
  li{
    display: block;
    background: rgba(209, 209, 209, 0.5);
    border: none;
    border-radius: 8px;
    transition: .25s ease;
    max-height: 50px;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    &:not(:first-child){
      margin-top: 7.5px;
    }
    &.active{
      transition: .5s ease;
      max-height: 500px;
    }
    &:hover{
      background: rgba(209, 209, 209, 0.75);
    }
  }
  span{
    display: block;
    height: 50px;
    line-height: 50px;
    border: none;
    &:not(:first-child){
      border-top: 1px solid rgba(#304455, .5);
    }
  }
  b {
    display: inline-block;
    background: #ccc;
    line-height: 1.2;
    padding: 3px 6px;
    margin: 2px;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 12px;
  }
}
</style>
