<template>
  <div class='course-info'>
    <van-cell-group :style="styleOptions">
      <!-- 顶部课程图片 -->
      <van-cell class="course-image">
        <img :src="course.courseImgUrl">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 标题 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p class="course-preview">{{ course.previewFirstField }}</p>
        <!-- 课程销售信息 -->
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、周五更新</span>
        </div>
      </van-cell>
      <!-- 课程详情 -->
      <van-cell class="course-preview">
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
              <!-- 遍历sections，生成结构 -->
            <section-and-lesson
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            ></section-and-lesson>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span class="miaosha">限量秒杀</span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span class="bottom-price">￥{{ course.price}}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { CellGroup, Cell, Tabs, Tab, Tabbar, Button } from 'vant'
import SectionAndLesson from './components/SectionAndLesson.vue'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  components: {
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanTabs: Tabs,
    VanTab: Tab,
    VanTabbar: Tabbar,
    VanButton: Button,
    SectionAndLesson
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 存储课程详情信息
      course: [],
      // 储存章节课时信息
      sections: [],
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    // 请求课程详情信息
    this.loadCourseInfo()
    // 请求章节课时信息
    this.loadSection()
  },
  methods: {
    // 购买操作
    handlePay () {
      // 判断是否登录
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$store.fullPath
          }
        })
      }
    },
    // 请求章节课时信息
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    },
    // 请求课程详情信息
    async loadCourseInfo () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.van-cell-group {
  position: fixed;
  top: 0;
  width: 100%;
  overflow-y: auto;
  bottom: 50px;
}
.course-image {
  height: 280px;
}
.course-description {
  padding: 10px 20px;
  height: 150px;
}
.course-description h2 {
  padding: 0;
}
.course-saleInfo {
  display: flex;
  justify-content: space-between;
}
.course-price {
  flex: 1;
  margin: 0;
}
.discounts {
  font-size: 22px;
  color: chocolate;
  margin-right: 5px;
}
.tag {
  margin-left: 20px;
  background-color: rgb(238, 235, 235);
  line-height: 30px;
  border-radius: 5px;
}
.van-tabbar {
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.miaosha {
  font-size: 14px;
}
.bottom-price {
  font-size: 14px;
}
.van-button {
  width: 180px;
}
</style>
