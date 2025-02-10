import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default function useDailySku() {
  const store = useStore();
  const dailySkuListData = ref([]);
  const tableData = ref([]);

  const api = axios.create({
    baseURL: "https://iapitest.eva.guru",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchDailySkuList = async () => {
    try {
      const response = await api.post(
        "/data/daily-sales-sku-list",
        {
          isDaysCompare: 0,
          marketplace: store.getters["auth/getMarketplace"],
          pageNumber: 1,
          pageSize: 30,
          salesDate: store.getters["selectedColumnData/getColumnData"].category,
          salesDate2: "",
          sellerId: store.getters["auth/getSellerId"],
        },
        {
          headers: {
            Authorization: `Bearer ${store.getters["auth/getToken"]}`,
          },
        }
      );
      dailySkuListData.value = response.data.Data.item.skuList;
      fetchTableData(dailySkuListData.value);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTableData = async (skuList) => {
    try {
      const response = await api.post(
        "/data/get-sku-refund-rate",
        {
          marketplace: store.getters["auth/getMarketplace"],
          sellerId: store.getters["auth/getSellerId"],
          skuList: skuList,
          requestedDay: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getters["auth/getToken"]}`,
          },
        }
      );
      tableData.value = response.data.Data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchDailySkuList,
    dailySkuListData,
    fetchTableData,
    tableData,
  };
}
