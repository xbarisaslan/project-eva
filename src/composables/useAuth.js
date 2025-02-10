import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default function useAuth() {
  const store = useStore();
  const token = ref(null);
  const marketplace = ref(null);
  const sellerId = ref(null);
  const error = ref(null);

  const api = axios.create({
    baseURL: "https://iapitest.eva.guru",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const loginUser = async (email, password) => {
    try {
      const response = await api.post("/oauth/token", {
        Email: email,
        Password: password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru",
      });
      if (!response.data?.Data?.AccessToken) {
        console.error("False credentials");
        error.value = "E-mail or password is incorrect!";
        return;
      }
      store.commit("auth/setToken", response.data.Data.AccessToken);
      token.value = store.getters["auth/getToken"]; // to not expose the token.
      await getUserInfo(email);
      store.commit("auth/setToken", token.value);
      store.commit("auth/setLoggedIn", true);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const getUserInfo = async (email) => {
    if (!token.value) return;
    try {
      const response = await api.post(
        "/user/user-information",
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      marketplace.value = response.data.Data.user.store[0].marketplaceName;
      sellerId.value = response.data.Data.user.store[0].storeId;
      store.commit("auth/setMarketplace", marketplace.value);
      store.commit("auth/setSellerId", sellerId.value);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    token,
    marketplace,
    sellerId,
    loginUser,
    error,
  };
}
