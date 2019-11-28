<template>
  <div>
    <h1>{{ name }}</h1>
    <p>延迟时间： <input type="text" v-model="timeout" placeholder="请输入延迟时间" />ms</p>
    <button @click="submit">请求</button>
    <button @click="cancel">取消</button>
    <div>normal请求：{{ content }}</div>
  </div>
</template>

<script>
import axios from 'axios-ext';

export default {
  name: 'axios',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeout: 2000,
      content: '',
      NormalCancelKey: axios.NormalCancelKey,
    };
  },
  watch: {
    name() {
      this.submit();
    },
  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      this.request = axios.get('/api/test?name=' + this.name + '&timeout=' + this.timeout * 1);
      this.request
        .then(res => {
          this.content = res.data;
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('已取消');
          }
        });
    },
    cancel() {
      this.request.cancel();
    },
  },
};
</script>

<style scoped></style>
