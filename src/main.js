import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import store from "./store";

const app = createApp(App);
app.use(store);
app.mount("#app");
