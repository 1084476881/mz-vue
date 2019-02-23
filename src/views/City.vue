<template>
  <div class="mz-city">
    <MzHeader :title="'当前城市-' + curCityName"></MzHeader>

    <div class="lv-indexlist">
      <ul class="lv-indexlist__content" id="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail">
                <div class="city-item-text">上海</div>
              </li>
              <li class="city-item-detail">
                <div class="city-item-text">天津</div>
              </li>
            </ul>
          </div>
        </div>
        <li class="lv-indexsection"
          v-for="(item, index) in filterCityData"
          :key="index"
          :id="item.py"
          >
          <p class="lv-indexsection__index">{{ item.py }}</p>
          <ul>
            <li
              v-for="city in item.list"
              :key="city.cityId"
              @click="changeCity(city)"
              >
              {{ city.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li
            v-for="(item, index) in filterLetters"
            :key="index"
            @click="hh(item)"
            >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MzHeader from '../components/MzHeader/Index';
import axios from 'axios';

export default {
  components: {
    MzHeader
  },
  data () {
    return {
      cityData: []
    }
  },
  computed: {
    filterCityData () {
      let hash = {};
      let i = 0;
      let res = [];
      this.cityData.forEach(item => {
        let firstLetter = item.pinyin.substr(0, 1).toUpperCase();
        if (hash[firstLetter]) {
          let index = hash[firstLetter] - 1;
          res[index].list.push(item);
        } else {
          hash[firstLetter] = ++i;
          let obj = {};
          obj.py = firstLetter;
          obj.list = [item];
          res.push(obj);
        }
      });
      return res;
    }
  },
  methods: {
    getCityData () {
      axios.get('./json/city.json').then(response => {
        let res = response.data;
        console.log(res);
        if (res.status === 0) {
          this.cityData = res.data.cities;
        } else {
          alert(res.msg);
        }
      })
    }
  },
  created () {
    this.getCityData();
  }
}
</script>

<style lang="less">
@import url('../assets/styles/city.less');
</style>
