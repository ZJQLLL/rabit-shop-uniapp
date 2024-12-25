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
        options.timeout = 50*1000
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


interface Data<T> {
    code:string,
    msg:string,
    result?:T,
}

//添加类型,支持泛型
export const http =<T> (options:UniApp.RequestOptions)=>{
    //1、返回promise对象
    return new Promise<Data<T>>((resolve,reject)=>{
        uni.request({
           ...options,
           //2、请求成功
           success(result) {
            if(result.statusCode>=200&&result.statusCode<300){
                 //2.1 提取核心数据
               resolve(result.data as Data<T>)
            }else if(result.statusCode===401){
                //token信息失效,清理token信息,跳转登录页
                const memberStore = useMemberStore()
                memberStore.clearProfile()
                uni.navigateTo({url:'pages/login/login'})
                reject(result)
            }else {
                uni.showToast({
                    icon:'none',
                    title:(result.data as Data<T>).msg ?? '请求错误'
                })
            }    
           },
           //3、响应失败
           fail(err) {
               uni.showToast({
                icon:'none',
                title:'网络异常'
               })
               reject(err)
           },
        })
    })
}