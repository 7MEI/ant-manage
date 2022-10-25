import Mock from 'mockjs'
import homeApi from './mockData/home'  
import userApi from './mockData/user'

// 定义mock请求拦截
Mock.mock(/home\/getData/,'get' ,homeApi.getStatisticalData)
// 用户管理的mock 数据处理
Mock.mock(/user\/getUserList/,'get',userApi.getUserList)
Mock.mock('api/user/createUser','post',userApi.createUser)
Mock.mock('api/user/deleteUser','post',userApi.deleteUser)
// 批量删除
Mock.mock('api/user/batchremove','post',userApi.batchremove)
Mock.mock('api/user/updateUser','post',userApi.updateUser)