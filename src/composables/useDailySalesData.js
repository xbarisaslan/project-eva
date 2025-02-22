import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default function useDailySalesData() {
  const store = useStore();
  const dailySalesData = ref([]); // maybe make it ref([])?

  const api = axios.create({
    baseURL: "https://iapitest.eva.guru",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchDailySales = async () => {
    try {
      const response = await api.post(
        "/data/daily-sales-overview",
        {
          customDateData: null,
          excludeYoYData: true,
          requestStatus: 0,
          marketplace: store.getters["auth/getMarketplace"],
          sellerId: store.getters["auth/getSellerId"],
          day: store.getters["selectedDay/getDayRange"],
        },
        {
          headers: {
            Authorization: `Bearer ${store.getters["auth/getToken"]}`,
          },
        }
      );
      dailySalesData.value = response.data.Data.item;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchDailySales,
    dailySalesData,
  };
}
