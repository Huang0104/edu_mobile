<template>
  <div class='course-content-list'>
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh">
      <!-- 列表组件 -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id">
        <!-- 图片区域 -->
        <div>
          <img :src="item.courseImgUrl" alt="">
        </div>
        <!-- 课程信息区域 -->
        <div class="course-info">
            <h3 v-text="item.courseName"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="course-price">
              <span class="course-discounts">￥{{ item.discounts }}</span>
              <s>￥{{ item.price }}</s>
            </p>
        </div>
      </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getCoursesInfo } from '@/services/course'
export default {
  name: 'CourseContentList',
  data () {
    return {
      // 储存请求的数据
      list: [],
      // 是否在加载
      loading: false,
      // 是否加载完成
      finished: false,
      // 当前页号
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    // 下拉刷新操作
    async onRefresh () {
      // 将页数重置为1
      this.currentPage = 1
      const { data } = await getCoursesInfo({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 将数据添加到 list 中
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      }
      // 提示
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    },
    // 数据加载操作
    async onLoad () {
      const { data } = await getCoursesInfo({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 将数据添加到 list 中
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      }
      // 请求下一页
      this.currentPage++
      // 当前页加载完成，恢复默认值
      this.loading = false
      // 全部数据完毕
      if (data.data.records.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 图片列表显示位置
.course-content-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
// 课程信息
.van-cell__value {
  height: 100px;
  display: flex;
  padding: 10px 0;
}
// 图片设置
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
// 清除默认样式
.course-info p, .course-info h3 {
  margin: 0;
  padding: 0;
}
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
  width: 200px;
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/* 超出部分显示省略号 */
  white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}
</style>
