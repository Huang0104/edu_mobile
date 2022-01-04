<template>
  <div class='course-video'>
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
   />
   <!-- 视频播放器 -->
   <div id="video-container"></div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { videoPlayInfo } from '@/services/course'
export default {
  name: 'CourseVideo',
  components: {
    VanNavBar: NavBar
  },
  props: {
    lessonId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadVideoPlay()
  },
  methods: {
    async loadVideoPlay () {
      const { data } = await videoPlayInfo({
        lessonId: this.lessonId
      })
      // 初始化播放器
      const player = new window.Aliplayer({
        id: 'video-container',
        // 视频 ID
        vid: data.content.fileId,
        // 播放凭证
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      })
      console.log(player)
    }
  }
}
</script>

<style lang="scss" scoped>
.course-video {
  width: 100%;
  height: 210px;
}
.course-container {
  width: 100%;
  height: auto;
}
</style>
