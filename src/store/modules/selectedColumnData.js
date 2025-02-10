export default {
  namespaced: true,
  state: {
    data: null,
  },
  mutations: {
    setColumnData(state, data) {
      state.data = data;
    },
  },

  getters: {
    getColumnData(state) {
      return state.data;
    },
  },
};
