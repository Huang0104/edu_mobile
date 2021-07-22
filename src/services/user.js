import request from '@/utils/request'

// 用户登录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // 转换为 urlencoded 格式
    data: new URLSearchParams(data).toString()
  })
}

// 查询用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
