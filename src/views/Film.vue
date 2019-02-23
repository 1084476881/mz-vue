<template>
  <div>
    <MzBanner></MzBanner>
    <MzTabs></MzTabs>
    <button @click="goCity">去城市选择页面</button>
    <ul>
      <router-link tag="li" to="/detail/100">流浪地球</router-link>
      <router-link tag="li" to="/detail/200">家和万事惊</router-link>
      <router-link tag="li" to="/detail/300">新喜剧之王</router-link>
    </ul>
    <div style="height:2000px;"></div>
  </div>
</template>

<script>
import MzBanner from '../components/MzBanner/Index';
import MzTabs from '../components/MzTabs/Index';

export default {
  methods: {
    goCity () {
      this.$router.push({
        // path: '/city',
        params: {
          id: 10
        },
        // query: {
        //   id: 10
        // },
        name: 'hhh'
      })
    }
  },
  components: {
    MzBanner,
    MzTabs
  }
};
</script>
