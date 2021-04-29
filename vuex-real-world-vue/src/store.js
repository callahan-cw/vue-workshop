import Vue from "vue"
import Vuex from "vuex"
import EventService from "@/services/EventService"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    todos: [
      { id: 1, text: "something", done: true },
      { id: 2, text: "something", done: false },
      { id: 3, text: "something", done: true },
      { id: 4, text: "something", done: false }
    ],
    count: 0,
    events: []
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit("INCREMENT_COUNT", value)
      }
    },
    createEvent({ commit, event }) {
      EventService.postEvent(event)
      commit("ADD_EVENT", event)
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      // return state.todos.filter(todo => !todo.done).length
      return state.todos.length - getters.doneTodos.length
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
