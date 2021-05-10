import { product } from '../../api/product.js';
import { order } from '../../api/order.js';
import { file } from '../../api/file.js';

const mainStore = {
  namespaced: true,
  state: {
    item: {},
    sFileIds: [],
    sumnailUrl: '',
    todayItems: [],
    productIds: [],
  },
  getters: {},
  mutations: {
    SET_ITEM(item) {
      state.item = item;
      state.item.images.forEach((image) => {
        if (image.imageType === 'S') {
          state.sFileIds.push(image.fileId);
        }
      });
    },
    SET_SUMNAILURL(sFiles) {
      if (sFiles.length > 0) {
        state.sumnailUrl = `data:image/jpeg;base64,${this.sFiles[0].imageBytes}`;
      }
    },
    SET_TODAY_ITEMS(todayItems) {
      state.todayItems = todayItems;
    },
  },

  actions: {
    async FIND_DETAIL_PRODUCT_AND_FETCH_FILE({ commit, dispatch, state }, { productId }) {
      console.log('FIND_DETAIL_PRODUCT');
      let res = await product.find(productId); //여기서 res 받아서
      commit('SET_ITEM', res.data.data);
      let sFiles = await file.fetch(state.sFileIds.join(','));
      commit('SET_SUMNAILURL', sFiles);
      return;
    },

    async FETCH_RECOMMEND_TODAYHOT({ commit, dispatch, state }) {
      let res = await order.fetchRecommendTodayHot();
      commit('SET_TODAY_ITEMS', res.data.data);
      return;
    },
    FETCH_RECOMMEND_HOTPRODUCT({ commit, dispatch, state }) {
      console.log('FETCH_RECOMMEND_HOTPRODUCT 실행');
      return order.fetchRecommendHotProduct();
    },
  },
};

export default mainStore;
