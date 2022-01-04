<template>
  <div class='learn'>
    <!-- 顶部导航 -->
    <van-nav-bar title="已购课程" />
    <!-- 中间课程列表 -->
    <course-content-list :fetch-data="fetchData"></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { getPurchaseCourse } from '@/services/course'
import CourseContentList from '@/components/CourseContentList'
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'Learn',
  components: {
    VanNavBar: NavBar,
    LayoutFooter,
    CourseContentList
  },
  data () {
    return {
      // 存储已购课程信息
      courseList: []
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    },
    async loadCourse () {
      const { data } = await getPurchaseCourse()
      this.courseList = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
