<template>
  <div class="login">
    <!-- 导航区域 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 登录表单区域 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号' },
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: passwordCheck, message: '请输入正确的密码' },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Toast } from "vant";
import { userLogin } from "@/services/user";
export default {
  name: "Login",
  components: {
    VanNavBar: NavBar,
    VaNForm: Form,
    VanField: Field,
    VanButton: Button,
  },
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
      // 控制按钮是否显示加载状态
      isLoading: false,
    };
  },
  methods: {
    // 提交表单操作
    async onSubmit() {
      // 加载状态
      this.isLoading = true;
      const { data } = await userLogin(this.form);
      if (data.state === 1) {
        // 登录成功
        Toast.success("登录成功");
        // 将用户数据提交到 Vuex 的 state 中
        this.$store.commit("setUser", data.content);
        // 跳转
        this.$router.push(this.$route.query.redirect || "/");
      } else {
        // 登录失败
        Toast.fail("登录失败");
      }
      // 加载结束
      this.isLoading = false;
    },
    // 密码校验
    passwordCheck(value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value);
    },
    // 返回操作
    onClickLeft() {
      // go() ⽤于跳转历史，-1 代表后退⼀个⻚⾯
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
