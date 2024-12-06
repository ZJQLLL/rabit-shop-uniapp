import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
    //拦截前触发
    invoke(options:UniApp.RequestOptions){
        //1、非http开头需要拼接地址
        if(!options.url.startsWith('https')){
            options.url = baseURL + options.url
        }
        //2、请求超时,默认60秒,太长,可以设置10秒
        options.timeout = 10*1000
        //3、添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        }
        //4、添加token到请求头
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if(token){
            options.header.Authorization=token
        }
        
    }
  
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)