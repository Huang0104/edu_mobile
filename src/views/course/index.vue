<template>
  <div class='course'>
    <!-- 头部 -->
    <course-header></course-header>
    <!-- 内容 -->
    <course-content></course-content>
    <!-- 底部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import CourseHeader from './components/CourseHeader.vue'
import CourseContent from './components/CourseContent.vue'
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'Course',
  components: {
    CourseHeader,
    CourseContent,
    LayoutFooter
  }
}
</script>

<style lang="scss" scoped></style>
