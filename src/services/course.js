import request from '@/utils/request'

// 获取广告位及其对应广告
export const getAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 分页查询课程信息
export const getCoursesInfo = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 获取已购课程信息
export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}

// 获取课程详情
export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}

// 获取课程章节和课时接口
export const getSectionAndLesson = params => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}

// 根据fileId获取阿里云对应的视频播放信息
export const videoPlayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
