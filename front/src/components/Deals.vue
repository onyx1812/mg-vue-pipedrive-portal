<template>
  <div class="content content-deals">
    <form @submit="formSubmit" class="form form-deals">
      <h2>{{this.$store.state.txt.deal}}</h2>
      <ul class="fields">
        <li class="field">
          <input type="text" name="title" v-model="title" :placeholder="this.$store.state.txt.deal_title" >
        </li>
        <li class="field">
          <input type="text" name="company" v-model="company" :placeholder="this.$store.state.txt.company_name" >
        </li>
        <li class="field">
          <input type="text" name="name" v-model="name" :placeholder="this.$store.state.txt.client_name" >
        </li>
        <li class="field">
          <input type="tel" name="phone" v-model="phone" :placeholder="this.$store.state.txt.client_phone" >
        </li>
        <li class="field">
          <input type="email" name="email" v-model="email" :placeholder="this.$store.state.txt.client_email" >
        </li>
        <li class="field">
          <input type="number" name="offer_cost" v-model="offer_cost" :placeholder="this.$store.state.txt.offer_cost" >
        </li>

        <li class="field">
          <input type="submit" :value="this.$store.state.txt.send_deal">
        </li>
      </ul>
      <transition name="fade">
        <div class="error" v-if="error">{{error}}</div>
        <div class="sucess" v-if="sucess">{{sucess}}</div>
        <div class="loader" v-if="loader"></div>
      </transition>
    </form>
  </div>
</template>
<script>
import Deals from '@/services/Deals.js';
export default {
  name: 'Deals',
  data() {
    return {
      error: false,
      sucess: false,
      loader: false,
      title: null,
      company: null,
      name: null,
      phone: null,
      email: null,
      offer_cost: null
    }
  },
  methods: {

    formSubmit(e) {
      this.loader = true;
      const user_data = JSON.parse( sessionStorage.getItem('USER_DATA') );
      Deals.postDeals(this.title, this.name, this.phone, this.email, this.company, this.offer_cost, user_data.owner_id)
        .then(
          (res => {
            this.loader = false;
            if(res.success){
              this.sucess = this.$store.state.txt.deal_added;
              setTimeout(()=>{
                this.sucess = false;
              }, 1500);
            } else {
              console.error(res);
              this.error = res.error;
              setTimeout(()=>{
                this.error = false;
              }, 1500);
            }
          }).bind(this)
        )
        .catch(err => {
          this.loader = false;
          this.error = err;
          console.error(err);
          setTimeout(()=>{
            this.error = false;
          }, 1500);
        });
      e.preventDefault();
    }
  }
}
</script>
