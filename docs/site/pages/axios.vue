<template>
  <div>
    <p>延迟时间： <input type="text" v-model="timeout" placeholder="请输入延迟时间" />ms</p>
    <button @click="submit">请求</button>
    <button @click="cancel">取消</button>
    <button @click="globalcancel(true, '取消所有')">取消所有</button>
    <button @click="globalcancel(NormalCancelKey, '取消所有normal')">取消所有normal</button>
    <button @click="getpending">获取队列</button>
    <div>normal请求：{{ content1 }}</div>
    <div>single请求：{{ content2 }}</div>
  </div>
</template>

<script>
import axios from 'axios-ext';

export default {
  name: 'axios',
  data() {
    return {
      timeout: 2000,
      content1: '',
      content2: '',
      NormalCancelKey: axios.NormalCancelKey,
    };
  },
  created() {
    this.submit();
  },
  methods: {
    submit() {
      this.content1 = '';
      this.content2 = '';
      this.request1 = axios.get('/api/test?name=normal&timeout=' + this.timeout * 1);
      this.request2 = axios.get('/api/test?name=single&timeout=' + this.timeout * 1, {
        cancelKey: 'single',
      });
      this.request1
        .then(res => {
          this.content1 = res.data;
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            this.content1 = '已取消';
          }
        });
      this.request2
        .then(res => {
          this.content2 = res.data;
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            this.content2 = '已取消';
          }
        });
    },
    cancel() {
      this.request1.cancel();
      this.request2.cancel();
    },
    globalcancel(key, msg) {
      return axios.cancel(key, msg);
    },
    getpending() {
      console.log(axios._pending);
    },
  },
};
</script>

<style scoped></style>
