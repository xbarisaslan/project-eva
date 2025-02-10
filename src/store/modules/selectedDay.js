export default {
  namespaced: true,
  state: {
    dayRange: "7",
  },
  mutations: {
    setDayRange(state, day) {
      state.dayRange = day;
    },
  },
  getters: {
    getDayRange(state) {
      return state.dayRange;
    },
  },
};
