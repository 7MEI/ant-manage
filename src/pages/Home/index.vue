<template>
  <div>
    <a-card>
      <a-table :columns="columns" :data-source="data" bordered :rowKey='record=>record.name'>
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"> 型号</span>
    <span slot="action" >
      <a>Delete</a>
    </span>
  </a-table>
    </a-card>
    
  </div>
</template>

<script>
import {getData} from '../../api/index'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '月销量',
    dataIndex: 'monthBuy',
    key: 'monthBuy',
  },
  {
    title: '今日购买量',
    dataIndex: 'todayBuy',
    key: 'todayBuy',
  },
  {
    title: '共计购买量',
    key: 'totalBuy',
    dataIndex: 'totalBuy',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];


export default {
  name:"Home",
   data() {
    return {
      data:[],
      columns,
    };
  },
  mounted(){
    getData().then((data)=>{
      console.log(data.data.data.tableData)
      this.data = data.data.data.tableData
    })
  }
}
</script>

<style>

</style>