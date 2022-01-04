<template>
  <div class='pay'>
    <van-cell-group>
      <!-- 课程信息 -->
      <van-cell class="course-info">
        <img :src="course.courseImgUrl">
        <div class="price-info">
          <span class="course-name" v-text="course.courseName"></span>
          <span class="course-discounts">￥{{ course.discounts }}</span>
        </div>
      </van-cell>
      <!-- 购买信息 -->
      <van-cell class="account-info">
        <div class="account">购买信息</div>
        <div class="account-tag">购买课程后使用此账号登录【拉勾教育】学习课程</div>
        <div class="account-user">当前账号: {{ username }}</div>
      </van-cell>
      <!-- 支付信息 -->
      <van-cell class="pay-info">
        <div class="title">
          <p>支付方式</p>
          <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell @click="radio = '1'">
              <template #title>
                <img :src="'http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png'">
                <span>微信支付</span>
              </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell @click="radio = '2'">
              <template #title>
                <img :src="'http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png'">
                <span>支付宝支付</span>
              </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
          </van-radio-group>
        </div>
          <van-button @click="handlePay">￥{{ course.discounts }} 立即支付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell, RadioGroup, Button, Radio, Toast } from 'vant'
import { getCourseById } from '@/services/course'
import { createOrder, getPlayInfo, initOrder, getPayResult } from '@/services/pay'
export default {
  name: 'Pay',
  components: {
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanRadioGroup: RadioGroup,
    VanButton: Button,
    VanRadio: Radio
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: [],
      // 支付方式，默认为1 微信支付，2 为支付宝支付
      radio: '1',
      // 订单信息
      orderNo: [],
      // 支付方式
      payInfo: {}
    }
  },
  created () {
    // 请求课程信息
    this.loadCourse()
    // 订单信息
    this.loadOrder()
  },
  methods: {
    // 发起支付请求
    async handlePay () {
      // 发起支付
      const { data } = await initOrder({
        goodsOrderNo: this.orderNo,
        channel: this.radio === 1 ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagou.com/'
      })
      // 接收相应地址，进行跳转
      window.location.href = data.content.payUrl
      // 轮询支付结果
      const timer = setInterval(async () => {
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        // 判断是否支付成功
        if (payResult.content && payResult.content.status === 2) {
          // 跳转到学习页，并提示
          this.$router.push({
            name: 'learn'
          })
          Toast.success('支付成功！')
          clearInterval(timer)
        }
      }, 1000)
    },
    // 订单信息
    async loadOrder () {
      // 创建订单，获取订单号
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      this.orderNo = data.content.orderNo
      // 获取支付方式
      const { data: payInfo } = await getPlayInfo({
        shopOrderNo: this.orderNo
      })
      this.payInfo = payInfo.content.supportChannels
    },
    // 请求课程信息
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  },
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  position: relative;
  width: 100%;
  height: 100%;
}
.van-cell-group {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
}
// 课程信息
.course-info {
  height: 170px;
  padding: 40px 20px 0;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.course-info .van-cell__value {
  display: flex;
}
.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}
.price-info {
  height: 107px;
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-info .course-name {
  font-size: 17px;
}
.price-info .course-discounts {
  font-size: 24px;
  font-weight: 700;
  color: chocolate;
}
// 购买信息
.account-info {
  margin-bottom: 10px;
}
.account-info .account-tag {
  color: #999;
  font-size: 13px;
}
.account-info .account-user {
  margin: 22px 0 11px;
  font-size: 17px;
  color: #323233;
}
// 支付信息
.pay-info {
  flex: 1;
}
.pay-info .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pay-info .van-cell {
  padding: 20px 10px;
}
.pay-info .van-cell__title {
  display: flex;
  align-items: center;
}
.pay-info .van-cell__title img {
  width: 30px;
  height: 30px;
}
.pay-info .van-cell__title span {
  font-size: 17px;
  padding-left: 10px;
}
.pay-info .van-button {
  background: linear-gradient(270deg,#faa83e,#fbc546);
  margin-top: 50px;
  border-radius: 50px;
}
</style>
