<template>
  <div id="app">
    <nav>
      <ul>
        <li v-for="(nav, key) in navs" :key="key">
          <router-link :to="nav.path">{{ nav.title }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          path: '/axios',
          title: 'Axios',
        },
        {
          path: '/request/page1',
          title: 'Page 1',
        },
        {
          path: '/request/page2',
          title: 'Page 2',
        },
        {
          path: '/batch/alpha',
          title: 'Batch alpha',
        },
        {
          path: '/batch/beta',
          title: 'Batch beta',
        },
      ],
    };
  },
};
</script>
