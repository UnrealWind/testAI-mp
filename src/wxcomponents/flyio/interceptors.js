const Fly = require("flyio/dist/npm/wx")
import config from '@/config.js'
const request = new Fly()
import store from "../../store";
import Toast from '@/static/vant-weapp-new/dist/toast/toast'

request.interceptors.request.use((request) => {
    if(!store.state.token) return request
    store.state.token?request.headers['authorization'] = 'Bearer ' +store.state.token:''
    // store.state.userInfo['user-type']?request.headers['user-type'] = store.state.userInfo['user-type']:''
    // store.state.userInfo.userInfo.tenantId?request.headers['Tenant-Id'] = store.state.userInfo.userInfo.tenantId:''

    return request
})
let showModal = false


request.interceptors.response.use(
    (response, promise) => {
        console.log(response.data)
        // if(response.data.code != 200){
        // todo 刷新token or  去首页重新登录  store.state.userInfo.token
        // uni.showModal({
        //     title: '登陆超时，请重新登录！',
        //     duration: 2000,
        //     success: function (res) {
        //         if (res.confirm) {
        //             uni.setStorage({
        //                 key: 'userInfo',
        //                 data: '',
        //                 success: function () {
        //                 }
        //             });
        //             store.commit('setUserInfo', '')
        //             setTimeout(() => {
        //                 uni.reLaunch({
        //                     url: '/pages/common/index'
        //                 })
        //             }, 0)
        //         } else if (res.cancel) {
        //             console.log('用户点击取消');
        //         }
        //     }
        // });

        //return promise.reject(response.data)
        // }else {
        if(response.data.code == 401 ){
            if(!showModal) {
                showModal= true
                uni.showModal({
                    title: '登陆超时，请重新登录！',
                    duration: 2000,
                    success: function (res) {
                        if (res.confirm) {
                            showModal= false
                            uni.setStorage({
                                key: 'userInfo',
                                data: '',
                                success: function () {
                                }
                            });
                            store.commit('setUserInfo', '')
                            setTimeout(() => {
                                uni.reLaunch({
                                    url: '/pages/common/authorization'
                                })
                            }, 0)
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
            // return promise.reject(err)
        }else {
            return promise.resolve(response.data)
        }
        // }
    },
    (err, promise) => {
        debugger
        if(err.code == 401 || err.code == 500){
            // fydebugger 通过这个标识区分一下，当多个请求同时报token失效的时候，只进行一次弹窗
            if(!showModal) {
                showModal= true
                uni.showModal({
                    title: '登陆超时，请重新登录！',
                    duration: 2000,
                    success: function (res) {
                        if (res.confirm) {
                            showModal= false
                            uni.setStorage({
                                key: 'userInfo',
                                data: '',
                                success: function () {
                                }
                            });
                            store.commit('setUserInfo', '')
                            setTimeout(() => {
                                uni.reLaunch({
                                    url: '/pages/common/authorization'
                                })
                            }, 0)
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
            // return promise.reject(err)
        }
    }
)
export default request
