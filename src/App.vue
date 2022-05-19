<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在登陆注册是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>

  </div>
</template>

<script>
import Header from '@/components/Header/header-vue.vue'
import Footer from '@/components/Footer/footer-vue.vue'
export default {
  name: 'APP',
  components: {
    Header,
    Footer
  },
  mounted () {
    // 派发一个action 获取商品分类的三级列表数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
