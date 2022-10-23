import http from './axios'

// 请求数据
export const getData =()=>{
    return http.get('/home/getData')
}