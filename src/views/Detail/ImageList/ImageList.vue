<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active:currentIndex == index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  props: ['skuImageList'],
  data () {
    return {
      currentIndex: 0
    }
  },
  watch: {
    skuImageList (newValue, oldValue) {
      // nextTick：在下次dom更新循环结束之后（v-for）执行延迟回调，在修改数据后（从服务器拉取数据后）使用这方法获取更新后的dom
      this.$nextTick(() => {
        const mySwiper = new Swiper(this.$refs.cur, {
          // 设置图片同时展示几个（slider）
          slidesPerView: 3,
          // 设置每一次切换，切换几张图
          slidesPerGroup: 2,
          // 滚动滚轮切换
          mousewheel: true,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      })
    }
  },
  methods: {
    changeCurrentIndex (index) {
      this.currentIndex = index
      // 通知兄弟组件，当前的索引值为几
      this.$bus.$emit('index', this.index)
    }
  }
}

</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
