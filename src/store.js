import Vue from 'vue'
import Vuex from 'vuex'
import Calendar from '@/utils/calendar'

Vue.use(Vuex)
const calendar = new Calendar()

export default new Vuex.Store({
  state: {
    dateList: calendar.setDataList(),
    weekTable: calendar.weekTable
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getDateInfo: ({ dateList, weekTable }) => ({ dateList, weekTable })
  }
})
