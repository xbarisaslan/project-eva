import { createStore } from "vuex";
import auth from "./modules/auth";
import selectedDay from "./modules/selectedDay";
import selectedColumnData from "./modules/selectedColumnData";

export default createStore({
  modules: {
    auth,
    selectedDay,
    selectedColumnData,
  },
});
