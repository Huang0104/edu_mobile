<template>
  <div class='section-and-lesson'>
    <!-- 章节 -->
    <h2 class="section">{{ sectionData.sectionName }}</h2>
    <!-- 课时 -->
    <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <!-- 课时标题 -->
      <span>{{ item.theme }}</span>
      <!-- 课时图标 -->
      <van-icon v-if="item.canPlay" name="play-circle"></van-icon>
      <van-icon v-else name="lock"></van-icon>
    </p>
  </div>
</template>

<script>

import { Icon } from 'vant'
export default {
  name: 'SectionAndLesson',
  components: {
    VanIcon: Icon
  },
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      // 判断是否可观看，即课时是否开放
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'course-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
}
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
