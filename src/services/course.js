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
