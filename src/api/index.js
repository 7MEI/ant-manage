import http from './axios'

// 请求数据
export const getData =()=>{
    return http.get('/home/getData')
}
// 请求用户数据
export const getUserList=(params)=>{
    return http.request({
        url:'/user/getUserList',
        method:'get',
        params
    })
}