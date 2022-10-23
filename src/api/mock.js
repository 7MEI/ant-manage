import Mock from 'mockjs'
import homeApi from './mockData/home'  

// 定义mock请求拦截
Mock.mock('api/home/getData','get',homeApi.getStatisticalData)