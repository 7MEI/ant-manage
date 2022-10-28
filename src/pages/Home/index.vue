<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-card>
          <div class="top-con">
            <img src="./img/1.jpg" alt="" />
            <div>
              <p class="name" style="font-size: 30px">Admin</p>
              <p class="access" style="font-size: 16px; margin-top: -30px">
                超级管理员
              </p>
            </div>
          </div>
          <a-divider />
          <div style="padding-left: 20px">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </a-card>
        <a-card style="margin-top: 20px">
          <a-table
            :columns="columns"
            :data-source="tableData"
            :rowKey="(record) => record.name"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle">型号</span>
            <span slot="action">
              <a>Delete</a>
            </span>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="15" style="margin-left: 20px">
        <div
          style="height: 240px; background-color: pink; margin-bottom: 20px"
        ></div>
        <a-card style="height: 280px; margin-bottom: 20px">
          <!-- <div style="height: 280px" ref="echarts"></div> -->
          <echart :chartData="echartData.order" style="height: 280px" />
        </a-card>
        <div class="graph" style="margin-bottom: 20px">
          <a-col :span="12">
            <a-card style="height: 260px">
              <!-- <div style="height: 240px" ref="userEcharts"></div> -->
              <echart :chartData="echartData.user" style="height: 240px" />
            </a-card>
          </a-col>
          <a-col :span="11" style="margin-left:36px">
            <a-card style="height: 260px">
              <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
              <echart
                :chartData="echartData.video"
                :isAxisChart="false"
                style="height: 240px"
              />
            </a-card>
          </a-col>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getData, getCat } from "../../api/index";
import Echart from "../../components/ECharts.vue";
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    align: "center",
  },
  {
    title: "月销量",
    dataIndex: "monthBuy",
    key: "monthBuy",
    align: "center",
  },
  {
    title: "今日购买量",
    dataIndex: "todayBuy",
    key: "todayBuy",
    align: "center",
  },
  {
    title: "共计购买量",
    key: "totalBuy",
    dataIndex: "totalBuy",
    align: "center",
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
  },
];
export default {
  name: "Home",
  components: {
    Echart,
  },
  data() {
    return {
      data: [],
      columns,
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    // getData().then((data) => {
    //   this.data = data.data.data.tableData;
    // }),
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
    // 判断是否跨域成功
    getCat().then((data) => {
      console.log("到底有没有跨域成功就看着了", data);
    });
  },
};
</script>

<style scope>
.top-con {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-con img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
.graph {
  display: flex;
}
</style>