import Vue from 'vue';
import router from './router';
import App from './App';
import axios from 'axios-ext';

router.beforeEach((from, to, next) => {
  axios.cancel(axios.NormalCancelKey, '取消所有默认key请求');
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
