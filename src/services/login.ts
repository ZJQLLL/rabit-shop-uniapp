import { http } from "@/utils/http";

export interface LoginParams{
     /**
     * 不传加密信息时，模拟的手机号必传
     */
     phoneNumber: string;
}
export interface LoginResult {
     /**
     * 用户名
     */
     account: string;
     /**
      * 用户头像
      */
     avatar: string;
     /**
      * 用户id
      */
     id: string;
     /**
      * 用户手机号
      */
     mobile: string;
     /**
      * 用户昵称
      */
     nickname: null | string;
     /**
      * 用于后续接口调用的token，有效期三天
      */
     token: string;
}
export interface LoginWxParams {
     /**
     * code 通过 wx.login() 获取
     */
     code: string;
     /**
      * 通过 getphonenumber 事件回调中获取
      */
     encryptedData: string;
     /**
      * 通过 getphonenumber 事件回调中获取
      */
     iv: string;
}

/**
 * 
 * 开发内测版
 */
export const loginAPI = (data:LoginParams)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin/simple',
        data,
    })
}
/**
 * 企业开发版
 */
export const loginWxAPI = (data:LoginWxParams)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin',
        data,
    })
}