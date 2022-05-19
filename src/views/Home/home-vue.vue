<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list='floor'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/listcontainer-vue.vue'
import Recommend from '@/views/Home/Recommend/Recommend-vue.vue'
import Rank from '@/views/Home/Rank/Rank-vue.vue'
import Like from '@/views/Home/Like/Like-vue.vue'
import Floor from '@/views/Home/Floor/Floor-vue.vue'
import Brand from '@/views/Home/Brand/Brand-vue.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted () {
    this.getFloorList()
    // 获取用户信息在首页展示
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  methods: {
    getFloorList () {
      this.$store.dispatch('getFloorList')
    }
  }
}
</script>

<style>

</style>
