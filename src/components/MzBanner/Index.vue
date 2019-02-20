<template>
  <div>
    <div class="swiper-container mz-banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList" :key="item._id">
          <img :src="item.imgUrl" alt>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      bannerList: []
    };
  },
  methods: {
    initSwiper () {
      /* eslint-disable */
      this.mySwiper = new Swiper(".swiper-container", {
        loop: true,
        autoplay: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      });
      /* eslint-enable */
    }
  },
  created () {
    axios.get('http://localhost:3000/banner/search', {
      // params才是get的参数
      params: {
        pageSize: 10
      }
    }).then(res => {
      console.log(res);
      let data = res.data;
      if (data.code === 0) {
        this.bannerList = data.data;
        this.$nextTick(() => {
          this.initSwiper();
        });
      } else {
        alert('网络异常，请稍后重试');
      }
    });
  },
  mounted () {}
};
</script>

<style lang="less">
.mz-banner {
  height: 210px;
  img {
    width: 100%;
  }
}
</style>
