<template>
  <div>
    <h1>{{ name }}</h1>
    <p>延迟时间： <input type="text" v-model="timeout" placeholder="请输入延迟时间" />ms</p>
    <button @click="submit">请求</button>
    <div v-for="item in content">{{ item }}</div>
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
      content: [],
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
      this.content = [];
      for (let i = 0; i < 5; i++) {
        axios
          .get('/api/test?name=' + i + this.name + '&timeout=' + this.timeout * 1)
          .then(res => {
            this.content.push(i + ' - ' + res.data);
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              console.log('已取消');
            }
          });
      }
    },
  },
};
</script>
