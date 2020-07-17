<template>
  <div class="content content-deals">
    <form @submit="formSubmit" class="form form-deals">
      <h2>Deal form</h2>
      <ul class="fields">
        <li class="field">
          <input type="text" name="title" v-model="title" placeholder="Deal title" >
        </li>
        <li class="field">
          <input type="text" name="company" v-model="company" placeholder="Company name" >
        </li>
        <li class="field">
          <input type="text" name="name" v-model="name" placeholder="Client name" >
        </li>
        <li class="field">
          <input type="tel" name="phone" v-model="phone" placeholder="Client phone number" >
        </li>
        <li class="field">
          <input type="email" name="email" v-model="email" placeholder="Client email" >
        </li>
        <li class="field">
          <input type="number" name="offer_cost" v-model="offer_cost" placeholder="Offer cost" >
        </li>
        <li class="field">
          <input type="submit" value="Send Deal">
        </li>
      </ul>
      <transition name="fade">
        <div class="error" v-if="error">Please check all fields</div>
        <div class="sucess" v-if="sucess">{{sucess}}</div>
        <div class="loader" v-if="loader">loader</div>
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
      const user_data = JSON.parse( sessionStorage.getItem('USER_DATA') );
      Deals.postDeals(this.title, this.name, this.phone, this.email, this.company, this.offer_cost, user_data.owner_id)
        .then(
          (res => {
            this.loader = false;
            if(res.success){
              this.sucess = 'Deal was added!';
              setTimeout(()=>{
                this.sucess = false;
              }, 1500);
            } else {
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
        });
      e.preventDefault();
    }
  }
}
</script>
<style lang="scss" scoped>
// .form .fields .field:last-child{
//   flex: 1 100%;
//   max-width: 100%;
// }
</style>
