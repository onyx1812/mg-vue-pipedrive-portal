import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import lang_ru from '@/locate/ru.json'
import lang_en from '@/locate/en.json'
import lang_fr from '@/locate/fr.json'

export default new Vuex.Store({
  state: {
    step: 1,
    account: 'login',
    logined: false,
    user_data: null,
    owner_id: null,
    deal_id: 4,
    person_id: 5,
    lang: null,
    txt: lang_en,
    lang_ru: lang_ru,
    lang_en: lang_en,
    lang_fr: lang_fr,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
