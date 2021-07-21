<template>
  <div class='course-content'>
    <!-- 顶部轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activityList" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 中间内容列表 -->
    <course-content-list></course-content-list>
  </div>
</template>

<script>
import CourseContentList from './CourseContentList.vue'
import { getAds } from '@/services/course'
export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 储存获取的广告信息
      adsList: []
    }
  },
  created () {
    // 请求广告信息
    this.loadAds()
  },
  methods: {
    async loadAds () {
      const { data } = await getAds({
        // spaceKeys 为固定值
        spaceKeys: '999'
      })
      // 保存广告信息
      this.adsList = data.content[0].adDTOList
    }
  },
  computed: {
    activityList () {
      return this.adsList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.my-swipe img {
  height: 170px;
}
.course-content-list {
  top: 220px;
  bottom:50px;
}
</style>
