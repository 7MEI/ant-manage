<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="formInline" style="margin:0 auto">
        <a-form-model-item label="姓名或地址">
          <a-input v-model="formInline.name" placeholder="name">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <!-- <a-form-model-item label="性别">
          <a-select
            v-model="formInline.sex"
            style="width: 120px"
            placeholder="选择性别"
          >
            <a-select-option value="0"> 男 </a-select-option>
            <a-select-option value="1"> 女 </a-select-option>
          </a-select>
        </a-form-model-item> -->
        <a-form-model-item>
          <a-button type="success" @click="restSearch"> 重置 </a-button>
          <a-button
            type="primary"
            html-type="submit"
            style="margin-left: 12px"
            @click="initUserList(formInline.name)"
          >
            查询
          </a-button>
          <a-button
            type="primary"
            html-type="submit"
            style="margin-left: 12px"
            @click="showDrawer('add', 'dd')"
          >
            添加
          </a-button>
          <a-button type="danger" html-type="submit" style="margin-left: 12px">
            批量删除
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <!-- 表格 -->
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="userList"
        :rowKey="(record) => record.id"
        style="margin: 24px 0"
        bordered
        :pagination="pagination"
      >
        <span> </span>
        <span slot="sex" slot-scope="text, record">
          <a-tag
            :key="record.sex"
            :color="record.sex === 1 ? 'purple' : 'cyan'"
          >
            {{ record.sex === 1 ? "女" : "男" }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a @click="showDrawer('edit', record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确定删除此项数据?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delUser(record)"
            @cancel="cancel"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
      <!-- 添加、编辑抽屉 -->
      <a-drawer
        :title="isEdit ? '编辑用户信息' : '添加用户'"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="姓名:">
                <a-input v-model="drawerForm.name" placeholder="请输入姓名" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="年龄:">
                <a-input
                  number
                  v-model="drawerForm.age"
                  style="width: 100%"
                  placeholder="请输入年龄"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="性别:">
                <a-select placeholder="请选择性别" v-model="drawerForm.sex">
                  <a-select-option value="0"> 男 </a-select-option>
                  <a-select-option value="1"> 女 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="出生日期:">
                <a-date-picker
                  v-model="drawerForm.birth"
                  style="width: 100%"
                  :get-popup-container="(trigger) => trigger.parentNode"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="地址:">
                <a-input
                  style="width: 100%"
                  placeholder="请输入地址"
                  v-model="drawerForm.addr"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" @click="commit"> 提交 </a-button>
        </div>
      </a-drawer>
    </a-card>
  </div>
</template>

<script>
import { getUserList } from "../../api/index";
const config = require("./config");
export default {
  name: "User",
  data() {
    return {
      drawerForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      userList: [],
      columns: config.columns,
      isEdit: false,
      // 查询表单
      formInline: config.formInline,
      form: this.$form.createForm(this),
      visible: false,
      selectedRowKeys: [],
      configPage:{
        page:1,
        total:30,
        pageStart:'',
        pageNums:'',

      },
    };
  },
  computed: {
    pagination() {
      return {
        size: "default",
        current: (this.configPage && this.configPage.pageStart) || 1,
        pageSize: (this.configPage && this.configPage.pageNums) || 10,
        total: (this.configPage && this.configPage.total) || 0,
        showSizeChanger: true,
        showLessItems: true,
        showTotal: (total, range) =>
          `第 ${range[0]}-${range[1]} 条，总计${total} 条`,
        onChange: this.onPageChange,
        onShowSizeChange: this.onSizeChange,
      };
    },
  },
  mounted() {
    this.initUserList();
  },
  methods: {
    // 打开添加 编辑
    showDrawer(e, row) {
      this.visible = true;
      // 判断点击的是添加还是编辑
      if (e === "edit") {
        this.isEdit = true;

        this.drawerForm = row;
        this.drawerForm.birth = this.$moment(this.drawerForm.birth);
      } else {
        this.isEdit = false;
      }
    },
    // 提交添加 编辑
    commit() {
      if (this.isEdit == false) {
        this.$http.post("api/user/createUser", this.drawerForm).then((res) => {
          console.log("res", res);
          this.visible = false;
          this.initUserList();
        });
        this.restDrawer();
      } else {
        this.$http.post("api/user/updateUser", this.drawerForm).then((res) => {
          console.log("res", res);
          this.visible = false;
          this.initUserList();
        });
        this.restDrawer();
      }
    },
    // toSearch(name = "") {
    //   console.log('开始查找',name)
    //         name ? (this.configPage.page = 1) : ''
    //         getUserList({
    //             page: this.configPage.page,
    //             name
    //         }).then(({ data: res }) => {
    //             console.log('res', res)
    //             this.userList = res.list.map(item => {
    //                 return item
    //             })
    //             this.configPage.total = res.count
    //         })
    // },
    // 删除用户信息
    delUser(item) {
      const id = item.id;
      this.$http
        .post("api/user/deleteUser", {
          params: { id },
        })
        .then(() => {
          this.$message.info("删除成功");
          this.initUserList();
        });
    },
    // 重置添加 编辑数据
    restDrawer() {
      this.drawerForm.name = "";
      this.drawerForm.addr = "";
      this.drawerForm.age = "";
      this.drawerForm.birth = "";
      this.drawerForm.sex = "";
    },
    // 重置查询条件
    restSearch() {
      this.formInline.name = "";
      this.initUserList();
    },
    // 初始化用户数据
    initUserList(name='') {
            name ? (this.configPage.page = 1) : ''
            getUserList({
                page: this.configPage.page,
                name
            }).then(({ data: res }) => {
                console.log('res', res)
                this.userList = res.list.map(item => {
                    return item
                })
                this.configPage.total = res.length
            })
      // getUserList().then((data) => {
      //   this.userList = data.data.list;
      // });
    },
    onClose() {
      this.visible = false;
      this.restDrawer();
      this.initUserList();
    },
    onSelectChange(selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 取消删除框
    cancel(e) {
      console.log(e);
      this.$message.error("取消删除");
    },
    // 分页按钮
    async onSizeChange(page, size) {
      await this.initUserList({
        pageStart: page,
        pageNums: size,
      });
    },
    async onPageChange(page, size) {
      this.configPage.pageStart=page,
      this.configPage.pageNums=size,
      await this.initUserList({
      
      });
      console.log('改变页面')
      console.log('pageSize',page,size)
    },
  },
};
</script>

<style>
</style>