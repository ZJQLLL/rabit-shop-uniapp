import { http } from "@/utils/http";

export interface getWxPayResult{
    /**
     * appId
     */
    appId?: string;
    /**
     * 随机字符串，长度为32个字符以下
     */
    nonceStr: string;
    /**
     * 统一下单接口返回的 prepay_id 参数值
     */
    package: string;
    /**
     * 微信支付签名
     */
    paySign: string;
    /**
     * 签名算法
     */
    signType: string;
    /**
     * 时间戳，即当前的时间
     */
    timeStamp: string;
}

export const getWxPayAPI = (orderId:string)=>{
    return http<getWxPayResult>({
        method:'GET',
        url:'/pay/wxPay/miniPay',
        data:{
            orderId
        },
    })
}
export const getWxPayMockAPI = ( orderId: string )=>{
    return http({
        method:'GET',
        url:'/pay/mock',
        data:{
            orderId
        },
    })
}