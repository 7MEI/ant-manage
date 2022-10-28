import http from './axios'

// 请求数据
export const getData =()=>{
    return http.get('/home/getData')
    
}
// 测试是否可以跨域
export const getCat=()=>{
    return http.get('public/v1/home/catitems')
}
// 请求用户数据
export const getUserList=(params)=>{
    return http.request({
        url:'/user/getUserList',
        method:'get',
        params
    })
}

// 获取菜单
export const getMenu = (param)=>{
    return http.request({
        url:'/menu/getMenu',
        method:'post',
        data:param
    })
}