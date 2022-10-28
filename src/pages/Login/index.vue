<template>
  <div class="login-con">
    <a-card
      style="
        width: 300px;
        height: 300px;
        position: absolute;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        border-radius: 8px;
      "
    >
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        @submit="handleSubmit"
      >
        <img
          src="./img/1.jpg"
          alt=""
          style="
            width: 63px;
            height: 63px;
            border-radius: 50%;
            margin: -10px 0 0 104px;
          "
        />
        <a-form-item label="账号" style="margin-top: 20px">
          <a-input
            type="input"
            placeholder="请输入账号"
            v-decorator="[
              'formData.username',
              {
                rules: [{ required: true, message: '请输入账号!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            type="password"
            placeholder="请输入密码"
            v-decorator="[
              'formData.password',
              {
                rules: [{ required: true, message: '请输入密码!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
          <a-button type="primary" html-type="submit"> 登录 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import config from "./config";
import { getMenu } from "../../api/index";

export default {
  name: "Login",
  data() {
    return {
      formData: config.form,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    // login() {
    //   getMenu(this.form).then(({ data: res }) => {
    //     console.log("res", res);
    //   });
    // },
    handleSubmit(e) {
      e.preventDefault();
      console.log(e)
     this.form.validateFields((err,values) => {
        if (!err) {
          // value是表单的值
          getMenu(values.formData).then(({data:res}) =>{
            if(res.code === 20000){
              this.$store.commit('clearMenu')
              this.$store.commit('setMenu',res.data.menu)
              this.$store.commit('setToken',res.data.token)
              // this.$store.commit('addMenu',this.$router)
              this.$router.push({name:'home'})
            }else {
              this.$message.warning(res.data.message)
            }
          })
        }
      });

      // getMenu(this.form).validateFields((err, values,) => {
      //   if (!err) {
      //     // value是表单的值
      //     this.$store.commit('setToken',values)
      //     this.$router.push({name:'home'})
      //   }
      // });
    },
  },
};
</script>

<style>
.login-con {
  background-color: rgb(55, 54, 54);
  width: 100%;
  height: 100%;
  position: relative;
}
</style>