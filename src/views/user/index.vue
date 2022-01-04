<template>
  <div class='user'>
    <!-- 顶部功能 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
     <van-cell class="user-info" :border="false">
       <van-image
          width="50"
          height="50"
          round
          :src="userInfo.portrait || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic27.nipic.com%2F20130129%2F11507979_020415120167_2.jpg&refer=http%3A%2F%2Fpic27.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629531996&t=5ba16debc6a7b07f88761907c4a51368'" />
       <div class="user-content">
         <h3>{{ userInfo.userName }}</h3>
         <span>
           <van-icon name="edit" />
           编辑个人人资料
         </span>
       </div>
     </van-cell>
     <!-- 账户信息 -->
     <van-cell class="user-account" :border="false">
       <van-grid>
        <van-grid-item>
          <span class="account">14.05</span>
          <span>学习时长</span>
        </van-grid-item>
        <van-grid-item>
          <span class="account">200</span>
          <span>钱包/勾豆</span>
        </van-grid-item>
        <van-grid-item>
          <span class="account">1</span>
          <span>优惠券</span>
        </van-grid-item>
        <van-grid-item>
          <span class="account">213</span>
          <span>学分</span>
        </van-grid-item>
      </van-grid>
     </van-cell>
     <!-- 菜单列表 -->
     <van-cell icon="user-o" title="分销中心" is-link value="收益200元">
     </van-cell>
     <van-cell icon="setting-o" title="个性化设置" is-link>
     </van-cell>
     <van-cell icon="down" title="我的下载" is-link>
     </van-cell>
     <van-cell icon="question-o" title="帮助与反馈" is-link>
     </van-cell>
     <van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0">
     </van-cell>
   </van-cell-group>
   <!-- 底部导航 -->
   <layout-footer></layout-footer>
  </div>
</template>

<script>
import { CellGroup, Cell, Image, Icon, Grid, GridItem } from 'vant'
import { getUserInfo } from '@/services/user'
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'User',
  components: {
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanImage: Image,
    VanIcon: Icon,
    VanGrid: Grid,
    VanGridItem: GridItem,
    LayoutFooter
  },
  data () {
    return {
      userInfo: []
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px;
  background-color: sandybrown;
}
.user-info .van-cell__value{
  display: flex;
}
.user-info .user-content {
  padding-left: 15px;
}
h3 {
  margin: 5px;
  font-size: 20px;
}
// 账户信息
.user-account {
  background-color: sandybrown;
}
.user-account .account {
  font-size: 22px;
  font-weight: 700;
}
.van-cell__value {
  border-radius: 15px;
}
</style>
