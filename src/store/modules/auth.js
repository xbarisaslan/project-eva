export default {
  namespaced: true,
  state: {
    token: null,
    marketplace: null,
    sellerId: null,
    loggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setMarketplace(state, name) {
      state.marketplace = name;
    },
    setSellerId(state, id) {
      state.sellerId = id;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getMarketplace(state) {
      return state.marketplace;
    },
    getSellerId(state) {
      return state.sellerId;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },
};
