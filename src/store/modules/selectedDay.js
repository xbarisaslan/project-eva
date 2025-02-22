export default {
  namespaced: true,
  state: {
    dayRange: "14",
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
