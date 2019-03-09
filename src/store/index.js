import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user: null,
  errorMessages: [],
  myLikeURLIds: [],
  myLikeFileIds: [],
  homeSelect: true,
  urlSelect: false,
  fileSelect: false

}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
