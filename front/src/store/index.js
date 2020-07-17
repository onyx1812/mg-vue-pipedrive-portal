import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    step: 1,
    account: 'login',
    logined: false,
    user_data: null,
    owner_id: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
